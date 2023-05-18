var question
(async function gen() {
  var question_div = document.getElementById('questionDiv');
  question = await callJson('generate_question');

  const label = document.createElement('label');
  label.setAttribute('for', 'questionDiv');
  label.textContent = question.title;
  question_div.appendChild(label);
  for (i in [0, 1, 2, 3]) {
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', `Option${i}`)
    button.setAttribute('onclick', `checkAnswer(${button.id},${question.correct})`);
    button.textContent = `${question.answers[i]}`;
    question_div.appendChild(button);
  }
})();

async function checkAnswer(btn, correct) {
  var correct_btn = document.getElementById('Option' + correct)
  if (btn == correct_btn) {
    btn.style = "background-color:green";
    await call('submit_question',question['title'],question['answers'][question['correct']],true);
  }
  else {
    btn.style = "background-color:red";
    correct_btn.style = "background-color:green";
    await call('submit_question',question['title'],question['answers'][question['correct']],false);
  }
  await sleep(4000)
  view_page('question')
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
