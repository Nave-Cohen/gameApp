async function start() {
  call('clear')
  view_page('question')
}
function logout() {
  view_page('login')
  call('db.logout')
}
