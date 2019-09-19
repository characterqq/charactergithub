$(function(){
    // 基于准备好的dom，初始化echarts实例
    var echarts_1 = echarts.init(document.querySelector(".echarts_1") );

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        //提示框组件
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["一月","二月","三月","四月","五月","六月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            //type: line 折线图, pie 饼状图, bar 柱状图
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_1.setOption(option);

//    饼图
//    基于准备好的dom, 初始化echarts实列
    var echarts_2 = echarts.init(document.querySelector(".echarts_2") );
    option2 = {
        title : {
            text: '热门品牌销售',
            //副标题文本
            subtext: '2017年6月',
            //让整个标题居中
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','安踏']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                //配置直径
                radius : '55%',
                //配置圆心的位置
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'安踏'}
                ],
                //添加阴影效果
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    echarts_2.setOption(option2);
})