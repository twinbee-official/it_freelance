$(document).ready(function(){
 
    $(".gotop").hide();
     // ↑ページトップボタンを非表示にする
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
            // ↑ スクロール位置が100よりも小さい場合に以下の処理をする
                $('.gotop').fadeIn("slow");
                // ↑ (100より小さい時は)ページトップボタンをスライドダウン
            } else {
                $('.gotop').fadeOut("slow");
                // ↑ それ以外の場合の場合はスライドアップする
            }
        });
 

    });
 
});


//プルダウンメニュー用//
jQuery(function(){
	$(".menubtn").click(function(){
		$("#menu").toggleClass('togmenu');
	});	
});

/* S*/
