const root=document.documentElement;
const langBtn=document.getElementById('lang');
function setLanguage(language){
 const ar=language!=='en';
 root.lang=ar?'ar':'en';
 root.dir=ar?'rtl':'ltr';
 document.querySelectorAll('[data-ar]').forEach(el=>{
   el.innerHTML=el.dataset[ar?'ar':'en'];
 });
 if(langBtn)langBtn.textContent=ar?'EN 🌐':'عربي 🌐';
 try{localStorage.setItem('trustServiceLanguage',root.lang);}catch(e){}
 document.querySelectorAll('a[href]').forEach(a=>{
   const href=a.getAttribute('href');
   if(!href||href.startsWith('#')||/^(https?:|mailto:|tel:|javascript:)/i.test(href))return;
   const match=href.match(/^([^?#]+\.html)(\?[^#]*)?(#.*)?$/i);
   if(!match)return;
   const params=new URLSearchParams((match[2]||'').replace(/^\?/,''));
   params.set('lang',root.lang);
   a.setAttribute('href',match[1]+'?'+params.toString()+(match[3]||''));
 });
}
let requestedLanguage=new URLSearchParams(window.location.search).get('lang');
if(requestedLanguage!=='en'&&requestedLanguage!=='ar'){
 try{requestedLanguage=localStorage.getItem('trustServiceLanguage')}catch(e){}
}
setLanguage(requestedLanguage==='en'?'en':'ar');
if(langBtn)langBtn.addEventListener('click',()=>setLanguage(root.lang==='ar'?'en':'ar'));
// Mobile menu: keep navigation native. Do not intercept page-link clicks.
// Native anchors are more reliable across mobile browsers and GitHub Pages.
const menu=document.getElementById('menu');
const nav=document.querySelector('.nav');
if(menu&&nav){
 menu.addEventListener('click',()=>{
  const opened=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(opened));
 });
 nav.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click',()=>{
   nav.classList.remove('open');
   menu.setAttribute('aria-expanded','false');
  });
 });
}
