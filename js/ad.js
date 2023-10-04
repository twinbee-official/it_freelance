$(function() {
	$('.btnset').prev().hide();
	$('.btnset').click(function(e) {
		e.preventDefault();
		// var $img = $(this).find('img');
		if ($(this).prev().is(':hidden')) {
			$(this).prev().slideDown();
			$(this).find('.button').text('-タップ閉じる').addClass('boxclose').removeClass('boxopen');
		} else {
			$(this).prev().slideUp();
			$(this).find('.button').text('＋タップで詳しくみる').removeClass('boxclose').addClass('boxopen');
		}
	});
});

