async function addQuestion() {

  var question = document.getElementById('question').value;

  var opt1 = document.getElementById('answer1').value;
  var opt2 = document.getElementById('answer2').value;
  var opt3 = document.getElementById('answer3').value;
  var opt4 = document.getElementById('answer4').value;


  var correct = document.getElementById('correct').value;

  var data = { 'title': question, 'Option1': opt1, 'Option2': opt2, 'Option3': opt3, 'Option4': opt4, 'correct': correct };

  var result = await call('db.addQuest', data)
  if (result == true) {
    var msg = document.createElement("p");
    msg.id = "msg";
    msg.className = "text-center";
    msg.style.color = "green";
    msg.textContent = "Answer added successfully";
    document.querySelector('#main-container').appendChild(msg);
  }
}
async function back() {
  await call('clear')
  var isAdmin = await call('db.isAdmin')
  var username = await call('db.getUserName')
  options = {
    admin: isAdmin,
    name: username
  }
  view_page('main', options)
}
