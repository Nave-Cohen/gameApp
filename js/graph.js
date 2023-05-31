(async function getValues() {
  var xValues = ["Wrong answers", "Correct answers"];
  var results = await callJson('graph_values');
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
