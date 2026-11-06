(function(){
'use strict';
var menu=document.getElementById('site-nav'),btn=document.getElementById('menu-toggle');
function close(){if(!menu||!btn)return;menu.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu'}
if(menu&&btn){btn.addEventListener('click',function(){var open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'Close':'Menu'});document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});window.addEventListener('scroll',close,{passive:true});menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close)})}
var list=document.getElementById('resource-list');
if(list){
 fetch('/content/resources.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('resources');return r.json()}).then(function(items){list.innerHTML='';var active=items.filter(function(x){return x.status==='published'});if(!active.length){list.textContent='More resources on the way.';return}active.forEach(function(x){if(!x.title||!x.url)return;var article=document.createElement('article');var tag=document.createElement('span');tag.className='tag';tag.textContent=x.type||'Resource';article.append(tag);var heading=document.createElement('h3');heading.textContent=x.title;article.append(heading);var desc=document.createElement('p');desc.textContent=x.description||'';article.append(desc);var a=document.createElement('a');a.href=x.url;a.textContent='Explore resource →';article.append(a);list.append(article)})}).catch(function(){/* retain static fallback */});
}
var form=document.getElementById('system-check');
if(form){form.addEventListener('submit',function(e){e.preventDefault();var data=new FormData(form);var result=document.getElementById('system-result');var choice=data.get('problem');var title='',detail='';if(choice==='know'){title='Capture the expertise.';detail='Start with a real example of the work, then document decisions, exceptions, and a simple reusable guide.'}else if(choice==='practice'){title='Build practice, not another lecture.';detail='Use short scenario attempts, actionable feedback, and manager observation to improve on-the-job judgment.'}else if(choice==='adoption'){title='Fix the workflow.';detail='Place a prompt or checklist at the moment of action, reinforce it, and observe whether behavior changes.'}else if(choice==='repeat'){title='Automate the repeatable part.';detail='Define a clear trigger, standard decision, human approval points, and one measure of whether the process improves.'}else{return}result.querySelector('h3').textContent=title;result.querySelector('p').textContent=detail;var issueText=({know:'People keep asking the same expert',practice:'People know the steps but struggle in real situations',adoption:'People completed training but still use the old process',repeat:'The task is predictable but too manual'})[choice]||'A performance problem';
var emailBody='Hi Patrick,\n\nI used the FISCH decision tool.\n\nMy answer: '+issueText+'\n\nThe suggestion I received: '+title+'\n\nThe specific work or process:\n\nWhat we have tried:\n\nWhat success would look like:\n\nCompany / contact:\n\nSource: fisch.life/resources/decision-tool/\n';
var replyLink=result.querySelector('a.btn');
if(replyLink){replyLink.href='mailto:hello@fisch.life?subject='+encodeURIComponent('FISCH | Decision Tool — '+issueText)+'&body='+encodeURIComponent(emailBody)}
result.classList.add('show');result.scrollIntoView({behavior:'smooth',block:'nearest'})})}
})();

/* Intentional motion: reveals and mouse-follow spotlights, without a framework. */
(function(){
'use strict';
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced&&'IntersectionObserver' in window){
 var elements=[].slice.call(document.querySelectorAll('main .section,main .band,main .transformation,main .proof,main .demo-stage'));
 elements.forEach(function(el){el.setAttribute('data-reveal','')});
 var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}})},{rootMargin:'0px 0px 60px 0px',threshold:0.06});
 elements.forEach(function(el){observer.observe(el)});
 document.documentElement.classList.add('motion-ready');
}
if(window.matchMedia&&window.matchMedia('(pointer:fine)').matches){
 document.querySelectorAll('.trans-panel,.demo-interaction,.readiness-score').forEach(function(el){
 el.addEventListener('pointermove',function(ev){var rect=el.getBoundingClientRect();el.style.setProperty('--pointer-x',(ev.clientX-rect.left)+'px');el.style.setProperty('--pointer-y',(ev.clientY-rect.top)+'px')},{passive:true});
 });
}
})();
