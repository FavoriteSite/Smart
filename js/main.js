// ссылки при нажатии на которые открывается попап с таким классом
const popupLinks = document.querySelectorAll('.popup-link');
//  тег body для блокировки скролла при открытом попапе
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener("click", function (e) {
      popupCloseIcon(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

// получаем открытый попап и если он существует, его закрываем и у боди блокируем скролл
// далее попап, который передали (curentPopup) открываем и вешаем собитие при клике, чтобы закрылся попап только на темную область
//   if (!e.target.closest('.popup__content')) - если при клике на что-то у родителя нет такого класса т.е. это оболочка
// при клике на которую он заркывается 
// если я нажму на обект у которого есть родитель с клаасом .popup__content, то он не закроется, потому что стоит !знак НЕ
//  то есть закроется при нажатие на блоки с классами .popup__body и  .popup
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// высчитывание ширины скролла, чтобы его скрывать при открытии попапа
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  console.log(lockPaddingValue);
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

//  закрытие по esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});




//открытие меню
const menuButton = document.querySelector('.catalog__but');
menuButton.addEventListener('click', schowMenu);
function schowMenu(e) {
  const menuBut = e.currentTarget;
  menuBut.classList.toggle('schow');
}

sumProduct();
function sumProduct() {
  let sum = 0;
  const orders = document.querySelectorAll('.chart__summa');

  if (orders.length == 0) {
    const sumOrder = document.querySelector('.decoration__summa-order');
    let sumOrderInner = sumOrder.innerHTML;
    sumOrder.innerHTML = "0";
    let b = 0;
    // sumTotal(b);
  }


  if (orders.length > 0) {
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      let orderInner = Number(order.textContent);
      sum += +orderInner;
      const sumOrder = document.querySelector('.decoration__summa-order');
      sumOrder.innerHTML = sum;
      let b = Number(sum);
      // sumTotal(b);
    }
  }
}


//chart
const removeTovars = document.querySelectorAll('.chart__remove[data-rem]');

for (let i = 0; i < removeTovars.length; i++) {
  const removeTovar = removeTovars[i];
  removeTovar.addEventListener("click", remElement);
}
function remElement(e) {
  const remEl = e.target;
  console.log(remEl);
  if (remEl.dataset.rem && document.querySelector(remEl.dataset.rem)) {
    const block = document.querySelector(remEl.dataset.rem);
    console.log(block);
    block.remove();
    sumProduct();
  }
}




//form

const radItems = document.querySelectorAll('.decoration__input-radio');
for (let i = 0; i < radItems.length; i++) {
  const radItem = radItems[i];
  radItem.addEventListener("click", sumForm);
}

function sumForm(e) {
  const input = e.target;

  const summaOk = document.querySelector('.decoration__summa-ok');

  let summa = summaOk.value;

  if (input.hasAttribute('one')) {
    summaOk.innerHTML = "0";
    let a = 0;
    // sumTotal(a);
  }
  if (input.hasAttribute('two')) {
    summaOk.innerHTML = "500";
    let a = 500;
    // sumTotal(a);
  }
  if (input.hasAttribute('three')) {
    summaOk.innerHTML = "300";
    let a = 300;
    // sumTotal(a);
  }
}





//total
// sumTotal();
// function sumTotal(a, b) {
//   const total = document.querySelector('.decoration__summa-total');
//   const totalValue = total.innerHTML;
//   let sumTotal = a + b;
//   total.innerHTML = sumTotal;
// }



//проверка формы


// получаем форму по имени
// const mainForm = document.forms.main;

// const inputText = mainForm.name;

// const inputEmail = mainForm.email;

// // const inputPhone = mainForm.phone;

// const inputRadio = mainForm.gender;  // это поле, не значени. Проверяем 1 поле или 2 на checked

// const imputAddress = mainForm.address;

// // *получаем  поле для вывода ошибки
// const fError = document.querySelector('.error');


// mainForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   let inputTextValue = inputText.value;
//   let inputRadioValue = inputRadio.value;
//   let imputAddressValue = imputAddress.value;
//   let testEmail = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
//   let testPhone = /[0-9]/;
//   let file = "";


//   if (inputTextValue == "" || inputTextValue.length <= 2) {
//     inputName.value = "Ошибка";
//     inputName.classList.add('_error');
//   }
//   if (!testEmail.test(inputEmailValue)) {
//     inputEmail.value = "Ошибка";
//     inputEmail.classList.add('_error');
//   }
//   if (!testPhone.test(inputPhoneValue) || inputPhoneValue.length <= 6) {
//     inputPhone.value = "Ошибка";
//     inputPhone.classList.add('_error');
//   }
//   if (imputAddressValue == "" || imputAddressValue.length <= 2) {
//     imputAddressValue.value = "Ошибка";
//     inputName.classList.add('_error');
//   }


//   if (em == '') {
//     file = "Введите правильный email";
//   }


//   if (file != "") {
//     fError.innerHTML = file;
//   }
// });


// const mainForm = document.forms.main;
// console.log(mainForm);

// const focus = document.querySelectorAll('.main-form__input[data-focus]');
// if (focus.length > 0) {
//   for (let i = 0; i < focus.length; i++) {
//     const inputNum = focus[i];
//     const inputPlasceholder = inputNum.placeholder;
//     inputNum.addEventListener('focus', function (e) {
//       inputNum.placeholder = "";
//     });
//     inputNum.addEventListener('blur', function (e) {
//       inputNum.placeholder = inputPlasceholder;
//     });
//   };
// }
const mainForm = document.forms.main;
const inputName = mainForm.name;
const inputPhone = mainForm.phone;
const inputEmail = mainForm.email;
const inputAddress = mainForm.address;
let testEmail = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
let testPhone = /[0-9]/;
mainForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let inputNameValue = inputName.value;
  let inputPhoneValue = inputPhone.value;
  let inputEmailValue = inputEmail.value;
  let inputAddressValue = inputAddress.value;

  if (inputNameValue == "" || inputNameValue.length <= 2) {
    inputName.value = "Ошибка";
    inputName.classList.add('_error');
  }
  if (!testPhone.test(inputPhoneValue) || inputPhoneValue.length <= 6) {
    inputPhone.value = "Ошибка";
    inputPhone.classList.add('_error');
  }
  if (!testEmail.test(inputEmailValue)) {
    inputEmail.value = "Ошибка";
    inputEmail.classList.add('_error');
  }
  if (inputAddressValue == "" || inputAddressValue.length <= 2) {
    inputAddress.value = "Ошибка";
    inputAddress.classList.add('_error');
  }

  const inputs = document.querySelectorAll('.decoration__input');
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input.classList.contains("_error")) {
        input.addEventListener('click', inputUpdete)
      }
    };
  }
  function inputUpdete(e) {
    const inputItem = e.target;
    inputItem.value = "";
    inputItem.classList.remove('_error');
  }
});






