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
