var COMMON = COMMON || {};
COMMON.module = COMMON.module || {};
// デバイス判定
COMMON.device = COMMON.device || {};
COMMON.device = CHKDEVICE.module.init();

/**
 * ヘッダーナビカレント表示
 * @param {number} setPos 
 * 発火位置の設定
 */
COMMON.module.addCurrentClass = function(device,$section,setPos,$target) {
	let boxTop = new Array;
	let current = -1;
	let isHeader;

	if($target.attr('class').indexOf('jsc_header_menuList_link') > 0) {
		// $targetがヘッダーリンクの要素の場合
		isHeader = true;
	} else {
		// セクションコンテンツの場合、MVにカレントクラス付与
		$target.eq(0).addClass('is_current');
		if(device === 'tab' || device === 'sp') {
			// デバイス別で発火タイミング変更
			setPos = setPos - 50;
		}	
	}

	$section.each(function(i) {
		boxTop[i] = $(this).offset().top;
	});

	$(window).scroll(function() {
		//スクロール時
		scrollPosition = $(window).scrollTop();
		for (var i = boxTop.length - 1; i >= 0; i--) {
			if ($(window).scrollTop() > boxTop[i] - setPos) {
				COMMON.module.chgCurrentPos(i,current,$target,isHeader);
				break;
			}
		};
	});
}

/**
 * カレント位置の判定
 * @param {number} sectionNumber
 * 各セクションの振り番号
 * @param {number} current
 * 現在位置の振り番号
 */
COMMON.module.chgCurrentPos = function(sectionNumber,current,$target,isHeader) {
	if (sectionNumber != current) {
		current = sectionNumber;

		if(isHeader) {
			// 初期化
			$target.removeClass('is_current');
		}
		$target.eq(current).addClass('is_current');
	}
}

/**
 * アンカーリンク
 * @param {jquery object} $target 
 * クリックするリンク要素
 * @param {number} adjust
 * 発火位置の調整用
 * @param {number} speed 
 * スクロールのスピード
 */
COMMON.module.jumpAnchorLink = function($target, adjust, speed) {
	$target.click(function(e) {
		//URLのパス名を取得、スラッシュで分割
		const currentUrl = location.pathname.split("/");
		//リンク先のURLを取得、スラッシュで分割（リンク先はルートパスで指定）
		const targetUrl = $(this).attr("href").split("/");

		let target;
		let position;

		if ($("body").attr("id") === "top") {
			if (targetUrl[1].match("^#")) {
				target = $(targetUrl[1]);
				position = target.offset().top - adjust;
				$("body,html").stop().animate({
					scrollTop: position
				}, speed);

				e.preventDefault();
			}
		} else {
			// 下層ページ内リンク遷移
			const href = $(this).attr("href");
			// ヘッダーの高さ分調節
			const headerH = $('.jsc_header').height();

			// 移動先を取得
			target = $(href == "#" || href == "" ? 'html' : href);
			// 移動先を調整
			position = target.offset().top + adjust - headerH;

			$('body,html').animate({
				scrollTop: position
			}, speed);
			e.preventDefault();
		}

		//現在地が下層ページの場合
		if (currentUrl[1] === targetUrl[1]) { //それぞれ「/」で区切ったものの1つ目が一致した場合
			target = $(targetUrl[2]);
			position = target.offset().top - adjust;
			$('body,html').stop().animate({
				scrollTop: position
			}, speed);

			e.preventDefault();
		}
	});

	// 下層ページからトップページに戻ってきた場合の処理
	const jumpedLink = location.href.split('/').slice(-1)[0];
	$(jumpedLink).addClass('is_current');
}

/**
 * ページトップ
 */
