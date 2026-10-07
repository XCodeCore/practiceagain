export function makeQuestion(a,b,answer){
  if(![a,b,answer].every(n=>Number.isInteger(n)&&n>0&&n<=20)||a===1)throw Error('Invalid question parameters');
  return {a,b,answer,c:a*answer+b,text:`${a}x + ${b} = ${a*answer+b}`,skill:'Two-step equations'};
}
export const questions=[makeQuestion(3,5,5),makeQuestion(4,7,6),makeQuestion(2,9,7),makeQuestion(5,3,4),makeQuestion(6,8,3),makeQuestion(3,4,8),makeQuestion(7,6,2),makeQuestion(4,9,5)];
export function nextQuestion(current){const i=questions.findIndex(q=>q.text===current?.text);return questions[(i+1)%questions.length];}
export function hintFor(attempt){
  const q=attempt.question;
  return `One method: subtract ${q.b} from BOTH sides of the original equation. This gives ${q.a}x = ${q.c-q.b}. Then divide BOTH sides by ${q.a}. You can also use another valid method.`;
}

// Supported custom questions: ax + b = c (or the reversed equation), integer coefficients.
import {parseEquation,normalizeVariable} from './algebra.mjs';
export function customQuestion(text){
 if(typeof text!=='string'||text.length>160)throw Error('Keep the question under 160 characters.');
 const letters=[...new Set(text.toLowerCase().match(/[a-z]/g)||[])];
 if(letters.length!==1)throw Error('Use one unknown letter, such as x or y.');
 const variable=letters[0],p=parseEquation(normalizeVariable(text,variable));
 if(!p.solution)throw Error('This equation has no single answer. Try an equation with one unique solution.');
 const values=[p.left.a,p.left.b,p.right.a,p.right.b];
 if(values.some(v=>v.d!==1n||v.n>10000n||v.n< -10000n))throw Error('For now, use whole-number coefficients between −10,000 and 10,000.');
 const [la,lb,ra,rb]=values.map(v=>Number(v.n));let a=la-ra,b=lb,c=rb;
 if(!a)throw Error('This equation has no single answer.');
 const answer=p.solution.d===1n?String(p.solution.n):`${p.solution.n}/${p.solution.d}`;
 return {a,b,c,la,lb,ra,rb,variable,answer,text:text.trim(),skill:'Linear equations',custom:true};
}
export function lessonFor(q){
 const v=q.variable||'x',r=q.c-q.b,steps=[];
 if(q.text.includes('(')){
  const simple=q.text.match(new RegExp(`^\\s*(-?\\d+)\\s*\\(\\s*${v}\\s*([+-])\\s*(\\d+)\\s*\\)\\s*=`,'i'));
  const term=(a,b)=>a===0?String(b):`${a===1?'':a===-1?'-':a}${v}${b?` ${b<0?'-':'+'} ${Math.abs(b)}`:''}`;
  const intro=simple?`Multiply each part inside the brackets by ${simple[1]}: ${simple[1]} × ${v} = ${Number(simple[1])===1?'':simple[1]}${v}, and ${simple[1]} × (${simple[2]==='-'?'-':''}${simple[3]}) = ${Number(simple[1])*Number(simple[3])*(simple[2]==='-'?-1:1)}.`:'Simplify the brackets. Multiply through where needed, then add matching parts.';
  steps.push({message:`${intro} So ${term(q.la,q.lb)} = ${term(q.ra,q.rb)}.`,equation:`${q.la}${v} + (${q.lb}) = ${q.ra}${v} + (${q.rb})`});
 }

 if(q.ra)steps.push({message:`${q.ra<0?'Add':'Subtract'} ${Math.abs(q.ra)===1?'':Math.abs(q.ra)}${v} on both sides: ${q.a}${v} ${q.b<0?'-':'+'} ${Math.abs(q.b)} = ${q.c}.`,equation:`${q.a}${v} + (${q.b}) = ${q.c}`});
 if(q.b)steps.push({message:`${q.b<0?'Add':'Subtract'} ${Math.abs(q.b)} on both sides: ${q.c} ${q.b<0?'+':'−'} ${Math.abs(q.b)} = ${r}.`,equation:`${q.a}${v} = ${r}`});
 if(q.a!==1)steps.push({message:`Divide both sides by ${q.a}: ${r} ÷ ${q.a} = ${displayAnswer(q.answer)}.`,equation:`${v} = ${q.answer}`});
 if(!steps.length)steps.push({message:`${v} is already on its own.`,equation:`${v} = ${q.answer}`});
 return steps;
}
export function similarQuestion(q){
 const la=q.la??q.a,ra=q.ra??0,lb=q.lb??q.b,v=q.variable||'x';
 const answer=[4,5,1,0,-1,-2,2,-3,3].find(n=>String(n)!==String(q.answer)&&Math.abs((la-ra)*n+lb)<=10000);
 const rb=(la-ra)*answer+lb;
 const term=(a,b)=>a===0?String(b):`${a===1?'':a===-1?'-':a}${v}${b?` ${b<0?'-':'+'} ${Math.abs(b)}`:''}`;
 return {...customQuestion(`${term(la,lb)} = ${term(ra,rb)}`),origin:'similar'};
}

export function displayAnswer(answer){
 const text=String(answer);if(!text.includes('/'))return text;
 const [n,d]=text.split('/').map(BigInt);let rest=d,twos=0,fives=0;
 while(rest%2n===0n){rest/=2n;twos++;}while(rest%5n===0n){rest/=5n;fives++;}
 const places=Math.max(twos,fives);if(rest!==1n||places>6)return text;
 const scaled=n*(10n**BigInt(places))/d,negative=scaled<0n;
 const digits=(negative?-scaled:scaled).toString().padStart(places+1,'0');
 const decimal=places?digits.slice(0,-places)+'.'+digits.slice(-places):digits;
 return `${negative?'-':''}${decimal} (or ${text})`;
}
