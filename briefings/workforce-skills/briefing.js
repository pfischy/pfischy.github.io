(function(){
'use strict';
const f=document.getElementById('readiness-check');if(!f)return;
const boxes=[...f.querySelectorAll('input[type=checkbox]')];
const count=document.getElementById('readiness-count');
const bar=document.getElementById('readiness-progress');
const message=document.getElementById('readiness-message');
const messages=[
'Start with the behavior: what must someone actually do better?',
'A clear job behavior is a useful start. Next, build a realistic attempt.',
'You have practice. Make the next correct action easier in the workflow.',
'Now put a manager or team lead in the reinforcement loop.',
'Almost there. Define what evidence will count as improvement.',
'You have the ingredients of a testable skills-development plan. Now validate them with people doing the work.'
];
function update(){const n=boxes.filter(x=>x.checked).length;count.textContent=String(n);bar.style.width=(n*20)+'%';message.textContent=messages[n];}
f.addEventListener('change',update);update();
const email='Hi Patrick,\n\nI saw the FISCH workforce skills briefing and would like to discuss a session for our group.\n\nOrganization / event:\n\nLocation (Helena / elsewhere / virtual):\n\nAudience and estimated size:\n\nKey skills or business challenges:\n\nPossible date/timeframe:\n\nOrganizer name and contact:\n\nSource: fisch.life/briefings/workforce-skills/\n';
document.getElementById('speaker-inquiry').href='mailto:hello@fisch.life?subject='+encodeURIComponent('FISCH | Workforce skills speaking inquiry')+'&body='+encodeURIComponent(email);
})();