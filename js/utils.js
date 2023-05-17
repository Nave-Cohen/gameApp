async function call(function_name) {
    args = [...arguments].splice(1)
    var res = await google.colab.kernel.invokeFunction(function_name, args, {})    
    if (res == null){return}
    if (res.data['text/plain'] == 'True') { return true }
    if (res.data['text/plain'] == 'False') { return false }
    return res.data
}
function view_page() {
    google.colab.kernel.invokeFunction('show_page', [...arguments], {})
}
