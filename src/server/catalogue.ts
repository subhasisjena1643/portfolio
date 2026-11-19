import {profileText} from '../data/profile';
import { getVisibleWork } from '../data/work';
import { researchNotes } from '../data/research';
import { getEntries } from '../data/journal';
export async function catalogue(){
 const work=(await getVisibleWork()).filter(p=>!p.draft);
 return [
 {group:'Profile',title:'Subhasis Jena',href:'/about/',text:profileText},
 ...work.map(p=>({group:'Work',title:p.title,href:'/work/'+p.slug+'/',text:[p.summary,p.role && 'Subhasis’s role: '+p.role+'.',p.caseStudy?.decision.description].filter(Boolean).join('\n\n')})),
 {group:'Work',title:'CrowdVision',href:'/work/#crowdvision-title',text:'Subhasis ran machine learning experiments and evaluation. His teammates developed the frontend and backend. The team used his evaluation scores. Time constraints kept the ML pipeline out of the final application.'},
 {group:'Work',title:'MuScope',href:'/work/#muscope-title',text:'MuScope is designed to show coding assistants which step failed in a program run and what the program reported. Planning and documentation are complete.'},
 ...researchNotes.map(p=>({group:'Research',title:p.title,href:'/research/'+p.slug+'/',text:p.question+' '+p.summary+' '+p.test})),
 ...getEntries().map(p=>({group:'Journal',title:p.title,href:'/journal/'+p.slug+'/',text:p.excerpt+' '+p.body.slice(0,450)})),
 {group:'Arcade',title:'Atlas Arcade',href:'/arcade/',text:'Bengaluru After Hours is a playable voxel entertainment district. Walk between a cinema, manga bookshop, games arcade and coffee shop. The terminal is the developer edition of the portfolio.'}
 ];
}
