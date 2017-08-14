// 公用的JS文件

$(function(){
	//判断：用户导航右侧的菜单，如果下方有二级菜单，那么才绑定事件
	$('.user-nav-right>li').each(function(index, el){
		//判断当前正在被加工的元素el下方有无二级菜单
		console.log( $(el).children('.submenu').length );
		if( $(el).children('.submenu').length>=1 ){   //说明下方有二级菜单
			//当鼠标移上用户导航右侧的菜单的时候，显示它下方的二级菜单(给它加on)
			//当鼠标离开用户导航右侧的菜单的时候，隐藏它下方的二级菜单(给它去掉on)
			$(el).hover(function(e){
				$(this).toggleClass('on');
			});
		}
	});

		
});
