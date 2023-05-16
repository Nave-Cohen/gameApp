function login() {
    // Get the values from input fields
    var username = document.getElementById('user-name').value;
    var password = document.getElementById('user-pass').value;

    // Call the Python function with the parameters
    google.colab.kernel.invokeFunction('db.login', [username, password, true], {}).then(function (result) {
        var res = result.data['text/plain'];
        if (res == 'False') {
            document.getElementById('err-msg').innerText = "Username/Password are incorect";
        }
        else {
            console.log("wrong")
        }
    });
}
