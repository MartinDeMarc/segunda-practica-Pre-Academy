let tl = gsap.timeline({ repeat: 0 });

tl.from(".img-fluid", {
  duration: 1,
  opacity: 0,
  scale: 0.3,
  ease: "power1",
});
tl.from(".bg-info", {
  duration: 1,
  opacity: 0,
  scale: 0.3,
  ease: "power1",
});

const feedback = document.getElementById("feedback");
let loginForm = document.getElementById("form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  console.log(username, password);

  let data = {
    mail: username,
    password: password,
  };

  fetch("https://api-auth-moby.herokuapp.com/api/user/login", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
      let resultCode = resJson.header.resultCode;

      if (resultCode === 0) {
        setTimeout(() => {
          window.location.href = "/views/characters.html";
          localStorage.setItem("userLogin", username);
        }, 1000);
        feedback.innerHTML = `<div class='alert alert-success py-1'>${resJson.header.message}</div>`;
      } else {
        setTimeout(() => {
          document.querySelector("#username").value = "";
          document.querySelector("#password").value = "";
          feedback.innerHTML = "";
        }, 1800);
        console.log("Error");
      }
    })
    .catch((error) => console.log(error));
});
