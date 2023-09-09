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

//スクロール//
$(function(){
 var header = $('header')
 header_offset = header.offset();
 header_height = header.height();
  $(window).scroll(function () {
   if($(window).scrollTop() > header_height) {
    header.addClass('scroll');
   }else {
    header.removeClass('scroll');
   }
  });
});



//フェードイン//
$(function(){
  // スクロールごとに処理をさせる
  $(window).on('scroll',function(){
    // スクロール毎の処理

    // スクロール量を取得
    var scroll_top = $(window).scrollTop();

    // eachを利用して「effect」クラスの要素それぞれに処理を行なう
    $('.effect').each(function(){
      // 要素のドキュメント上の位置を取得
      var offset_top = $(this).offset().top,
          top_margin = 600 ; // 画面上端からのマージン
      // スクロール量と要素の位置からマージンを引いた値を比較
      if( scroll_top > offset_top - top_margin ){
        // スクロール量が所定の位置を越えた時にfadeinクラスを付与
          $(this).addClass('fadein');       
      }else{
        // スクロール量が所定の位置を越えていない場合はfadeinクラスを外す
          $(this).removeClass('fadein');       
      }
    });
  });
});

//画像切り替え//
$(function() {
  // 置換の対象とするclass属性。
  var $elem = $('.js-image-switch');
  // 置換の対象とするsrc属性の末尾の文字列。
  var sp = '_sp.';
  var pc = '_pc.';
  // 画像を切り替えるウィンドウサイズ。
  var replaceWidth = 768;

  function imageSwitch() {
    // ウィンドウサイズを取得する。
    var windowWidth = parseInt($(window).width());

    // ページ内にあるすべての`.js-image-switch`に適応される。
    $elem.each(function() {
      var $this = $(this);
      // ウィンドウサイズが768px以上であれば_spを_pcに置換する。
      if(windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));

      // ウィンドウサイズが768px未満であれば_pcを_spに置換する。
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }
  imageSwitch();

  // 動的なリサイズは操作後0秒経ってから処理を実行する。
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 0);
  });
});

//フェードイン//
$(function() {
  
  $('.fade_in').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('fade_in_anime');
    } else {     $(this).removeClass('fade_in_anime');
    }
  });

    $('.up').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('up_anime');
    } else {
      $(this).removeClass('up_anime');
    }
  });

    $('.side').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('side_anime');
    } else {
      $(this).removeClass('side_anime');
    }
  });
  
   $('.side_left').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('side_left_anime');
    } else {
      $(this).removeClass('side_left_anime');
    }
  });
	
    $('.side_right').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('side_right_anime');
    } else {
      $(this).removeClass('side_right_anime');
    }
  });
	
	$('.slanting_right').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('up_slanting_right');
    } else {
      $(this).removeClass('up_slanting_right');
    }
  });
	
	$('.slanting_left').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('up_slanting_left');
    } else {
      $(this).removeClass('up_slanting_left');
    }
  });

});

// eachTextAnimeにappeartextというクラス名を付ける定義
function EachTextAnimeControl() {
  $('.eachTextAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("appeartext");

    } else {
      $(this).removeClass("appeartext");
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  EachTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  //spanタグを追加する
  var element = $(".eachTextAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = "";
    text.split('').forEach(function (t, i) {
      if (t !== " ") {
        if (i < 10) {
          textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
        } else {
          var n = i / 10;
          textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
        }

      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  EachTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

//基準点の準備
var elemTop = [];

//現在地を取得するための設定を関数でまとめる
function PositionCheck(){
    //headerの高さを取得
  var headerH = $("#header").outerHeight(true);
    //.scroll-pointというクラス名がついたエリアの位置を取得する設定
  $(".scroll-point").each(function(i) {//.scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
    elemTop[i] =Math.round(parseInt($(this).offset().top-headerH));//追従するheader分の高さ（70px）を引き小数点を四捨五入
  });
}

//ナビゲーションに現在地のクラスをつけるための設定
function ScrollAnime() {//スクロールした際のナビゲーションの関数にまとめる
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $("#g-nav li");//ナビゲーションのliの何番目かを定義するための準備
  $("#g-nav li").removeClass('current');//全てのナビゲーションの現在地クラスを除去
  if(scroll >= 0 && scroll < elemTop[1]) {//スクロール値が0以上 .scroll-point 1つめ（area-1）の高さ未満
      $(NavElem[0]).addClass('current');//1つめのliに現在地クラスを付与
    }
  else if(scroll >= elemTop[1] && scroll < elemTop[2]) {//.scroll-point 1つめ（area-1）以上.scroll-point 2つめ（area-2）未満
     $(NavElem[1]).addClass('current');//2つめのliに現在地クラスを付与
    } 
    else if(scroll >= elemTop[2] && scroll < elemTop[3]) {//.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
     $(NavElem[2]).addClass('current');//3つめのliに現在地クラスを付与
    } 
    else if(scroll >= elemTop[3] && scroll < elemTop[4]) {//.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
     $(NavElem[3]).addClass('current');//3つめのliに現在地クラスを付与
    } 
	else if(scroll >= elemTop[4] && scroll < elemTop[5]) {//.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
     $(NavElem[4]).addClass('current');//3つめのliに現在地クラスを付与
    } 
	else if(scroll >= elemTop[5] && scroll < elemTop[6]) {//.scroll-point 2つめ（area-2）以上.scroll-point 3つめ（area-3）未満
     $(NavElem[5]).addClass('current');//3つめのliに現在地クラスを付与
    } 
	else if(scroll >= elemTop[6]) {// .scroll-point 3つめ（area-3）以上
      $(NavElem[6]).addClass('current');//4つめのliに現在地クラスを付与
    }  
}

//ナビゲーションをクリックした際のスムーススクロール
$('#g-nav a').click(function () {
  var elmHash = $(this).attr('href'); //hrefの内容を取得
  var headerH = $("#header").outerHeight(true);//追従するheader分の高さ（70px）を引く
  var pos = Math.round($(elmHash).offset().top-headerH);  //headerの高さを引き小数点を四捨五入
  $('body,html').animate({scrollTop: pos}, 500);//取得した位置にスクロール※数値が大きいほどゆっくりスクロール
  return false;//リンクの無効化
});


// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PositionCheck();/* 現在地を取得する関数を呼ぶ*/
  ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PositionCheck();/* 現在地を取得する関数を呼ぶ*/
  ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
});

$(window).resize(function() {
  //リサイズされたときの処理
  PositionCheck()
});

// 追従ナビ・スマホでハンバーガーメニューになる
(function($) {
  $(function() {
      var $header = $('#head_wrap');
      // Nav Fixed
      $(window).scroll(function() {
          if ($(window).scrollTop() > 1000) {
              $header.addClass('fixed');
          } else {
              $header.removeClass('fixed');
          }
      });
      // Nav Toggle Button
      $('#nav-toggle, #global-nav ul li a').click(function(){
          $header.toggleClass('open');
      });
  });
})(jQuery);

