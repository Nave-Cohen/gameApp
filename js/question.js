var question;

(async function gen() {
  var question_div = document.getElementById('questionDiv');
  question = await callJson('generate_question');
  if (question == null) {
    call('view_timeline');
  }
  question_div.innerHTML = `
    <label for="questionDiv">${question.title}</label>
  `;
  for (let i = 1; i <= 4; i++) {
    question_div.innerHTML += `
      <button type="button" id="Option${i}" onclick="checkAnswer(this, ${question.correct})">${question["Option" + i]}</button>`;
  }
  document.querySelector(".progress").classList.toggle('d-none');
  document.querySelector(".finish-btn").classList.toggle('d-none');
})();

async function checkAnswer(btn, correct) {
  var correct_btn = document.getElementById('Option' + correct);
  var type;
  if (btn === correct_btn.id) {
    btn.style.backgroundColor = "green";
    type = "correct-answer";
  } else {
    btn.style.backgroundColor = "red";
    correct_btn.style.backgroundColor = "green";
    type = "wrong-answer";
  }
  await call('submit_question', question.title, question['Option' + correct], type);
  await sleep(1000);
  view_page('question');
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

(async function updateProgressBar() {
  var prog = await call('progress');
  var progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = prog + "%";
  progressBar.setAttribute("aria-valuenow", prog);
})();

function logout() {
  view_page('login');
  call('db.logout');
}

function end() {
  call('view_timeline');
}
