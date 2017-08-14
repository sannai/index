// 首页index.html私有的js文件

// 页面载入事件
$(function(){
	//当单击某个搜索选项的时候，让它处于当前状态(加on类)，其他都不处于当前状态
	//当单击某个搜索选项的时候，给它的爷爷search-center添加类;
	/************************************************
		如果单击的#baobei,那么就给.search-center添加baobei-on类
		如果单击的#tmall,那么就给.search-center添加tmall-on类
		如果单击的#dianpu,那么就给.search-center添加dianpu-on类
	************************************************/
	$('.search-select>li').on('click', function(e){
		$(this).addClass('on').siblings().removeClass();

		/************************************************
			如果单击的#baobei,那么就给.search-center添加baobei-on类
			如果单击的#tmall,那么就给.search-center添加tmall-on类
			如果单击的#dianpu,那么就给.search-center添加dianpu-on类
		************************************************/
		$('.search-center').attr('class', 'search-center fl '+$(this).attr("id")+'-on');
		
	});

	//当单击搜索框上面文字和放大镜的时候，让搜索框获取焦点（触发搜索框获取焦点的事件）
	$('.search-box>span,.search-box>em').on('click', function(e){
		$('#q').focus();
	});

	//当在搜索框里面输入的时候，判断：如果输入的内容不为空，那么让搜索框上面的文字和放大镜隐藏(给search-box添加q-not-empty类)；否则，就显示(给search-box去掉q-not-empty类)
	$('#q').on('input', function(e){
		// console.log( $(this).val() );
		if( $(this).val()!='' ){
			$('.search-box').addClass('q-not-empty');
		}else{
			$('.search-box').removeClass('q-not-empty');
		}
	});

	//当单击照相机的时候，触发单击上传文件的事件
	$('.search-box>i').on('click', function(e){
		// $('#upload-file').click();
		$('#upload-file').trigger('click');
	});


	//当窗口滚动的时候，判断是否吸顶：如果窗口上方隐藏页面的高度（窗口滚动坐标值的纵坐标）>=search-box文档坐标值的纵坐标，那么就应该吸顶；否则，应该处于标准流中
	var search_box_top = $('.search-box').offset().top;
	$(window).on('scroll', function(e){
		console.log( $('.search-box').offset().top );  //该值吸顶以后，会发生变化，所以应该提前保存
		if( $(window).scrollTop()>= search_box_top ){
			// $('.search-wrapper>div').css({position:'fixed', top:0});
			$('.search-wrapper>div').addClass('search-fixed');

			//触发用户单击当前搜索选项，让其成为父级的第一个孩子
			$('.search-select>li.on').click();
		}else{
			// $('.search-wrapper>div').css({position:'static'});
			$('.search-wrapper>div').removeClass('search-fixed');
		}
	});

	//当用户鼠标移上搜索选项的时候，显示所有的搜索选项（给search-select加hover类）；
	//当用户鼠标移开搜索选项的时候，显示只显示第一个搜索选项（给search-select去掉hover类）；
	$('.search-select').hover(function(e){
		$(this).toggleClass('hover');
	});

	//当用户单击搜索选项的时候，让它成为search-select内部第一个元素
	$('.search-select>li').on('click', function(e){
		//只有搜索框是定位的情况，才让单击的li成为其父级的第一个元素
		if( $('.search-wrapper>div').hasClass('search-fixed') ){  //说明搜索是定位
			// $(this).prependTo( $(this).parent() );
			$(this).parent().prepend( $(this) );
		}
	});

	//当单击二维码上面叉号的时候，关闭二维码
	$('#qr>span').bind('click', function(e){
		$('#qr').hide();
	});

	//主题市场导航
	//当鼠标移动到某个li上的时候，给它的二级菜单显示（给它加on类）
	$('.market-list>li').hover(function(e){
		$(this).toggleClass('on');
	});

	//主题市场导航
	//当鼠标移上.market-list的时候，让对应的二级菜单淡入显示
	$('.market-list').on('mouseenter', function(e){
		//$('.market-submeu').fadeIn();   //错误的做法
		//只让鼠标移上li(e.target)对应的二级菜单显示
		$(e.target).children('.market-submeu')
						.css({opacity:0}).stop(true).animate({opacity:1}, 500);
						//.css()和.animate()中修改opacity已经向低版本IE做了兼容
	});


	//主要服务
	/*
		主要服务中的li中的span的索引值      背景图定位坐标
					0                           0 0px
					1                           0 -44px
					2                           0 -88px
					3                           0 -(3*44)px
					index                       0 -(index*44)px
	 */
	 $('#main-services span').each(function(index, el){
	 	$(el).css('background-position', '0 -'+(index*44)+'px');
	 });

	 //主要服务
	 //当鼠标移上某个服务的时候，给它加on(会显示它的二级菜单，我们用落空类做的)
	 $('#main-services>li:lt(4)').mouseenter(function(e){
	 	$(this).addClass('on').siblings().removeClass('on');
	 });

	 //当单击主要服务上的叉号的时候，隐藏二级菜单(给对应的li去掉on类)
	 $('#main-services i').on('click', function(e){
	 	$(this).parent().parent().removeClass('on');
	 })
});

