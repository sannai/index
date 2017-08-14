/*
$(function(){
	var $aside_nav_li =$('#aside-nav>li');
	var $html_and_body=$('html,body');
	var $aside_nav=$('#aside-nav');
	var $window =$(window);
	var win_top;
	var section_tops=[];
	
	$('.section').each(function(index){
		section_tops.push($(this).offset().top-40);
		console.log($(this).offset().top-40);
	});
	
	$aside_nav_li.on('mouseenter',function(e){
		if($(this).hasClass('hover')==false){//移进去判断有没有hover
			$(this).addClass('hover').siblings().removeClass('hover');
		}
	}).mouseleave(function(){
		$(this).removeClass('hover');//离开删除类
	})
	$aside_nav_li.on('click',function(e){
		$(this).addClass('click').siblings().removeClass('click');
	})
	
	var aside_nav_top=$aside_nav.position().top;//
	console.log(aside_nav_top);
	//最后一个是否显示隐藏
	$window.on('scroll',function(e){
		win_top=$window.scrollTop();
		console.log(win_top);//滚动坐标
		if(win_top>=$window.height()){//$window.height()窗口高度
			$aside_nav_li.eq(6).show();//最后一个是否显示隐藏
		}else{
			$aside_nav_li.eq(6).hide();
		}
		
		var which;
		//section_tops数组长度
		for(var i=0; i<section_tops.length; i++){
			console.log(section_tops);//数组的坐标
			if(win_top>=section_tops[i]){
				which=i;//索引
				//console.log(i,which);
			}
		}
		$aside_nav_li.eq(which).addClass('click').siblings().removeClass('click');
	});
	
	//点击第6个时返回最前面
	$aside_nav_li.eq(6).on('click',function(e){
		$html_and_body.animate({'scrollTop':0},500);
	});
	
	$aside_nav_li.filter(':lt(6)').on('click',function(e){
		$html_and_body.animate({'scrollTop':section_tops[$(this).index()]},500)
	})

	$(window).on('scroll',function(){
		if($(window).scrollTop()>90){
			$('#aside-nav').css({'position':'fixed','top':'0px'})
		}else{$('#aside-nav').css({'position':'absolute','top':'300px'})}
	});
	
});
*/

$(function(){
	var $aside_nav_li_arr=[];
	$('.section').each(function(index){//这里找到每个大块的类名
		//把每个大块的位置添加都数组中
		$aside_nav_li_arr.push($(this).offset().top);
	})
	console.log($aside_nav_li_arr);
	
	$('#aside-nav>li').on('click',function(){
		$(this).addClass('click').siblings().removeClass('click');
	});
	$('#aside-nav>li').on('mouseenter',function(){
		if($(this).hasClass('hover')==false){
			$(this).addClass('hover').siblings().removeClass('hover');
		}
	}).mouseleave(function(){
			$(this).removeClass('hover');
	});
	
	$(window).scroll(function(){
		var windowTop=$(window).scrollTop();
		if(windowTop>300){
			$('#aside-nav').css({'position':"fixed",'top':'0px'})
			$('.toTop').show();
		}else{
			$('#aside-nav').css({'position':"absolute",'top':'300px'})
			$('.toTop').hide();
		}
		
		var which;   //当前窗口处于的区块的索引值，即应该选中的侧边栏li的索引值
		for(var i=0; i<$aside_nav_li_arr.length; i++){
			if(windowTop>=$aside_nav_li_arr[i]){
				which=i;
			}
		}
		$('#aside-nav>li').eq(which).addClass('click').siblings().removeClass('click');
	});
	
	$('#aside-nav>li').filter(':lt(6)').on('click',function(){
		$('html,body').animate({'scrollTop':$aside_nav_li_arr[$(this).index()]},500)
	})
	
	$('.toTop').on('click',function(){
		$('html,body').animate({'scrollTop':0},500);
	});

	
})

