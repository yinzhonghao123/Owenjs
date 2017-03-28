/**
 * Created by bh on 2016/9/14.
 */
//创建表格组件开始
Vue.component('table-component',{
    props:{
        tableHeaders:{
            type:Array,
            default:function(){
                return []
            }
        },
        tableData:{
            type:Array,
            default:function(){
                return []
            }
        },
        size:{
            type:Number,
            default:0
        },
        showCheckbox:{
            type:Boolean,
            default:false
        },
        pages:{
            type:Array,
            default:function(){
                return [1]
            }
        },
        pageable:{
            type:Boolean,
            default:false
        },
        recordTotal:{
            type:Number,
            default:0
        },
        getData:{
        },
        curPage:{
            type:Number,
            default:1
        },
        rowSelected:{
            type:Object,
            default:function(){
                return{
                index:-1,
                backgroundColor:""
                }
            }
        },
        ordering:{
            type:Object,
            default:function(){
                return{
                    dataIndex:"",
                    orderType:0
                }
            }
        },
        tTD:{
            type:Object,
            default:function(){
                return {}
            }
        },
        tWidth:{
            type:Number,
            default:0
        },
        widthControllable:{
            type:Boolean,
            default:false
        },
        sortable:{
            type:Boolean,
            default:false
        }
    },
    data:function(){

        return{
            tableList:[],
            tableShow:true,
            totalPage:1,
            allSelectChecked:false,
        }
    },
    template:'<div id="table-component" class="table-container">'+
    '<table class="table-class">'+
    '<thead id="table-head" >'+
    '<tr class="table-theadTr">'+
    '<th v-show="showCheckbox"><input type="checkbox" @click="selectAllClick($event)" v-model="allSelectChecked"></th>'+
    '<th v-for="(index,tableHeader) in tableHeaders" v-bind:style="{width:tableHeader.width}" @click="sortable?sortData(tableHeader.dataIndex,$event):\'\'" @mouseDown="mouseDownEvent(index,$event)" @mouseUp="mouseUpEvent($event)" @mouseMove="mouseMoveEvent(index,$event)">{{tableHeader.header}}<span class="table-sortSign" style="visibility: hidden;"></span></th>'+
    '</tr>'+
    '</thead>'+
    '<tbody tabIndex="1" style="outline:none" @keyDown="keyCheck($event)">'+
    '<tr v-for="(index,data) in tableList" @click="selectRow(index,$event)" v-bind:class="[classSelect(index),data[\'tr-class\']?conversion(data[\'tr-class\']):\'\',]" v-bind:style="data[\'tr-style\']?conversion(data[\'tr-style\']):\'\'">'+
    '<td v-show="showCheckbox"><input type="checkbox" v-model="data.checked" @click="singleSelectClick(data,$event)"></td>'+
    '<td v-for="tableHeader in tableHeaders">' +
    '<div class="table-tdControl" v-if="data[tableHeader.dataIndex].type==\'button\'" v-bind:style="data[tableHeader.dataIndex].style">' +
    '<template v-if="typeof data[tableHeader.dataIndex].value==\'object\'">'+
    '<button v-for="(index, valueItem) in data[tableHeader.dataIndex].value" @click="data[tableHeader.dataIndex].method[index](data,$event)" v-bind:style="data[tableHeader.dataIndex].buttonStyle" v-bind:class="data[tableHeader.dataIndex].buttonClass[index]">{{valueItem}}</button>' +
    '</template>'+
    '<button v-else @click="data[tableHeader.dataIndex].method(data,$event)" v-bind:style="data[tableHeader.dataIndex].buttonStyle" v-bind:class="data[tableHeader.dataIndex].buttonClass">{{data[tableHeader.dataIndex]["value"]}}</button>' +
    '</div>' +
    '<template v-else>' +
    '<div class="table-tdControl" v-if="data[tableHeader.dataIndex].type==\'a\'" v-bind:style="data[tableHeader.dataIndex].style">' +
    '<template v-if="typeof data[tableHeader.dataIndex].value==\'object\'">'+
    '<a v-for="(index, valueItem) in data[tableHeader.dataIndex].value" @click="data[tableHeader.dataIndex].method[index](data,$event)" v-bind:href="data[tableHeader.dataIndex].href[index]" v-bind:style="data[tableHeader.dataIndex].aStyle" v-bind:title="valueItem" v-bind:class="data[tableHeader.dataIndex].aClass[index]">{{valueItem}}</a>'+
    '</template>'+
    '<a v-else @click="data[tableHeader.dataIndex].method(data,$event)" v-bind:title="data[tableHeader.dataIndex].value" v-bind:style="data[tableHeader.dataIndex].aStyle" v-bind:class="data[tableHeader.dataIndex].aClass" v-bind:href="data[tableHeader.dataIndex].href">{{data[tableHeader.dataIndex]["value"]}}</a>' +
    '</div>' +
    '<template v-else>' +
    '<div class="table-tdControl" v-if="data[tableHeader.dataIndex].type==\'select\'" v-bind:style="data[tableHeader.dataIndex].style">' +
    '<select v-model="data[tableHeader.dataIndex].selected">' +
    '<option v-for="(key,val) in data[tableHeader.dataIndex].value" v-bind:value="key">{{val}}' +
    '</option>' +
    '</select>'+
    '</div>' +
    '<template v-else>' +
    '<div class="table-tdControl" v-if="tableHeader.type==\'button\'">' +
    '<template v-if="typeof tableHeader.value==\'object\'">'+
    '<button  v-for="(index, valueItem) in tableHeader.value" @click="tableHeader.method[index](data,$event)" v-bind:style="tableHeader.buttonStyle" v-bind:class="tableHeader.buttonClass[index]">{{valueItem}}</button>' +
    '</template>'+
    '<button v-else @click="tableHeader.method(data,$event)" v-bind:style="tableHeader.buttonStyle" v-bind:class="tableHeader.buttonClass">{{tableHeader.value||(data[tableHeader.dataIndex]["value"]?data[tableHeader.dataIndex]["value"]:data[tableHeader.dataIndex])}}</button>' +
    '</div>' +
    '<template v-else>' +
    '<div class="table-tdControl" v-if="tableHeader.type==\'a\'">' +
    '<template v-if="typeof tableHeader.value==\'object\'">'+
    '<a v-for="(index, valueItem) in tableHeader.value" @click="tableHeader.method[index](data,$event)" v-bind:title="valueItem" v-bind:href="tableHeader.href[index]" v-bind:style="tableHeader.aStyle" v-bind:class="tableHeader.aClass[index]">{{valueItem}}</a>'+
    '</template>'+
    '<a v-else @click="tableHeader.method(data,$event)" v-bind:title="tableHeader.value||(data[tableHeader.dataIndex].value?data[tableHeader.dataIndex].value:data[tableHeader.dataIndex])" v-bind:href="tableHeader.href" v-bind:style="tableHeader.aStyle" v-bind:class="tableHeader.aClass">{{tableHeader.value||(data[tableHeader.dataIndex]["value"]?data[tableHeader.dataIndex]["value"]:data[tableHeader.dataIndex])}}</a>' +
    '</div>' +
    '<template v-else>' +
    '<template v-if="tableHeader.editable==true">' +
    '<div class="table-tdControl" v-bind:title="data[tableHeader.dataIndex].value?data[tableHeader.dataIndex].value:data[tableHeader.dataIndex]" v-bind:style="data[tableHeader.dataIndex].style" v-bind:class="data[tableHeader.dataIndex].class">' +
    '<input v-if="data[tableHeader.dataIndex].value" v-model="data[tableHeader.dataIndex].value">' +
    '<input v-else v-model="data[tableHeader.dataIndex]">' +
    '</div>' +
    '</template>'+
    '<div class="table-tdControl" v-bind:title="data[tableHeader.dataIndex].value?data[tableHeader.dataIndex].value:data[tableHeader.dataIndex]" v-else v-bind:style="data[tableHeader.dataIndex].style" v-bind:class="data[tableHeader.dataIndex].class">{{data[tableHeader.dataIndex]["value"]?data[tableHeader.dataIndex]["value"]:data[tableHeader.dataIndex]}}</div>' +
    '</template>'+
    '</template>'+
    '</template>'+
    '</template>'+
    '</template>'+
    '</td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '</div>'+
    '<div class="table-paginationContainer" v-show="totalPage!=1&&pageable">'+
    '<div style="float:left;padding-left: 30px">'+
    '<ul class="table-pagination">'+
    '<li>'+
    '<a href="javascript:void(0)"  @click="onPrevClick">'+
    '<span>上一页</span>'+
    '</a>'+
    '</li>'+
    '<li>'+
    '<div class="table-selectContainer">'+
    '<select v-model="curPage" class="table-selectStyle" style="height:28px">'+
    '<option v-for="arr in pages" :value="arr" v-text="arr"></option>'+
    '</select>'+
    '</div>'+
    '</li>'+
    '<li>'+
    '<a href="javascript:void(0)" @click="onNextClick">'+
    '<span>下一页</span>'+
    '</a>'+
    '</li>'+
    '</ul>'+
    '</div>'+
    '<div style="float:right;padding-right: 30px">'+
    '跳转到<input id="table-skipPage" class="table-skipPage">/<span  style="margin-left: 5px" v-text="totalPage"></span>页'+
    '<button class="table-skipButton" @click="skip">确定</button>'+
    '</div></div>',
    created:function(){
        this.removeSpaces(this.tableHeaders);
    },
    methods:{
        changeData:function(){                                                             //传入数据整理
            this.tableList=[];
            var tableValue=this.deepClone(this.tableData);
            for(var i in tableValue){
                tableValue[i]["tableId"]=i;
                if(tableValue[i]["tr-style"]){
                    if(tableValue[i]["tr-style"]["background-color"]){
                        continue;
                    }else{
                        tableValue[i]["tr-style"]["background-color"]="";
                    }
                }else{
                    tableValue[i]["tr-style"]={"background-color":""};
                }
            };
            if(this.showCheckbox){
                for(var i in tableValue){
                    if(this.allSelectChecked){
                        tableValue[i]["checked"]=true
                    }else{
                        tableValue[i]["checked"]=false
                    }
                }
            };
            tableValue=this.removeSpaces(tableValue);
            this.$set('tableList',tableValue);
        },
        mouseDownEvent:function(index,e){
            if(e.target.style.cursor=='col-resize'&& e.target.nodeName=="TH"){
                this.tTD=e.target;
                this.tTD.mouseDown=true;
                this.tWidth=Number(getComputedStyle(e.target,false).width.replace("px",""))+Number(getComputedStyle(e.target.nextSibling,false).width.replace("px",""));
            }
        },
        mouseMoveEvent:function(index,e){
            if(index!=this.tableHeaders.length-1&& e.target.nodeName=="TH"&&this.widthControllable) {
                if (event.offsetX > e.target.offsetWidth - 10)
                    e.target.style.cursor = 'col-resize';
                else
                    e.target.style.cursor = 'default';
            };
                if(this.tTD.mouseDown!=null&&this.tTD.mouseDown==true){
                    if(e.target===this.tTD){
                        //var widthAll=e.target.offsetWidth+e.target.nextSibling.offsetWidth;
                        if(event.offsetX>=30){
                            this.tTD.style.width=event.offsetX+"px";
                            this.tTD.nextSibling.style.width=(this.tWidth-event.offsetX)+"px";
                        }
                    }else if(e.target.previousSibling===this.tTD){
                        if(Number(getComputedStyle(e.target.previousSibling,false).width.replace("px",""))+30<this.tWidth){
                            this.tTD.style.width=(event.offsetX+Number(getComputedStyle(e.target.previousSibling,false).width.replace("px","")))+"px";
                            this.tTD.nextSibling.style.width=(Number(getComputedStyle(e.target,false).width.replace("px",""))-event.offsetX)+"px";
                        }
                    }
                }
        },
        mouseUpEvent:function(e){
            if (this.tTD == undefined)
                this.tTD = e.target;
            this.tTD.mouseDown=false;
            if(this.tTD.style){
                this.tTD.style.cursor = 'default';
            };
            this.tTD={};
            this.tWidth=0;
        },
        onPrevClick:function(){
            if(this.curPage>1) {
                this.curPage = this.curPage - 1;
            }
        },
        onNextClick:function(){
            if(this.curPage < this.totalPage) {
                this.curPage = this.curPage + 1;
            }
        },
        skip:function(){
            var page=document.getElementById("table-skipPage").value.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
            if(/^\d+$/.test(page)){
                var pageNumber=parseInt(page);
                if(pageNumber<1){
                    alert("页数不能小于1");
                }else if(pageNumber>this.totalPage){
                    alert("页数不能超过"+this.totalPage+"");
                }else{
                    this.curPage=pageNumber;
                }
            }
        },
        classSelect:function(index){                                                         //表格添加明暗样式
            if(index%2==0){
                return "table-dark";
            }else {
                return "table-light";
            }
        },
        conversion:function(data){                                                             //判断值类型是字符还是对象
            if(Object.prototype.toString.call(data).slice(8,-1)=='String'){
                return data;
            }else if(data.value){
                return data.value;
            }else if(Object.prototype.toString.call(data).slice(8,-1)=='Object'){
                return data;
            }else{
                return "";
            }
        },
        getPageSize:function(){
            return this.size;
        },
        getTableData:function(){
            return this.tableList;
        },
        getCurPage:function(){
            return this.curPage;
        },
        setCurPage:function(page){
            this.curPage=page;
        },
        getSelectedData:function(){                                                                //获取复选框选中的数据
            var SelectedData=[];
            for(var i in this.tableList){
                if(this.tableList[i].checked){
                    SelectedData.push(this.deepClone(this.tableList[i]));
                }
            }
            return SelectedData;
        },
        getSelectedRow:function(){
            if(this.rowSelected.index>=0){
                return this.tableList[this.rowSelected.index];
            }else{
                return {};
            }
        },
        removeSpaces:function(newVal){                                                              //去除字符串前后空格
            for(var i in newVal){
                if(typeof newVal[i]=='string'){
                    newVal[i]=newVal[i].replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
                }else if(typeof newVal[i]=='object'){
                    arguments.callee(newVal[i]);
                }
            }
            return newVal;
        },
        deepClone:function(obj){                                                                    //深拷贝
                var result,oClass=isClass(obj);
                //确定result的类型
                if(oClass==="Object"){
                    result={};
                }else if(oClass==="Array"){
                    result=[];
                }else{
                    return obj;
                }
                for(var key in obj){
                    var copy=obj[key];
                    if(isClass(copy)=="Object"||"Array"){
                        result[key]=arguments.callee(copy);//递归调用
                    }else{
                        result[key]=obj[key];
                    }
                }
                return result;
            //返回传递给他的任意对象的类
            function isClass(o){
                //if(o===null) return "Null";
                //if(o===undefined) return "Undefined";
                return Object.prototype.toString.call(o).slice(8,-1);
            }
        },
        selectAllClick:function(event){
            var checked = event.target.checked;
            for(var i in this.tableList){
                this.tableList[i].checked=checked;
            }
        },
        singleSelectClick:function(data,event){
            var checked=event.target.checked;
            var mark=1;
            this.tableList[data.tableId].checked=checked;
            for(var i in this.tableList){
                if(this.tableList[i].checked==false){
                    mark=0;
                    break;
                }
            }
            if(mark==1){
                this.allSelectChecked=true;
            }else{
                this.allSelectChecked=false;
            }
        },
        selectRow:function(index,event){                                                            //行选中实现
            if(this.rowSelected.index>=0){
                this.tableList[this.rowSelected.index]["tr-style"]["background-color"]=this.rowSelected.backgroundColor;
            }
            this.rowSelected.index=index;
            this.rowSelected.backgroundColor=this.tableList[index]["tr-style"]["background-color"];
            this.tableList[index]["tr-style"]["background-color"]="rgba(2,156,255,0.7)";
        },
        keyCheck:function(e){                                                                    //键盘上下键改变选中行
            if(e.keyCode==38){
                if(this.rowSelected.index>0) {
                    this.tableList[this.rowSelected.index]["tr-style"]["background-color"] = this.rowSelected.backgroundColor;
                    this.rowSelected.index--;
                    this.rowSelected.backgroundColor = this.tableList[this.rowSelected.index]["tr-style"]["background-color"];
                    this.tableList[this.rowSelected.index]["tr-style"]["background-color"] = "rgba(2,156,255,0.7)";
                }
            }else if(e.keyCode==40){
                if(this.rowSelected.index<this.tableList.length-1) {
                    this.tableList[this.rowSelected.index]["tr-style"]["background-color"] = this.rowSelected.backgroundColor;
                    this.rowSelected.index++;
                    this.rowSelected.backgroundColor = this.tableList[this.rowSelected.index]["tr-style"]["background-color"];
                    this.tableList[this.rowSelected.index]["tr-style"]["background-color"] = "rgba(2,156,255,0.7)";
                }
            }
        },
        cancelSelectedLine:function(){
            if(this.rowSelected.index>=0) {
                this.tableList[this.rowSelected.index]["tr-style"]["background-color"] = this.rowSelected.backgroundColor;
                this.rowSelected.index=-1;
                this.rowSelected.backgroundColor = "";
            };
        },
        assignTable:function(){
            var data=this.getData(this.curPage,this.size,this.ordering.dataIndex,this.ordering.orderType);
            if(data.tableData!==undefined) {
                this.tableData = data.tableData;
            }
            if(data.recordTotal!==undefined) {
                this.recordTotal = data.recordTotal;
            }
            if(data.startPage!==undefined) {
                this.curPage = data.startPage;
            }
            if(data.orderIndex!==undefined){
                this.ordering.dataIndex=data.orderIndex;
            }
            if(data.orderType!==undefined) {
                this.ordering.orderType = data.orderType;
            }
        },
        sortData:function(dataIndex,e){
            if(e.target.style.cursor!='col-resize'){
                if(this.tableList.length!=0){
                    this.cancelSelectedLine();
                }
                if(this.ordering.dataIndex!=dataIndex){
                    this.ordering.orderType=0;
                }else if(this.ordering.orderType==0){
                    this.ordering.orderType=1;
                }else{
                    this.ordering.orderType=0;
                }
                this.ordering.dataIndex=dataIndex;
                if(e.target.lastChild){
                    var ths=e.target.parentNode.childNodes;
                    for(var i=0;i<ths.length;i++){
                        if(ths.item(i).nodeName=="TH"){
                            ths.item(i).lastChild.style.visibility="hidden";
                        }
                    }
                    if(this.ordering.orderType==0){
                        e.target.lastChild.style["background-position"]="5px -112px";
                    }else{
                        e.target.lastChild.style["background-position"]="5px -92px";
                    }
                    e.target.lastChild.style.visibility="visible";
                }else if(e.target.nodeName=="SPAN"){
                    if(this.ordering.orderType==0){
                        e.target.style["background-position"]="5px -112px";
                    }else{
                        e.target.style["background-position"]="5px -92px";
                    }
                };
                this.assignTable();
            };
        }
    },
    ready:function(){
        if(this.size==0){
            this.size=Math.floor((document.getElementById("table-component").clientHeight-document.getElementById("table-head").clientHeight)/document.getElementById("table-head").clientHeight);//自适应
            this.assignTable();
        }else{
            this.assignTable();
        }
    },
    watch:{
        'tableData':function(newVal,oldVal){
            if(this.tableList.length!=0){
                this.cancelSelectedLine();
            }
            this.changeData();
        },
        'recordTotal':function(newVal,oldVal){

            this.totalPage=Math.ceil(newVal/this.size);
            this.pages=[];
            for(var i=1;i<=this.totalPage;i++){
                this.pages.push(i);
            }
        },
        'curPage':function(newVal,oldVal){
            this.cancelSelectedLine();
            this.assignTable();
        },
        'size':function(newVal,oldVal){
            this.curPage=1;
        }
    }
});
