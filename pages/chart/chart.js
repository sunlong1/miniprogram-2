var wxCharts = require('../../utils/wxcharts.js');
const util = require('../../utils/util.js')
var app = getApp();
var lineChart = null;
let ringChart = null;
Page({
  data: {
		buhegeLists: [
			{
				content: '生活垃圾没有',
				shuliang: 26
			},
			{
				content: '小区秩序乱、',
				shuliang: 24
			},
			{
				content: 'X',
				shuliang: 20
			},
			{
				content: 'X',
				shuliang: 15
			}
		],
		monthActive: true
  },
  touchHandler: function (e) {
      console.log(lineChart.getCurrentDataIndex(e));
      lineChart.showToolTip(e, {
          // background: '#7cb5ec',
          format: function (item, category) {
              return category + ' ' + item.name + ':' + item.data 
          }
      });
  },
  onLoad: function (e) {
    this.line()
		this.ring_circle()
		this.getMess()
	},
	getMess () {
		wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: 'http://wx.romeo.wang/home/login',
      data: {dwedwe: 2},
      method: 'POST', 
      header: {"content-type": "application/x-www-form-urlencoded"},
      success: function(res){
        console.log(res)
        wx.hideLoading()
      },
      fail: function(err) {
        wx.hideLoading()
      }
    })
	},
  ring_circle: function(e) {
	  var windowWidth = 330;
	  try {
	      var res = wx.getSystemInfoSync();
	      windowWidth = res.windowWidth;
	  } catch (e) {
	      console.error('getSystemInfoSync failed!');
	  }
	  
	  ringChart = new wxCharts({
	      animation: true,
	      canvasId: 'ringCanvas',
	      type: 'ring',
	      extra: {
	          ringWidth: 25,
	          pie: {
	              offsetAngle: -25
	          }
	      },
	      series: [{
	          name: '合格',
	          data: 35,
	          stroke: false
	      }, {
	          name: '不合格',
	          data: 15,
	           stroke: false
	      }],
	      disablePieStroke: true,
	      width: windowWidth,
	      height: 160,
	      dataLabel: false,
	      legend: true,
	      background: '#f5f5f5',
	      padding: 0
	  });
	  ringChart.addEventListener('renderComplete', () => {
	      console.log('renderComplete');
	  });
	  setTimeout(() => {
	      ringChart.stopAnimation();
	  }, 500);
  },
  line: function(e) {
	  var windowWidth = 100;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}
		
	  let x = ['一月','二月','二月','二月','二月','二月','二月','二月']
	  let y = [2,3,4,2,3,4,5,3]
		lineChart = new wxCharts({
			canvasId: 'lineCanvas',
			type: 'line',
			categories: x,
			animation: false,
			//background: '#f5f5f5',
			series: [{
				name: '督查数据',
				data: y,
				// format: function (val, name) {
				//     return val.toFixed(2) + '万';
				// }
			}],
			xAxis: {
				disableGrid: true
			},
			yAxis: {
				// title: '成交金额 (万元)',
				// format: function (val) {
				//     return val.toFixed(2);
				// },
				min: 0
			},
			width: windowWidth,
			height: 155,
			dataLabel: true,
			dataPointShape: true,
			extra: {
				lineStyle: 'curve'
			}
		});
	},
	
	benyue: function(e) {
		if(this.data.monthActive) return
		this.setData({
			monthActive: !this.data.monthActive
		})
	},

	shangyue: function(e) {
		if(!this.data.monthActive) return
		this.setData({
			monthActive: !this.data.monthActive
		})
	}
})