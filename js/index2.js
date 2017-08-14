/*
$(function(){
	var idx=0;
	var timer;
	var $banner1_span = $('#banner1>span');//左右按钮
	var $banner1_ul   = $('#banner1>ul');//图片
	var $banner1_ol_li = $('#banner1>ol>li');//小点点
	
	//当鼠标移上焦点图的时候，显示向前和向后按钮
	$('#banner1').on({mouseenter:function(e){
			$banner1_span.show();
			clearInterval(timer);
		},
		mouseleave:function(e){
			$banner1_span.hide();
			
			timer=setInterval(function(){
				$banner1_span.eq(1).click()
			},2000)
		}
	});
	
	//当单击向后按钮的时候
	$banner1_span.eq(1).on('click',function(e){
		if($banner1_ul.is(':animated')){
			return;
		}
		idx++;
		if(idx>=$banner1_ol_li.length){
				idx=0;
				$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
				$banner1_ul.stop(true).animate({left:'-'+$banner1_ol_li.length+'00%'},1000,function(){
					$(this).css({left:'0'});		
				})
		}else{
				$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
				$banner1_ul.stop(true).animate({left:'-'+idx + '00%'},1000);
		}
	});
		
	//当单击向前按钮的时候，图片区域应该向右走
	$banner1_span.eq(0).on('click',function(e){
		if($banner1_ul.is(':animated')){
			return;
		}
		idx--;
		if(idx<0){
			idx=$banner1_ol_li.length-1;
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.css({left:'-'+$banner1_ol_li.length+'00%'}).stop(true).animate({left:'-'+idx+'00%'},1000)
		}else{
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.stop(true).animate({left:'-'+idx+'00%'},1000);
		}
	})
	
	//当单击角标的时候
	$banner1_ol_li.on('click',function(e){
		if(idx==$banner1_ol_li.length-1 && $(this).index()==0){
			$banner1_span.eq(1).trigger('click')
		}else if(idx==0&&$(this).index()==$banner1_ol_li.length-1){
			$banner1_span.eq(0).trigger('click');
		}else{
			idx=$(this).index();
			$(this).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.stop(true).animate({left:'-'+idx+'00%'},1000)
		}
	})
});
*/



$(function(){
	var idx=0;
	var timer;
	var $banner1_span = $('#banner1>span');
	var $banner1_ul = $('#banner1>ul');
	var $banner1_ol_li = $('#banner1>ol>li');
	//console.info($banner1_span,$banner1_ul,$banner1_ol_li);
	
	//移上去显示
	$('#banner1').on({
		mouseenter:function(){
			$banner1_span.show();
			clearInterval(timer);
		},mouseleave:function(){
			$banner1_span.hide();
			timer=setInterval(function(){
				$banner1_span.eq(1).click()
			},1500);
		}
	}).mouseleave();//没有这个mouseleave就不会自动播放
	
	$banner1_span.eq(1).on('click',function(){
		idx++;
		if(idx>=$banner1_ol_li.length){
			idx=0;
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.stop(true).animate({left:'-'+$banner1_ol_li.length+'00%'},1000,function(){
				$banner1_ul.css({left:'-'+idx+'00%'})
			})
		}else{
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.stop(true).animate({left:'-'+idx+'00%'},1000)
		}
	});
	
	$banner1_span.eq(0).on('click',function(){
		idx--;
		if(idx<0){
			idx=$banner1_ol_li.length-1;
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.css({left:'-'+$banner1_ol_li.length+'00%'}).animate({left:'-'+idx+'00%'},1000)
		}else{
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.animate({left:'-'+idx+'00%'},1000)
		}
	});
	
	$banner1_ol_li.on('click',function(){
		if(idx==$banner1_ol_li.length-1&& $(this).index()==0){
			$banner1_span.eq(1).trigger('click');
		}else if(idx==0&&$(this).index()==$banner1_ol_li.length-1){
			$banner1_span.eq(0).trigger('click');
		}else{
			idx=$(this).index();
			$(this).addClass('cur').siblings().removeClass('cur');
			$banner1_ul.animate({left:'-'+idx+'00%'},1000)
		}
	})
})






























