/// JavaScript Document
//回到顶部
function toTop(obj){
	$(obj).click(function (){
		$('html,body').animate({scrollTop:0},500);
	})
}
var isValid = function(obj) {
	return !((!(Boolean($.trim(obj) || obj === 0)) || (obj !== 0 && !Boolean(obj))));
};
//将footer放到最下边
minheight();
function minheight(){
	window.onload = function (){
		var h = $(window).height();
		h = h - 137;
		h = h +'px'
		$('.min_height').css('min-height',h);
	}
}
//选项卡
$.fn.tab=function (){//button外面一定不要再套一层！
	this.each(function (){
		var oParent=$(this);
		var aBtn=oParent.find('.tab_button');
		var aCont=oParent.find('.tab_content');
		aBtn.on("click",function (){
			aBtn.removeClass('active');
			aCont.removeClass('active');
			$(this).addClass('active');
			$(aCont).eq($(this).index()).addClass('active');
		});
	});
}
//二级选项卡
$.fn.next_tab=function (){//button外面一定不要再套一层！
	this.each(function (){
		var oParent=$(this);
		var aBtn=oParent.find('.tab_next_button');
		var aCont=oParent.find('.tab_next_content');
		aBtn.on("click",function (){
			aBtn.removeClass('active');
			aCont.removeClass('active');
			$(this).addClass('active');
			$(aCont).eq($(this).index()).addClass('active');
		});
	});
}
//按钮的切换
$.fn.btn_tab=function (){//button外面一定不要再套一层！
	this.each(function (){
		var oParent=$(this);
		var aBtn=oParent.find('.only_button');
		aBtn.on("click",function (){
			aBtn.removeClass('active');
			$(this).addClass('active');
		});
	});
}
//左右菜单选项卡
$.fn.leftright_tab=function (){//button外面一定不要再套一层！
	this.each(function (){
		var oParent=$(this);
		var aBtn=$('.tab_leftright_button');
		var aCont=$('.tab_leftright_content');
		aBtn.on("click",function (){
			aBtn.removeClass('active');
			aCont.removeClass('active');
			$(this).addClass('active');
			aCont.eq($(this).index()).addClass('active');
		});
	});
}
//仿下拉框
function commonSelect(oParent){
	$(oParent).on('click',function (){
		console.log(oParent);
		$('.common_selectlist').css('display','none');
		$(oParent).next().css('display','block');
		$(oParent).next().on('mouseover mouseout','li',function (event){
			if(event.type == "mouseover"){
				$(this).css({'z-index':'220'});
				$(this).addClass('active');
			} else if(event.type == "mouseout") {
				$(this).removeClass('active');
			}
		});
		$(oParent).next().on('click','li',function (){
			$(oParent).find('.common_select_txt').html($(this).html());
			$(oParent).find('.common_select_txt').attr("title", $(this).html());
		});
		$('body').on('click',function (){
			$(oParent).next().css('display','none');
		});
		return false;
	});
}
//我的工作台的二级菜单
$('#myworkspace').hover(function (){
		$('#myworkspace span').css('color','#38acff');
		$('#myworkspace_two_nav').css('display','block');
	},function (){
		$('#myworkspace_two_nav').css('display','none');
		$('#myworkspace span').css('color','#333');
		$('#myworkspace #myworkspace_blue').css('color','#333333');
});
//弹框的显示与隐藏
function showDialog(part){
	setTimeout(function(){
		var h1 = $(window).height();
		var h2 = $('html').height();
		if ($('#erpDialog_bg:visible').length <= 0) {
			if(h1 > h2)	
			{
				$('#erpDialog_bg').css({'height':h1});
			}
			$('#erpDialog_bg').css({'display':'block','opacity':'0.3'});
			$('#erpDialog_bg').animate({'opacity':'0.8'});
		}
		$(part).css({'display':'block','opacity':'0.3'});
		$(part).animate({'opacity':'1'});
	}, 300);
}
function hideDialog (part){
	if ($(".erpDialog:visible").length <= 1) {
		$('#erpDialog_bg').animate({'opacity':'0'},function (){
			$('#erpDialog_bg').css({'display':'none'});
		});
	}
	$(part).animate({'opacity':'0'},function (){
		$(part).css({'display':'none'});
	});
}
//协议的显示与隐藏
function showAgreement(part){
	setTimeout(function(){
		var h1 = $(window).height();
		var h2 = $('html').height();
		if ($('#erpDialog_bg:visible').length <= 0) {
			if(h1 > h2)	
			{
				$('#erpDialog_bg').css({'height':h1});
			}
			$('#erpDialog_bg').css({'display':'block','opacity':'0.3'});
			$('#erpDialog_bg').animate({'opacity':'0.8'});
			$(part).css({'display':'block'});
		}
		$(part).animate({'top':'50%'});
	}, 300);
}
function hideAgreement(part){
	if ($(".erpDialog:visible").length <= 1) {
		$('#erpDialog_bg').animate({'opacity':'0'},function (){
			$('#erpDialog_bg').css({'display':'none'});
			$(part).css({'display':'none'});
		});
	}
	$(part).animate({'top':'0%'});
}
//input中加减的函数
change();
function change(){
	$('#up').click(function (){
		var value = Number($('#uddata').val());
		value += 1;
		$('#uddata').val(value);
		return false;
	});
	$('#down').click(function (){
		var value = Number($('#uddata').val());
		value -= 1;
		$('#uddata').val(value);
		return false;
	});
}
$(function(){
	$(".up,.down").click(function(){
		var number = Number($(this).closest('.fl').find('.uddata').val());
		if( $(this).is('.up') ) number += 1;	
		if( $(this).is('.down') ) number -= 1;			

		$(this).closest('.fl').find('.uddata').val(number);
	});
	$(document).on('click', ".change_number_left,.change_number_right", function(){
		var number = Number($(this).parent().find('input.change_number_center').val());
		if( $(this).is('.change_number_left') ) number += 1;
		if( $(this).is('.change_number_right') ) number -= 1;
		$(this).parent().find('input.change_number_center').val(number);
	});
});

