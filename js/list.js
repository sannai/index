// 列表页list.html私有的JS

$(function(){
	//当鼠标移上“更多市场”的时候，显示下方的二级菜单（给它加on类）；鼠标离开的时候，再去掉on类
	$('.more-market-wrapper').hover(function(e){
		$(this).toggleClass('on');
	});

	//当鼠标移上搜索选项的时候，应该显示所有的搜索选项；
	$('.search-select').mouseenter(function(e){
		$(this).css('overflow', 'visible');
	});
	//当鼠标离开搜索选项的时候，只显示第一个搜索选项
	$('.search-select').mouseleave(function(e){
		$(this).css('overflow', 'hidden');
	});

	//当用户单击某一个搜索选项的时候，它应该成为父级的第一个孩子
	$('.search-select>li').bind('click', function(e){
		// $(this).prependTo( $(this).parent() );
		$(this).parent().prepend( $(this) );
	});

	//当鼠标移上导航的li的时候，让它的背景显示
	$('.nav li').on('mouseenter', function(e){
		$(this).children('i').stop(true).animate({bottom:0}, 300);
	});
	//当鼠标离开导航的li的时候，让它的背景隐藏
	$('.nav li').on('mouseleave', function(e){
		$(this).children('i').stop(true).animate({bottom:-36}, 300);
	});

	//当鼠标移上导航的首页的时候，显示它下方的二级菜单
	//当鼠标离开导航的首页的时候，隐藏它下方的二级菜单
	$('.nav li').eq(0).hover(function(e){
		$(this).toggleClass('on');
	});
});

/*焦点图start*/
$(document).ready(function(){
	var idx=0;     //当前角标的索引值
	var timer;

	//当鼠标移上焦点图的时候，显示向前和向后的按钮
	//当鼠标移上焦点图的时候，停止图片的自动播放
	$('#banner').bind('mouseenter', function(e){
		$('#banner>span').show();

		clearInterval(timer);
	});

	//当鼠标离开焦点图的时候，隐藏向前和向后的按钮
	//当鼠标离开焦点图的时候，让焦点图每隔三秒播放下一张
	$('#banner').bind('mouseleave', function(e){
		$('#banner>span').hide();

		timer = setInterval(function(){
			$('#banner>span').eq(1).trigger('click');//触发用户单击向后按钮事件
		}, 3000);
	}).mouseleave();  //触发鼠标离开事件，让图片自动播放

	//当单击某个焦点图角标的时候
	$('#banner>ol>li').bind('click', function(e){
		//角标的工作：单击的那个角标处于当前状态，其他都不处于当前状态
		$(this).addClass('cur').siblings().removeClass();

		idx = $(this).index();

		//角标和图片区域通过索引值一一对应：找到了当前角标的索引值，就是找到了当前图片区域的索引值
		//图片的工作:让当前角标对应的图片区域淡入，其他图片区域都淡出
		$('#banner>ul>li').eq(idx).stop(true).fadeIn(800)
							.siblings().stop(true).fadeOut(800);
	});


	//当单击向后按钮的时候，
	$('#banner>span').eq(1).bind('click', function(e){
		//角标的工作
		idx++;
		if(idx>=3){
			idx = 0;
		}
		$('#banner>ol>li').eq(idx).addClass('cur').siblings().removeClass();

		//图片的工作
		$('#banner>ul>li').eq(idx).stop(true).fadeIn(800)
							.siblings().stop(true).fadeOut(800);
	});


	//当单击向前按钮的时候，
	$('#banner>span').eq(0).bind('click', function(e){
		//角标的工作
		idx--;
		if(idx<0){
			idx = 3-1;
		}
		$('#banner>ol>li').eq(idx).addClass('cur').siblings().removeClass();

		//图片的工作
		$('#banner>ul>li').eq(idx).stop(true).fadeIn(800)
							.siblings().stop(true).fadeOut(800);
	});


});
/*焦点图end*/