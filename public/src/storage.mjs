import {createAttempt,checkStep,requestHint} from './attempts.mjs';
import {questions,customQuestion} from './questions.mjs';
export const KEY='practiceagain.v1';
export function restore(raw){
 const data=JSON.parse(raw);if(data.version!==1||!Array.isArray(data.attempts)||data.attempts.length>100)throw Error('Unrecognised saved data');
 const attempts=data.attempts.map(old=>{
  const q=old.question?.custom?customQuestion(old.question.text):questions.find(q=>q.text===old.question?.text);if(!q||!Array.isArray(old.steps)||old.steps.length>200)throw Error('Invalid practice record');
  if(old.question?.origin==='similar')q.origin='similar';
  const a=createAttempt(q);if(typeof old.id!=='string'||typeof old.created!=='string')throw Error('Invalid record');a.id=old.id;a.created=old.created;a.lessonIndex=Number.isInteger(old.lessonIndex)?Math.max(0,Math.min(old.lessonIndex,2)):0;
  for(const step of old.steps){if(typeof step.raw!=='string'||step.raw.length>160)throw Error('Invalid step');const result=checkStep(a,step.raw);if(result.kind!==step.kind)throw Error('Invalid step result');}
  if(old.assisted===true)requestHint(a);a.assisted=a.assisted||old.assisted===true;return a;
 });return {attempts,current:attempts.some(a=>a.id===data.current)?data.current:null};
}
export function save(storage,state){try{storage.setItem(KEY,JSON.stringify({version:1,...state}));return true;}catch{return false;}}
