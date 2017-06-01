// Make a collection of months according to the range
var startDate = moment().subtract(11, 'months').set('date', 15);
var endDate = moment().add(13, 'months').set('date', 15);

var dates = [];

var month = moment(startDate);

while( month < endDate ) {
  dates.push({start: month.format('YYYY-MM-DD')});
  month.add(1, "month");
}

// Move the timeline
function move (percentage) {
  var range = timeline.getWindow();
  var interval = range.end - range.start;

  timeline.setWindow({
    start: range.start.valueOf() - interval * percentage,
    end:   range.end.valueOf()   - interval * percentage
  });
}

// Timeline opts
var options = {
  margin: {
    axis: 10,
    item: {
      vertical: 10
    }
  },
  width: '100%',
  zoomable: false,
  selectable: true,
  multiselect: true,
  horizontalScroll: true,
  type: 'point',
  timeAxis: {scale: 'month'},
  min: moment().subtract(12, 'months').set('date', 25), // Demo purposes
  max: moment().add(14, 'months').set('date', 1) // Demo purposes
};

// Create the timeline
var container = document.getElementById('mytimeline');
timeline = new vis.Timeline(container, new vis.DataSet(dates), options);

// Events
timeline.on('select', function (properties) {
  console.log('---ON CHANGE---');
  console.log(properties.items);
});

document.getElementById('moveLeft').onclick  = function () {
  move(0.4);
};

document.getElementById('moveRight').onclick = function () {
  move(-0.4);
};

// Just for demo purposes.
timeline.setWindow('2017-01-1', '2017-12-30');
