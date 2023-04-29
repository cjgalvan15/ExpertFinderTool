/*global document*/

var submitButton;
var usernameInput;
var passwordInput;
var rememberMeCheckbox;

// select the submit button
submitButton = document.querySelector('.submit-login');

// add event listener to the submit button
submitButton.addEventListener('click', redirectToDashboard);

// select the input fields
usernameInput = document.querySelector('input[type="text"]');
passwordInput = document.querySelector('input[type="password"]');
rememberMeCheckbox = document.querySelector('input[type="checkbox"]');


// function to redirect to the dashboard page
function redirectToDashboard(event) {
   // verify the inputs
  if (usernameInput.value === "hannah.santos@neu.edu.ph" && passwordInput.value === "18-12354-651"||
     usernameInput.value === "aljohn.torre@neu.edu.ph" && passwordInput.value === "20-12395-785"||
     usernameInput.value === "juan.miguel@neu.edu.ph" && passwordInput.value === "21-16848-849"||
     usernameInput.value === "jasmine.lopez@neu.edu.ph" && passwordInput.value === "19-11156-651"||
     usernameInput.value === "robert.ampatuan@neu.edu.ph" && passwordInput.value === "16-56488-531 ") {
    // prevent the form from submitting and redirect to the dashboard page
    event.preventDefault();
    const rememberMe = rememberMeCheckbox.checked;
    if (rememberMe) {
      localStorage.setItem('username', usernameInput.value);
      localStorage.setItem('password', passwordInput.value);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
    window.location.href = 'http://localhost:5500/public/Dashboard2/expertDashboard.html';
  } else {
    // apply red border on false input
    if (usernameInput.value !== "username") { 
      usernameInput.style.border = "1px solid red";
    }
    if (passwordInput.value !== "123") {
      passwordInput.style.border = "1px solid red";
    }
    // prevent the form from submitting and staying on the same page
    event.preventDefault();
  }
}

// remove the red border on input change
usernameInput.addEventListener('input', removeRedBorder);
passwordInput.addEventListener('input', removeRedBorder);

function removeRedBorder() {
  this.style.border = "none";
}

// fill in username and password from localStorage on page load
window.addEventListener('load', () => {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');
  if (savedUsername && savedPassword) {
    usernameInput.value = savedUsername;
    passwordInput.value = savedPassword;
    rememberMeCheckbox.checked = true;
  }
});


export function printConsole()
{
  console.log("You accessed exported function :3");
}

