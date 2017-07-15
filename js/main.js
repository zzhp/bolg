;$(function ()
 {
	'use strict';

	var sidebar=$('#sidebar'),//选择侧栏
		mask=$('.mask'),//选择mask
		backButton=$('.back'),//选择返回菜单
		sidebar_trigger=$('#sidebar_trigger');//选择侧栏触发器

		function showSideBar(){//显示侧栏
			mask.fadeIn();//显示mask
			sidebar.css('right',0);//显示侧栏
		}

		function hideSideBar(){//隐藏菜单
			mask.fadeOut();//隐藏mask
			sidebar.css('right',-sidebar.width());//隐藏celan
		}

		sidebar_trigger.on('click',showSideBar)//监听侧栏触发器
		mask.on('click',hideSideBar)//监听返回按钮
		backButton.on('click',function()//监听返回按钮点击事件
		{
			$('html,body').animate({
				scrollTop:0
			},800)
		})

		$(window).on('scroll',function()//监听scoll事件
		{
			if($(window).scrollTop()>$(window).height())//滚动的高度大于隐藏的高度
				backButton.fadeIn();//显示返回按钮
			else
				backButton.fadeOut();//隐藏返回按钮
		})

		$(window).trigger('scroll');//系统自动触发scoll函数

})
//自调用函数