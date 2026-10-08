// Rational arithmetic keeps comparisons exact, including steps such as x + 5/3 = 20/3.
const gcd = (a,b) => b ? gcd(b,a%b) : a;
export function rat(n,d=1n) {
  n=BigInt(n); d=BigInt(d); if(!d) throw Error('Division by zero');
  if(d<0n){n=-n;d=-d;} const g=gcd(n<0n?-n:n,d);
  return {n:n/g,d:d/g};
}
const add=(a,b)=>rat(a.n*b.d+b.n*a.d,a.d*b.d);
const neg=a=>rat(-a.n,a.d);
const mul=(a,b)=>rat(a.n*b.n,a.d*b.d);
const div=(a,b)=>rat(a.n*b.d,a.d*b.n);
const eq=(a,b)=>a.n===b.n&&a.d===b.d;
const zero=a=>a.n===0n;
const lin=(a=rat(0),b=rat(0))=>({a,b});
const plus=(u,v)=>lin(add(u.a,v.a),add(u.b,v.b));
const minus=(u,v)=>plus(u,lin(neg(v.a),neg(v.b)));
function times(u,v){
  if(!zero(u.a)&&!zero(v.a)) throw Error('Use linear equations only');
  return lin(add(mul(u.a,v.b),mul(v.a,u.b)),mul(u.b,v.b));
}
function over(u,v){if(!zero(v.a))throw Error('Do not divide by x');return lin(div(u.a,v.b),div(u.b,v.b));}
export function parseEquation(raw){
  if(typeof raw!=='string'||raw.length>160)throw Error('Keep the step under 160 characters');
  const text=raw.toLowerCase().replaceAll('×','*').replaceAll('÷','/').replaceAll('−','-');
  const tokens=[]; let pos=0;
  while(pos<text.length){
    if(/\s/.test(text[pos])){pos++;continue;}
    const match=text.slice(pos).match(/^(\d+(?:\.\d+)?|x|[+*/()=\-])/);
    if(!match)throw Error('Use x, numbers, +, −, ×, ÷, and =');
    tokens.push(match[0]);pos+=match[0].length;
  }
  if(tokens.filter(t=>t==='=').length!==1)throw Error('Include exactly one equals sign');
  let i=0;
  function atom(){
    const t=tokens[i++];
    if(t==='+')return atom();
    if(t==='-'){const v=atom();return lin(neg(v.a),neg(v.b));}
    if(t==='x')return lin(rat(1));
    if(t==='('){const v=expression();if(tokens[i++]!==')')throw Error('Close the bracket');return v;}
    if(t&&/^\d/.test(t)){
      if(t.replace('.','').length>7)throw Error('Use smaller numbers for this practice');
      const pieces=t.split('.');const d=10n**BigInt(pieces[1]?.length||0);
      return lin(rat(0),rat(BigInt(pieces.join('')),d));
    }
    throw Error('Enter a complete equation, such as 3x = 15');
  }
  function product(){let v=atom();while(true){
    const t=tokens[i];
    if(t==='*'||t==='/'){i++;v=t==='*'?times(v,atom()):over(v,atom());}
    else if(t==='x'||t==='('){v=times(v,atom());}
    else break;
  }return v;}
  function expression(){let v=product();while(tokens[i]==='+'||tokens[i]==='-'){const t=tokens[i++];v=t==='+'?plus(v,product()):minus(v,product());}return v;}
  const left=expression();if(tokens[i++]!=='=')throw Error('Include an equals sign between two expressions');
  const right=expression();if(i!==tokens.length)throw Error('Check the notation in your step');
  const delta=minus(left,right);
  const solution=zero(delta.a)?null:div(neg(delta.b),delta.a);
  const isolated=(eq(left.a,rat(1))&&zero(left.b)&&zero(right.a))||(eq(right.a,rat(1))&&zero(right.b)&&zero(left.a));
  return {left,right,solution,isolated};
}
export function normalizeVariable(raw,variable='x'){
 const letters=[...new Set(raw.toLowerCase().match(/[a-z]/g)||[])];
 if(letters.some(letter=>letter!==variable.toLowerCase()))throw Error(`Use only ${variable} as the unknown in this equation.`);
 return raw.toLowerCase().replaceAll(variable.toLowerCase(),'x');
}
export function classify(raw,question,previous){
  const variable=question.variable||'x';
  if(!raw.trim())return {kind:'format',message:`Write a solving step or answer using ${question.variable||'x'} and =.`};
  let p;try{p=parseEquation(normalizeVariable(raw,question.variable||'x'));}catch(e){return {kind:'format',message:e.message.replace(/\bx\b/g,variable).replace(/[.]+$/,'')+`. Use ${question.variable||'x'} and an equals sign (=).` };}
  if(!p.solution||!eq(p.solution,parseEquation(`x = ${question.answer}`).solution))return {kind:'wrong',message:'This step changes the solution of the original equation. Apply the same operation to both sides.'};
  if(p.isolated)return {kind:'complete',message:`Correct — ${variable} is on its own, and your answer checks out.`};
  if(previous){const last=parseEquation(normalizeVariable(previous,question.variable||'x'));if(eq(p.left.a,last.left.a)&&eq(p.left.b,last.left.b)&&eq(p.right.a,last.right.a)&&eq(p.right.b,last.right.b))return {kind:'unchanged',message:`That is the same working. Try a step that leaves ${variable} on its own.`};}
  return {kind:'valid',message:`Correct step. Keep going until ${variable} is on its own.`};
}