// 焦点图1
$(function(){
	var idx=0;   //当前角标的索引值
	var timer;
	var $banner1_span = $('#banner1>span');
	var $banner1_ul   = $('#banner1>ul');
	var $banner1_ol_li = $('#banner1>ol>li');

	$('#banner1').on({
		//当鼠标移上焦点图的时候，显示向前和向后按钮
		//当鼠标移上焦点图的时候，停止图片的自动播放
		mouseenter: function(e){
			$banner1_span.show();

			clearInterval(timer);
		},
		//当鼠标离开焦点图的时候，隐藏向前和向后按钮
		//当鼠标离开焦点图的时候，每隔三秒播放下一个图片区域
		mouseleave:function(e){
			$banner1_span.hide();

			timer = setInterval(function(){
				//触发用户单击向后按钮事件
				$banner1_span.eq(1).click();
			}, 3000);
		}
	}).mouseleave();  //触发鼠标离开事件，让焦点图自动播放


	//当单击向后按钮的时候
	$banner1_span.eq(1).on('click', function(e){
		//判断：如果焦点图处于动画状态，那么就不允许用户单击
		if( $banner1_ul.is(':animated') ){   //正在进行动画
			return;   //return有阻止函数运行的作用
		}

		idx++;
		/***********************************************
				idx的取值    0  1  2  3  4
				idx++        1  2  3  4  5(非正常状态，需要特殊处理)
		************************************************/

		/***********************************************
				idx的值      显示图片的编号   ul的left值
				    0              1            -0%
				    1              2            -100%
				    2              3            -200%
				    ...
				    idx            idx+1        -idx00%
		***********************************************/
		if(idx>=$banner1_ol_li.length){   //非正常状态，需要特殊处理
			idx = 0;

			//角标的工作
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');

			//图片的工作
			//当1图片区域的替身出现的时候，瞬间替换为它的本尊
			$banner1_ul.stop(true).animate({left:'-'+$banner1_ol_li.length+'00%'}, 1000, 'swing', function(){
				//回调函数：当动画运行完毕的时候，会执行该函数
				$(this).css({left:'0%'});
			});

		}else{    //正常状态
			//角标的工作:让下一个角标处于当前状态(加cur类),其他都不加cur类
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');

			//图片区域的工作
			$banner1_ul.stop(true).animate({left:'-'+idx+'00%'}, 1000);
		}
		
	});

	//当单击向前按钮的时候，图片区域应该向右走
	$banner1_span.eq(0).on('click', function(e){
		//判断：如果焦点图处于动画状态，那么就不允许用户单击
		if( $banner1_ul.is(':animated') ){   //正在进行动画
			return;   //return有阻止函数运行的作用
		}

		idx--;
		/***********************************************
				idx的取值    0  1  2  3  4
				idx--       -1  0  1  2  3
		************************************************/

		if(idx<0){   //非正常状态，需要特殊处理
			idx = $banner1_ol_li.length-1;

			//角标的工作
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');

			//图片的工作
			//将1瞬间替换为它的替身，让这个替身向右走
			$banner1_ul.css({left:'-'+$banner1_ol_li.length+'00%'}).stop(true).animate({left:'-'+idx+'00%'}, 1000);
		}else{   //正常状态
			//角标的工作:让下一个角标处于当前状态(加cur类),其他都不加cur类
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');

			//图片区域的工作
			$banner1_ul.stop(true).animate({left:'-'+idx+'00%'}, 1000);
		}
	});

	//当单击角标的时候
	$banner1_ol_li.on('click', function(e){
		if(idx==$banner1_ol_li.length-1 && $(this).index()==0 ){   //如果当前选中的角标是最后一个，这个时候，用户单击的是第一个角标
			//功能同单击向后按钮：我们只需要触发一下用户单击向后按钮即可
			// $('#banner1>span').eq(1).click();
			$banner1_span.eq(1).trigger('click');
		}else if(idx==0 && $(this).index()==$banner1_ol_li.length-1 ){  //如果当前选中的角标是第一个，这个时候，用户单击的是最后一个角标
			//功能同单击向前按钮：我们只需要触发一下用户单击向前按钮即可
			$banner1_span.eq(0).trigger('click');
		}else{   //正常状态
			//角标的工作：让用户单击的角标处于当前状态
			idx = $(this).index();
			$(this).addClass('cur').siblings().removeClass('cur');

			//图片的工作：显示和角标对应的图片
			$banner1_ul.stop(true).animate({left:'-'+idx+'00%'}, 1000);
		}
	
	});
});

