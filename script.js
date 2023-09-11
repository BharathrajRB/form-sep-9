const userDataArray = []; // Array to store user data objects

function validateForm(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input');

  clearError();

  const userData = {};

  inputs.forEach(input => {
    const value = input.value.trim();
    const errorMessages = [];

    switch (input.id) {
      case 'name':
        if (value === '') {
          errorMessages.push('Name cannot be empty.');
        } else {
          userData.name = value;
        }
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
          errorMessages.push('Email cannot be empty.');
        } else if (!emailPattern.test(value)) {
          errorMessages.push('Invalid email format.');
        } else {
          userData.email = value;
        }
        break;

      case 'password':
        if (value === '') {
          errorMessages.push('Password cannot be empty.');
        } else if (value.length < 6) {
          errorMessages.push('Password must be at least 6 characters long.');
        } else if (!/[!]/.test(value) || !/[$]/.test(value)) { // Check for both ! and $
          errorMessages.push('Password must contain both ! and $.');
        } else {
          userData.password = value;
        }
        break;
    }

    if (errorMessages.length > 0) {
      showError(input, errorMessages);
    } else {
      showSuccess(input);
    }
  });

  const existingUser = userDataArray.find(user => user.email === userData.email);

  if (existingUser) {
    showError(document.getElementById('email'), ['User with this email already exists.']);
    return;
  }

  if (Object.keys(userData).length === 3) {
    userDataArray.push(userData);
    console.log(userDataArray);

    document.getElementById('successMessage').textContent = 'Registration successful!';
    document.getElementById('successMessage').style.display = 'block';
    setTimeout(function () {
      document.getElementById('successMessage').style.display = 'none';
    }, 1000);
  }
}

//error msg
function showError(input, messages) {
  input.classList.remove('success');
  input.classList.add('error');

  const errorMessage = document.getElementById(`${input.id}Error`);
  errorMessage.innerHTML = messages.join('<br>');
}
//add class name

function showSuccess(input) {
  input.classList.remove('error');
  input.classList.add('success');
}

function clearError() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.innerHTML = '';
  });
}

function clearFieldStyles(event) {
  const input = event.target;
  input.classList.remove('error');
  input.classList.remove('success');

  const errorElement = document.getElementById(`${input.id}Error`);
  errorElement.innerHTML = '';
}
function toggleSections() {
  const registrationFields = document.getElementById('registrationFields');
  const loginFields = document.getElementById('loginFields');

  registrationFields.style.display = 'none';
  loginFields.style.display = 'block';
}
//it check the userobj with the login field
function performLogin() {
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');

  const user = userDataArray.find(user => user.email === loginEmail.value && user.password === loginPassword.value);

  const loginMessage = document.getElementById('loginMessage');
  const loginEmailError = document.getElementById('loginEmailError');
  const loginPasswordError = document.getElementById('loginPasswordError');

  loginEmailError.textContent = '';
  loginPasswordError.textContent = '';

  loginEmail.classList.remove('error');
  loginPassword.classList.remove('error');

  if (user) {
    loginMessage.textContent = 'Login successful!';
    loginMessage.style.color = 'green';
  } else {
    if (loginEmail.value.trim() === '') {
      loginEmailError.textContent = 'Email cannot be empty.';
      loginEmail.classList.add('error');
    }

    if (loginPassword.value.trim() === '') {
      loginPasswordError.textContent = 'Password cannot be empty.';
      loginPassword.classList.add('error');
    }

    if (loginEmail.value.trim() !== '' && loginPassword.value.trim() !== '') {
      loginEmailError.textContent = 'Invalid email or password.';
      loginPasswordError.textContent = 'Invalid email or password.';

      loginEmail.classList.add('error');
      loginPassword.classList.add('error');
    }

    loginMessage.textContent = '';
  }
}



function checkExistingUser(event) {
  const input = event.target;
  const value = input.value.trim();
  const emailError = document.getElementById('emailError');
  const existingUser = userDataArray.find(user => user.email === value);

  if (existingUser) {
    showError(input, ['User with this email already exists.']);
  } else {
    emailError.innerHTML = '';
  }
}
function performtogle2() {
  const registrationFields = document.getElementById('registrationFields');
  const loginFields = document.getElementById('loginFields');
  loginFields.style.display = 'none';
  registrationFields.style.display = 'block';

}
