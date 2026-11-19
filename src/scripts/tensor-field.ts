const vertexSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = vec2(aPosition.x, -aPosition.y) * .5 + .5;
    gl_Position = vec4(aPosition, 0., 1.);
  }
`;

const fragmentSource = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uPrint;
  uniform vec2 uFit;
  uniform vec2 uTilt;
  uniform float uScroll;
  void main() {
    vec2 uv = (vUv - .5) / uFit + .5;
    float span = (uv.x - .55) * 2.;
    float curl = sin(uv.x * 8. - uv.y * 2.);
    float relief = (.55 + .45 * curl) * smoothstep(.02, .75, abs(span));
    uv += relief * vec2(uTilt.x * .027, uTilt.y * .04 + uScroll * .035);
    uv.y += span * uTilt.x * .024;
    if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) discard;
    vec4 ink = texture2D(uPrint, uv);
    float crest = 1. - smoothstep(.0, .14, abs(uv.x - .54 - uTilt.x * .38 - uScroll * .1));
    ink.rgb += vec3(.12,.08,.055) * crest * length(uTilt) * ink.a;
    gl_FragColor = ink;
  }
`;

function makeProgram(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  if (!program) return null;
  const shaders: WebGLShader[] = [];
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
    const shader = gl.createShader(type);
    if (!shader) break;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) break;
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  shaders.forEach(shader => gl.deleteShader(shader));
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  gl.deleteProgram(program);
  return null;
}

class TensorField extends HTMLElement {
  private lifecycle?: AbortController;
  private releaseSurface?: () => void;

  connectedCallback() {
    if (this.lifecycle) return;
    const life = new AbortController();
    this.lifecycle = life;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    let lost = false;

    const sync = () => {
      if (inView && !reduced.matches && !document.hidden && !lost) {
        if (!this.releaseSurface) this.releaseSurface = this.startSurface();
      } else {
        this.releaseSurface?.();
        this.releaseSurface = undefined;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(this);
    life.signal.addEventListener('abort', () => observer.disconnect(), { once:true });
    this.querySelector('canvas')?.addEventListener('webglcontextlost', event => {
      event.preventDefault(); lost = true; sync();
    }, { signal: life.signal });
    this.querySelector('canvas')?.addEventListener('webglcontextrestored', () => {
      lost = false; sync();
    }, { signal: life.signal });
    reduced.addEventListener('change', sync, { signal: life.signal });
    document.addEventListener('visibilitychange', sync, { signal: life.signal });
    window.addEventListener('pagehide', () => {
      this.releaseSurface?.();
      this.releaseSurface = undefined;
    }, { signal: life.signal });
    window.addEventListener('pageshow', sync, { signal: life.signal });
  }

  disconnectedCallback() {
    this.lifecycle?.abort();
    this.lifecycle = undefined;
    this.releaseSurface?.();
    this.releaseSurface = undefined;
  }

  private startSurface() {
    const canvas = this.querySelector('canvas')!;
    const print = this.querySelector('svg')!;
    const surface = this.parentElement!;
    const gl = canvas.getContext('webgl', { alpha:true, antialias:false, depth:false, premultipliedAlpha:true, powerPreference:'low-power' });
    if (!gl) return;
    const program = makeProgram(gl);
    if (!program) return;
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    const work = new AbortController();
    const { signal } = work;
    let frame = 0, last = 0, ready = false;
    let tiltX = 0, tiltY = 0, scroll = 0, aimX = 0, aimY = 0, aimScroll = 0;
    let width = 1, height = 1;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    for (const wrap of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D, wrap, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    const fit = gl.getUniformLocation(program, 'uFit');
    const tilt = gl.getUniformLocation(program, 'uTilt');
    const travel = gl.getUniformLocation(program, 'uScroll');
    function queue() {
      if (ready && !frame) frame = requestAnimationFrame(render);
    }
    const render = (time: number) => {
      frame = 0;
      const elapsed = Math.min(64, time - (last || time - 16));
      last = time;
      const ease = 1 - Math.exp(-elapsed / 85);
      tiltX += (aimX - tiltX) * ease;
      tiltY += (aimY - tiltY) * ease;
      scroll += (aimScroll - scroll) * ease;
      const aspect = width / height / (800 / 430);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(fit, Math.min(1, 1 / aspect), Math.min(1, aspect));
      gl.uniform2f(tilt, tiltX, tiltY);
      gl.uniform1f(travel, scroll);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      this.dataset.renderer = 'webgl';
      if (Math.max(Math.abs(aimX - tiltX), Math.abs(aimY - tiltY), Math.abs(aimScroll - scroll)) > .002) queue();
      else last = 0;
    };
    const onScroll = () => {
      const centre = this.getBoundingClientRect().top + height / 2;
      aimScroll = Math.max(-1, Math.min(1, 1 - centre / (innerHeight / 2)));
      queue();
    };
    const resize = new ResizeObserver(([entry]) => {
      width = Math.max(1, entry.contentRect.width);
      height = Math.max(1, entry.contentRect.height);
      const density = Math.min(devicePixelRatio, 1.75, 1800 / Math.max(width,height));
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      onScroll();
    });
    resize.observe(this);
    window.addEventListener('scroll', onScroll, { passive:true, signal });
    surface.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const rect = this.getBoundingClientRect();
      aimX = Math.max(-1, Math.min(1, 2 * (event.clientX - rect.left) / width - 1));
      aimY = Math.max(-1, Math.min(1, 2 * (event.clientY - rect.top) / height - 1));
      queue();
    }, { passive:true, signal });
    surface.addEventListener('pointerleave', () => { aimX = aimY = 0; queue(); }, { signal });

    const source = print.cloneNode(true) as SVGSVGElement;
    // A power-of-two texture permits proper low-pass filtering of the fine lines
    // at phone widths in WebGL 1. The shader restores the print's physical ratio.
    const desiredWidth = Math.max(512, this.clientWidth * Math.min(2, devicePixelRatio) * 1.3);
    const textureWidth = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE), 2 ** Math.ceil(Math.log2(desiredWidth)));
    source.setAttribute('width', String(textureWidth));
    source.setAttribute('height', String(textureWidth / 2));
    source.setAttribute('preserveAspectRatio','none');
    const svg = new XMLSerializer().serializeToString(source);
    const image = new Image();
    image.onload = () => {
      if (signal.aborted) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
      ready = true;
      queue();
    };
    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    return () => {
      work.abort();
      resize.disconnect();
      image.onload = null;
      cancelAnimationFrame(frame);
      delete this.dataset.renderer;
      gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program);
    };
  }
}

if (!customElements.get('tensor-field')) customElements.define('tensor-field', TensorField);
