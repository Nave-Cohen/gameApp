google.colab.kernel.invokeFunction('db.iAdmin', [], {}).then(function (result) {
  var res = result.data['text/plain'];
  if (res == 'True') {
    document.getElementById('admin-btn').classList.remove('d-none')
  }
}
).then(() => { document.getElementById('spinner').classList.add('d-none') })
