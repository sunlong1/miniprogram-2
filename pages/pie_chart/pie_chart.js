var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(ringChart.getCurrentDataIndex(e));
    },
    updateData: function () {
        ringChart.updateData({
            series: [{
                name: '成交量1',
                data: 5,
                stroke: false
            }, {
                name: '成交量0',
                data: 15,
                 stroke: false
            }, {
                name: '成交量',
                data: 28,
                stroke: false
            }, {
                name: '成交量5',
                data: 33,
                 stroke: false
            }]
        });
    },     
    onReady: function (e) {
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
            // title: {
            //     name: '70%',
            //     color: '#7cb5ec',
            //     fontSize: 25
            // },
            // subtitle: {
            //     name: '收益率',
            //     color: '#666666',
            //     fontSize: 15
            // },
            series: [{
                name: '成交量1',
                data: 15,
                stroke: false
            }, {
                name: '成交量2',
                data: 35,
                 stroke: false
            }, {
                name: '成交量3',
                data: 78,
                stroke: false
            }, {
                name: '成交量4',
                data: 63,
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
    }
});