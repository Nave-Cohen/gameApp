(async function () {
  var list = document.getElementById('dropdown-list');
  var titles = await callJson('db.getAllTitles')
  titles.forEach(title => {
    let list_item = document.createElement('li')
    let escapedTitle = title.replace(/'/g, "\\'");
    list_item.innerHTML = `<button type="button" class="dropdown-item" onclick="button_clicked('${escapedTitle}')">${title}</button>`;
    list.appendChild(list_item)
  });
})()

async function button_clicked(title) {
  try {
    document.getElementById('question_div').remove()
  }
  catch {

  }
  var container = document.getElementById('main-container')
  var question_div = document.createElement('div')
  question_div.setAttribute('class', 'd-flex flex-column p-4 justify-content-center align-items-center')
  question_div.setAttribute('id', 'question_div')

  var question = await callJson('db.getQuestion', title)
  let title_input = document.createElement('input')
  title_input.setAttribute('type', 'input')
  title_input.setAttribute('id', 'title')
  title_input.setAttribute('class', 'form-control')
  title_input.value = question["title"]
  title_input.style = "width:680px;"

  var question_lbl = document.createElement('label')
  question_lbl.setAttribute('for', 'title')
  question_lbl.textContent = "Question:"


  var form_div = document.createElement('div');
  form_div.setAttribute('class', 'form-floating')
  form_div.appendChild(title_input)
  form_div.appendChild(question_lbl)
  question_div.appendChild(form_div)

  for (let i = 1; i <= 4; i++) {

    let answer_input = document.createElement('input')
    answer_input.setAttribute('type', 'input')
    answer_input.setAttribute('class', 'answers form-control')
    answer_input.setAttribute('id', 'Option' + i)
    answer_input.value = question["Option" + i]
    answer_input.setAttribute('oninput',`input_changed(${answer_input.id})`)
    answer_input.style = "width:680px;"

    var answer_lbl = document.createElement('label')
    answer_lbl.setAttribute('for', 'Option' + i)
    answer_lbl.textContent = "Answer" + i + ":"

    var form_div = document.createElement('div');
    form_div.setAttribute('class', 'form-floating')
    form_div.appendChild(answer_input)
    form_div.appendChild(answer_lbl)
    question_div.appendChild(form_div)
  }

  let select = document.createElement('select')
  select.setAttribute('id', 'correct')
  select.setAttribute('class', 'form-select')
  select.setAttribute('aria-label', 'Floating label select')
  select.style = "width:680px;"
  for (let i = 1; i <= 4; i++) {
    let option = document.createElement('option')
    option.setAttribute('id','option'+i)
    option.value = i
    option.textContent = question['Option'+i]
    select.appendChild(option)
  }

  var selectLabel = document.createElement('label')
  selectLabel.setAttribute('for', 'correct')
  selectLabel.textContent = "Correct Answer"

  var form_div = document.createElement('div');
  form_div.setAttribute('class', 'form-floating')
  form_div.appendChild(select)
  form_div.appendChild(selectLabel)
  question_div.appendChild(form_div)

  var submit_btn = document.createElement('button')
  submit_btn.setAttribute('type', 'button')
  submit_btn.setAttribute('id', 'submit_btn')
  submit_btn.setAttribute('class', 'btn btn-primary')
  submit_btn.setAttribute('onclick', 'update_question()')
  submit_btn.style.background = '#1d3557';
  submit_btn.style.color = 'white';
  submit_btn.textContent = 'Submit';

  question_div.appendChild(submit_btn)
  container.appendChild(question_div)
}
async function update_question() {
  var title = document.getElementById('title').value
  var answers = Array.from(document.getElementsByClassName('answers')).map(a => a.value);
  var correct = document.getElementById('correct').value
  call('db.update_question', title, answers, correct)
  document.getElementById('question_div').remove()
}
function input_changed(element){
var value = element.value
 document.getElementById(element.id.toLowerCase()).textContent = value
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
