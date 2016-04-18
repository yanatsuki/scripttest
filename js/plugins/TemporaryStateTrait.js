//
//  一時ステート特徴 ver1.01
//
// author yana
//

var Imported = Imported || {};
Imported['TemporaryStateTrait'] = 1.01;

/*:
 * @plugindesc ver1.01/行動時に一時的にステートが付与される特徴を設定できるようにします。
 * @author Yana
 * 
 * @param Temp State Key
 * @desc 読み取りに使う正規表現です。
 * 特に理由がない限り、変更する必要はありません。
 * @default ^<(対象)?((?:攻撃時|防御時))一時ステート:(\d+),(\d+)[%％]?>
 * 
 * @param Temp State Cond Stop Key
 * @desc 発動条件設定終了の読み取りに使う正規表現です。
 * 特に理由がない限り、変更する必要はありません。
 * @default ^</一時ステート>
 * 
 * @help------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * 特徴を持ったオブジェクトのメモ欄に、以下を記述すると、
 * それぞれの効果が発動します。
 * 
 * ・行動を行ったとき、自身にIDx番のステートをy%の確率で付与する。
 * <攻撃時一時ステート:x,y%>
 * 
 * ・行動を受けたとき、自身にIDx番のステートをy%の確率で付与する。
 * <防御時一時ステート:x,y%>
 * 
 * ・行動を行ったとき、対象にIDx番のステートをy%の確率で付与する。
 * <対象攻撃時一時ステート:x,y%>
 * 
 * ・行動を受けたとき、行動者にIDx番のステートをy%の確率で付与する。
 * <対象防御時一時ステート:x,y%>
 * 
 * また、ConditionallyCoreのプラグインが同時に導入されている場合、
 * ステートの付与に条件を付けることができます。
 * 
 * <攻撃時一時ステート:x,y%>
 * 発動条件
 * </一時ステート>
 * 
 * と記述してください。
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
 * 条件付き○○ベースと併用時、不要な条件が送られていたバグを修正。
 * ver1.00:
 * 公開
 */

(function(){
	var parameters = PluginManager.parameters('TemporaryStateTrait');
	var tempStateKey = RegExp(parameters['Temp State Key'] || '^<(対象)?((?:攻撃時|防御時))一時ステート:(\\d+),(\\d+)[%％]?>');
	var tempStateCondStopKey = RegExp(parameters['Temp State Cond Stop Key'] || '</一時ステート>') 
	
	DataManager.initTemporaryStates = function(obj) {
		obj._temporaryStates = [];
		var texts = obj.note.split('\n');
		for(var i=0;i<texts.length;i++){
			if (texts[i].match(tempStateKey)){
				var tempState = {
					'target':RegExp.$1 === '対象' ? 'target' : 'user',
					'type':RegExp.$2 === '攻撃時' ? 0 : 1,
					'stateId':Number(RegExp.$3),
					'rate':Number(RegExp.$4)/100,
					'cond':[]
				}
				if (Imported['ConditionallyCore']){
					var condTexts = [];
					var stopFlag = false;
					for(var j=i+1;j<texts.length;j++){
						if(texts[j].match(tempStateCondStopKey)){
							stopFlag = true;
							break;
						}
						condTexts.push(texts[j]);
					}
					if (stopFlag){
						for(var k=0;k<condTexts.length;k++){
							tempState['cond'].push(ConditionallyManager.makeCondition(condTexts[k]));
						}
						i = j+1;
					}
				}
				obj._temporaryStates.push(tempState);
			}
		}
	};
	
	var _TmpS_GAction_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		this.addTemporaryStates(target);
		_TmpS_GAction_apply.call(this,target);
		this.removeTemporaryStates(target);
	};
	
	Game_Action.prototype.setTemporaryStates = function(target,type,originalTarget) {
		var targetTempStates = [];
		var user = this.subject(); 
		target.traitObjects().forEach(function(obj){
			if (obj._temporaryStates === undefined) {
				DataManager.initTemporaryStates(obj);
			}
			var tempStates = obj._temporaryStates;
			for(var i=0;i<tempStates.length;i++){
				var tState = tempStates[i];
				if (tState['type'] !== type){ continue }
				if (Math.random() > tState['rate'] ){ continue }
				if (Imported['ConditionallyCore']){
					if (!ConditionallyManager.checkConditions(user,originalTarget,tState['cond'])){
						continue;
					}
				}
				targetTempStates.push(tState);
			};
		});
		return targetTempStates;
	};
	
	Game_Action.prototype.addTemporaryStates = function(target) {
		this._subjectTempStates = this.setTemporaryStates(this.subject(),0);
		this._targetTempStates = this.setTemporaryStates(target,1);
		this._subjectTempStates.forEach(function(tempState){
			var stateId = tempState['stateId'];
			tempState['target'] === 'user' ? this.subject().addState(stateId) : target.addState(stateId);
		}.bind(this));
		this._targetTempStates.forEach(function(tempState){
			var stateId = tempState['stateId'];
			tempState['target'] === 'target' ? this.subject().addState(stateId) : target.addState(stateId);
		}.bind(this));
	};
	
	Game_Action.prototype.removeTemporaryStates = function(target) {
		this._subjectTempStates.forEach(function(tempState){
			var stateId = tempState['stateId'];
			tempState['target'] === 'user' ? this.subject().removeState(stateId) : target.removeState(stateId);
		}.bind(this));
		this._targetTempStates.forEach(function(tempState){
			var stateId = tempState['stateId'];
			tempState['target'] === 'target' ? this.subject().removeState(stateId) : target.removeState(stateId);
		}.bind(this));
		this._subjectTempStates = null;
		this._targetTempStates = null;
	};
}());
