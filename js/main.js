async function show_question() {
  var question = await call('generate_question')
  console.log(question)
  view_page('question', {
    'title': question.title, 'question1': question.questions["answers"][0],
    'question2': question.questions["answers"][1],
    'question3': question.questions["answers"][2],
    'question4': question.questions["answers"][3]
  })
}
