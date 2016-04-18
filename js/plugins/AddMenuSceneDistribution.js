//
//  SceneDistributionメニュー追加 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['AddMenuSceneDistribution'] = 1.00;

/*:
 * @plugindesc ver1.00/メニューコマンドにSceneDistributionを追加します。
 * @author Yana
 * 
 * @param Distribution Name
 * @desc メニューに表示される項目名です。
 * @default ステータス振分
 */

(function(){	
	////////////////////////////////////////////////////////////////////////////////////	
	
	var parameters = PluginManager.parameters('AddMenuSceneDistribution');
	var distributionName = String(parameters['Distribution Name'] || '');
	
	////////////////////////////////////////////////////////////////////////////////////	

	var __WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		__WMCommand_addOriginalCommands.call(this);
		this.addCommand(distributionName, 'statDistribution', true);
	};

	var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		__SMenu_createCommandWindow.call(this);
    	this._commandWindow.setHandler('statDistribution',   this.commandPersonal.bind(this));
	}
	var __SMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
	Scene_Menu.prototype.onPersonalOk = function() {
		__SMenu_onPersonalOk.call(this);
		if (this._commandWindow.currentSymbol() === 'statDistribution'){
			var actor = $gameParty.members()[this._statusWindow.index()];
        	SceneManager.sceneDistribution(actor);
		}
	};
	
	////////////////////////////////////////////////////////////////////////////////////
}());