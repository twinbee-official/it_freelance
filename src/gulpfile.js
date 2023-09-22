//gulpプラグイン読み込み
const { src, dest, watch, parallel } = require("gulp"),
	browsersync = require('browser-sync').create();

// ファイルのリネーム
const rename = require("gulp-rename");

// EJS
const ejs = require("gulp-ejs");

// Sassをコンパイル
const sass = require('gulp-sass')(require('sass'));

// ベンダープレフィクス付与
const autoprefixer = require("gulp-autoprefixer");

// 画像圧縮
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

//browserSync読み込み
const browserSync = require("browser-sync").create();

//ローカルサーバー読み込み
const gulpConnect = require("gulp-connect-php");

//SSI（サーバサイドインクルード）読み込み
const connectSSI = require("connect-ssi");


/**
 * EJSコンパイル
 */
const ejsComp = () => {
	return src(["./_develop/**/*.ejs","!./_develop/_inc/_parts/*.ejs"])
		.pipe(ejs({}, {}, { ext: '.html' }))
		.pipe(rename({ extname: ".php" }))
		.pipe(dest('./assets/'));
}


/**
 * Sassコンパイル
 */
const sassComp = () => {
	return src('./_develop/_style/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 2 versions", "ie >= 11"],
			cascade: false
		}))
		.pipe(dest('./assets/style/'));
}


/**
 * JSコンパイル
 */
const jsComp = () => {
	return src('./_develop/_js/*.js')
		.pipe(dest('./assets/js/'))
}


/**
 * 画像圧縮
 */
 const imgMin = () => {
	return src('./_develop/_images/**')
	.pipe(changed('./assets/images/**'))
	.pipe(
		imagemin([
			pngquant({
				quality: [.60, .70], // 画質
				speed: 1 // スピード
			}),
			mozjpeg({ quality: 65 }), // 画質
			imagemin.svgo(),
			imagemin.optipng(),
			imagemin.gifsicle({ optimizationLevel: 3 }) // 圧縮率
		])
	)
	.pipe(dest('./assets/images/'));
}


/**
 * ブラウザシンク
 */
const taskServer = (done) => {
	gulpConnect.server({
		base: "./assets/", //出力先のフォルダパス
		port: 3001
	}, function () {
		browserSync.init({
			proxy: "localhost:3001",
			open: false,
			middleware: [/*SSI有効*/
				connectSSI({
					baseDir: "./assets/",
					ext: ".html"
				})
			]
		});
	});
	done();
};


/**
 * リロード処理
 */
const taskReload = (done) => {
	browsersync.reload();
	done();
};


/**
 * ファイル監視
 */
const taskWatch = (done) => {
	watch('./assets/**/*', taskReload);
	watch('./_develop/**/*.ejs', parallel(ejsComp));
	watch('./_develop/**/_style/*.scss', parallel(sassComp));
	watch('./_develop/**/_js/*.js', parallel(jsComp));
	watch('./_develop/**/_images/**', parallel(imgMin));

	done();
}


/**
 * gulpタスク処理
 */
exports.default = parallel(taskServer, taskWatch);