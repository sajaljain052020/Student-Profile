document.querySelector(".student-form").style.backgroundColor = "orange";
const inputName = document.getElementById("inputName");
const inputPhone = document.getElementById("inputPhone");
const inputEmail = document.getElementById("inputEmail");
const inputSummary = document.getElementById("inputSummary");
const inputMovies = document.getElementById("inputMovies");
const inputDob = document.getElementById("inputDob");
const languages = document.getElementsByName("language");
const education = document.getElementsByName("education");

const btnSubmit = document.querySelector(".submitbtn");
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

let countError;

let elements = [
  inputName,
  inputPhone,
  inputEmail,
  inputSummary,
  inputMovies,
  inputDob,
];

// Removing data-bs-target from submit button
btnSubmit.removeAttribute("data-bs-target");
btnSubmit.removeAttribute("data-bs-toggle");

// Adding event listener on submit button
btnSubmit.addEventListener("click", function () {
  validateForm();
  blur();
});

function displayFormData() {
  document.querySelector(".dName").innerText = inputName.value;
  document.querySelector(".dNumber").innerText = inputPhone.value;
  document.querySelector(".dEmail").innerText = inputEmail.value;
  document.querySelector(".dSummary").innerText = inputSummary.value;
  document.querySelector(".dMovie").innerText = inputMovies.value;

  document.querySelector(".dDob").innerText = inputDob.value;

  education.forEach((ed) => {
    if (ed.checked) {
      document.querySelector(".dEducation").innerText = ed.value;
    }
  });

  let selectedLang = "";
  languages.forEach((lang) => {
    if (lang.checked) {
      selectedLang += lang.value + " ";
    }
  });
  document.querySelector(".dLang").innerText = selectedLang;
}
function errorMsg(element, msg) {
  countError++;
  msg = "\n" + msg[0].toUpperCase() + msg.slice(1);
  element.parentNode.lastElementChild.innerText = msg;
}
function removemsg(element) {
  element.parentNode.lastElementChild.innerText = "";
}

function blur() {
  elements.forEach((element) => {
    element.addEventListener("blur", validateForm);
  });
}

function validateForm() {
  countError = 0;
  elements.forEach((element) => {
    elName = element.name;
    if (element.value == "") {
      msg = `${elName} can't be empty`;
      errorMsg(element, msg);
    } else {
      removemsg(element);
    }
  });
  //Email Check
  if (!inputEmail.value.match(mailFormat)) {
    errorMsg(inputEmail, "Please enter valid email");
  } else {
    removemsg(inputEmail);
  }
  // Phone Number Check
  if (!inputPhone.value.match(phoneFormat)) {
    errorMsg(inputPhone, "Please enter valid phone number");
  } else {
    removemsg(inputPhone);
  }
  // For checkbox
  if (!languages[0].checked && !languages[1].checked) {
    console.log(languages[1].checked);
    errorMsg(languages[0], `Please select a language`);
  } else {
    removemsg(languages[0]);
  }
  //   For Radio Button
  if (!education[0].checked && !education[1].checked) {
    errorMsg(education[0], `Please select your education`);
  } else {
    removemsg(education[0]);
  }
  //   When there is no error, set data-bs-target to the submit button
  if (countError === 0) {
    displayFormData();
    btnSubmit.setAttribute("data-bs-target", "#exampleModal");
    btnSubmit.setAttribute("data-bs-toggle", "modal");
    return true;
  } else {
    btnSubmit.removeAttribute("data-bs-target", "#exampleModal");
    btnSubmit.removeAttribute("data-bs-toggle", "modal");
    return false;
  }
}
