document.querySelectorAll('form[data-formspree]').forEach(form=>{
  const button=form.querySelector('button[type="submit"]');
  const status=form.querySelector('.form-status');
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const isArabic=document.documentElement.lang==='ar';
    const original=button.textContent;
    button.disabled=true;
    button.textContent=isArabic?'جارٍ الإرسال…':'Sending…';
    status.className='form-status';
    status.textContent='';
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      if(!response.ok)throw new Error('Submission rejected');
      form.reset();
      status.classList.add('success');
      status.textContent=isArabic?'تم استلام طلبك بنجاح. شكراً لتواصلك مع ترست سيرفيس، وسيتواصل معك فريقنا في أقرب وقت.':'Your request was submitted successfully. Thank you for contacting Trust Service. Our team will get back to you soon.';
    }catch(error){
      status.classList.add('error');
      status.textContent=isArabic?'تعذر إرسال الطلب الآن. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.':'Your request could not be sent. Please try again or contact us via WhatsApp.';
    }finally{
      button.disabled=false;
      button.textContent=button.dataset[isArabic?'ar':'en']||original;
    }
  });
});
