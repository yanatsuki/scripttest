SceneManager.initialize = function() {
    this.initGraphics();
    this.checkFileAccess();
    this.initAudio();
    this.initInput();
    this.initNwjs();
    this.checkPluginErrors();
    this.setupErrorHandlers();
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    	require('nw.gui').Window.get().showDevTools();
    }
};