// 焦点图2
$(function(){
	var idx=0;    //当前角标的索引值
	var timer;
	var $banner2_span = $('#banner2>span');
	var $banner2_ul   = $('#banner2>ul');
	var $banner2_ol_li = $('#banner2>ol>li');
	var $banner2_header_strong = $('.banner2-header>strong');

	$banner2_header_strong.html('<i>'+(idx+1)+'</i>/'+$banner2_ol_li.length);

	/*//当鼠标移上焦点图的时候，显示向前和向后按钮
	//当鼠标移上焦点图的时候，停止图片的自动播放
	$('#banner2').mouseenter(function(e){
		$('#banner2>span').show();

		clearInterval(timer);
	});

	//当鼠标离开焦点图的时候，隐藏向前和向后按钮
	//当鼠标离开焦点图的时候，每隔三秒播放下一个图片区域
	$('#banner2').mouseleave(function(e){
		$('#banner2>span').hide();

		timer = setInterval(function(){
			//触发单击向后按钮事件
			$('#banner2>span').eq(1).click();
		}, 3000);
	});

	$('#banner2').mouseleave();  //触发鼠标离开焦点图的时候，让焦点图自动播放
	*/

	$('#banner2').on({
		//当鼠标移上焦点图的时候，显示向前和向后按钮
		//当鼠标移上焦点图的时候，停止图片的自动播放
		mouseenter: function(e){
			$banner2_span.show();

			clearInterval(timer);
		},
		
		//当鼠标离开焦点图的时候，隐藏向前和向后按钮
		//当鼠标离开焦点图的时候，每隔三秒播放下一个图片区域
		mouseleave: function(e){
			$banner2_span.hide();

			timer = setInterval(function(){
				//触发单击向后按钮事件
				$banner2_span.eq(1).click();
			}, 3000);
		}
	}).mouseleave();  //触发鼠标离开焦点图的时候，让焦点图自动播放

	//当单击向后按钮的时候,让ul向左走
	$banner2_span.eq(1).on('click', function(e){
		if( $banner2_ul.is(':animated') ){    //如果ul处于动画状态，那么就禁止单击
			return;
		}

		idx++;

		if(idx>=$banner2_ol_li.length){
			idx = 0;

			//角标的工作
			
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');

			//图片的工作
			$banner2_ul.animate({left:'-'+$banner2_ol_li.length+'00%'}, 1000, 'swing', function(){
				$(this).css({left:'-0%'});
			});

			$banner2_header_strong.html('<i>'+(idx+1)+'</i>/'+$banner2_ol_li.length);
		}else{
			//角标的工作
			
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			
			//图片的工作
			$banner2_ul.animate({left:'-'+idx+'00%'}, 1000);

			$banner2_header_strong.html('<i>'+(idx+1)+'</i>/'+$banner2_ol_li.length);
		}

	});

	//当单击向前按钮的时候,让ul向右走
	$banner2_span.eq(0).on('click', function(e){
		if( $banner2_ul.is(':animated') ){    //如果ul处于动画状态，那么就禁止单击
			return;
		}

		idx--;
		if(idx<0){   //特殊处理
			//角标的工作
			idx = $banner2_ol_li.length-1;
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');

			//图片的工作
			$banner2_ul.css({left:'-'+$banner2_ol_li.length+'00%'}).animate({left:'-'+idx+'00%'}, 1000);
		
			$banner2_header_strong.html('<i>'+(idx+1)+'</i>/'+$banner2_ol_li.length);
		}else{
			//角标的工作
			
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			
			//图片的工作
			$banner2_ul.animate({left:'-'+idx+'00%'}, 1000);

			$banner2_header_strong.html('<i>'+(idx+1)+'</i>/'+$banner2_ol_li.length);
		}
	});

	//当用户单击某个角标的时候
	$banner2_ol_li.on('click', function(e){
		if( idx==$banner2_ol_li.length-1 && $(this).index()==0 ){   //当选中的是最后一个角标，用户单击的是第一个角标
			//功能同单击向后按钮
			$banner2_span.eq(1).click();
		}else if( idx==0 && $(this).index()==$banner2_ol_li.length-1 ){   //如果当前选中的是第一个角标，用户单击的是最后一个角标
			//功能同单击向前按钮
			$banner2_span.eq(0).click();

		}else{   //正常状态
			idx = $(this).index();
			//角标的工作
			$(this).addClass('cur').siblings().removeClass('cur');

			//图片的工作
			$banner2_ul.animate({left:'-'+idx+'00%'}, 1000);

			$banner2_header_strong.html('<i>'+(idx+1)+'</i>/'+$banner2_ol_li.length);
		}
	});
});


