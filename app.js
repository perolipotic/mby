function autosize() {
  var el = this;
  setTimeout(function() {
    el.style.cssText = "height:auto; padding:0;";
    el.style.cssText = 'height:"" ;min-height:' + el.scrollHeight + "px; ";
  }, 10);
}

let textarea = document.querySelector("textarea");
textarea.style.height = "25px";
function checkIsEmpty() {
  if (textarea.value !== "") {
    document.querySelector("#message-fieldset").classList.add("is-focused");
    textarea.classList.add("is-focused");
  } else {
    textarea.classList.remove("is-focused");
    document.querySelector("#message-fieldset").classList.remove("is-focused");
    textarea.style.height = "0px";
    textarea.style.minHeight = "25px";
    textarea.style.transition = "all ease 0.3s";
  }
}

function param(object) {
  var encodedString = "";
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (encodedString.length > 0) {
        encodedString += "&";
      }
      encodedString += encodeURI(prop + "=" + object[prop]);
    }
  }
  return encodedString;
}

function showErrors(errors) {
  Object.keys(errors).forEach(field => {
    const errorNode = document.getElementById(field + "-error");

    if (errorNode) {
      errorNode.innerText = errors[field];
      errorNode.previousElementSibling.style.borderBottom = "1px solid red";
    }
  });
}

function hideErrors() {
  let errorFields = document.querySelectorAll(".form-error");
  console.log(errorFields);
  for (let i = 0; i < errorFields.length; i++) {
    errorFields[i].innerHTML = "";
  }
}

function makeNiceFieldName(field) {
  let name = "";

  for (let i = 0; i < field.length; i++) {
    if (i !== 0 && field[i] === field[i].toUpperCase()) {
      name += " " + field[i].toLowerCase();
    } else {
      name += field[i];
    }
  }

  return name;
}

function validateExistsString(prop, data, msg) {
  if (data[prop] && typeof data[prop] === "string" && data[prop].length) {
    return {};
  }

  return { [prop]: msg || "Please enter your " + makeNiceFieldName(prop) };
}

function validateEmail(prop, data, msg) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(data[prop])) {
    return {};
  }
  return {
    [prop]: msg || makeNiceFieldName(prop) + " should be a proper email"
  };
}

function formValidation(data) {
  const errors = Object.assign(
    {},
    validateExistsString(
      "message",
      data,
      "Molim vas recite nam više o vašem projektu"
    ),
    validateEmail("email", data),
    validateExistsString("firstName", data, "Molim vas unesite vaše ime"),
    validateExistsString("lastName", data, "Molim vas unesite vaše prezime"),
    validateExistsString("email", data, "Molim vas unesite vašu email adresu"),
    validateExistsString("company", data, "Molim vas unesite ime vaše tvrtke")
  );

  if (Object.keys(errors).length !== 0) {
    showErrors(errors);
    return false;
  }

  return true;
}

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    company: document.getElementById("company").value,
    message: document.getElementById("message").value
  };

  hideErrors();
  const validationPassed = formValidation(data);
  const captchaOK = grecaptcha.getResponse().length !== 0;

  if (validationPassed && captchaOK) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/form.php", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // xhr.onreadystatechange = function () {
    //   this.readyState;
    // }
    xhr.onload = function() {
      if (this.status === 200) {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("company").value = "";
        document.getElementById("message").value = "";
        document.getElementById("form").remove();
        document.getElementsByClassName("success")[0].style.display = "flex";
      } else {
      }
    };
    xhr.send(param(data));
  } else {
    /** There are errors or captcha is not okay */
    !validationPassed ? "" : alert('Please tick the "I\'m not a robot" box');
  }
});

document.getElementById("message").addEventListener("keydown", autosize);
window.addEventListener("keyup", checkIsEmpty, false);

var inputs = document.getElementsByTagName("input");

for (var i = 0; i < inputs.length; i++) {
  var input = inputs[i];
  input.addEventListener("input", function() {
    var isEmpty = this.value ? "is-empty" : "";
    if (isEmpty === "is-empty") {
      this.classList.add("is-empty");
      this.parentNode.style.borderBottom = "1px solid #00aeef";
    } else {
      this.classList.remove("is-empty");
      this.parentNode.style.borderBottom = "1px solid #e1e1e1";
    }
  });
}

var messages = document.getElementsByTagName("textarea");

for (var i = 0; i < messages.length; i++) {
  var message = messages[i];
  message.addEventListener("input", function() {
    var isEmpty = this.value ? "is-empty" : "";
    if (isEmpty === "is-empty") {
      this.classList.add("is-empty");
      this.parentNode.style.borderBottom = "1px solid #00aeef";
    } else {
      this.classList.remove("is-empty");
      this.parentNode.style.borderBottom = "1px solid #e1e1e1";
    }
  });
}
