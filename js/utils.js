async function call(function_name) {
  var outputObject;
  args = [...arguments].splice(1)
  var res = await google.colab.kernel.invokeFunction(function_name, args, {})
  if (res == null) { return }
  const outputString = res.data['text/plain'].trim();
  if (outputString === 'True') {
    outputObject = true;
  } else if (outputString === 'False') {
    outputObject = false;
  } else {
    try {
      outputObject = JSON.parse(outputString.split("'").join(''));
    } catch { return outputString }
  }
  return outputObject;
}
function view_page() {
  google.colab.kernel.invokeFunction('show_page', [...arguments], {})
}
