//
//  立ち絵表示制御文字 ver1.03
//
// author yana
//

var Imported = Imported || {};
Imported['StandPictureEC'] = 1.03;

if (!Imported.StandPictureSettingP) {
	console.error('StandPictureSettingPを導入してください。')
}

if (!Imported.StandPictureSettingM) {
	console.error('StandPictureSettingMを導入してください。')
}

/*:
 * @plugindesc ver1.03/立ち絵を表示したり動かしたりする制御文字を追加します。
 * @author Yana
 * 
 * @param Show Front
 * @desc 画像の表示位置Z座標です。
 * メッセージウィンドウより前面に表示する場合はtrueを指定してください。
 * @default false
 * 
 * @param Use Preloading
 * @desc 画像の事前読み込みを行うかの設定です。trueにすると、マップ切り替え時にイベントをチェックし、キャッシュを作成します。
 * @default true
 * 
 * @param Use Delete Cache
 * @desc マップ切り替え時に使用した画像のキャッシュを削除するかの設定です。trueにするとマップ切り替え毎にキャッシュを削除します。
 * @default true
 * 
 * @param Default Anchor X
 * @desc ピクチャのアンカー位置Xです。
 * デフォルトは0.5(画像の中心)です。0~1.0で指定してください。
 * @default 0.5
 * 
 * @param Default Anchor Y
 * @desc ピクチャのアンカー位置Yです。
 * デフォルトは1.0(画像の下端)です。0~1.0で指定してください。
 * @default 1.0
 * 
 * @param Default Opacity
 * @desc ピクチャの透明度の初期値です。
 * デフォルトは0(非表示)です。0~255で指定してください。
 * @default 0
 * 
 * @param Proxy Variable ID
 * @desc \PVの制御文字がこの数値と置き換わります。
 * 同じマクロを使いまわしたり、汎用性を上げるための仕組みです。
 * @default 1
 * 
 * @param Cursor Name
 * @desc スプライト選択時にカーソルとして使用する画像名です。
 * img/system/内に指定した画像を配置してください。
 * @default cursor
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * 
 * @help------------------------------------------------------
 *  プラグインコマンド
 * ------------------------------------------------------
 * 
 * ・スプライトをクリックで選択するための状態にする。
 * ChoicePicture 変数ID キャンセル許可状態
 * 
 * このプラグインコマンドは、必ずメッセージを表示して、制御文字でスプライトを表示した状態で呼び出してください。
 * コントローラや十字キーでカーソルを動かすと、専用のカーソルスプライトが表示されます。
 * キャンセル許可状態は、ture または false で指定してください。
 * falseの場合は省略することもできます。
 * また、画像名の項目で空欄を指定することで、カーソルによる選択自体を無効化することができます。
 * 
 * ------------------------------------------------------
 *　注意
 * ------------------------------------------------------
 * 
 * このプラグインが動作するためには、StandPictureSettingP及び、
 * StandPictureSettingMのプラグインが必要です。
 * 各プラグインは、
 * 
 * StandPictureSettingP
 * StandPictureSettingM
 * StandPictureEC
 * 
 * の順番で配置してください。
 * 
 * ------------------------------------------------------
 *　使い方
 * ------------------------------------------------------
 * 
 * 用意する画像のファイル名は
 * ○○○_×
 * として、img/picturesに用意してください。
 * ○○○の部分がStandPictureSettingPで設定したファイル名、
 * xの部分は画像インデックスになります。
 * このインデックスで瞬きや口パクなどの画像の切り替えを行います。
 * 瞬きや口パクを行わない場合はインデックスを付ける必要はありません。
 * 例:設定したファイル名がtest0の場合、test0.pngをimg/picturesに用意する。
 * 例:ファイル名がtest1で、[0,1,0]と瞬きをする場合、test1_0.pngとtest1_1.pngを用意する。
 * 
 * ※ver1.02より、img/pictures以外からも読み込めるようになりました。
 * 読み込むフォルダ/ファイル名 と指定することで、pictures以外のフォルダからも読み込めます。
 * 例:battleback1/DarkSpace
 * 
 * ver1.01より、事前ロードの設定とキャッシュ削除の設定が追加されました。
 * Use Preloadingをtrueにすると、Game_Mapのsetup実行時にそのマップで使われる可能性のある、
 * 全ての画像を抽出し、キャッシュを作成しておきます。
 * これにより、ブラウザなどで実行したとき、ロード待ちで画像が表示されないということが少なくなります。
 * (場所移動を行った直後にメッセージを表示して、立ち絵を使用すると発生する可能性があります)
 * Use Delete Cacheをtrueにすると、Game_Mapのsetup実行時に前回のマップで生成した、
 * 立ち絵画像のキャッシュをImageManager._cacheから削除します。
 * これを行うことで、メモリにかかる負担が減りますが、ブラウザで実行した場合、
 * 再生成時に通信が発生するため、通信量が増加します。
 * 通信量の上限が決まっている環境で実行される可能性がある場合、falseを推奨します。
 * 
 * ------------------------------------------------------
 *　追加制御文字
 * ------------------------------------------------------
 * 
 * \SP[index,x,y]
 * StandPictureSettingPで設定したindex番のスプライトをx,yに表示します。
 * スプライトのアンカーはx=0.5,y=1.0に設定されているため、
 * スプライトの下側中央を基準として設定してください。
 * ※ver1.01よりアンカー位置を設定可能になりました。
 * 
 * \HP[index]
 * StandPictureSettingPで設定したindex番のスプライトを非表示にします。
 * 
 * \MP[index,x,y,duration]
 * index番目のスプライトを画面のx,yの位置にdurationフレームかけて動かします。
 * durationを省略した場合、一瞬で移動します。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを動かします。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * 
 * \RMP[index,x,y,duration]
 * index番目のスプライトをx,yの数値分、durationフレームかけて動かします。
 * こちらはMPとは違い、相対値でスプライトを移動するための制御文字です。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、一瞬で移動します。
 * 
 * \TP[index,duration]
 * index番目のスプライトをdurationフレームかけて反転します。
 * durationを省略した場合、瞬時に反転します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを反転します。
 * 
 * \OP[index,opacity,duration]
 * index番目のスプライトの透明度をdurationフレームかけてopacityにします。
 * durationを省略した場合、瞬時に透明度が変化します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトの透明度を変更します。
 * 
 * \AP[index,animationId,mirror]
 * index番目のスプライトにanimationId番のアニメを表示します。
 * mirrorに1を指定すると、アニメが反転します。
 * 
 * \CP[index,nIndex,duration]
 * index番目のスプライトをnIndex番目のスプライトにdurationフレームかけて変更します。
 * 変更する際、反転して入れ替わるようなアクションをします。
 * durationを省略した場合、瞬時に画像を変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * スプライトのIDは最初に決めたものから変わらないため、注意が必要です。
 * 
 * \CFP[index,nIndex,duration]
 * index番目のスプライトをnIndex番目のスプライトにdurationフレームかけて変更します。
 * 変更する際、フェードして入れ替わるようなアクションをします。
 * durationを省略した場合、瞬時に画像を変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * スプライトのIDは最初に決めたものから変わらないため、注意が必要です。
 * 
 * \COP[index,red,green,blue,gray,duration]
 * index番目のスプライトのColorToneをred,green,blue,grayにdurationフレームかけて変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にColorToneが変更されます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトのColorToneを変更します。 
 *
 * \BCP[index,red,green,blue,alpha,duration]
 * index番目のスプライトのBlendColorをred,green,blue,alphaにdurationフレームかけて変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にBlendColorが変更されます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトのBlendColorを変更します。 
 * 
 * \ZP[index,zoomX,zoomY,duration]
 * index番目のスプライトのScaleをzoomX%,zoomY%にdurationフレームかけて変更します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時Scaleが変更されます。
 * 拡大はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを拡縮します。
 * 
 * \RZP[index,zoomX,zoomY,duration]
 * index番目のスプライトのScaleをzoomX%,zoomY%の数値分、durationフレームかけて増加(減少)します。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時Scaleが変更されます。
 * 拡大はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを拡縮します。
 * 
 * \RP[index,angle,duration]
 * index番目のスプライトのRotationをangle°にdurationフレームかけて変更します。
 * rotationの数値は通常ラジアンで設定しますが、ここの数値は角度で設定してください。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にRotationが変更されます。
 * 回転はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを回転します。
 * 
 * \RRP[index,angle,duration]
 * index番目のスプライトのRotationをangle°の数値分、durationフレームかけて増加(減少)します。
 * rotationの数値は通常ラジアンで設定しますが、ここの数値は角度で設定してください。
 * durationをマイナスで指定することもできます、この場合、durationは絶対値になります。
 * durationをマイナスで指定すると、この動作が完了するまで、次の動作を行いません。
 * durationを省略した場合、瞬時にRotationが変更されます。
 * 回転はanchorを基準として行われます。
 * また、indexにマイナスを指定すると、-で指定した数値以外のスプライトを回転します。
 * 
 * \BP[index,index1,index2,index3…]
 * index番目のスプライトをマスターとして、index1,index2,index3…をグループ化します。
 * また、グループ化を行った際、グループ化されたスプライトのanchorをマスター画像のanchorに同期します。
 * これにより、拡大や回転、反転等の動作が正常に行われるようになります。
 * 
 * \LS[index]
 * index番目のスプライトの口パクをスタートします。
 * グループ化されている場合、マスター画像に設定すれば、グループ化されたほかの画像も口パク状態になります。
 * 
 * \LE[index]
 * index番目のスプライトの口パクを止めます。
 * 
 * \SM[index]
 * StandPictureSettingMで設定したindex番のテキストに置き換えられます。
 * 
 * \VI[id,num]
 * ID番の変数の中身にnumの数値を加算した値に変換します。
 * 
 * \SFR[index]
 * index番目のスプライトを最前面に移動します。
 * 
 * \SBK[index]
 * index番目のスプライトを最背面に移動します。
 * 
 * \WT[duration]
 * durationフレームWaitします。
 * 
 * \PV
 * プラグインの設定で指定した数値に置き換わります。
 * マクロを汎用的に使用するための仕組みです。
 * 
 * \NNUM[num]
 * numの数値を―1を掛けた数値に変更します。
 * durationのウエイト指定や、indexのそれ以外の指定などに使います。
 * 
 * \CALC[formula]
 * formulaをevalで計算します。
 * 
 * \BXW
 * 画面の横幅(Graphics.boxWidth)に変換されます。
 * 
 * \BXH
 * 画面の縦幅(Graphics.boxHeight)に変換されます。
 * 
 * \MWW
 * メッセージウィンドウの横幅(Message_Window.width)に変換されます。
 * 
 * \MWH
 * メッセージウィンドウの縦幅(Message_Window.height)に変換されます。
 * 
 * \MWX
 * メッセージウィンドウのX座標に変換されます。
 * 
 * \MWY
 * メッセージウィンドウのY座標に変換されます。
 * 
 * 
 * ------------------------------------------------------
 *　既知の不具合
 * ------------------------------------------------------
 * 
 * \SPをウエイト無しで連続で呼び出すと、メッセージを高速スキップした際、エラーが発生します。
 * 間に\WT[1]等、ウエイトを追加することで、回避することが可能です。
 * 
 * ------------------------------------------------------
 * 利用規約：特になし。素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.03:
 * 新しいプラグインコマンド、ChoicePictureを追加。
 * 画面サイズがデフォルト以外のとき、表示がずれるバグを修正。
 * 設定されていないピクチャを読み込んだ際、コンソールにログを出力し、エラーが発生しないように修正。
 * フォルダパスの一部が大文字になっていて特定の環境に出力した際、エラーが発生するバグを修正。
 * ピクチャを表示したまま戦闘に突入すると、ピクチャが背景に残ってしまうバグを修正。
 * ver1.02:
 * 呼び出した際の透明度の初期値の設定を追加。
 * \PVで変換される数値を設定するための項目を追加。
 * \RMPの制御文字を追加。
 * \RZPの制御文字を追加。
 * \RRPの制御文字を追加。
 * \CFPの制御文字を追加。
 * \SFRの制御文字を追加。
 * \SBKの制御文字を追加。
 * \WTの制御文字を追加。
 * \PVの制御文字を追加。
 * \CALCの制御文字を追加。
 * \BXW,\BXH,\MWW,\MWH,\MWX,\MWYの制御文字を追加。
 * \NNUMの制御文字を追加。
 * \MP,\OP,\TP,\COP,\BCP\RPに機能を追加。
 * \MPをduration0で使用時、グループ化されたスプライトが正常に追随しないバグを修正。
 * 処理を修正、スプライトの関連付けをメッセージウィンドウからスプライトセットかシーンに変更
 * ver1.01:
 * 事前ロードを行う設定を追加。
 * アンカー位置の設定を追加。
 * 使用した画像キャッシュを削除する仕組みを追加。
 * 画像表示をメッセージウィンドウより手前か、後ろかを設定するための項目を追加。
 * \BCPの制御文字を追加。
 * \ZPの制御文字を追加。
 * \RPの制御文字を追加。
 * ver1.00:
 * 公開
 */

