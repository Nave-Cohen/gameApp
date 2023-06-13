async function back() {
  await call('clear')
    var user = await callJson("db.getUser");
    console.log(user);
    view_page("main", user);
}
