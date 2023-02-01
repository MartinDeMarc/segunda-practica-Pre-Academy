let tl = gsap.timeline({ repeat: 0 });

tl.from(".bg-info", {
  duration: 2,
  opacity: 0,
  scale: 0.3,
  ease: "power1",
});

const form = document.getElementById("formulario");
const allInputs = document.querySelectorAll("#formulario input");

const regex = {
  name: /^[a-zA-ZÀ-ÿ\s]{5,15}$/, // Letras y espacios, pueden llevar acentos.
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/, // 8 a 30 digitos.
  repeatpassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/, // 4 a 12 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,15}$/, // 7 a 15 numeros.
  city: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  zip: /^\d{4,4}$/,
  address: /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
};

const validateForm = (e) => {
  switch (e.target.name) {
    case "fullname":
      if (regex.name.test(e.target.value)) {
        document
          .getElementById("errorMessage")
          .classList.remove("errorMessage_activo");
        document
          .getElementById("correctMessage")
          .classList.add("correctMessage_activo");
      } else {
        document
          .getElementById("errorMessage")
          .classList.add("errorMessage_activo");
        document
          .getElementById("correctMessage")
          .classList.remove("correctMessage_activo");
      }
      break;
    case "email":
      if (regex.email.test(e.target.value)) {
        document
          .getElementById("emailError")
          .classList.remove("emailError_activo");
        document
          .getElementById("emailCorrect")
          .classList.add("emailCorrect_activo");
      } else {
        document
          .getElementById("emailError")
          .classList.add("emailError_activo");
        document
          .getElementById("emailCorrect")
          .classList.remove("emailCorrect_activo");
      }
      break;
    case "password":
      if (regex.password.test(e.target.value)) {
        document.getElementById("pwError").classList.remove("pwError_activo");
        document.getElementById("pwCorrect").classList.add("pwCorrect_activo");
      } else {
        document.getElementById("pwError").classList.add("pwError_activo");
        document
          .getElementById("pwCorrect")
          .classList.remove("pwCorrect_activo");
      }
      break;
    case "repeatpassword":
      if (regex.repeatpassword.test(e.target.value)) {
        document.getElementById("pw2Error").classList.remove("pw2Error_activo");
        document
          .getElementById("pw2Correct")
          .classList.add("pw2Correct_activo");
      } else {
        document.getElementById("pw2Error").classList.add("pw2Error_activo");
        document
          .getElementById("pw2Correct")
          .classList.remove("pw2Correct_activo");
      }
      break;
    case "address":
      if (regex.address.test(e.target.value)) {
        document
          .getElementById("addressError")
          .classList.remove("addressError_activo");
        document
          .getElementById("addressCorrect")
          .classList.add("addressCorrect_activo");
      } else {
        document
          .getElementById("addressError")
          .classList.add("addressError_activo");
        document
          .getElementById("addressCorrect")
          .classList.remove("addressCorrect_activo");
      }
      break;
    case "city":
      if (regex.city.test(e.target.value)) {
        document
          .getElementById("cityError")
          .classList.remove("cityError_activo");
        document
          .getElementById("cityCorrect")
          .classList.add("cityCorrect_activo");
      } else {
        document.getElementById("cityError").classList.add("cityError_activo");
        document
          .getElementById("cityCorrect")
          .classList.remove("cityCorrect_activo");
      }
      break;
    case "states":
      break;
    case "zip":
      if (regex.zip.test(e.target.value)) {
        document.getElementById("zipError").classList.remove("zipError_activo");
        document
          .getElementById("zipCorrect")
          .classList.add("zipCorrect_activo");
      } else {
        document.getElementById("zipError").classList.add("zipError_activo");
        document
          .getElementById("zipCorrect")
          .classList.remove("zipCorrect_activo");
      }
      break;
  }
};

allInputs.forEach((input) => {
  input.addEventListener("keyup", validateForm);
  input.addEventListener("blur", validateForm);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
