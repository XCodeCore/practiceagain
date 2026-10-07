import {classify} from './algebra.mjs';
import {hintFor} from './questions.mjs';
export function createAttempt(question){return {id:globalThis.crypto.randomUUID(),question,steps:[],current:question.text,assisted:false,completed:false,created:new Date().toISOString()};}
export function checkStep(attempt,raw){
  if(attempt.completed)return {kind:'unchanged',message:'This question is complete. Try a fresh question.'};
  if(attempt.steps.length>=200)return {kind:'format',message:'This attempt has reached 200 steps. Try a fresh question.'};
  const outcome=classify(raw,attempt.question,attempt.current);
  if(outcome.kind==='wrong')attempt.assisted=true;
  if(['wrong','valid','complete'].includes(outcome.kind))attempt.steps.push({raw,kind:outcome.kind,message:outcome.message});
  if(['valid','complete'].includes(outcome.kind))attempt.current=raw;
  if(outcome.kind==='complete')attempt.completed=true;
  return outcome;
}
export function requestHint(attempt){if(!attempt.completed)attempt.assisted=true;return hintFor(attempt);}
