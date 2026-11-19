import {getVisibleWork} from '../data/work';
import {researchNotes} from '../data/research';
import {getEntries} from '../data/journal';
import {profileText} from '../data/profile';
import {contacts} from '../data/contacts';
import {catalogue} from './catalogue';
export async function publicFiles(){
 const work=await getVisibleWork();
 const compact=(await catalogue()).filter(p=>p.group==='Work'&&p.href.includes('#'));
 return [
 {file:'about/profile',title:'Subhasis Jena',href:'/about/',text:profileText+'\n\n'+contacts.map(c=>c.label+' — '+c.href).join('\n')},
 ...work.filter(p=>!p.draft).map(p=>({file:'work/'+p.slug,title:p.title,href:'/work/'+p.slug+'/',text:[p.category,p.question,p.summary,p.role,p.caseStudy?.contribution?.description,p.caseStudy?.scene.caption,p.caseStudy?.decision.title,p.caseStudy?.decision.description,p.caseStudy?.detail.caption,p.caseStudy?.limitation,p.demo,p.repository,p.artifact?.href].filter(Boolean).join('\n\n')})),
 ...compact.map(p=>({file:'work/'+p.title.toLowerCase(),title:p.title,href:p.href,text:p.text})),
 ...researchNotes.map(p=>({file:'research/'+p.slug,title:p.title,href:'/research/'+p.slug+'/',text:[p.category,p.question,p.summary,p.test].join('\n\n')})),
 ...getEntries().map(p=>({file:'journal/'+p.slug,title:p.title,href:'/journal/'+p.slug+'/',text:[p.date+' · '+p.category,p.excerpt,p.body].join('\n\n')}))
 ];
}
