(async function getValues() {
  var results = await callJson('graph_values');
  var xValues = ["Wrong answers - "+results.wrong, "Correct answers - "+results.correct];
  var yValues = [results.wrong, results.correct];
  var barColors = ["red", "green"];

  new Chart("graph", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Graph results"
      }
    }
  });

})();

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
