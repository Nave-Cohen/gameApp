async function call(function_name) {
  args = [...arguments].splice(1)
  var res = await google.colab.kernel.invokeFunction(function_name, args, {})
  if (res == null) { return }
  const outputString = res.data['text/plain'].split("'").join("").trim();
  if (outputString === 'True') {
    return true;
  } else if (outputString === 'False') {
    return false;
  } else if (outputString === 'None'){
    return null;
   }
  return outputString;
}
async function callJson(function_name, ...args) {
    var res = await google.colab.kernel.invokeFunction(function_name, args, {})
    return res.data["application/json"]
}
function view_page() {
  google.colab.kernel.invokeFunction('show_page', [...arguments], {})
}
