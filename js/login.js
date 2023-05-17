async function login() {
  var username = document.getElementById('user-name').value;
  var password = document.getElementById('user-pass').value;

  var result = await call('db.login', username, password)
  if (!result) {
    document.getElementById('err-msg').innerText = "Username/Password are incorrect";
  }
  else {
    var isAdmin = await call('db.isAdmin')
    options = {
      admin: isAdmin,
      name: username
    }
    view_page('main', options)
  }
}
