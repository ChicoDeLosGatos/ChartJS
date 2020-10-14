function ChartJS_Dataset(_label_array, _data_array, _bgcolor_array, _color_array){
  this.label = (_label_array) ? _label_array : null;
  this.data =  (_data_array) ? _data_array : null;
  this.backgroundColor = (_bgcolor_array) ? _bgcolor_array : null;
  this.borderColor = (_color_array) ? _color_array : null;
  this.dataSet = [];
  for(var x = 0; x < this.data.length; x++)
  {
    var item = {
      label: this.label[x],
      data: this.data[x],
      backgroundColor: this.backgroundColor[x],
      borderColor: this.borderColor[x],
      borderWidth: 1
    }
    this.dataSet.push(item);
  }
}

ChartJS_Dataset.prototype.addItem = function (_label, _data, _bgcolor, _color) {
  var item = {
      label: _label,
      data: _data,
      backgroundColor: _bgcolor,
      borderColor: _color,
      borderWidth: 1
    };
    this.dataSet.push(item);
}

ChartJS_Dataset.prototype.removeItem = function (_label) {
  var aux = this.dataSet;
  this.dataSet = [];
  aux.forEach(ds => {
    if(!ds.label == _label) this.dataSet.push(ds);
  });
}

ChartJS_Dataset.prototype.getDataSet = function () {
  return this.dataSet;
}


function ChartJS(_target, _type, _labels, _datasets, _options){
  this.element = document.getElementById(_target).getContext('2d');
  this.type = _type;
  this.labels = _labels;
  this.datasets = _datasets.getDataSet();
  this.options = (_options) ? (_options) : {
    scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }]
     },    
     elements: {
       rectangle: {
         borderWidth: 2,
       }
     },
     responsive: true,
     legend: {
       position: 'right',
     }
   };
  this.chart = null;
}

ChartJS.prototype.drawChart = function () {
  if(this.chart) this.chart.destroy();
  this.chart = new Chart(this.element, {
    type: this.type,
    data: {
      labels: this.labels,
      datasets: this.datasets
    },
    options: this.options
  });
  
}

ChartJS.prototype.setDataSets = function (_datasets) {
  this.datasets = _datasets.getDataSet();
  this.drawChart();
}

ChartJS.prototype.setType = function (_type) {
  this.type = _type;
  this.drawChart();
}

ChartJS.prototype.setLabels = function (_labels) {
  this.labels = _labels;
  this.drawChart();
}

ChartJS.prototype.setOptions = function (_options) {
  this.options = _options;
  this.drawChart();
}

ChartJS.prototype.destroy = function () {
  this.chart.destroy();
}

ChartJS.prototype.getChart = function () {
  this.drawChart();
  return this.chart;
}

