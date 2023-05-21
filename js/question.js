var question
(async function gen() {
  var question_div = document.getElementById('questionDiv');
  question = await callJson('generate_question');
  if (question == null){
    call('view_timeline')
  }
  const label = document.createElement('label');
  label.setAttribute('for', 'questionDiv');
  label.textContent = question.title;
  question_div.appendChild(label);
  for (i in [1, 2, 3, 4]) {
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', `Option${i}`)
    button.setAttribute('onclick', `checkAnswer(${button.id},${question.correct})`);
    button.textContent = `${question["Option"+i]}`;
    question_div.appendChild(button);
  }
})();

async function checkAnswer(btn, correct) {
  var correct_btn = document.getElementById('Option' + correct)
  if (btn == correct_btn) {
    btn.style = "background-color:green";
    await call('submit_question', question['title'], question['Option'+correct], true);
    await sleep(1000);
    view_page('answer', { "answer": 'Your answer is correct!' });
    await sleep(1000);
  }
  else {
    btn.style = "background-color:red";
    correct_btn.style = "background-color:green";
    await call('submit_question', question['title'], question['Option'+correct], false);
    await sleep(1000);
    view_page('answer', { "answer": 'Your answer is wrong!' });
    await sleep(1000);
  }

    
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


(async function updateProgressBar() {
  var prog = await call('progress');
  var progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = prog + "%";
  progressBar.setAttribute("aria-valuenow", prog);
})();
  
function logout() {
  view_page('login')
  call('db.logout')
}
function end() {
  call('view_timeline')
}
