async function login() {
  var username = document.getElementById("user-name").value;
  var password = document.getElementById("user-pass").value;

  var result = await call("db.login", username, password);
  if (!result) {
    document.getElementById("err-msg").innerText =
      "Username/Password are incorrect";
  } else {
    var user = await callJson("db.getUser");
    console.log(user);
    view_page("main", user);
  }
}
