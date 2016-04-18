//
//  バージョンアップ時コモン ver1.01
//
// author yana
//

var Imported = Imported || {};
Imported['VersionUpCommon'] = 1.01;

/*:
 * @plugindesc ver1.01/設定バージョンと記録バージョンが違うとき、コモンイベントの起動を予約します。
 * @author Yana
 * 
 * @param Game Version
 * @desc ゲームのバージョンです。このテキストと$gameSystem内に保存されている値とを比較します。
 * @default 1.00
 * 
 * @param Reserve Common ID
 * @desc バージョンが違う場合実行するコモンイベントのIDです。
 * @default 2
 * 
 * @param Show Game Version
 * @desc ゲームのバージョンをタイトルに表示するかの設定です。
 * true/falseで設定してください。
 * @default true
 * 
 * @param Version Text
 * @desc タイトルに表示するバージョンの前に追加するテキストです。
 * @default version.
 * 
 * @param Positon X
 * @desc タイトルのバージョンの位置X座標です。
 * @default 572
 * 
 * @param Position Y
 * @desc タイトルのバージョンの位置Y座標です。
 * @default 594
 * 
 * @param Text Alignment
 * @desc テキストのアライメントです。
 * left,center,rightのいずれかを指定してください。
 * @default right
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------ 
 * 
 * プラグインパラメータで、バージョンが違った際実行するコモンイベントIDを指定してください。
 * 現在のゲームのバージョンは、$gameSystem._gameVersionで、
 * 更新前のゲームのバージョンは$gameSystem._preVersionで取得できます。
 * 
 * 現在のバージョンを条件にイベントコマンドで分岐を行う際は、条件分岐→スクリプトで、
 * $gameSystem._gameVersion === 'ゲームのバージョン'
 * 
 * 更新前のバージョンを条件にイベントコマンドで分岐を行う際は、条件分岐→スクリプトで、
 * $gameSystem._preVersion === 'ゲームのバージョン'
 * 
 * で判定してください。
 * 
 * コモンイベントの作成例は、添付の画像を参照してください。
 * このように作成すると、
 * 1.0.0→1.0.3に更新:1.01~1.03までのすべての更新内容を通る
 * 1.0.2→1.0.3に更新:1.03の更新内容のみ通る。
 * というような挙動になるので、必要な更新内容のみを通すことができます。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------ 
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.01:
 * ヘルプを追加
 * プラグインパラメータの説明を一部修正
 * ver1.00:
 * 公開
 */

(function(){
	
	var parameters = PluginManager.parameters('VersionUpCommon');
	var gameVersion = String(parameters['Game Version']);
	var reserveCommonId = Number(parameters['Reserve Common ID']);
	var showGameVersion = String(parameters['Show Game Version']) === 'true';
	var versionText = String(parameters['Version Text'] || 'Version.');
	var posX = Number(parameters['Position X'] || 572);
	var posY = Number(parameters['Position Y'] || 594);
	var textAlign = Number(parameters['Text Alignment'] || 'right');
	
	var _vr_cmn_GSystem_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_vr_cmn_GSystem_initialize.call(this);
		this._gameVersion = gameVersion;
	};
	
	var _vr_cmn_SMap_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function(){
		_vr_cmn_SMap_start.call(this);
		this.checkVersion();
	};

	Scene_Map.prototype.checkVersion = function() {
		if ($gameSystem._gameVersion !== gameVersion){
			$gameSystem._preVersion = $gameSystem._gameVersion;
			$gameSystem._gameVersion = gameVersion;
			$gameTemp.reserveCommonEvent(reserveCommonId);
		}
	};
	
	var _vr_cmn_STitle_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function() {
		_vr_cmn_STitle_create.call(this);
		if (showGameVersion){ this.createVersionSprite() }
	};
	
	Scene_Title.prototype.createVersionSprite = function() {
		var x = posX;
		var y = posY;
		var w = 240;
		var h = 24;
		this._verSprite = new Sprite(new Bitmap(w,h));
		this._verSprite.setFrame(0,0,w,h);
		this._verSprite.x = x;
		this._verSprite.y = y;
		this.addChild(this._verSprite);
		this._verSprite.bitmap.drawText(versionText + gameVersion,0,0,w,h,textAlign);
	};
	
}());