COMMON.module.pageTop = function() {
	const $pageTop = $('.jsc_pageTop_btn');
	$pageTop.hide();

	$(window).scroll(function() {
		if($(this).scrollTop() > 500) {
			$pageTop.fadeIn();
		} else {
			$pageTop.fadeOut();
		}
	});

	$pageTop.click(function () {
		$('body, html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
}


/**
 * ヘッダーナビ
 * @param {jquery} $target
 * ハンバーガーメニューボタン
 * @param {jquery} $link
 * メニューリンク
 */
COMMON.module.headerNav = function($target,$link) {
	$target.click(function() {
		if($(this).attr('class').indexOf('is_open') < 0) {
			$(this).addClass('is_open');
			$('body').addClass('is_header_opened');
		} else {
			$(this).removeClass('is_open');
			$('body').removeClass('is_header_opened');
		}
	});

	$link.click(function() {
		$target.removeClass('is_open');
		$('body').removeClass('is_header_opened');
	});
}

/**
 * アコーディオン開閉
 * @param {jquery} $openBtn
 * 開くボタン
 * @param {jquery} $target
 * アコーディオン内コンテンツ
 * @param {jquery} $closeBtn
 * 閉じるボタン
 */
COMMON.module.acdnFunc = function($openBtn,$target,$closeBtn) {
	$openBtn.click(function() {
		$(this).toggleClass('is_open');
		$(this).next($target).slideToggle();
	});

	$closeBtn.click(function() {
		$openBtn.removeClass('is_open');
		$(this).parent().slideUp();
	});
}


/**
 * タブ切り替え
 * @param {jquery} $tabItem
 * タブアイテム
 * @param {jquery} $target
 * タブコンテンツ
 * @param {jquery} speed
 * フェード切り替え速度
 */
COMMON.module.tabFunc = function($tabItem,$target,speed) {
	$tabItem.on("click", function () {
    $(".is_current").removeClass("is_current");
    $(this).addClass("is_current");
    // クリックされた要素が何番目か取得（クリックしたタブのインデックス番号を取得）
    const index = $(this).index();
    // クリックしたタブのインデックス番号と同じコンテンツを表示
    $target.hide().eq(index).fadeIn(speed);
  });
}

/**
 * Instagramの投稿表示
 * @param {jquery} $output
 * 出力エリア
 */
COMMON.module.igApi = function($output) {
	let list = '';
	//表示件数
  const limit = 16;
	// アクセストークン
  const accessToken = "EAAJlSmuoEMYBO009KYfkU9cqcCXY6eNZBlcbjmwUQMSVY4u89T3GA5Nmjm0mQBShU1lTS1FfCPvQ29IfCaOFGpy1aZBLxbNTZBzFs7olR8IgAIw3ZCoTKarzSM6QNmhHp4LZCaX1tCXgKBa6jT4GvcW7TZBmJu4ZA5y19mQzE5gAlAyZCQbvbeb8MZAJ4CtfdUIGf";
  const businessID = 17841458595935178;
  const url = `https://graph.facebook.com/v10.0/${businessID}?fields=name,media.limit(${limit}){caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type}&access_token=${accessToken}`;
  $.ajax({
    url: url
  }).done((res)=> {
    const data = res.media;
    $.each(data, function(index, val) {
      $.each(val, function(i, item) {
        console.log(item);
        if(item.media_url){
          //メディアのタイプがビデオの場合、サムネを取得
          media = (item.media_type == 'VIDEO' ? item.thumbnail_url : item.media_url);

          // 一覧を変数listに格納
          list +=
          `<li class="instagram_listItem">
            <a href="${item.permalink}" target="_blank" rel="noopener" class="instagram_listItem_link">
            <img src="${media}" class="instagram_listItem_img">
          </li>`;
        }

      })
    });
		$output.html(`<ul class="instagram_list">${list}</ul>`);
  }).fail(function(jqXHR, status) {
    $output.html('<p>読み込みに失敗しました。</p>');
  });
}

/**
 * 初期化処理
 */
COMMON.module.init = function() {
	if($('body').attr('id') === 'top') {
		// ヘッダーナビのカレント処理
		COMMON.module.addCurrentClass(COMMON.device,$('.jsc_section'),50,$('.jsc_header_menuList_link'));
		COMMON.module.addCurrentClass(COMMON.device,$('.jsc_section'),650,$('.jsc_section'));
	}

	// ヘッダーハンバーガーメニュー開閉
	COMMON.module.headerNav($('.jsc_header_navBtn'),$('.jsc_header_menuList_link'));
	// アンカーリンク
	COMMON.module.jumpAnchorLink($('.jsc_header_menuList_link'),0,800);
	COMMON.module.jumpAnchorLink($('.jsc_free_memberRegist_anchor_link'),0,800);
	// ページトップ
	COMMON.module.pageTop();

	// アコーディオン開閉
	COMMON.module.acdnFunc($('.jsc_acdn_btn'),$('.jsc_acdn_content'),$('.jsc_acdn_close_btn'));

	// タブ切り替え
	COMMON.module.tabFunc($('.jsc_tabItem'),$('.jsc_tabItem_content'),300);

	// Instagram投稿表示
	COMMON.module.igApi($('#jsi_instagram_outputArea'));
}

$(function(){
	COMMON.module.init();
});