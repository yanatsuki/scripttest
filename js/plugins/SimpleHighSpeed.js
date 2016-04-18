Window_BattleLog.prototype.messageSpeed = function() {
    return 1;
};

Sprite_Animation.prototype.setupRate = function() {
    this._rate = 1;
};

Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
        this._targetOffsetX = x;
        this._targetOffsetY = y;
        this._movementDuration = duration/4;
        if (duration === 0) {
            this._offsetX = x;
            this._offsetY = y;1
        }
    }
};