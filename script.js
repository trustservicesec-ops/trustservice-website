const root=document.documentElement;
const langBtn=document.getElementById('lang');
function setLanguage(language){
 const ar=language!=='en';
 const enSeo={
  'index.html':['Security Guard Company in Egypt | Trust Service','Trust Service provides professional security guarding for factories, warehouses and businesses in Egypt, plus CCTV and commercial cleaning.'],
  'about.html':['About Us | Trust Service Egypt','Learn about Trust Service, an Egyptian security guarding company with over 20 years of experience.'],
  'security.html':['Security Guard Services for Factories & Businesses | Trust Service','Security guards for factories, warehouses, construction sites, businesses and properties in Egypt. Request a quote from Trust Service.'],
  'cctv.html':['CCTV Camera Supply & Installation in Egypt | Trust Service','CCTV security camera supply and installation for businesses and facilities in Egypt. Contact Trust Service for a quote.'],
  'facility.html':['Commercial Cleaning Services in Egypt | Trust Service','Periodic cleaning services for offices, factories and commercial premises in Egypt. Request a cleaning quote.'],
  'contact.html':['Contact Trust Service | Request a Security Quote','Contact Trust Service to request a quotation for security guards, CCTV cameras or commercial cleaning.']
 };
 const page=location.pathname.split('/').pop()||'index.html';
 const metaDescription=document.querySelector('meta[name="description"]');
 if(!window.__trustArSeo){window.__trustArSeo={title:document.title,description:metaDescription?.content||''};}
 if(!ar&&enSeo[page]){document.title=enSeo[page][0];if(metaDescription)metaDescription.content=enSeo[page][1];}
 else {document.title=window.__trustArSeo.title;if(metaDescription)metaDescription.content=window.__trustArSeo.description;}
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
