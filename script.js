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
const menu=document.getElementById('menu');
const nav=document.querySelector('.nav');
if(menu&&nav){
 menu.addEventListener('click',()=>{let opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
}));
// Resolve page links relative to this site's directory, including GitHub Pages subpaths.
// A delegated handler also makes navigation reliable on mobile touch browsers.
nav.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link)return;
  const href=link.getAttribute('href');
  if(!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/i.test(href))return;
  event.preventDefault();
  window.location.assign(new URL(href,document.baseURI).href);
});
}
