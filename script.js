'use strict';

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
const closeBtn = document.querySelector('.close-icon');
const overlay = document.querySelector('.overlay');

function clearInputFields() {
  username.value = '';
  password.value = '';
  confirm.value = '';
  email.value = '';

  const formControlElements = document.querySelectorAll('.form-control');
  formControlElements.forEach(element => {
    element.classList.remove('error', 'success');
  });
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  //   formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// function fieldName(input) {
//   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// }

function checkInputLength(input, min, max) {
  const fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  if (input.value.length < min) {
    showError(input, `${fieldName} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${fieldName} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}
function validationEmail(input) {
  const checkValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return checkValidation.test(input);
}

function checkEmail(input) {
  if (!validationEmail(input.value)) {
    showError(input, 'Email is not valid');
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPasswordMatch(inp1, inp2) {
  if (inp2.value === '' || inp2.value !== inp1.value) {
    showError(inp2, 'Password do not matches!');
    inp2.focus();
    return false;
  } else {
    showSuccess(inp2, 'Passwords are correct');
    return true;
  }
}
console.log('welcome');

function toggleWindow() {
  overlay.classList.toggle('hidden');
}

document.addEventListener('click', function (e) {
  const overlay = document.querySelector('.overlay');
  const isOverlayVisible = !overlay.classList.contains('hidden');
  const clickedOutsideOverlay = !e.target.closest('.overlay');

  if (isOverlayVisible && clickedOutsideOverlay) {
    toggleWindow();
  }
});

console.log('Welcome ');
closeBtn.addEventListener('click', toggleWindow);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Provera svih uslova

  const isUsernameLengthValid = checkInputLength(username, 3, 10);
  const isPasswordLengthValid = checkInputLength(password, 3, 10);
  const isEmailValid = checkEmail(email);
  const doPasswordsMatch = checkPasswordMatch(password, confirm);

  if (
    !isUsernameLengthValid ||
    !isEmailValid ||
    !isPasswordLengthValid ||
    !doPasswordsMatch
  ) {
    console.log('nesto ne stima');
  } else {
    toggleWindow();
    clearInputFields();
  }
});
