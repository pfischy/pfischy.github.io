(function(){
"use strict";
const form=document.getElementById('handoff-choice');if(!form)return;
const part1=document.getElementById('demo-part-one');
const part2=document.getElementById('demo-part-two');
const feed=document.getElementById('handoff-feedback');
const title=document.getElementById('handoff-feedback-title');
const copy=document.getElementById('handoff-feedback-copy');
const next=document.getElementById('handoff-continue');
const step=document.getElementById('demo-step');
const dots=document.querySelectorAll('.demo-stepdot i');
const replies={
 A:{title:'You recorded a fact, but left the decision unclear.',text:'The next crew still needs to learn the impact and who owns the change. A useful handoff connects the blocker to a responsible next action and a checkpoint.'},
 B:{title:'Strong move: make the decision actionable.',text:'You connected the change to its impact, an owner, and a checkpoint. Confirm your organization’s escalation and communication rules, then put the same four fields into the normal handoff workflow.'},
 C:{title:'Escalation can help. Waiting alone creates a gap.',text:'The supervisor may need to approve a change, but you can document the impact and inform the right people promptly under your organization’s protocol rather than letting the next shift discover it.'}
};
form.addEventListener('submit',function(event){event.preventDefault();const data=new FormData(form);const item=replies[data.get('move')];if(!item)return;title.textContent=item.title;copy.textContent=item.text;feed.hidden=false;form.querySelectorAll('input').forEach(x=>x.disabled=true);form.querySelector('button[type=submit]').disabled=true;feed.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
next.addEventListener('click',function(){part1.hidden=true;part2.hidden=false;step.textContent='PRACTICE 02 / 02';dots[0].classList.remove('on');dots[1].classList.add('on');part2.querySelector('h3').focus?.();});
const write=document.getElementById('handoff-write');const deb=document.getElementById('handoff-debrief');write.addEventListener('submit',function(event){event.preventDefault();if(!write.reportValidity())return;write.hidden=true;deb.hidden=false;});
document.getElementById('handoff-reset').addEventListener('click',function(){form.reset();write.reset();feed.hidden=true;deb.hidden=true;write.hidden=false;form.querySelectorAll('input').forEach(x=>x.disabled=false);form.querySelector('button[type=submit]').disabled=false;part2.hidden=true;part1.hidden=false;step.textContent='PRACTICE 01 / 02';dots[1].classList.remove('on');dots[0].classList.add('on');document.getElementById('demo-part-one').scrollIntoView({block:'start',behavior:'smooth'});});
const subject='FISCH | Interactive handoff demo inquiry';const body='Hi Patrick,\n\nI tried the FISCH fictional handoff demo.\n\nOur industry or company:\n\nThe real job skill or decision we need to improve:\n\nWho would use a practice tool like this:\n\nHow we measure good performance today:\n\nCould we discuss a pilot?\n\nName/contact:\n\nSource: fisch.life/demos/field-handoff/';
document.getElementById('demo-contact').href='mailto:hello@fisch.life?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
})();
