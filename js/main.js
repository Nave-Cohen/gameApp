(async function(){
  var result = await google.colab.kernel.invokeFunction('db.iAdmin', [], {})
  var res = result.data['text/plain'];
  document.getElementById('spinner').remove()
  if (res == 'True') {
    document.getElementById('admin-btn').classList.remove('d-none')
    document.getElementById('start-btn').classList.remove('d-none')
  } else {
    document.getElementById('start-btn').classList.remove('d-none')
  }
})()
