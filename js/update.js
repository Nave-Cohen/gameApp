(async function () {
    var list = document.getElementById('dropdown-list')
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
    title_input.value = title
    question_div.appendChild(title_input)

    for (let i = 1; i <= 4; i++) {
        let answer_input = document.createElement('input')
        answer_input.setAttribute('type', 'input')
        answer_input.setAttribute('class', 'answers')
        answer_input.value = question["Option" + i]
        question_div.appendChild(answer_input)
    }
    let correct_input = document.createElement('input')
    correct_input.setAttribute('type', 'input')
    correct_input.setAttribute('id', 'correct')
    correct_input.value = question["correct"]
    question_div.appendChild(correct_input)

    var submit_btn = document.createElement('button')
    submit_btn.setAttribute('type', 'button')
    submit_btn.setAttribute('id', 'submit_btn')
    submit_btn.setAttribute('class', 'btn btn-primary')
    submit_btn.setAttribute('onclick', 'update_question()')
    submit_btn.textContent = 'Submit'
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
