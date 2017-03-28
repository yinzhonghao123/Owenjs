/**
 * Created by bh on 2016/9/12.
 */

var deleteTest=function (data,event){
    vm.gridStaticData.splice(data["tableId"],1)
}

var tableHeader=[
    {header:" 终端名称 ",dataIndex:"terminalName "},                   //header表示表头显示文字，dataIndex对应该行显示数据的key
    {header:"经度",dataIndex:"longitude",
        type:"button",
        buttonStyle:{                                                                   //设置type为button，该列数据均在按钮内
            color:'white'                                                                 //设置buttonStyle，可设置按钮样式
        },
        buttonClass:'background'                                                      //设置buttonClass，可设置按钮类
    },
    {header:"纬度",dataIndex:"latitude"},
    {header:"所在区域",dataIndex:"division"},
    {header:"覆盖人口",dataIndex:"coveragePopulation"},
    {header:"覆盖面积",dataIndex:"coverageRadius"},
    {header:"生成时间",dataIndex:"createTime"},
    {header:"终端状态",dataIndex:"terminalStatus"},
    {header:"操作",type:'button',value:"删除",method:deleteTest}                   //可以设置没有数据，只有操作按钮的一列,设置value，dataIndex将失效
];                                                                                      //value为button显示的文字，method为button点击事件触发的方法
                                                                                        //也可设置某一单元格为按钮，如下

var tableData=[
    {
        "terminalName": "STB终端1",
        "unifiedId": "STB-330200000000-1-FE1",
        "longitude": "120.0",
        "latitude": {
            value:'30.0',
            type:'button',
            buttonStyle:{                                                                   //设置type为button，该单元格则为按钮显示
                color:'white'                                                               //按钮样式和类如上设置
            },
            buttonClass:'background'
        },
        "division": "330200000000",
        "coveragePopulation": "13000",
        "coverageRadius": "200",
        "createTime": "2016-04-28 09:33:50",
        "terminalStatus":"异常"                                              //值类型可以为字符串
    },
    {
        "terminalName": "STB终端2",
        "unifiedId": "STB-330200000000-2-FE1",
        "longitude": "125.0",
        "latitude": "35.0",
        "division": "330200000000",
        "coveragePopulation": "13000",
        "coverageRadius": "200",
        "createTime": "2016-04-28 09:33:50",
        "terminalStatus": {
            'value':'正常'                                                    //值类型也可以为对象，设置value
        }
    }
];

var vm = new Vue({
    el: 'body',                                                                   //组件作用区域
    data: {
        gridHeaders: tableHeader,                                              //表头数据
        gridStaticData: [],                                                     //表格数据
        //recordCount: 0,                                                         //表格数据总数，用于分页
        customSize: 0,                                                          //每一页显示数据条数，可设置，若值为0，条数自适应
        showCheckBox:false                                                     //是否显示复选框
    },
    methods:{
        getdata:function(start,size,orderIndex,orderType){                                           //表格数据获取方法，此处可通过Ajax或vue-resource进行数据请求
            this.$set("gridStaticData",tableData)
            return {
                "tableData":tableData,
                "recordTotal":100,
                "startPage":start,
                "orderIndex":orderIndex,
                "orderType":orderType
            }
        }
    }
})