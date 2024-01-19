var CHKDEVICE = CHKDEVICE || {};
CHKDEVICE.module = CHKDEVICE.module || {};

/**
 * 初期化処理
 * @returns {string} device
 * デバイス判定結果
 */
CHKDEVICE.module.init = function() {
	const ua = navigator.userAgent;
	let device;
	if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
		// スマートフォン
		device = 'sp';
	} else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
		// タブレット
		device = 'tablet';
	} else {
		// PC
		device = 'pc';
	}
	return device;
}