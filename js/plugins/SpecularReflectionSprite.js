//
//  鏡面反射スプライト ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['SpecularReflectionSprite'] = 1.00;

/*:
 * @plugindesc 鏡面反射を実装します。
 * @author Yana
 */

(function(){
	
	//-----------------------------------------------------------------------------
	// Sprite_Specular
	//
	// The sprite for displaying a balloon icon.

	function Sprite_Specular() {
    	this.initialize.apply(this, arguments);
	}

	Sprite_Specular.prototype = Object.create(Sprite_Base.prototype);
	Sprite_Specular.prototype.constructor = Sprite_Specular;

	Sprite_Specular.prototype.initialize = function(character) {
    	Sprite_Base.prototype.initialize.call(this);
    	this.initMembers();
    	this.setCharacter(character);
	};

	Sprite_Specular.prototype.initMembers = function() {
    	this.anchor.x = 0.5;
    	this.anchor.y = 1;
    	this._character = null;
    	this._tilesetId = 0;
    	this._upperBody = null;
   		this._lowerBody = null;
    	this.scale = new Point(1.0,-1.0);
    	this.z = 2;
	};
	
	
	Sprite_Specular.prototype.setCharacter = function(character) {
    	this._character = character;
	};
	
	Sprite_Specular.prototype.updateVisibility = function() {
    	Sprite_Base.prototype.updateVisibility.call(this);
    	var x = this._character.x;
    	var y = this._character.y + 1;
    	var terrainTag = $gameMap.terrainTag(x, y);
    	if (this._character.isTransparent() || terrainTag !== 1) {
        	this.visible = false;
    	}else{
    		this.visible = true;
    	}
	};

	Sprite_Specular.prototype.isTile = function() {
    	return this._character.tileId > 0;
	};

	Sprite_Specular.prototype.tilesetBitmap = function(tileId) {
    	var tileset = $gameMap.tileset();
    	var setNumber = 5 + Math.floor(tileId / 256);
    	return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
	};

	Sprite_Specular.prototype.updateBitmap = function() {
    	if (this.isImageChanged()) {
        	this._tilesetId = $gameMap.tilesetId();
        	this._tileId = this._character.tileId();
        	this._characterName = this._character.characterName();
        	this._characterIndex = this._character.characterIndex();
        	if (this._tileId > 0) {
            	this.setTileBitmap();
        	} else {
            	this.setCharacterBitmap();
        	}
    	}
	};

	Sprite_Specular.prototype.isImageChanged = function() {
    	return (this._tilesetId !== $gameMap.tilesetId() ||
            	this._tileId !== this._character.tileId() ||
            	this._characterName !== this._character.characterName() ||
            	this._characterIndex !== this._character.characterIndex());
	};

	Sprite_Specular.prototype.setTileBitmap = function() {
    	this.bitmap = this.tilesetBitmap(this._tileId);
	};

	Sprite_Specular.prototype.setCharacterBitmap = function() {
    	this.bitmap = ImageManager.loadCharacter(this._characterName);
    	this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
	};

	Sprite_Specular.prototype.updateFrame = function() {
    	if (this._tileId > 0) {
        	this.updateTileFrame();
    	} else {
        	this.updateCharacterFrame();
    	}
	};

	Sprite_Specular.prototype.updateTileFrame = function() {
    	var pw = this.patternWidth();
    	var ph = this.patternHeight();
    	var sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
    	var sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;
    	this.setFrame(sx, sy, pw, ph);
	};

	Sprite_Specular.prototype.updateCharacterFrame = function() {
    	var pw = this.patternWidth();
    	var ph = this.patternHeight();
    	var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    	var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    	this.updateHalfBodySprites();
    	if (this._bushDepth > 0) {
        	var d = this._bushDepth;
        	this._upperBody.setFrame(sx, sy, pw, ph - d);
        	this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
        	this.setFrame(sx, sy, 0, ph);
    	} else {
        	this.setFrame(sx, sy, pw, ph);
    	}
	};

	Sprite_Specular.prototype.characterBlockX = function() {
    	if (this._isBigCharacter) {
        	return 0;
    	} else {
        	var index = this._character.characterIndex();
        	return index % 4 * 3;
    	}
	};

	Sprite_Specular.prototype.characterBlockY = function() {
    	if (this._isBigCharacter) {
        	return 0;
    	} else {
        	var index = this._character.characterIndex();
        	return Math.floor(index / 4) * 4;
    	}
	};

	Sprite_Specular.prototype.characterPatternX = function() {
    	return this._character.pattern();
	};

	Sprite_Specular.prototype.characterPatternY = function() {
    	return (this._character.direction() - 2) / 2;
	};

	Sprite_Specular.prototype.patternWidth = function() {
    	if (this._tileId > 0) {
        	return $gameMap.tileWidth();
    	} else if (this._isBigCharacter) {
        	return this.bitmap.width / 3;
    	} else {
        	return this.bitmap.width / 12;
    	}
	};

	Sprite_Specular.prototype.patternHeight = function() {
    	if (this._tileId > 0) {
        	return $gameMap.tileHeight();
    	} else if (this._isBigCharacter) {
        	return this.bitmap.height / 4;
    	} else {
        	return this.bitmap.height / 8;
    	}
	};

	Sprite_Specular.prototype.updateHalfBodySprites = function() {
    	if (this._bushDepth > 0) {
        	this.createHalfBodySprites();
        	this._upperBody.bitmap = this.bitmap;
        	this._upperBody.visible = true;
        	this._upperBody.y = - this._bushDepth;
        	this._lowerBody.bitmap = this.bitmap;
        	this._lowerBody.visible = true;
        	this._upperBody.setBlendColor(this.getBlendColor());
        	this._lowerBody.setBlendColor(this.getBlendColor());
        	this._upperBody.setColorTone(this.getColorTone());
        	this._lowerBody.setColorTone(this.getColorTone());
    	} else if (this._upperBody) {
        	this._upperBody.visible = false;
        	this._lowerBody.visible = false;
    	}
	};

	Sprite_Specular.prototype.createHalfBodySprites = function() {
    	if (!this._upperBody) {
       		this._upperBody = new Sprite();
        	this._upperBody.anchor.x = 0.5;
        	this._upperBody.anchor.y = 1;
        	this.addChild(this._upperBody);
    	}
    	if (!this._lowerBody) {
        	this._lowerBody = new Sprite();
        	this._lowerBody.anchor.x = 0.5;
        	this._lowerBody.anchor.y = 1;
        	this._lowerBody.opacity = 128;
        	this.addChild(this._lowerBody);
    	}
	};

	Sprite_Specular.prototype.updateOther = function() {
    	this.opacity = this._character.opacity();
    	this.blendMode = this._character.blendMode();
    	this._bushDepth = this._character.bushDepth();
	};


	Sprite_Specular.prototype.update = function() {
    	Sprite_Base.prototype.update.call(this);
    	this.updatePosition();
    	this.updateBitmap();
    	this.updateFrame();
    	this.updatePosition();
    	this.updateOther();
	};
	
	Sprite_Specular.prototype.updatePosition = function() {
   		this.x = this._character.screenX();
    	this.y = this._character.screenY();
    	this.z = this._character.screenZ();
	};
	
	var _sref_SMap_createParallax = Spriteset_Map.prototype.createParallax;
	Spriteset_Map.prototype.createParallax = function() {
		_sref_SMap_createParallax.call(this);
		this.createSpecular();
	};
	
	Spriteset_Map.prototype.createSpecular = function() {
    	this._specularSprites = [];
    	$gameMap.events().forEach(function(event) {
        	this._specularSprites.push(new Sprite_Specular(event));
    	}, this);
    	$gameMap.vehicles().forEach(function(vehicle) {
        	this._specularSprites.push(new Sprite_Specular(vehicle));
    	}, this);
    	$gamePlayer.followers().reverseEach(function(follower) {
        	this._specularSprites.push(new Sprite_Specular(follower));
    	}, this);
    	this._specularSprites.push(new Sprite_Specular($gamePlayer));
    	for (var i = 0; i < this._specularSprites.length; i++) {
        	this._baseSprite.addChild(this._specularSprites[i]);
    	}
	};
	
}());
