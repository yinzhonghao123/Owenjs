/**
 * Created by bh on 2016/9/12.
 */

var tableHeader=[
    {header:" 终端名称 ",dataIndex:"terminalName"},                       //header表示表头显示文字，dataIndex对应该行显示数据的key
    {header:"经度",dataIndex:"longitude"},                               //width定义列宽，可以是%也可以是px
    {header:"纬度",dataIndex:"latitude"},
    {header:"所在区域",dataIndex:"division"},
    {header:"覆盖人口",dataIndex:"coveragePopulation"},
    {header:"覆盖面积",dataIndex:"coverageRadius"},
    {header:"生成时间",dataIndex:"createTime"},
    {header:"终端状态",dataIndex:"terminalStatus"}
];
var tableData=[
        {
            "terminalName": "STB终端1",
            "unifiedId": "STB-330200000000-1-FE1",
            "longitude": "120.0",
            "latitude": "30.0",
            "division": "330200000000",
            "coveragePopulation": "13000",
            "coverageRadius": "200",
            "createTime": "2016-04-28 09:33:50",
            "terminalStatus":"异常",                                              //值类型可以为字符串
            "tr-class":"background",                                              //定义tr的类
            "tr-style":{                                                           //定义tr样式
                color:'red'
            }
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
        //gridStaticData: [],                                                     //表格数据
        //recordCount: 0,                                                         //表格数据总数，用于分页
        customSize: 0,                                                          //每一页显示数据条数，可设置，若值为0，条数自适应
        showCheckBox:false                                                     //是否显示复选框
    },
    methods:{
        getdata:function(start,size,orderIndex,orderType){                                           //表格数据获取方法，此处可通过Ajax或vue-resource进行数据请求
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