//vip鼠标点击显示
/*
vipclick();
function vipclick()
{
	$('.vipmenber_img').click(function (){
		$('.vipmenber_position').fadeIn();
	});
	$('.vip_card').on('mouseover mouseout', '.change_card_package,.change_card_store,.change_card_vip', function (event){
		if(event.type == "mouseover"){
			$('.change_card_package,.change_card_store,.change_card_vip').find('.vip_list_hover').hide();
			$(this).find(".vip_list_hover").show();
		} else if(event.type == "mouseout") {
			$(this).find(".vip_list_hover").hide();
		}
	});
}
*/
//业务接待添加项目购物车的相关操作
function shoppingCar(){
	var timer = null;
	$('.ywjd_car_img').hover(function (){
		$('.ywjd_car_list_big').fadeIn();
		clearTimeout(timer);
	},function (){
		timer = setTimeout(function (){
			$('.ywjd_car_list_big').fadeOut();
		},1500)		
	});
}
//一些卡的选择
changeCard();
function changeCard(){
	var aBtn = $('.change_card .change_card_button');
	aBtn.click(function (){
		aBtn.removeClass('active');
		$(this).addClass('active');
	});
}
function showFileName(obj) {
	var fileInfo = getFileInfo(obj)
	$(obj).siblings('input[type="text"]').val(
			fileInfo.fileName);
}
//我的工作台鼠标移入的时候显示数据
wdgztNavHover();
function wdgztNavHover(){
	var aBtn = $('.wdgzt_nav .hover_button');
	aBtn.hover(function (){
		$(this).find('.wdgzt_nav_bottom').fadeIn();
	},function (){
		$(this).find('.wdgzt_nav_bottom').fadeOut();
	});
}
//表格的鼠标移入效果
list_table();
function list_table(){
	$(document).on("mouseover",'.list_table2 tbody tr',function (){
		$(this).addClass('active');
	});
	$(document).on("mouseout",'.list_table2 tbody tr',function (){
		$(this).removeClass('active');
	});
}
// 获取文件路径
function getFileInfo(obj) {
	if (obj) {
		var fileInfo = {};
		var fileName = '';
		// ie
		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
			obj.select();
			fileName = document.selection.createRange().text;
		}
		// firefox
		else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
			if (obj.files) {
				// fileName = obj.files.item(0).getAsDataURL();
				fileName = window.URL.createObjectURL(obj.files[0]);
			}
			fileName = obj.value;
		}
		// 其他浏览器
		else {
			fileName = obj.value;
		}
		if (fileName.length > 0) {
			var pos1 = fileName.lastIndexOf('/');
			var pos2 = fileName.lastIndexOf('\\');
			var pos = Math.max(pos1, pos2);
			if (pos < 0) {
				fileInfo.fileName = fileName;
			}
			fileInfo.fileName = fileName.substring(pos + 1);
		}
		fileInfo.suffixName = getSuffixName(fileInfo.fileName);

		return fileInfo;
	}
	return null;
}
//左边菜单的滑动
$('.nav_button').click(function (){
	$('.nav_content').slideUp();
	$(this).next().slideDown();
});
$('.nav_button2').click(function (){
	$('.nav_button2').removeClass('active');
	$(this).addClass('active');
	$('.nav_content').slideUp();
	$(this).next().slideDown();
});
// 获取文件后缀名
function getSuffixName(fileName) {
	var result = /\.[^\.]+/.exec(fileName);
	return result;
}
//业务接待省份的选择
/*
province();
function province(){
	$('.license_plate').on('click',function (){
		$('.province').fadeIn();
		return false;
	});
	var aBtn = $('#province p')
	aBtn.on('click',function (){
		aBtn.removeClass('active');
		$(this).addClass('active');
		$('.license_plate').val($(this).html());
		$('.province').fadeOut();
	});
	$('body').on('click',function (){
		$('.province').fadeOut();
	})
	return false;
}
*/
//生成加载框
function loading(){
	$('<div></div>', {
        id: 'loading_bg',
      }).appendTo($('body'));
	 $('<img/>', {
        src: 'images/loading.gif',
		alt:''
      }).appendTo($('#loading_bg'));
}

function removeloading(){
	$('#loading_bg').remove();
}
//新建tab页
function creatTab(button,content){//button外面一定不要再套一层！
		var oBtn=$(button);
		var oCont=$(content);
		oBtn.css({'display':'block'});
		oBtn.parent().children().removeClass('active');
		oBtn.addClass('active');
		oCont.parent().children().removeClass('active');
		oCont.addClass('active');
		$('.tab').tab();
}
//返回之前tab页
function returnLastTab(button,lastButton,lastContent){
	var oBtn=$(button);//消失
	var oLastButton = $(lastButton);//显示为当前
	var oLastContent = $(lastContent);//显示为当前
	oBtn.css({'display':'none'});
	oLastButton.parent().children().removeClass('active');
	oLastButton.addClass('active');
	oLastContent.parent().children().removeClass('active');
	oLastContent.addClass('active');
	return false;
}
// 日期格式化
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

/**
 * 获取URL参数
 */
$.extend({
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
});