/*侧边栏导航start*/
$(function(){

	var $aside_nav_lis = $('#aside-nav>li');
	var $html_and_body = $('html,body');
	var $aside_nav     = $('#aside-nav');
	var $window        = $(window);
	var win_top;    //窗口的滚动坐标值
	var section_tops = [];

	$('.section').each(function(index){
		section_tops.push( $(this).offset().top-49 );
	});

	console.log( section_tops );


	//当鼠标移上某个侧边栏导航的时候，给它加hover类，表示鼠标移上应该显示的样式
	$aside_nav_lis.on('mouseenter', function(e){
		//判断：如果鼠标移上的侧边栏就是当前选中的，那么就不需要淡入
		if( $(this).hasClass('click')==false ){   //非选中状态
			$(this).addClass('hover')
				.css({opacity:0}).stop(true).animate({opacity:1}, 500);
		}
	});

	//当鼠标离开某个侧边栏导航的时候，给它去掉hover类
	$aside_nav_lis.on('mouseleave', function(e){
		$(this).removeClass('hover');
	});

	//当鼠标单击某个侧边栏导航的时候，给它加click类，它的兄弟们都去掉click类
	$aside_nav_lis.on('click', function(e){
		$(this).addClass('click').siblings().removeClass('click');
	});


	//当窗口滚动的时候，判断：如果窗口上方隐藏部分的高度>=一屏高度的时候，那么“返回顶部”显示；否则，就隐藏
	//当窗口滚动的时候，判断：如果窗口滚动坐标值的纵坐标+搜索框的高度>=侧边栏相对于第一屏定位的纵坐标的情况下，侧边栏应该吸顶；否则，不吸顶
	//当窗口滚动的时候，判断：侧边栏应该是哪一个处于选中状态
	var aside_nav_top = $aside_nav.position().top;
	// console.log(aside_nav_top);
	$window.on('scroll', function(e){
		win_top = $window.scrollTop();   //窗口的滚动坐标值
		if( win_top>=$window.height() ){
			$aside_nav_lis.eq(6).show();
		}else{
			$aside_nav_lis.eq(6).hide();
		}

		//侧边栏吸顶：判断：如果窗口滚动坐标值的纵坐标+搜索框的高度>=侧边栏相对于第一屏定位的纵坐标的情况下，侧边栏应该吸顶；否则，不吸顶
		if( win_top+49>=aside_nav_top ){
			$aside_nav.css({position:'fixed', top:49});  //固定定位的定位坐标是相对于浏览器窗口的
		}else{
			$aside_nav.css({position:'absolute', top:490});  //绝对定位的定位坐标是相对于第一屏的
		}


		// 判断：侧边栏应该是哪一个处于选中状态
		/*****************************************************************
			侧边栏的li           窗口滚动坐标值的范围
			我常逛的  选中      0~$('.section').eq(1).offset().top-49
			时尚      选中       ~$('.section').eq(2).offset().top-49
			品质      选中       ~$('.section').eq(3).offset().top-49
			特色      选中       ~$('.section').eq(4).offset().top-49
			实惠      选中       ~$('.section').eq(5).offset().top-49
			猜你喜欢  选中       其他的情况下
		******************************************************************/

		var which;   //当前窗口处于的区块的索引值，即应该选中的侧边栏li的索引值

		for(var i=0; i<section_tops.length; i++){    //i一次去section_tops数组的索引值，对概述进行遍历
			//判断：窗口滚动坐标值纵坐标 >= 某个区块的文档坐标的纵坐标-搜索框高度
			if( win_top >= section_tops[i] ){
				which = i;
			}
		}

		console.log(which);

		$aside_nav_lis.eq(which).addClass('click').siblings().removeClass('click');
	});

	//当单击“返回顶部”的时候，让窗口的滚动坐标值的纵坐标变为0
	$aside_nav_lis.eq(6).on('click', function(e){
		//对象需要选择html和body;
		//如果单选html，只针对IE和firefox生效；
		//如果单选body，只针对chrome生效；
		$html_and_body.animate({scrollTop:0}, 500);
	});


	//当单击某个侧边栏的时候，文档需要滚动到该侧边栏对应的区块，它的上侧紧贴搜索框的下侧
	// $('#aside-nav>li:lt(6)')
	$aside_nav_lis.filter(':lt(6)').on('click', function(e){
		$html_and_body.animate({scrollTop: section_tops[$(this).index()] }, 500);
	});
});
/*侧边栏导航end*/