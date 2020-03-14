const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

// Add success class to form-input and show success outline.
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-input success";
}

// Add error class to form-input and show error message.
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-input error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Email validation
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email not valid");
  }
}

// Get field name
function getFieldName(input) {
  return input.name;
}

// Check fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check password confirmation
function checkPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Event listeners
form.addEventListener("submit", function(e) {
  e.preventDefault();
  checkRequired([firstName, lastName, email, password, passwordConfirm]);
  checkLength(firstName, 2, 30);
  checkLength(lastName, 2, 30);
  checkLength(password, 8, 20);
  checkEmail(email);
  checkPasswords(password, passwordConfirm);
});
