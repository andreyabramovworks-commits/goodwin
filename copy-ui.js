/* Honest local form states: no transmission or simulated successful booking. */
(() => {
  const form=document.querySelector('[data-callback-form]');
  if(!form)return;
  const name=form.elements.name,phone=form.elements.phone;
  const summary=form.querySelector('.form-errors'),success=form.querySelector('.form-success');
  const choice=form.querySelector('[data-booking-choice]');
  function updateChoice(){
    const selected=form.querySelector('input[name=session]:checked');
    choice.textContent=selected?`Вы выбрали: ${selected.value}. Для подтверждения записи позвоните в клуб.`:'Выберите день здесь или в расписании выше.';
    success.hidden=true;
  }
  form.querySelector('[data-session-picker]').addEventListener('change',updateChoice);
  document.querySelectorAll('[data-scroll-form]').forEach(button=>button.addEventListener('click',updateChoice));
  [name,phone].forEach(field=>field.addEventListener('input',()=>{
    field.removeAttribute('aria-invalid');form.querySelector('#'+(field===name?'name':'phone')+'-error').hidden=true;
    summary.hidden=true;success.hidden=true;
  }));
  form.addEventListener('submit',event=>{
    event.preventDefault();success.hidden=true;
    const errors=[];
    if(!name.value.trim())errors.push({field:name,id:'name-error',text:'Укажите, как к вам обращаться.'});
    const digits=phone.value.replace(/\D/g,'');
    if(digits.length<10||digits.length>15)errors.push({field:phone,id:'phone-error',text:'Введите телефон с кодом страны: от 10 до 15 цифр.'});
    [name,phone].forEach(field=>field.removeAttribute('aria-invalid'));
    form.querySelectorAll('.field-error').forEach(el=>{el.hidden=true;});
    summary.replaceChildren();summary.hidden=!errors.length;
    if(errors.length){
      const title=document.createElement('p');title.textContent='Проверьте поля формы';summary.append(title);
      errors.forEach(error=>{
        error.field.setAttribute('aria-invalid','true');
        const message=form.querySelector('#'+error.id);message.textContent=error.text;message.hidden=false;
        const link=document.createElement('a');link.href='#'+error.field.id;link.textContent=error.text;link.addEventListener('click',e=>{e.preventDefault();error.field.focus();});summary.append(link);
      });
      summary.focus();return;
    }
    const selected=form.querySelector('input[name=session]:checked');
    success.textContent='Данные проверены'+(selected?`. Выбран день: ${selected.value}`:'')+'. Заявка не отправлена. Чтобы записаться, позвоните в клуб и согласуйте занятие.';
    success.hidden=false;success.tabIndex=-1;success.focus();
  });
})();
