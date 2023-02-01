const form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const street = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const cp = document.getElementById("zip").value;

  let data = {
    name: fullname,
    mail: email,
    password: password,
    address: {
      street: street,
      city: city,
      cp: cp,
    },
  };

  fetch("https://api-auth-moby.herokuapp.com/api/user/register", {
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
      let resultCode = resJson.header.resultCode;
      console.log(resultCode);
      if (resultCode === 0) {
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 600);
      } else {
        setTimeout(() => {
          console.log("error");
        }, 1600);
      }
    })
    .catch((error) => console.log(error));
});
