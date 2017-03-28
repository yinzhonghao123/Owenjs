/**
 * Created by bh on 2016/9/12.
 */

var tableHeader=[
    {header:" 终端名称 ",dataIndex:"terminalName "},                   //header表示表头显示文字，dataIndex对应该行显示数据的key
    {header:"经度",dataIndex:"longitude"},
    {header:"纬度",dataIndex:"latitude"},
    {header:"所在区域",dataIndex:"division"},
    {header:"覆盖人口",dataIndex:"coveragePopulation"},
    {header:"覆盖面积",dataIndex:"coverageRadius",editable:true},
    {header:"生成时间",dataIndex:"createTime"},
    {header:"终端状态",dataIndex:"terminalStatus"},
    {header:"操作",
        type:'a',                                                          //多操作以a标签为例，button同样
    editable:true,
        value:["删除","详情"],                                            //value值为数组，传递每个操作名称
        method:[deleteTest,details],                                       //method也传递一个方法名数组
        aClass:['aColor','aColor2'],                                   //aClass传递类名数组
        aStyle:{                                                           //aStyle将作用在所有的a标签上
        'margin-left':'10px'                                            //同样某一单元格也能实现多操作，如下
        }
    }
];

function deleteTest(data,event){
    vm.gridStaticData.splice(data["tableId"],1)
}
function details(data,event){
    alert(JSON.stringify(data))
}

var tableData=[
    {
        "terminalName": "STB终端1",
        "unifiedId": "STB-330200000000-1-FE1",
        "longitude": "120.0",
        "latitude": {
            value:["红色","绿色"],                                                     //value值为数组，传递每个操作名称
            type:'a',
            href:["javascript:void(0);","javascript:void(0);"],                  //注意href也需为数组
            aStyle:{
                'margin-left':'10px'
            },
            aClass:['red','green']                                                  //aClass传递类名数组
        },
        "division": "330200000000",
        "coveragePopulation": "13000",
        "coverageRadius": "200",
        "createTime": "2016-04-28 09:33:50",
        "terminalStatus":{
            type:"select",
            value:{0:"正常",1:"异常"},
            selected:1
        }                                               //值类型可以为字符串
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
            type:"select",                                                    //值类型也可以为对象，设置value
            value:{0:"正常",1:"异常"},
            selected:1
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