(function(){
	
	var parameters = PluginManager.parameters('StandPictureEC');
	var showFront = String(parameters['Show Front']) === 'true';
	var usePreloading = String(parameters['Use Preloading']) === 'true';
	var useDeleteCache = String(parameters['Use Delete Cache']) === 'true';
	var defaultAnchorX = Number(parameters['Default Anchor X']);
	var defaultAnchorY = Number(parameters['Default Anchor Y']);
	var defaultOpacity = Number(parameters['Default Opacity']);
	var proxyVariableId = Number(parameters['Proxy Variable ID']);
	var cursorName = String(parameters['Cursor Name']);
	
	function Sprite_StPic() {
		this.initialize.apply(this, arguments);
	};

	Sprite_StPic.prototype = Object.create(Sprite_Base.prototype);
	Sprite_StPic.prototype.constructor = Sprite_StPic;
	
	Sprite_StPic.prototype.initialize = function(id){
		Sprite_Base.prototype.initialize.call(this);
		this.initMembers(id);
	};
	
	Sprite_StPic.prototype.initMembers = function(id){
		this._id = id;
		this._pictureArray = StPicManager.picture(id);
		this.setBitmap(0);
		this._blink = false;
		this._pause = false;
		this._lip = false;
		this._durations = [0,0,0,0,0,0,0,0,0,0,0];
		this._counts = [0,0,0,0,0,0,0,0,0,0,0];
		this._delay = [0,0,0,0,0,0,0,0,0,0,0]
		this._forceBlink = false;
		this._stopLip = false;
		this._bindPic = [];
		this.anchor.x = defaultAnchorX;
		this.anchor.y = defaultAnchorY; 
		this.z = -10;
		this.opacity = defaultOpacity;
		this._stack = [];
	};
	
	Sprite_StPic.prototype.setBitmap = function(index){
		var picName = this.pictureName(index);
		if (picName.match(/\//)) {
			var name = picName.split('/');
			var folder = 'img/' + name[0] + '/';
			this.bitmap = ImageManager.loadBitmap(folder, name[1], null, true);
		} else {
			this.bitmap = ImageManager.loadPicture(picName);
		}
		this.setFrame(0,0,this.bitmap.width,this.bitmap.height);
	};
	
	Sprite_StPic.prototype.pictureName = function(index){
		if (!!this._pictureArray[1]) {
			return this._pictureArray[0] + '_' + index;	
		} else {
			return this._pictureArray[0];
		}
	}

	Sprite_StPic.prototype.update = function(){
		var updates = [this.updateMove,this.updateOpacity,null,null,
					   this.updateTurn,this.updateChange,
					   this.updateColor,this.updateBlend,
					   this.updateZoom,this.updateRotation,
					   this.updateChangeFade];
		Sprite_Base.prototype.update.call(this);
		var ary = [];
		for (var i=0;i<this._stack.length;i++){
			var index = this._stack[i];
			if (this._durations[index] > 0){ updates[index].call(this) }
			if (this._durations[index] <= 0){ this._stack[i] = null }
			if (this._delay[index] > 0){
				this._delay[index]--;
				break;
			}
		}
		for (var i=0;i<this._stack.length;i++){
			if (this._stack[i] !== null) { ary.push(this._stack[i]) }
		}
		this._stack = ary;
		this.updateBlink();
		if (this._lip){ this.updateLip() }	
	};
	
	Sprite_StPic.prototype.updateMove = function(){
		this._durations[0]--;
		this._counts[0]++;
		var count = this._counts[0];
		var xx = this._bx + this._xSpeed * count;
		var yy = this._by + this._ySpeed * count;
		this.x = xx;
		this.y = yy;
	};
	
	Sprite_StPic.prototype.updateOpacity = function(){
		this._durations[1]--;
		this._counts[1]++;
		this.opacity = this._bO + this._oSpeed * this._counts[1];
	};
	
	Sprite_StPic.prototype.updateBlink = function(){
		var b = this._pictureArray.filter(function(a){
			return a[0] === 'blink';
		});
		if (b.length > 0){
			b = b[0];
			if ((Graphics.frameCount % b[1]) === 0 && Math.randomInt(b[2]) === 0 && !this._blink){
				this._blink = true;
				this._counts[2] = 0;
			}
			if (this._blink){
				if (this._counts[2] >= b[3].length){
					this._blink = false;
					return;
				}
				var bindex = b[3][this._counts[2]];
				this.setBitmap(bindex);
				this._counts[2]++;
			}
		}
	};
	
	Sprite_StPic.prototype.updateLip = function(){
		if (this._pause){
			this._lip = false;
			this.setBitmap(0);
			return;
		}else if (this._stopLip){
			this.setBitmap(0);
			return
		}
		var l = this._pictureArray.filter(function(a){
			return a[0] === 'lip';
		});
		if (l.length > 0){
			l = l[0];
			if (Math.randomInt(l[2]) !== 0){ return }
			if (Graphics.frameCount % l[1] !== 0){ return }
			var lindex = l[3][this._counts[3]];
			this.setBitmap(lindex);
			this._counts[3]++;
			if (this._counts[3] === l[3].length){ this._counts[3] = 0 }
		}else{
			this._lip = false;
		}
	};
	
	Sprite_StPic.prototype.updateTurn = function(){
		this._durations[4]--;
		this._counts[4]++;
		var zX = this._tsx - (this._tSpeed * this._counts[4]);
		this.scale = new Point( zX, this.scale.y);
	};
	
	Sprite_StPic.prototype.updateChange = function(){
		this._durations[5]--;
		this._counts[5]++;
		var zX = Math.abs(this._zScale[0] - (this._cSpeed * this._counts[5]));
		this.scale = new Point( zX, this._zScale[1]);
		if (this._counts[5] === this._durations[5]){ this.changePic(this._cId) }
	};
	
	Sprite_StPic.prototype.updateChangeFade = function(){
		this._durations[10]--;
		this._counts[10]++;
		var zO = Math.abs(this._cfo - (this._cfSpeed * this._counts[10]));
		this.opacity = zO;
		if (this._counts[10] === this._durations[10]){ this.changePic(this._cfId) }
	};
	
	Sprite_StPic.prototype.updateColor = function(){
		this._durations[6]--;
		this._counts[6]++;
		var red   = this._coColor[0] + this._coSpeed[0] * this._counts[6];
		var green = this._coColor[1] + this._coSpeed[1] * this._counts[6];
		var blue  = this._coColor[2] + this._coSpeed[2] * this._counts[6];
		var gray  = this._coColor[3] + this._coSpeed[3] * this._counts[6];
		this.setColorTone([red,green,blue,gray]);
	};
	
	Sprite_StPic.prototype.updateBlend = function(){
		this._durations[7]--;
		this._counts[7]++;
		var red   = this._bcColor[0] + this._bcSpeed[0] * this._counts[7];
		var green = this._bcColor[1] + this._bcSpeed[1] * this._counts[7];
		var blue  = this._bcColor[2] + this._bcSpeed[2] * this._counts[7];
		var alpha  = this._bcColor[3] + this._bcSpeed[3] * this._counts[7];
		this.setBlendColor([red,green,blue,alpha]);
	};
	
	Sprite_StPic.prototype.updateZoom = function(){
		this._durations[8]--;
		this._counts[8]++;
		var zX = this._zsx + (this._zSpeed[0] * this._counts[8]);
		var zY = this._zsy + (this._zSpeed[1] * this._counts[8]);
		this.scale = new Point( zX, zY);
	};
	
	Sprite_StPic.prototype.updateRotation = function(){
		this._durations[9]--;
		this._counts[9]++;
		this.rotation = this._bR + (this._rSpeed * this._counts[9]);
	};
	
	Sprite_StPic.prototype.setMove = function(xx,yy,duration){
		if (!xx){ xx = 0 }
		if (!yy){ yy = 0 }
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[0] = duration;
		}
		if (!duration || duration < 1){ duration = 1 }
		
		this._xSpeed = (xx - this.x) / duration;
		this._ySpeed = (yy - this.y) / duration; 
		this._durations[0] = duration;
		this._bx = this.x;
		this._by = this.y;
		this._counts[0] = 0;
		this._stack.push(0);
	};
	
	Sprite_StPic.prototype.setOpacity = function(opacity,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[1] = duration;
		}
		this._oSpeed = (opacity - this.opacity) / duration;
		this._bO = this.opacity;
		this._durations[1] = duration;
		this._counts[1] = 0;
		this._stack.push(1);
	};
	
	Sprite_StPic.prototype.setTurn = function(duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[4] = duration;
		}
		this._tSpeed = this.scale.x / (duration / 2);
		this._durations[4] = duration;
		this._counts[4] = 0;
		this._tsx = this.scale.x;
		this._stack.push(4);
	}
	
	Sprite_StPic.prototype.setChange = function(index,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[5] = duration;
		}
		this._cSpeed = this.scale.x / (duration / 2);
		this._durations[5] = duration;
		this._counts[5] = 0;
		this._cx = this.x;
		this._cId = index;
		this._zScale = [this.scale.x,this.scale.y];
		this._stack.push(5);
	};
	
	Sprite_StPic.prototype.setChangeFade = function(index,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[10] = duration;
		}
		this._cfSpeed = this.opacity / (duration / 2);
		this._durations[10] = duration;
		this._counts[10] = 0;
		this._cfo = this.opacity;
		this._cfId = index;
		this._stack.push(10);
	};
	
	Sprite_StPic.prototype.setColor = function(colors,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[6] = duration;
		}
		this._coColor = this.getColorTone();
		this._coSpeed = [
		(colors[0] - this._coColor[0]) / duration,
		(colors[1] - this._coColor[1]) / duration,
		(colors[2] - this._coColor[2]) / duration,
		(colors[3] - this._coColor[3]) / duration,
		];
		this._durations[6] = duration;
		this._counts[6] = 0;
		this._stack.push(6);
	};
	
	Sprite_StPic.prototype.setBlend = function(colors,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[7] = duration;
		}
		this._bcColor = this.getBlendColor();
		this._bcSpeed = [
		(colors[0] - this._bcColor[0]) / duration,
		(colors[1] - this._bcColor[1]) / duration,
		(colors[2] - this._bcColor[2]) / duration,
		(colors[3] - this._bcColor[3]) / duration,
		];
		this._durations[7] = duration;
		this._counts[7] = 0;
		this._stack.push(7);
	};
	
	Sprite_StPic.prototype.setZoom = function(zx,zy,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[8] = duration;
		}
		this._zsx = this.scale.x;
		this._zsy = this.scale.y;
		zx = zx / 100;
		zy = zy / 100;
		this._zSpeed = [
		(zx - this._zsx) / duration,
		(zy - this._zsy) / duration,
		];
		this._durations[8] = duration;
		this._counts[8] = 0;
		this._stack.push(8);
	};
		
	Sprite_StPic.prototype.setRotation = function(rotate,duration){
		if (duration && duration < 0){
			duration = Math.abs(duration)
			this._delay[9] = duration;
		}
		this._bR = this.rotation;
		this._rSpeed = (rotate - this._bR) / duration;
		this._durations[9] = duration;
		this._counts[9] = 0;
		this._stack.push(9);
	};
	
	Sprite_StPic.prototype.changePic = function(index){
		this._id = index;
		this._pictureArray = StPicManager.picture(this._id);
		this.setBitmap(0);
		this._blink = this._pictureArray.filter(function(a){
			return a[0] === 'blink'
		}).length > 0;
		this._counts[2] = 1;
	};
	
	Sprite_StPic.prototype.setLip = function(){
		this._stopLip = false;
		this._lip = true;
		this._counts[3] = 0;
	};
	
	Sprite_StPic.prototype.setLipEnd = function(){
		this._stopLip = true;
	};
	
	Sprite_StPic.prototype.maxDelay = function(){
		var delay = 0;
		for(var i=0;i<this._delay.length;i++){
			if (this._delay[i] > delay){ delay = this._delay[i] }
		}
		return delay;
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	var _stPic_WBase_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text){
		text = _stPic_WBase_convertEscapeCharacters.call(this, text);
		text = text.replace(/\x1bVI\[(\d+),(-?\d+)\]/gi,function() {
			return ($gameVariables.value(parseInt(arguments[1])) + parseInt(arguments[2]));
		}.bind(this));
		return text;
	};
	
	
	Window_Base.prototype.obtainEscapeParams = function(textState){
		var arr = /\[(.+?)\]/.exec(textState.text.slice(textState.index));
		if (arr){
			textState.index += arr[0].length;
			var result = [];
			while(arr[1].match(/-?\d+/)){
				arr[1] = arr[1].replace(/(-?\d+)/,'');
				result.push(parseInt(RegExp.$1));
			}
			return result;
		}else{
			return '';
		}
	};
	
	/////////////////////////////////////////////////////////////////////////
	
	var _stPic_WMessage_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function(){
		_stPic_WMessage_initialize.call(this);
		this._spriteStPics = {};
	};
	
	Window_Message.prototype.clearPic = function(){
		for (i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this.removeStSprite(this._spriteStPics[i]);
				//this.removeChild(this._spriteStPics[i]);
			}
		}
		this._spriteStPics = {};
	};
	
	var _stPic_WMessage_close = Window_Message.prototype.close;
	Window_Message.prototype.close = function(){
		_stPic_WMessage_close.call(this);
		this._picClearCount = Graphics.frameCount;
	};
	
	Window_Message.prototype.convertEscapeCharacters = function(text){
    	text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		text = text.replace(/\x1bSM\[(\d+)\]/gi, function() {
			return this.stPicMacro(parseInt(arguments[1]));
		}.bind(this));
    	text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		
		text = text.replace(/\x1bBXW/gi,Graphics.boxWidth);
		text = text.replace(/\x1bBXH/gi,Graphics.boxHeight);
		text = text.replace(/\x1bMWW/gi,this.width);
		text = text.replace(/\x1bMWH/gi,this.height);
		text = text.replace(/\x1bMWX/gi,this.x);
		text = text.replace(/\x1bMWY/gi,this.y);
		text = text.replace(/\x1bCALC\[(.+?)\]/gi, function() {
			var t = eval(arguments[1]);
			return t ? t : '';
		}.bind(this));
		
		text = Window_Base.prototype.convertEscapeCharacters.call(this,text);
		
		text = text.replace(/\x1bNNUM\[(-?\d+)\]/gi, function() {
			return parseInt(arguments[1]) * -1;
		}.bind(this));
		
		text = text.replace(/_N_/gi,'\\');
		
		return text;
	};
	
	Window_Message.prototype.stPicMacro = function(index){
		return StPicManager.macro(index);
	};
	
	var _stPic_WMessage_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
	Window_Message.prototype.processEscapeCharacter = function(code, textState){
		switch(code){
		case 'WT':
			this.startWait(this.obtainEscapeParam(textState));
			break;
		case 'SP':
			this.processShowPic(this.obtainEscapeParams(textState));
			break;
		case 'HP':
			this.processHidePic(this.obtainEscapeParam(textState));
			break;
		case 'MP':
			this.processMovePic(this.obtainEscapeParams(textState));
			break;
		case 'RMP':
			this.processRelativeMovePic(this.obtainEscapeParams(textState));
			break;
		case 'TP':
			this.processTurnPic(this.obtainEscapeParams(textState));
			break;
		case 'OP':
			this.processOpacityPic(this.obtainEscapeParams(textState));
			break;
		case 'AP':
			this.processAnimationPic(this.obtainEscapeParams(textState));
			break;
		case 'CP':
			this.processChangePic(this.obtainEscapeParams(textState));
			break;
		case 'CFP':
			this.processChangeFadePic(this.obtainEscapeParams(textState));
			break;
		case 'COP':
			this.processColorPic(this.obtainEscapeParams(textState));
			break;
		case 'BCP':
			this.processBlendColorPic(this.obtainEscapeParams(textState));
			break;
		case 'ZP':
			this.processZoomPic(this.obtainEscapeParams(textState));
			break;
		case 'RZP':
			this.processRelativeZoomPic(this.obtainEscapeParams(textState));
			break;
		case 'RP':
			this.processRotationPic(this.obtainEscapeParams(textState));
			break;
		case 'RRP':
			this.processRelativeRotationPic(this.obtainEscapeParams(textState));
			break;
		case 'LS':
			this.processLipStartPic(this.obtainEscapeParam(textState));
			break;
		case 'LE':
			this.processLipEndPic(this.obtainEscapeParam(textState));
			break;
		case 'BP':
			this.processSetBindPic(this.obtainEscapeParams(textState));
			break;
		case 'SFR':
			this.processShowFrontPic(this.obtainEscapeParam(textState));
			break;
		case 'SBK':
			this.processShowBackPic(this.obtainEscapeParam(textState));
			break;
		default:
			_stPic_WMessage_processEscapeCharacter.call(this, code, textState);
			break;
		};
	};
	
	Window_Message.prototype.processShowPic = function(ary){
		var sprite = new Sprite_StPic(ary[0]);
		sprite.x = ary[1] !== undefined ? ary[1] : Graphics.boxWidth * defaultAnchorX;
		sprite.y = (ary[2] !== undefined ? ary[2] : Graphics.boxHeight * defaultAnchorY - this.height);
		sprite.z = this.stPicLength();
		this.addStSprite(sprite);
		this._spriteStPics[ary[0]] = sprite;
	};
	
	Window_Message.prototype.addStSprite = function(sprite) {
		SceneManager._scene.addStPic(sprite);
	};
	
	Window_Message.prototype.removeStSprite = function(sprite) {
		SceneManager._scene.removeStPic(sprite);
	};
	
	Window_Message.prototype.stPicLength = function() {
		var count = 0;
		for (i in this._spriteStPics){
			if (this._spriteStPics[i]) { count++ }
		}
		return count;
	};
	
	Window_Message.prototype.processHidePic = function(id){
		if (this._spriteStPics[id]){
			if (this._hidePics === undefined){ this._hidePics = [] }
			this._hidePics.push(id);
		}
	};
	
	Window_Message.prototype.processMovePic = function(ary){
		//ary[2] -= this.y;
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					var x = ary[1] - sprites[id].x + sprites[bid].x;
					var y = ary[2] - sprites[id].y + sprites[bid].y;
					if (ary[3] && ary[3] !== 0){
						sprites[bid].setMove(x,y,ary[3]);
					}else{
						sprites[bid].x = x;
						sprites[bid].y = y;
					}
				}
			});
			if (ary[3] && ary[3] !== 0){
				this._spriteStPics[id].setMove(ary[1],ary[2],ary[3]);
			}else{
				this._spriteStPics[id].x = ary[1];
				this._spriteStPics[id].y = ary[2];
			}
		}
	};
	
	Window_Message.prototype.processRelativeMovePic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			var rx = ary[1] + this._spriteStPics[id].x;
			var ry = ary[2] + this._spriteStPics[id].y;
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					var x = ary[1] + sprites[bid].x;
					var y = ary[2] + sprites[bid].y;
					if (ary[3] && ary[3] !== 0){
						sprites[bid].setMove(x,y,ary[3]);
					}else{
						sprites[bid].x = x;
						sprites[bid].y = y;
					}
				}
			});
			if (ary[3] && ary[3] !== 0){
				this._spriteStPics[id].setMove(rx,ry,ary[3]);
			}else{
				this._spriteStPics[id].x = rx;
				this._spriteStPics[id].y = ry;
			}
		}
	};
	
	Window_Message.prototype.processTurnPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[1] && ary[1] !== 0){
				this._spriteStPics[id].setTurn(ary[1]);
			}else{
				this._spriteStPics[id].setTurn(2);
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[1] && ary[1] !== 0){
						sprites[bid].setTurn(ary[1]);
					}else{
						sprites[bid].setTurn(2);
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processOpacityPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[2] && ary[2] !== 0){
				this._spriteStPics[id].setOpacity(ary[1],ary[2]);
			}else{
				this._spriteStPics[id].opacity = ary[1];
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[2] && ary[2] !== 0){
						sprites[bid].setOpacity(ary[1],ary[2]);
					}else{
						sprites[bid].opacity = ary[1];
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processAnimationPic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		var anim = $dataAnimations[ary[1]];
		this._spriteStPics[id].startAnimation(anim,ary[2]===1,0);
	};
	
	Window_Message.prototype.processChangePic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		if (ary[2] && ary[2] !== 0){
			this._spriteStPics[id].setChange(ary[1],ary[2]);
		}else{
			this._spriteStPics[id].changePic(ary[1]);
		}
	};
	
	Window_Message.prototype.processChangeFadePic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		if (ary[2] && ary[2] !== 0){
			this._spriteStPics[id].setChangeFade(ary[1],ary[2]);
		}else{
			this._spriteStPics[id].changePic(ary[1]);
		}
	};
	
	Window_Message.prototype.processColorPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]]
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[5] && ary[5] !== 0){
				this._spriteStPics[id].setColor([ary[1],ary[2],ary[3],ary[4]],ary[5]);
			}else{
				this._spriteStPics[id].setColorTone([ary[1],ary[2],ary[3],ary[4]]);
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[5] && ary[5] !== 0){
						sprites[bid].setColor([ary[1],ary[2],ary[3],ary[4]],ary[5]);
					}else{
						sprites[bid].setColorTone([ary[1],ary[2],ary[3],ary[4]]);
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processBlendColorPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[5] && ary[5] !== 0){
				this._spriteStPics[id].setBlend([ary[1],ary[2],ary[3],ary[4]],ary[5]);
			}else{
				this._spriteStPics[id].setBlendColor([ary[1],ary[2],ary[3],ary[4]]);
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[5] && ary[5] !== 0){
						sprites[bid].setBlend([ary[1],ary[2],ary[3],ary[4]],ary[5]);
					}else{
						sprites[bid].setBlendColor([ary[1],ary[2],ary[3],ary[4]]);
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processZoomPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for(var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[3] && ary[3] !== 0){
				this._spriteStPics[id].setZoom(ary[1],ary[2],ary[3]);
			}else{
				this._spriteStPics[id].scale.x = ary[1] / 100;
				this._spriteStPics[id].scale.y = ary[2] / 100;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[3] && ary[3] !== 0){
						sprites[bid].setZoom(ary[1],ary[2],ary[3]);
					}else{
						sprites[bid].scale.x = ary[1] / 100;
						sprites[bid].scale.y = ary[2] / 100;
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processRelativeZoomPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for(var i=0;i<ids.length;i++){
			var id = ids[i];
			if (!this._spriteStPics[id]){ continue }
			if (ary[3] && ary[3] !== 0){
				var zx = this._spriteStPics[id].scale.x * 100 + ary[1];
				var zy = this._spriteStPics[id].scale.y * 100 + ary[2];
				this._spriteStPics[id].setZoom(zx,zy,ary[3]);
			}else{
				this._spriteStPics[id].scale.x += ary[1] / 100;
				this._spriteStPics[id].scale.y += ary[2] / 100;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[3] && ary[3] !== 0){
						var zx = sprites[bid].scale.x * 100 + ary[1];
						var zy = sprites[bid].scale.y * 100 + ary[2];	
						sprites[bid].setZoom(zx,zy,ary[3]);
					}else{
						sprites[bid].scale.x += ary[1] / 100;
						sprites[bid].scale.y += ary[2] / 100;
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processRotationPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			var radian = ary[1] * 3.141592653 / 180;
			if (!this._spriteStPics[id]){ continue }
			if (ary[2] && ary[2] !== 0){
				this._spriteStPics[id].setRotation(radian,ary[2]);
			}else{
				this._spriteStPics[id].rotation = radian;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[2] && ary[2] !== 0){
						sprites[bid].setRotation(radian,ary[2]);
					}else{
						sprites[bid].rotation = radian;
					}
				}
			});
		}
	};
	
		
	Window_Message.prototype.processRelativeRotationPic = function(ary){
		var ids = [];
		var sprites = this._spriteStPics;
		if (ary[0] >= 0){
			ids = [ary[0]];
		} else {
			var id = Math.abs(ary[0]);
			for (i in sprites){
				if (!sprites[i]){ continue }
				if (id != i && !sprites[id]._bindPic.contains(Number(i))){
					ids.push(i);
				}
			}
		}
		for (var i=0;i<ids.length;i++){
			var id = ids[i];
			var radian = ary[1] * 3.141592653 / 180;
			if (!this._spriteStPics[id]){ continue }
			if (ary[2] && ary[2] !== 0){
				radian = this._spriteStPics[id].rotation + radian;
				this._spriteStPics[id].setRotation(radian,ary[2]);
			}else{
				this._spriteStPics[id].rotation += radian;
			}
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					if (ary[2] && ary[2] !== 0){
						radian = sprites[bid].rotation + radian;
						sprites[bid].setRotation(radian,ary[2]);
					}else{
						sprites[bid].rotation += radian;
					}
				}
			});
		}
	};
	
	Window_Message.prototype.processLipStartPic = function(id){
		if (this._spriteStPics[id]){
			var sprites = this._spriteStPics;
			this._spriteStPics[id].setLip();
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					sprites[bid].setLip();
				}
			});
		}
	};
	
	Window_Message.prototype.processLipEndPic = function(id){
		if (this._spriteStPics[id]){
			var sprites = this._spriteStPics;
			this._spriteStPics[id].setLipEnd();
			this._spriteStPics[id]._bindPic.forEach(function(bid){
				if (id !== bid && sprites[bid]){
					sprites[bid].setLipEnd();
				}
			});
		}
	};
	
	Window_Message.prototype.processSetBindPic = function(ary){
		var id = ary[0];
		if (!this._spriteStPics[id]){ return }
		ary = ary.slice(1);
		this._spriteStPics[id]._bindPic = ary;
		this.setAnchorBindPics(id);
	};
	
	Window_Message.prototype.processShowFrontPic = function(id){
		var array1 = [];
		var array2 = [];
		for(i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this.removeStSprite(this._spriteStPics[i]);
				//this.removeChild(this._spriteStPics[i]);
				if (i == id || this._spriteStPics[id]._bindPic.contains(Number(i))) {
					array1.push([i,this._spriteStPics[i].z]);
				} else {
					array2.push([i,this._spriteStPics[i].z]);
				}
			}
		}
		array1 = array1.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		array2 = array2.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		for(var i=0;i<array2.length;i++){
			var a = array2[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
		for(var i=0;i<array1.length;i++){
			var a = array1[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i+array2.length;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
	};
	
	Window_Message.prototype.processShowBackPic = function(id){
		var array1 = [];
		var array2 = [];
		for(i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this.removeStSprite(this._spriteStPics[i]);
				//this.removeChild(this._spriteStPics[i]);
				if (i == id || this._spriteStPics[id]._bindPic.contains(Number(i))) {
					array1.push([i,this._spriteStPics[i].z]);
				} else {
					array2.push([i,this._spriteStPics[i].z]);
				}
			}
		}
		array1 = array1.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		array2 = array2.sort(function(a,b){ return a[1] > b[1] ? 1 : -1 });
		for(var i=0;i<array1.length;i++){
			var a = array1[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
		for(var i=0;i<array2.length;i++){
			var a = array2[i];
			if (this._spriteStPics[a[0]]) {
				this._spriteStPics[a[0]].z = i+array1.length;
				this.addStSprite(this._spriteStPics[a[0]]);
			}
		}
	};
	
	// アンカーの位置をマスター画像に同期
	Window_Message.prototype.setAnchorBindPics = function(id) {
		var my = this.y;
		var ax = this._spriteStPics[id].x;
		var ay = this._spriteStPics[id].y + my;
		var sprites = this._spriteStPics;
		this._spriteStPics[id]._bindPic.forEach(function(bid){
			var sprite = sprites[bid];
			if (id !== bid && sprite){
				var sx = sprite.x - (sprite.width*sprite.anchor.x);
				var sy = sprite.y + my - (sprite.height * sprite.anchor.y);
				sprite.anchor.x = (ax - sx) / sprite.width;
				sprite.anchor.y = (ay - sy) / sprite.height;
				sprite.x = sx + (sprite.anchor.x * sprite.width);
				sprite.y = sy + (sprite.anchor.y * sprite.height) - my;
			}
		});
	};
	
	var _stPic_WMessage_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function(){
		_stPic_WMessage_update.call(this);
		var pause = this.pause;
		for (i in this._spriteStPics){
			if (this._spriteStPics[i]){
				this._spriteStPics[i]._pause = pause;
			}
		}
		if (this._picClearCount === (Graphics.frameCount - 2)){
			if (!this.isOpen()){
				this.clearPic();
				this._picClearCount = 0;
			}
		}
		if (this._hidePics){
			var ary = [];
			for(var i=0;i<this._hidePics.length;i++){
				var index = this._hidePics[i];
				if (!this._spriteStPics[index]){ continue }
				if (this._spriteStPics[index].maxDelay() <= 0){
					this.removeStSprite(this._spriteStPics[index]);
					//this.removeChild(this._spriteStPics[index]);
					delete this._spriteStPics[index];
				} else {
					ary.push(index);
				}
			}
			this._hidePics = ary;
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_GMap_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		_stPic_GMap_setup.call(this,mapId);
		if (usePreloading){ this.checkStandEC() }
	};
	
	// マップ内のイベントを全チェックして、キャッシュ化
	Game_Map.prototype.checkStandEC = function() {
		this.makeStandArray();
		for(var i=0;i<this._standArray.length;i++){
			var n = this._standArray[i];
			var pic = StPicManager.picture(n);
			if (!pic){ 
				console.error(n+'番のピクチャは登録されていません！');
				continue;
			}
			if (pic[1]){
				var ary = pic[1][3].filter(function(x,i,self){
					return self.indexOf(x) === i;
				});
				for (var j=0;j<ary.length;j++) {
					var fileName = pic[0] + '_' + ary[j];
					if (fileName.match(/\//)){
						var name = fileName.split('/');
						var folder = 'img/' + name[0] + '/';
						ImageManager.loadBitmap(folder,name[1],null,true);
					} else {
						ImageManager.loadPicture(fileName);
					}
				}
			}else{
				var fileName = pic[0];
				if (fileName.match(/\//)){
					var name = fileName.split('/');
					var folder = 'img/' + name[0] + '/';
					ImageManager.loadBitmap(folder,name[1],null,true);
				} else {
					ImageManager.loadPicture(fileName);
				}
			}
		}
	};
	
	Game_Map.prototype.makeStandArray = function() {
		if (useDeleteCache){
			this.clearStandArray();
		}else{
			this._standArray = this._standArray || [];
		}
		
		// $gameTempにキャッシュがあればロードする。
		if ($gameTemp._cacheStandArrays && $gameTemp._cacheStandArrays[this._mapId]){
			this._standArray = $gameTemp._cacheStandArrays[this._mapId];
			return;
		}
		var dummyVar = $gameVariables._data.clone();
		
		this._commonStArray = [];
		var prevVar = [];
		for (var i=0;i<this._events.length;i++) {
			if (this._events[i]){ 
				var event = this._events[i].event();
				for (var j=0;j<event.pages.length;j++){
					var list = event.pages[j].list;
					for (var k=0;k<list.length;k++) {
						if (list[k].code === 401){
							var text = list[k].parameters[0];
							this.addStandArray(text);
						}else if(list[k].code === 117){
							var commonId = list[k].parameters[0];
							if (!this._commonStArray.contains(commonId)){ 
								this._commonStArray.push( commonId );
							}
						}else if(list[k].code === 122){
							this._interpreter._params = list[k].parameters;
							this._interpreter.command122();
						}
					}
				}
			}
		}
		for (var i=0;i<this._commonEvents.length;i++){
			var commonId = this._commonEvents[i]._commonEventId;
			if (!this._commonStArray.contains(commonId)){ 
				this._commonStArray.push( commonId );
			}
		}
		this._checkCompleteCommon = [];
		for (;;){
			if (this.checkCommonSt(this._commonStArray.clone())){ break }
		}
		for (var i=0;i<this._commonStArray;i++){
			var id = this._commonStArray[i];
			if (id){
				var event = $dataCommonEvents[id];
				for (var j=0;j<event.list.length;j++){
					if (event.list[j] && event.list[j].code === 401){
						var text = event.list[j].parameters[0];
						this.addStandArray(text);
					}
				}
			}
		}
		$gameTemp._cacheStandArrays = $gameTemp._cacheStandArrays || {};
		$gameTemp._cacheStandArrays[this._mapId] = this._standArray.clone();
		
		$gameVariables._data = dummyVar;
	};
	
	Game_Map.prototype.addStandArray = function(text) {
		text = this.convertEscapeCharacters(text);
		var result = [];
		result = result.concat(text.match(/\x1bSP\[(?:(\d+),?)+\]/gi));
		result = result.concat(text.match(/\x1bCP\[(?:(\d+),?)+\]/gi));
		for (var l=0;l<result.length;l++){
			if (result[l]){
				result[l].match(/(\d+)(?:,(\d+))?/);
				var r = Number(RegExp.$1);
				var r2 = Number(RegExp.$2);
				if (!this._standArray.contains(r)){
					this._standArray.push(r);
				}
				if (result[l].match(/\x1bCP/gi)){
					if (!this._standArray.contains(r2)){
						this._standArray.push(r2);
					}
				}
			}
		}
		result = text.match(/\x1bAP\[\d+,(\d+)\]/);
		if (result){
			var anime = $dataAnimations[result[1]];
			if (!anime){ return }
			if (anime.animation1Name){ ImageManager.loadAnimation(anime.animation1Name) }
			if (anime.animation2Name){ ImageManager.loadAnimation(anime.animation2Name) }
		}
	};
	
	// コモンイベント内のコモンイベントをチェックして配列化　再帰的呼び出しを行います
	Game_Map.prototype.checkCommonSt = function(commonArray) {
		var endFlag = true;
		for (var i=0;i<commonArray.length;i++){
			var id = commonArray[i];
			if (id && !this._checkCompleteCommon.contains(id)){
				var event = $dataCommonEvents[id];
				for (var j=0;j<event.list.length;j++){
					if (event.list[j] && event.list[j].code === 117){
						var commonId = event.list[j].parameters[0];
						if (!this._commonStArray.contains(commonId)){ 
							this._commonStArray.push( commonId );
						}
					}
				}
				this._checkCompleteCommon.push(id);
				endFlag = false;
			}
		}
		return endFlag;
	};
	
	// キャッシュ化されている立ち絵をImageManagerのキャッシュから削除します
	Game_Map.prototype.clearStandArray = function() {
		if (this._standArray){
			this._standArray.forEach(function(picId) {
				var pic = StPicManager.picture(picId);
				if (pic[1]){
					var ary = pic[1][3].filter(function(x,i,self){
						return self.indexOf(x) === i;
					});
					for (var j=0;j<ary.length;j++) {
						var fileName = pic[0];
						if (fileName.match(/\//)){
							var name = fileName.split('/');
							fileName = 'img/' + fileName + '_' + ary[j] + '.png:0';
							
						} else {
							fileName = 'img/pictures/' + pic[0] + '_' + ary[j] + '.png:0';
						}
						delete ImageManager._cache[fileName];
					}
				}else{
					var fileName = pic[0];
					if (fileName.match(/\//)){
						fileName = 'img/' + fileName + '.png:0';
					}else{
						fileName = 'img/pictures/' + pic[0] + '.png:0';
					}
					delete ImageManager._cache[fileName];
				}
			});
		}
		this._standArray = [];
	};
	
	Game_Map.prototype.stPicMacro = function(index){
		return StPicManager.macro(index);
	};
	
	Game_Map.prototype.convertEscapeCharacters = function(text) {
		text = this.preCECs(text);
		text = text.replace(/\x1bSM\[(\d+)\]/gi, function() {
			return this.stPicMacro(parseInt(arguments[1]));
		}.bind(this));
		text = this.preCECs(text);
    	return text;
	};
	
	Game_Map.prototype.preCECs = function(text) {
		text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		text = text.replace(/\x1bSM\[(\d+)\]/gi, function() {
			return this.stPicMacro(parseInt(arguments[1]));
		}.bind(this));
    	text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
    	text = text.replace(/\x1bPV/gi,proxyVariableId);
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
		
		text = text.replace(/\x1bBXW/gi,Graphics.boxWidth);
		text = text.replace(/\x1bBXH/gi,Graphics.boxHeight);
		text = text.replace(/\x1bMWW/gi,0);
		text = text.replace(/\x1bMWH/gi,0);
		text = text.replace(/\x1bMWX/gi,0);
		text = text.replace(/\x1bMWY/gi,0);
		text = text.replace(/\x1bCALC\[(.+?)\]/gi, function() {
			var t = eval(arguments[1]);
			return t ? t : '';
		}.bind(this));
		
		text = text.replace(/\\/g, '\x1b');
    	text = text.replace(/\x1b\x1b/g, '\\');
   		text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
    	text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        	return $gameVariables.value(parseInt(arguments[1]));
    	}.bind(this));
    	
		text = text.replace(/\x1bVI\[(\d+),(-?\d+)\]/gi,function() {
			return ($gameVariables.value(parseInt(arguments[1])) + parseInt(arguments[2]));
		}.bind(this));
		
		text = text.replace(/\x1bNNUM\[(-?\d+)\]/gi, function() {
			return parseInt(arguments[1]) * -1;
		}.bind(this));
		
		return text;
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_SBase_createPictures = Spriteset_Base.prototype.createPictures;
	Spriteset_Base.prototype.createPictures = function() {
		_stPic_SBase_createPictures.call(this);
		if (!showFront) { this.createStPicContainer() }
	};
	
	Spriteset_Base.prototype.createStPicContainer = function() {
    	var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = 0;
    	var y = 0;
    	this._stPicContainer = new Sprite();
    	this._stPicContainer.setFrame(x, y, width, height);
    	this._stPicContainer.y = 0;
    	this.addChild(this._stPicContainer);	
	};
	
	Spriteset_Base.prototype.addStPic = function(sprite) {
		this._stPicContainer.addChild(sprite);
	};
	
	Spriteset_Base.prototype.removeStPic = function(sprite) {
		this._stPicContainer.removeChild(sprite);
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_SMap_createMessageWindow = Scene_Map.prototype.createMessageWindow;
	Scene_Map.prototype.createMessageWindow = function() {
		_stPic_SMap_createMessageWindow.call(this);
		if (showFront){ this.createStPicContainer() }
	};
	
	Scene_Map.prototype.createStPicContainer = function() {
    	var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = 0;
    	var y = 0;
    	this._stPicContainer = new Sprite();
    	this._stPicContainer.setFrame(x, y, width, height);
    	this._stPicContainer.y = 0;
    	this.addChild(this._stPicContainer);	
	};

	Scene_Map.prototype.addStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.addChild(sprite);	
		} else {
			this._spriteset.addStPic(sprite);
		}
	};
	
	Scene_Map.prototype.removeStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.removeChild(sprite);	
		} else {
			this._spriteset.removeStPic(sprite);
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_GInterpreter_command301 = Game_Interpreter.prototype.command301;
	Game_Interpreter.prototype.command301 = function() {
		SceneManager._scene._messageWindow.clearPic();
		return _stPic_GInterpreter_command301.call(this);
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	Scene_Battle.prototype.createStPicContainer = function() {
    	var width = Graphics.boxWidth;
    	var height = Graphics.boxHeight;
    	var x = 0;
    	var y = 0;
    	this._stPicContainer = new Sprite();
    	this._stPicContainer.setFrame(x, y, width, height);
    	this._stPicContainer.y = 0;
    	this.addChild(this._stPicContainer);	
	};

	var _stPic_SBattle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
	Scene_Battle.prototype.createMessageWindow = function() {
		_stPic_SMap_createMessageWindow.call(this);
		if (showFront){ this.createStPicContainer() }
	};
	
	
	Scene_Battle.prototype.addStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.addChild(sprite);	
		} else {
			this._spriteset.addStPic(sprite);
		}
	};
	
	Scene_Battle.prototype.removeStPic = function(sprite) {
		if (showFront){
			this._stPicContainer.removeChild(sprite);	
		} else {
			this._spriteset.removeStPic(sprite);
		}
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	function Window_ChoicePic() {
    	this.initialize.apply(this, arguments);
	}

	Window_ChoicePic.prototype = Object.create(Window_Selectable.prototype);
	Window_ChoicePic.prototype.constructor = Window_ChoicePic;

	Window_ChoicePic.prototype.initialize = function(messageWindow) {
    	this._messageWindow = messageWindow;
    	Window_Selectable.prototype.initialize.call(this, -64, 0, 64, 64);
    	this.openness = 0;
    	this.deactivate();
    	this._subCursor = new Sprite();
    	if (cursorName) { 
    		this._subCursor.bitmap = ImageManager.loadSystem('cursor')
    		this._subCursor.x = 0;
    		this._subCursor.y = 0;
    		this.addChild(this._subCursor);
    	}
	};
	
	Window_ChoicePic.prototype.start = function() {
		this.show();
		this.open();
    	this.activate();
    	this.select(0);
    	if (cursorName){
    		this._subCursor.opacity = 0;
    		this._subCursor.x = Graphics.boxWidth / 2 - this._subCursor.width / 2;
    		this._subCursor.y = Graphics.boxHeight / 2 - this._subCursor.height /2;
    		this._prevKeyRepeatWait = Input.keyRepeatWait;
    		Input.keyRepeatWait = 1;
    		this._prevKeyRepeatInterval = Input.keyRepeatInterval;
    		Input.keyRepeatInterval = 1;
    	}
	};
	
	Window_ChoicePic.prototype.isOkEnabled = function() {
    	return true;
	};
	
	Window_ChoicePic.prototype.processHandling = function() {
    	if (this.isOpenAndActive()) {
        	if (this.isOkEnabled() && this.isOkTriggered()) {
            	this.processOk();
        	} else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            	this.processCancel();
        	}
   		}
	};
	
	Window_ChoicePic.prototype.isCursorMovable = function() {
    	return true;
	};
	
	Window_ChoicePic.prototype.cursorLeft = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.x >= 64) {
			this._subCursor.x -= 8;
		}
	};
	
	Window_ChoicePic.prototype.cursorRight = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.x <= Graphics.boxWidth+64) {
			this._subCursor.x += 8;
		}
	};
	
	Window_ChoicePic.prototype.cursorDown = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.y <= Graphics.boxHeight) {
			this._subCursor.y += 8;
		}
	};
	
	Window_ChoicePic.prototype.cursorUp = function() {
		if (!cursorName){ return }
		this.callCursor();
		if (this._subCursor.y >= 0) {
			this._subCursor.y -= 8;
		}
	};
	
	Window_ChoicePic.prototype.isCancelEnabled = function() {
    	return $gameMessage.isEnablePicChoiceCancel();
	};
	
	Window_ChoicePic.prototype.processTouch = function() {
   		if (this.isOpenAndActive()) {
        	if (TouchInput.isTriggered()) {
            	this._touching = true;
            	this.onTouch(true);
        	} else if (TouchInput.isCancelled()) {
            	if (this.isCancelEnabled()) {
                	this.processCancel();
            	}
        	}
        	if (this._touching) {
            	if (TouchInput.isPressed()) {
                	this.onTouch(false);
            	} else {
                	this._touching = false;
            	}
        	}
    	} else {
        	this._touching = false;
    	}
	};
	
	Window_ChoicePic.prototype.getIndex = function(x, y) {
		x = x + this.x;
        var ary = [];
        for(i in this._messageWindow._spriteStPics){
        	var sprite = this._messageWindow._spriteStPics[i];
        	var sw = Math.abs(sprite.width * sprite.scale.x);
        	var sh = Math.abs(sprite.height * sprite.scale.y);
        	var cx = sprite.x - sw * sprite.anchor.x;
        	var cy = sprite.y - sh * sprite.anchor.y;
        	if (x >= cx && x <= (cx + sw) && y >= cy && y <= (cy + sh)){
        		var xx = (x - cx) * (1 / sprite.scale.x);
        		var yy = (y - cy) * (1 / sprite.scale.y);
        		if (xx < 0){ xx = sprite.width + xx }
        		if (yy < 0){ yy = sprite.height + yy } 
        		var pixel = sprite.bitmap.getPixel(xx,yy);
        		if (pixel != '#000000'){ ary.push(sprite) }
        	}
        }
        if (ary.length > 0){
        	var az = -9999;
        	var s = 0;
        	for (var i=0;i<ary.length;i++){
        		if (az <= ary[i].z){ s = ary[i]._id }
        	}
        	return s;
        }
    	return -1;
	};
	
	Window_ChoicePic.prototype.hitTest = function(x, y) {
		return this.getIndex(x,y);
	};
	
	Window_ChoicePic.prototype.onTouch = function(triggered) {
    	var lastIndex = this.index();
   		var x = this.canvasToLocalX(TouchInput.x);
    	var y = this.canvasToLocalY(TouchInput.y);
    	var hitIndex = this.hitTest(x, y);
    	if (hitIndex >= 0) {
            if (triggered && this.isTouchOkEnabled()) {
                this.processOk(hitIndex);
            }
       }
	};
	
	Window_ChoicePic.prototype.processOk = function(hitIndex) {
		if (!hitIndex && this.subCursorActive()){
			hitIndex = this.getIndex(this._subCursor.x,this._subCursor.y);
		}
		if (hitIndex !== undefined && hitIndex > -1){
    		//SoundManager.playOk();
    		$gameVariables.setValue($gameMessage.picChoiceVariableId(), hitIndex);
    		this._messageWindow.terminateMessage();
    		this.deactivate();
    		this.close();
    		Input.keyRepeatWait = this._prevKeyRepeatWait;
    		Input.keyRepeatInterval = this._prevKeyRepeatInterval;
    	} else {
			if (!cursorName){ return }
    		this.callCursor();
    	}
	};
	
	Window_ChoicePic.prototype.subCursorActive = function() {
		return this._subCursor && this._subCursor.opacity === 255;
	};
	
	Window_ChoicePic.prototype.callCursor = function() {
		if (this._subCursor.opacity <= 0){
    		//SoundManager.playCursor(); 
			this._subCursor.opacity = 255;
		}
	};
	
	Window_ChoicePic.prototype.processCancel = function() {	
    	SoundManager.playCancel();
    	$gameVariables.setValue($gameMessage.picChoiceVariableId(), -1);
    	this._messageWindow.terminateMessage();
    	this.deactivate();
    	this.close();
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_GMessage_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		_stPic_GMessage_clear.call(this);
		this._picChoiceVariableId = 0;
	}
	
	var _stPic_GMessage_isBusy = Game_Message.prototype.isBusy;
	Game_Message.prototype.isBusy = function() {
		return (_stPic_GMessage_isBusy.call(this) || this.isPicChoice());
	};
	
	Game_Message.prototype.isPicChoice = function() {
    	return this._picChoiceVariableId > 0;
	};
	
	Game_Message.prototype.setPicChoice = function(params) {
    	this._picChoiceVariableId = Number(params[1]);
    	this._picChoiceEnableCancel = params[2] === 'true';
	};
	
	Game_Message.prototype.picChoiceVariableId = function() {
		return this._picChoiceVariableId;
	};
	
	Game_Message.prototype.isEnablePicChoiceCancel = function() {
		return this._picChoiceEnableCancel;
	};
	
	//////////////////////////////////////////////////////////////////////////////////////////
	
	var _stPic_WMessage_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function() {
		_stPic_WMessage_createSubWindows.call(this);
		this._picSelectWindow = new Window_ChoicePic(this);
    };
	
	var _stPic_WMessage_startInput = Window_Message.prototype.startInput;
	Window_Message.prototype.startInput = function() {
		var result = _stPic_WMessage_startInput.call(this);
		if (!result && $gameMessage.isPicChoice()) { 
			this.picSelectStart();
			result = true;
		}
		return result;
	};
	
	Window_Message.prototype.picSelectStart = function() {
		this.deactivate();
		this._picSelectWindow.start();
	};
	
	var _stPic_WMessage_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
	Window_Message.prototype.isAnySubWindowActive = function() {
		return (_stPic_WMessage_isAnySubWindowActive.call(this) ||
				this._picSelectWindow.active);
    };
    
    var _stPic_WMessage_subWindows = Window_Message.prototype.subWindows;
    Window_Message.prototype.subWindows = function() {
    	return _stPic_WMessage_subWindows.call(this).concat(this._picSelectWindow);
    };

	//////////////////////////////////////////////////////////////////////////////////////////
	
	Game_Interpreter.prototype.setupPicChoice = function(params) {
    	$gameMessage.setPicChoice(params);
	};
	
	Game_Interpreter.prototype.prevEventCode = function() {
    	var command = this._list[this._index - 1];
    	if (command) {
        	return command.code;
    	} else {
        	return 0;
    	}
	};
	
	var _stPic_GInterpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		_stPic_GInterpreter_command101.call(this);
		var command = this._list[this._index];
		var size = Object.keys(SceneManager._scene._messageWindow._spriteStPics).length;
		if (command && command.code === 356){
			var params = command.parameters[0].split(' ');
			if (params[0] === 'ChoicePicture'){
        		this.setupPicChoice(params);
        		this._index++;
			}
		}
	};
}());
