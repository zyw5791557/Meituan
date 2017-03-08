

function  getTime(){
	var EndTime = new Date('2016/12/15 18:00:00');
	var NowTime = new Date();
	var t = EndTime.getTime() - NowTime.getTime();
	var sec = 0;
	var min = 0;
	var hour = 0;
	if (t >= 0) {
		sec = Math.floor(t/1000 % 60);
		min = Math.floor(t/1000/60 % 60);
		hour = Math.floor(t/1000/60/60 % 24);
		day = Math.floor(t/1000/60/60/24);
	}
	if (sec < 10) {
		sec = '0' + sec;
	}
	if (min < 10) {
		min = '0' + min;
	}
	if(day > 0){
		hour = day * 24 + hour;
	}else {
		if (hour < 10) {
			hour = '0' + hour;
		}else {
			hour = hour;
		}
	}
	document.getElementsByClassName('time-sec')[0].innerHTML = sec;
	document.getElementsByClassName('time-min')[0].innerHTML = min;
	document.getElementsByClassName('time-hour')[0].innerHTML = hour;
}

setInterval(getTime,0);

$('.top-btn').click(function(){
	var top = $(window).scrollTop();
	$('body').animate({scrollTop:0},500,'linear');
})



function  ajax(groud){
	$(document).ajaxStart(function(){
		$('.loadingEnd').hide();
		$('#loading').show();
	})
	
	$(document).ajaxStop(function(){
		$('.loadingEnd').show();
		$('#loading').hide();
	})
	
	var jsonUrl = "http://diviner.jd.com/diviner?p=610009&uuid=12396477&lid="+ group +"&lim=15&cb=tempGuessLikeCallback";

	$.ajax({
		url:jsonUrl,
		dataType:"jsonp",
		scriptCharset:'gb2312',
		jsonpCallback: 'tempGuessLikeCallback',	
		async:true,
		error:getError,
		success:getData
	});
	
	function getError(){
		console.log('ajax请求数据失败');
	}
	
	function getData(data){
		$.each(data.data,function(index,ele){
			var dd = $('#guessLike').find('dd').eq(0).clone(true).addClass('clone').fadeIn(500);
			$(dd).find('.list-title').text(ele.t);
			$(dd).find('.price .strong').text(ele.jp);
			$(dd).find('.list-img img').attr('src',"http://img13.360buyimg.com/n1/s200x200_" + ele.img);
			var str = ele.sku;
			if(str > 10000000){
				str = 10000000;
			};
			$(dd).find('.line-right').text('剩余:' + str);
			$(dd).appendTo($('#guessLike .list'));
		})
	}
	
	
	
}

var group = 1;

ajax(group);

$(window).scroll(function(){
	var top = Math.floor($(this).scrollTop());
	
	if (top > 300) {
		$('.top-btn').show();
	}else {
		$('.top-btn').hide();
	}
	
	var client = $(document).height();
	var page = $(window).height();
	if (client - page - top <= 1) {
		group++; 
		ajax(group);
	}
})



var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
       //如果需要分页器
    paginationClickable: true,
    pagination: '.swiper-pagination'
    
 })



