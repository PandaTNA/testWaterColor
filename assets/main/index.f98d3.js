window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AssistiveButton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee87eT8hhNGfoITUBd8DKml", "AssistiveButton");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("./Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bgMaskNode = null;
        _this.boardNode = null;
        _this.menuNode = null;
        _this.shopNode = null;
        _this.shopPanel = null;
        _this.soundNode = null;
        _this.vibrateNode = null;
        _this.rateNode = null;
        _this.soundX = null;
        _this.vibrateX = null;
        _this.inputBox = null;
        _this.distance = 115;
        _this.ASSISTIVE_ALPHA = 80;
        _this.FADE_TIME = .2;
        _this.nodeList = [];
        _this._isMoving = false;
        _this._isExpand = false;
        _this._isFading = false;
        _this._assistivePos = cc.v2(0, 0);
        return _this;
      }
      NewClass.prototype.onGoLevel = function() {
        var level = parseInt(this.inputBox.string);
        this.inputBox.string = "";
        isNaN(level) || Global_1.Global.getInstance().inGame.loadLevel(level - 1);
        this.collapse();
      };
      NewClass.prototype.onShopTouch = function() {
        this.shopPanel.active = !this.shopPanel.active;
        this.collapse();
      };
      NewClass.prototype.onSoundTouch = function() {
        Global_1.Global.getInstance().userData.sound = !Global_1.Global.getInstance().userData.sound;
        this.soundX.active = !Global_1.Global.getInstance().userData.sound;
      };
      NewClass.prototype.onVibrateTouch = function() {
        Global_1.Global.getInstance().userData.vibrate = !Global_1.Global.getInstance().userData.vibrate;
        this.vibrateX.active = !Global_1.Global.getInstance().userData.vibrate;
      };
      NewClass.prototype.onLoad = function() {
        this.boardNode.scale = .18;
        this.boardNode.opacity = 0;
        this.bgMaskNode.opacity = 0;
        this.bgMaskNode.active = false;
        this.menuNode.on(cc.Node.EventType.TOUCH_END, this.onMenuTouchEnd, this);
        this.menuNode.on(cc.Node.EventType.TOUCH_MOVE, this.onMenuTouchMove, this);
        this.bgMaskNode.on(cc.Node.EventType.TOUCH_END, this.onBgMaskTouchEnd, this);
        this.boardNode.on(cc.Node.EventType.TOUCH_END, this.onBoardTouchEnd, this);
        this.soundX.active = !Global_1.Global.getInstance().userData.sound;
        this.vibrateX.active = !Global_1.Global.getInstance().userData.vibrate;
      };
      NewClass.prototype.onMenuTouchMove = function(event) {
        event.stopPropagation();
        if (!this._isExpand) {
          this._isMoving = true;
          var pos = this.node.getPosition().add(event.getDelta());
          var screenWidth = cc.Canvas.instance.node.width;
          var screenHeight = cc.Canvas.instance.node.height;
          pos.x = Math.max(-screenWidth / 2 + 50, Math.min(pos.x, screenWidth / 2 - 50));
          pos.y = Math.max(-screenHeight / 2 + 50, Math.min(pos.y, screenHeight / 2 - 50));
          this.node.setPosition(pos);
        }
      };
      NewClass.prototype.onMenuTouchEnd = function(event) {
        event.stopPropagation();
        if (this._isMoving) {
          this._isMoving = false;
          return;
        }
        this._isExpand ? this.collapse() : this.expand();
      };
      NewClass.prototype.onBoardTouchEnd = function(event) {
        event.stopPropagation();
      };
      NewClass.prototype.onBgMaskTouchEnd = function(event) {
        cc.log("onBoardTouch");
        event.stopPropagation();
        this.collapse();
      };
      NewClass.prototype.expand = function() {
        var _this = this;
        if (this._isFading) return;
        this._assistivePos = this.node.getPosition();
        this._isFading = true;
        this._isExpand = true;
        this.bgMaskNode.active = true;
        cc.tween(this.boardNode).to(this.FADE_TIME, {
          scale: 1,
          opacity: 255
        }).start();
        cc.tween(this.node).to(this.FADE_TIME, {
          x: 0,
          y: 0
        }).start();
        cc.tween(this.bgMaskNode).to(this.FADE_TIME, {
          opacity: 255
        }).start();
        cc.tween(this.menuNode).to(this.FADE_TIME, {
          opacity: 255
        }).call(function() {
          _this._isFading = false;
        }).start();
      };
      NewClass.prototype.collapse = function() {
        var _this = this;
        if (this._isFading) return;
        this._isFading = true;
        this._isExpand = false;
        this.boardNode.opacity = 255;
        cc.tween(this.boardNode).to(this.FADE_TIME, {
          scale: .18,
          opacity: 0
        }).call(function() {
          _this.boardNode.opacity = 0;
          cc.tween(_this.menuNode).delay(1).to(.3, {
            opacity: _this.ASSISTIVE_ALPHA
          }).start();
        }).start();
        cc.tween(this.node).to(this.FADE_TIME, {
          x: this._assistivePos.x,
          y: this._assistivePos.y
        }).start();
        cc.tween(this.bgMaskNode).to(this.FADE_TIME, {
          opacity: 0
        }).call(function() {
          _this.bgMaskNode.active = false;
          _this._isFading = false;
        }).start();
      };
      NewClass.prototype.start = function() {
        cc.tween(this.menuNode).delay(1).to(.3, {
          opacity: this.ASSISTIVE_ALPHA
        }).start();
      };
      __decorate([ property(cc.Node) ], NewClass.prototype, "bgMaskNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "boardNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "menuNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "shopNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "shopPanel", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "soundNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "vibrateNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "rateNode", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "soundX", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "vibrateX", void 0);
      __decorate([ property(cc.EditBox) ], NewClass.prototype, "inputBox", void 0);
      __decorate([ property ], NewClass.prototype, "distance", void 0);
      __decorate([ property ], NewClass.prototype, "ASSISTIVE_ALPHA", void 0);
      __decorate([ property ], NewClass.prototype, "FADE_TIME", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./Global": "Global"
  } ],
  Bottle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f81889md2VFT4h08ny1OjEl", "Bottle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BottleState = void 0;
    var DropWater_1 = require("./DropWater");
    var Global_1 = require("./Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BottleState;
    (function(BottleState) {
      BottleState[BottleState["IDLE"] = 0] = "IDLE";
      BottleState[BottleState["POURING"] = 1] = "POURING";
      BottleState[BottleState["POUR_COMPLETE"] = 2] = "POUR_COMPLETE";
      BottleState[BottleState["WAITING_FOR_GETTING"] = 3] = "WAITING_FOR_GETTING";
      BottleState[BottleState["GETTING_WATER"] = 4] = "GETTING_WATER";
    })(BottleState = exports.BottleState || (exports.BottleState = {}));
    var Bottle = function(_super) {
      __extends(Bottle, _super);
      function Bottle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.particalWin = null;
        _this.touchArea = null;
        _this.waterDropContainer = null;
        _this.bottleContainerR = null;
        _this.bottleContainerL = null;
        _this.bottleContainer = null;
        _this.waterPrefab = null;
        _this.waterContainer = null;
        _this.pourAnchorPointL = null;
        _this.emptyAnchorPointL = null;
        _this.pourAnchorPointR = null;
        _this.emptyAnchorPointR = null;
        _this.waterDropAnim = null;
        _this.rotateSpeed = 1;
        _this.increaseFactor = 4;
        _this.BOTTOM_POS = 30;
        _this.TOP_POS = 340;
        _this.POUR_POS_X = 42;
        _this.POUR_POS_Y = 90;
        _this.bottleState = BottleState.IDLE;
        _this._maxLevel = 4;
        _this._index = 0;
        _this._waterLevelsConfig = [];
        _this._waterColors = [];
        _this._gettingBottle = null;
        _this._isShaking = false;
        _this._currentDisplayLevel = 0;
        _this._currentGettingColorIndex = 0;
        _this._isGettingBottleOnLeft = true;
        _this._GETTING_WATER_FLAG = false;
        _this._SELECTED = false;
        _this._prePos = cc.v3(0, 0, 0);
        _this._currentWaters = [];
        _this._currentWatersLogic = [];
        _this._isComplete = false;
        _this._levelBeforePour = 0;
        _this._numBottlePouring = 0;
        _this._pourAudioID = 0;
        _this._numWaterPour = 0;
        _this.colors = [ cc.Color.WHITE.fromHEX("#8C2048"), cc.Color.WHITE.fromHEX("#198C07"), cc.Color.WHITE.fromHEX("#BF190A"), cc.Color.WHITE.fromHEX("#F2BB13"), cc.Color.WHITE.fromHEX("#F2E529"), cc.Color.WHITE.fromHEX("#BF548F"), cc.Color.WHITE.fromHEX("#D97A43"), cc.Color.WHITE.fromHEX("#BF4158"), cc.Color.WHITE.fromHEX("#F2CEAE"), cc.Color.WHITE.fromHEX("#F25C5C"), cc.Color.WHITE.fromHEX("#294973"), cc.Color.WHITE.fromHEX("#05F240") ];
        return _this;
      }
      Object.defineProperty(Bottle.prototype, "id", {
        get: function() {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "remainLevel", {
        get: function() {
          return this._maxLevel - this._currentWaters.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "currentLevel", {
        get: function() {
          return this._currentWaters.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "topColor", {
        get: function() {
          if (0 == this._currentWaters.length) return -1;
          return this._currentWaters[this._currentWaters.length - 1];
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "isFull", {
        get: function() {
          return this.currentLevel === this._maxLevel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "isEmpty", {
        get: function() {
          return 0 === this._currentWaters.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "isComplete", {
        get: function() {
          return this.isFull && this._isComplete;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "currentLevelLogic", {
        get: function() {
          return this._currentWatersLogic.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "topColorLogic", {
        get: function() {
          if (0 == this._currentWatersLogic.length) return -1;
          return this._currentWatersLogic[this._currentWatersLogic.length - 1];
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "isFullLogic", {
        get: function() {
          return this.currentLevelLogic === this._maxLevel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "isEmptyLogic", {
        get: function() {
          return 0 === this._currentWatersLogic.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Bottle.prototype, "isCompleteLogic", {
        get: function() {
          return this.isFullLogic && this._isComplete;
        },
        enumerable: false,
        configurable: true
      });
      Bottle.prototype.numWaterCanPourLogic = function() {
        var count = 0;
        if (!this.isEmptyLogic) {
          count = 1;
          var index = this.currentLevelLogic - 2;
          while (index >= 0 && this._currentWatersLogic[index] === this.topColorLogic) {
            index--;
            count++;
          }
        }
        return count;
      };
      Bottle.prototype.numWaterCanGetLogic = function() {
        return this._maxLevel - this.currentLevelLogic;
      };
      Bottle.prototype.onLoad = function() {
        this.bottleContainer = this.bottleContainerL;
      };
      Bottle.prototype.start = function() {
        this._prePos = this.node.position.clone();
        this.touchArea.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
      };
      Bottle.prototype.initData = function(info, maxLevel, id) {
        for (var i = 0; i < maxLevel; i++) {
          var levelLength = (this.TOP_POS - this.BOTTOM_POS) / maxLevel;
          this._waterLevelsConfig.push(Math.floor(this.BOTTOM_POS + (i + 1) * levelLength));
        }
        this._maxLevel = maxLevel;
        this._index = id;
        this._currentWaters = info.slice();
        this._currentWatersLogic = info.slice();
        for (var index = 0; index < this._maxLevel; index++) {
          var water = cc.instantiate(this.waterPrefab);
          if (index < this.currentLevel) {
            water.height = this._waterLevelsConfig[index];
            water.color = this.colors[info[index]];
          } else water.height = this.BOTTOM_POS;
          this.waterContainer.addChild(water, -index);
          this._waterColors.push(water);
        }
      };
      Bottle.prototype.remove = function(amount) {
        for (var i = 0; i < amount; i++) {
          this._currentWaters.pop();
          this._currentWatersLogic.pop();
          this._waterColors[this.currentLevel].height = this.BOTTOM_POS;
        }
        this.updateIsBottleComplete();
      };
      Bottle.prototype.add = function(amount, color) {
        for (var i = 0; i < amount; i++) {
          this._waterColors[this.currentLevel].height = this._waterLevelsConfig[this.currentLevel];
          this._waterColors[this.currentLevel].color = this.colors[color];
          this._currentWaters.push(color);
          this._currentWatersLogic.push(color);
        }
      };
      Bottle.prototype.onTouch = function(event) {
        if (Global_1.Global.getInstance().inGame.hintMode) return;
        if (this.isEmpty && !Global_1.Global.getInstance().inGame.SELECTED_BOTTLE || this.isComplete) {
          this.shaking();
          return;
        }
        if (this.bottleState === BottleState.POURING || this.bottleState === BottleState.POUR_COMPLETE) return;
        this.touchArea.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this._SELECTED ? this.unSelected() : this.selected();
      };
      Bottle.prototype.selected = function() {
        var _this = this;
        if (Global_1.Global.getInstance().inGame.SELECTED_BOTTLE || this.bottleState != BottleState.IDLE) {
          this.touchArea.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
          this.node.dispatchEvent(new cc.Event.EventCustom("ON_BOTTLE_TOUCH", true));
        } else {
          this._SELECTED = true;
          cc.tween(this.node).by(.1, {
            y: 30
          }).call(function() {
            _this.touchArea.on(cc.Node.EventType.TOUCH_START, _this.onTouch, _this);
          }).start();
          this.node.dispatchEvent(new cc.Event.EventCustom("ON_BOTTLE_SELECTED", true));
        }
      };
      Bottle.prototype.unSelected = function(callback, delayCallback) {
        var _this = this;
        void 0 === callback && (callback = null);
        void 0 === delayCallback && (delayCallback = 0);
        this._SELECTED = false;
        this.node.dispatchEvent(new cc.Event.EventCustom("ON_BOTTLE_UNSELECTED", true));
        cc.tween(this.node).by(.1, {
          y: -30
        }).delay(delayCallback).call(function() {
          _this.touchArea.on(cc.Node.EventType.TOUCH_START, _this.onTouch, _this);
          callback && callback();
        }).start();
      };
      Bottle.prototype.shaking = function() {
        var _this = this;
        if (this._isShaking) return;
        cc.sys.isBrowser && navigator && navigator.vibrate(50);
        this._isShaking = true;
        cc.tween(this.node).by(.05, {
          x: 10
        }).by(.05, {
          x: -18
        }).by(.05, {
          x: 14
        }).by(.05, {
          x: -10
        }).by(.05, {
          x: 6
        }).by(.05, {
          x: -2
        }).call(function() {
          _this._isShaking = false;
        }).start();
      };
      Bottle.prototype.prepareForPour = function(numWaterPour, gettingBottle, isGettingBottleOnLeft) {
        void 0 === numWaterPour && (numWaterPour = 0);
        void 0 === gettingBottle && (gettingBottle = null);
        void 0 === isGettingBottleOnLeft && (isGettingBottleOnLeft = true);
        this._isGettingBottleOnLeft = isGettingBottleOnLeft;
        this.bottleState = BottleState.POURING;
        this._gettingBottle = gettingBottle;
        this._numWaterPour = numWaterPour;
        this._currentDisplayLevel = this.currentLevel;
        this._lastTopColorBeforePouring = this.topColor;
        for (var index = 0; index < numWaterPour; index++) this._gettingBottle._currentWatersLogic.push(this._currentWatersLogic.pop());
      };
      Bottle.prototype.pour = function(numWaterPour, gettingBottle) {
        void 0 === numWaterPour && (numWaterPour = 0);
        void 0 === gettingBottle && (gettingBottle = null);
        this.waterDropContainer.removeChild(this.waterDropAnim);
        this._gettingBottle.waterDropContainer.addChild(this.waterDropAnim);
        this.waterDropAnim.getComponent(DropWater_1.default).beginPour(this.colors[this.topColor]);
        this._pourAudioID = Global_1.Global.getInstance().inGame.playPourSound();
        this._gettingBottle._levelBeforePour = this._gettingBottle.currentLevel;
        for (var index = 0; index < numWaterPour; index++) this._gettingBottle._currentWaters.push(this._currentWaters.pop());
        this._gettingBottle.updateIsBottleComplete();
        this._gettingBottle._numBottlePouring++;
        this._gettingBottle.prepareGetWater(numWaterPour, this._lastTopColorBeforePouring);
      };
      Bottle.prototype.updateIsBottleComplete = function() {
        if (this.isEmpty || !this.isFull) {
          this._isComplete = false;
          return;
        }
        var i = 0;
        var color0 = this._currentWaters[0];
        while (i < this._currentWaters.length && this._currentWaters[i] === color0) i++;
        i === this._currentWaters.length ? this._isComplete = true : this._isComplete = false;
      };
      Bottle.prototype.onPouringComplete = function() {
        var _this = this;
        this._gettingBottle._numBottlePouring--;
        this.waterDropAnim.getComponent(DropWater_1.default).endPour();
        Global_1.Global.getInstance().inGame.stopPourSound(this._pourAudioID);
        cc.tween(this.node).delay(.11).call(function() {
          _this._gettingBottle.waterDropContainer.removeChild(_this.waterDropAnim);
          _this.waterDropContainer.addChild(_this.waterDropAnim);
        }).start();
      };
      Bottle.prototype.restoreToIdle = function() {
        var _this = this;
        if (this.bottleState !== BottleState.POUR_COMPLETE) {
          cc.log("@@@ retore on wrong bottle state : " + this.bottleState);
          return;
        }
        var timeTween = .45;
        cc.tween(this.bottleContainer).to(timeTween, {
          angle: 0
        }).start();
        cc.tween(this.waterContainer).to(timeTween, {
          angle: 0
        }).start();
        for (var index = 0; index < this.currentLevel; index++) cc.tween(this._waterColors[index]).to(timeTween, {
          height: this._waterLevelsConfig[index]
        }).start();
        cc.tween(this.node).to(timeTween, {
          position: this._prePos
        }, {
          easing: "cubicOut"
        }).call(function() {
          _this.onRestoreComplete();
        }).start();
      };
      Bottle.prototype.onRestoreComplete = function() {
        this.bottleState = BottleState.IDLE;
        this._SELECTED = false;
        this.node.dispatchEvent(new cc.Event.EventCustom("ON_POUR_COMPLETE", true));
        this.node.zIndex = 0;
      };
      Bottle.prototype.prepareGetWater = function(numWater, colorIndex) {
        void 0 === numWater && (numWater = 1);
        void 0 === colorIndex && (colorIndex = 0);
        if (this.bottleState === BottleState.GETTING_WATER) return;
        this._currentDisplayLevel = this._levelBeforePour;
        this._currentGettingColorIndex = colorIndex;
        this.bottleState = BottleState.GETTING_WATER;
        var waterHighestNode = this._waterColors[this._currentDisplayLevel];
        waterHighestNode.color = this.colors[this._currentGettingColorIndex];
        0 === this._currentDisplayLevel ? waterHighestNode.height = this.BOTTOM_POS : waterHighestNode.height = this._waterColors[this._currentDisplayLevel - 1].height;
      };
      Bottle.prototype.checkGettingConplete = function() {
        this._currentDisplayLevel++;
        if (this.currentLevel === this._currentDisplayLevel) {
          this.bottleState = BottleState.IDLE;
          this._SELECTED = false;
          if (this.isComplete) {
            Global_1.Global.getInstance().inGame.playSoundBottleComplete();
            this.particalWin.resetSystem();
          }
        } else {
          var waterHighestNode = this._waterColors[this._currentDisplayLevel];
          waterHighestNode.color = this.colors[this._currentGettingColorIndex];
          waterHighestNode.height = this._waterColors[this._currentDisplayLevel - 1].height;
        }
      };
      Bottle.prototype.update = function(dt) {
        switch (this.bottleState) {
         case BottleState.IDLE:
         case BottleState.POUR_COMPLETE:
         case BottleState.WAITING_FOR_GETTING:
          break;

         case BottleState.GETTING_WATER:
          var waterHighestNode = this._waterColors[this._currentDisplayLevel];
          waterHighestNode.height += 2 * Math.max(1, this._numBottlePouring);
          waterHighestNode.height >= this._waterLevelsConfig[this._currentDisplayLevel] && this.checkGettingConplete();
          break;

         case BottleState.POURING:
          var absCurrentRotateSpeed = this._GETTING_WATER_FLAG ? this.rotateSpeed : 3 * this.rotateSpeed;
          var currentRotateSpeed = absCurrentRotateSpeed * (this._isGettingBottleOnLeft ? 1 : -1);
          this.bottleContainer = this._isGettingBottleOnLeft ? this.bottleContainerL : this.bottleContainerR;
          this.bottleContainer.angle += currentRotateSpeed;
          this.waterContainer.angle -= currentRotateSpeed;
          var pourAnchorPoint = this._isGettingBottleOnLeft ? this.pourAnchorPointL : this.pourAnchorPointR;
          var emptyAnchorPoint = this._isGettingBottleOnLeft ? this.emptyAnchorPointL : this.emptyAnchorPointR;
          var pourPos = this.bottleContainerL.convertToWorldSpaceAR(pourAnchorPoint.getPosition());
          for (var index = 0; index < this._currentDisplayLevel; index++) {
            var waterColorNode = this._waterColors[index];
            waterColorNode.height += absCurrentRotateSpeed / this.increaseFactor * (this._maxLevel - index);
            var waterPos = this.waterContainer.convertToWorldSpaceAR(waterColorNode.getPosition());
            var waterDiffer = waterPos.y + waterColorNode.height * Global_1.Global.getInstance().LEVEL_SCALE - pourPos.y;
            if (waterDiffer > 0) {
              if (this._gettingBottle && !this._GETTING_WATER_FLAG) {
                this.pour(this._numWaterPour, this._gettingBottle);
                this._GETTING_WATER_FLAG = true;
              }
              index === this._currentDisplayLevel - 2 ? this.checkPourComplete() : waterColorNode.height = waterColorNode.height - waterDiffer;
            }
          }
          if (this._currentDisplayLevel <= 1) {
            var emtyPos = this.bottleContainerL.convertToWorldSpaceAR(emptyAnchorPoint.getPosition());
            emtyPos.y > pourPos.y && this.checkPourComplete();
          }
          break;

         case BottleState.POURING:
          break;

         default:
          cc.log("AAA ERROR - unknown bottle state : " + this.bottleState);
        }
      };
      Bottle.prototype.checkPourComplete = function() {
        var _this = this;
        this._waterColors[this._currentDisplayLevel - 1].height = this.BOTTOM_POS;
        this._currentDisplayLevel--;
        if (this._currentDisplayLevel === this.currentLevel) {
          this.bottleState = BottleState.POUR_COMPLETE;
          this._GETTING_WATER_FLAG = false;
          this.onPouringComplete();
          cc.tween(this.node).delay(.3).call(function() {
            _this.restoreToIdle();
          }).start();
        }
      };
      __decorate([ property(cc.ParticleSystem) ], Bottle.prototype, "particalWin", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "touchArea", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "waterDropContainer", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "bottleContainerR", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "bottleContainerL", void 0);
      __decorate([ property(cc.Prefab) ], Bottle.prototype, "waterPrefab", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "waterContainer", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "pourAnchorPointL", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "emptyAnchorPointL", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "pourAnchorPointR", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "emptyAnchorPointR", void 0);
      __decorate([ property(cc.Node) ], Bottle.prototype, "waterDropAnim", void 0);
      __decorate([ property ], Bottle.prototype, "rotateSpeed", void 0);
      __decorate([ property ], Bottle.prototype, "increaseFactor", void 0);
      __decorate([ property ], Bottle.prototype, "BOTTOM_POS", void 0);
      __decorate([ property ], Bottle.prototype, "TOP_POS", void 0);
      __decorate([ property ], Bottle.prototype, "POUR_POS_X", void 0);
      __decorate([ property ], Bottle.prototype, "POUR_POS_Y", void 0);
      Bottle = __decorate([ ccclass ], Bottle);
      return Bottle;
    }(cc.Component);
    exports.default = Bottle;
    cc._RF.pop();
  }, {
    "./DropWater": "DropWater",
    "./Global": "Global"
  } ],
  DropWater: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3477FMQMNAnp5IRjlQLZIc", "DropWater");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DropWater = function(_super) {
      __extends(DropWater, _super);
      function DropWater() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.alreadyCallBeginPour = false;
        return _this;
      }
      DropWater.prototype.beginPour = function(color) {
        if (this.alreadyCallBeginPour) {
          cc.log("@@@ alreadyCallBeginPour");
          return;
        }
        this.alreadyCallBeginPour = true;
        this.node.y += this.node.height;
        this.node.scaleY = 0;
        this.node.anchorY = 1;
        this.node.color = color;
        cc.tween(this.node).to(.1, {
          scaleY: 1
        }).start();
      };
      DropWater.prototype.endPour = function() {
        if (!this.alreadyCallBeginPour) {
          cc.log("@@@ not alreadyCallBeginPour");
          return;
        }
        this.alreadyCallBeginPour = false;
        this.node.anchorY = 0;
        this.node.y -= this.node.height;
        cc.tween(this.node).to(.1, {
          scaleY: 0
        }).start();
      };
      DropWater.prototype.start = function() {};
      DropWater = __decorate([ ccclass ], DropWater);
      return DropWater;
    }(cc.Component);
    exports.default = DropWater;
    cc._RF.pop();
  }, {} ],
  GameLevels: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13cf88L3sJFLZrX1DmUdu2e", "GameLevels");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameLevels = function(_super) {
      __extends(GameLevels, _super);
      function GameLevels() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levels = [ [ [ 0, 0, 1, 1 ], [ 1, 1, 0, 0 ], [], 4 ], [ [ 0 ], [ 1 ], [ 1, 1, 1 ], [ 0, 0, 0 ], 4 ], [ [ 0, 1, 0, 1 ], [ 1, 0, 1, 0 ], [], 4 ], [ [ 0, 1, 2, 0 ], [ 1, 1, 2, 0 ], [ 2, 0, 1, 2 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 0, 2, 3 ], [ 3, 4, 1, 4 ], [ 1, 3, 4, 2 ], [ 0, 0, 4, 2 ], [], [], 4 ], [ [ 0, 1, 1, 1 ], [ 2, 0, 3, 1 ], [ 3, 2, 0, 2 ], [ 4, 3, 2, 3 ], [ 4, 4, 4, 0 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 3, 2, 1 ], [ 4, 4, 3, 1 ], [ 0, 4, 2, 3 ], [ 0, 2, 0, 4 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 1, 3, 3, 1 ], [ 3, 4, 2, 4 ], [ 2, 4, 0, 3 ], [ 2, 0, 4, 1 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 1, 3, 3, 4 ], [ 1, 4, 4, 0 ], [ 0, 1, 3, 2 ], [ 3, 4, 2, 2 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 3, 4, 1 ], [ 0, 4, 3, 4 ], [ 4, 2, 0, 2 ], [ 0, 1, 3, 2 ], [], [], 4 ], [ [ 0, 0, 1, 0 ], [ 2 ], [ 3, 3, 4, 2 ], [ 4, 4, 1 ], [ 5, 5, 1, 2 ], [ 1, 5, 5, 2 ], [ 3, 3, 0, 4 ], 4 ], [ [ 0, 0, 1, 2 ], [ 1, 0, 3, 2 ], [ 4 ], [ 3, 3, 0, 5 ], [ 2, 5, 4 ], [ 1, 1, 3, 2 ], [ 5, 4, 4, 5 ], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 0, 5 ], [ 1, 6, 6, 2 ], [ 0, 3, 3, 2 ], [ 4, 4, 2, 5 ], [ 1, 5, 6, 6 ], [ 5, 0, 3, 4 ], [], [], 4 ], [ [ 0, 1, 2 ], [ 2, 1, 0 ], [ 3, 1, 2, 0 ], [ 1, 3 ], [ 2, 0, 3, 3 ], 4 ], [ [ 0, 1, 0, 2 ], [ 1, 1, 3, 2 ], [ 4, 4, 5, 4 ], [ 2, 6, 1, 4 ], [ 0, 3, 6, 5 ], [ 5, 0, 6, 6 ], [ 5, 2, 3, 3 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 0, 1, 0 ], [ 0, 3, 4, 2 ], [ 3, 2, 4, 1 ], [ 4, 3, 4, 1 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 2, 5 ], [ 1, 6, 4, 3 ], [ 2, 3, 0, 5 ], [ 5, 1, 6, 5 ], [ 1, 4, 0, 6 ], [ 6, 3, 0, 4 ], [], [], 4 ], [ [ 0, 1, 0 ], [ 1, 0, 2 ], [ 2, 2 ], [ 3, 3, 1, 3 ], [ 4, 4, 5, 0 ], [ 5, 5, 3, 5 ], [ 4, 4, 1, 2 ], 4 ], [ [ 0, 1, 1, 1 ], [ 1, 0, 2, 3 ], [ 0, 3, 0, 4 ], [ 5, 3, 4, 2 ], [ 5, 6, 2, 5 ], [ 3, 6, 4, 6 ], [ 2, 4, 6, 5 ], [], [], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 0, 4, 3 ], [ 3, 0, 3, 2 ], [ 4, 4, 2, 0 ], [ 2, 1, 4, 1 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 3, 2, 4 ], [ 5, 5, 6, 4 ], [ 6, 6, 0, 4 ], [ 2, 2, 6, 5 ], [ 1, 3, 3, 5 ], [ 4, 1 ], [ 0, 1 ], 4 ], [ [ 0, 0, 1 ], [ 2, 1, 3, 2 ], [ 4, 4, 0, 2 ], [ 5, 5, 6, 3 ], [ 3, 4, 5, 0 ], [ 6, 6, 4, 5 ], [ 1, 1, 2, 6 ], [ 3 ], 4 ], [ [ 0, 1, 1, 0 ], [ 2, 0, 3, 0 ], [ 4, 5, 4, 4 ], [ 6, 3, 5, 6 ], [ 5, 2, 6, 4 ], [ 2, 6, 1, 2 ], [ 1, 3, 3, 5 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 2, 4, 5 ], [ 2, 3, 5, 2 ], [ 0, 4, 1, 6 ], [ 5, 6, 0, 5 ], [ 4, 3, 6, 4 ], [ 6, 3, 1, 1 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 4, 3, 0 ], [ 1, 2, 3, 0 ], [ 4, 2, 2, 0 ], [ 4, 4, 3, 1 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 0, 3, 2, 3 ], [ 4, 5, 6, 6 ], [ 5, 2, 0, 6 ], [ 4, 0, 3, 1 ], [ 4, 4, 3, 6 ], [ 5, 5, 1, 1 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 1, 2, 3, 2 ], [ 4, 5, 4, 6 ], [ 5, 6, 3, 4 ], [ 0, 0, 3, 6 ], [ 4, 1, 5, 3 ], [ 6, 5, 1, 2 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 3, 2, 1 ], [ 4, 0, 5 ], [ 5 ], [ 2, 0, 4, 5 ], [ 1, 1, 4, 5 ], [ 3, 3, 2, 4 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 4, 1, 0 ], [ 2, 2, 4, 1 ], [ 4, 0, 3, 2 ], [ 0, 3, 4, 3 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 5, 6 ], [ 4, 2, 5, 1 ], [ 3, 1, 4, 6 ], [ 3, 5, 6, 6 ], [ 2, 0, 1, 0 ], [ 2, 3, 4, 5 ], [], [], 4 ], [ [ 0, 1, 2 ], [ 3, 2, 0, 2 ], [ 1, 1, 3, 1 ], [ 4, 4, 0, 3 ], [ 2 ], [ 4, 4, 0, 3 ], 4 ], [ [ 0, 0, 1 ], [ 2, 0, 3 ], [ 4, 4, 2 ], [ 3, 3, 1, 0 ], [ 1, 4, 4, 2 ], [ 2, 3, 1 ], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 1, 4, 5 ], [ 3, 6, 3, 5 ], [ 2, 0, 4, 5 ], [ 2, 6, 1, 5 ], [ 6, 0, 0, 1 ], [ 4, 4, 3, 6 ], [], [], 4 ], [ [ 0, 1, 1, 1 ], [ 2, 2, 3, 3 ], [ 2, 0, 4, 3 ], [ 0, 2, 3, 4 ], [ 4, 0, 4, 1 ], [], [], 4 ], [ [ 0 ], [ 1, 0, 2, 3 ], [ 4, 4, 5 ], [ 3, 3, 6, 0 ], [ 6, 6, 4, 6 ], [ 2, 2, 4, 1 ], [ 5, 5, 0, 5 ], [ 2, 1, 1, 3 ], 4 ], [ [ 0, 1, 2 ], [ 2, 1, 3, 3 ], [ 4, 0, 5, 2 ], [ 3 ], [ 5, 5, 1, 3 ], [ 4, 4, 0, 2 ], [ 1, 5, 0, 4 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 1, 2 ], [ 4, 4, 5, 0 ], [ 5, 3, 3, 6 ], [ 5, 6, 1, 6 ], [ 6, 2, 1, 4 ], [ 0, 3, 2, 5 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 4, 4, 3 ], [ 5, 6, 0, 3 ], [ 4, 6, 5, 1 ], [ 0, 5, 4, 3 ], [ 1, 1, 0, 2 ], [ 2, 6, 6, 5 ], [], [], 4 ], [ [ 0 ], [ 1, 1, 2, 0 ], [ 3, 3, 2, 4 ], [ 0, 3, 0 ], [ 4, 4, 3, 2 ], [ 1, 1, 4, 2 ], 4 ], [ [ 0, 0, 1, 2 ], [ 1, 3, 3, 4 ], [ 0, 1, 2, 2 ], [ 2, 4, 4, 3 ], [ 4, 1, 3, 0 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 5, 4 ], [ 0, 1, 6, 1 ], [ 6, 3, 4, 5 ], [ 3, 3, 2, 1 ], [ 5, 0, 0, 2 ], [ 2, 6, 6, 5 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 0, 5 ], [ 3 ], [ 2, 0, 3 ], [ 5, 5, 2, 3 ], [ 1, 1, 0, 2 ], [ 4, 4, 1, 5 ], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 4, 4, 2 ], [ 5, 3, 5, 3 ], [ 2, 1, 4, 5 ], [ 0, 6, 4, 5 ], [ 1, 0, 0, 6 ], [ 6, 3, 6, 2 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3 ], [ 4, 1, 3, 2 ], [ 1, 1, 4, 2 ], [ 2, 0, 3 ], [ 4, 4, 0, 3 ], 4 ], [ [ 0, 1, 1, 1 ], [ 2, 2, 3, 4 ], [ 0, 5, 2, 1 ], [ 5, 6, 0, 4 ], [ 5, 6, 3, 6 ], [ 2, 3, 4, 3 ], [ 6, 5, 0, 4 ], [], [], 4 ], [ [ 0, 1, 0 ], [ 2, 2, 0, 1 ], [ 3, 4, 3, 0 ], [ 1 ], [ 4, 4, 2, 4 ], [ 2, 3, 3, 1 ], 4 ], [ [ 0, 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 0, 0, 1 ], [ 1, 2, 2, 4 ], [ 3, 3, 2, 4 ], [ 4 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 3, 5, 0 ], [ 0, 6, 1, 7 ], [ 2, 7, 7, 4 ], [ 6, 8, 8, 2 ], [ 0, 7, 5, 1 ], [ 1, 8, 3, 4 ], [ 6, 5, 8, 5 ], [ 2, 4, 6, 3 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 1, 3, 4, 5 ], [ 4, 5, 6, 2 ], [ 7, 8, 5, 6 ], [ 0, 3, 6, 8 ], [ 5, 2, 8, 6 ], [ 7, 0, 1, 0 ], [ 3, 7, 7, 4 ], [ 8, 4, 2, 3 ], [], [], 4 ], [ [ 0, 1 ], [ 0, 0, 2, 0 ], [ 3, 3, 4, 1 ], [ 1, 1 ], [ 2, 2, 4, 2 ], [ 4, 3, 3, 4 ], 4 ], [ [ 0, 1 ], [ 2, 3 ], [ 3, 4, 4, 0 ], [ 2, 2, 0, 3 ], [ 4, 4, 2, 1 ], [ 1, 3, 1, 0 ], 4 ], [ [ 0, 1, 1, 0 ], [ 2, 3, 4, 5 ], [ 6, 6, 5, 3 ], [ 2, 1, 2, 4 ], [ 1, 4, 2, 3 ], [ 5, 6, 6, 0 ], [ 5, 3, 4, 0 ], [], [], 4 ], [ [ 0, 1, 2 ], [ 3, 0, 4, 3 ], [ 2 ], [ 1, 0, 4, 1 ], [ 4, 4, 1, 0 ], [ 3, 3, 2, 2 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 5, 0 ], [ 2 ], [ 1, 4, 4, 0 ], [ 3, 3, 2 ], [ 5, 5, 0, 5 ], [ 3, 1, 2, 1 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 5, 5 ], [ 4, 6, 4, 6 ], [ 0, 3, 7, 0 ], [ 7, 1, 1, 7 ], [ 2, 8, 4, 8 ], [ 5, 1, 8, 2 ], [ 5, 8, 7, 3 ], [ 3, 6, 0, 6 ], [], [], 4 ], [ [ 0, 0, 1 ], [ 1, 1, 2, 3 ], [ 4, 5, 2, 5 ], [ 3 ], [ 5, 4, 4, 0 ], [ 2, 3, 1, 2 ], [ 0, 5, 4, 3 ], 4 ], [ [ 0, 0, 1 ], [ 2 ], [ 3, 3, 4, 2 ], [ 1, 1, 3, 5 ], [ 5, 1, 5, 2 ], [ 4, 4, 5, 2 ], [ 0, 0, 3, 4 ], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 0, 1, 4 ], [ 5, 4, 6, 3 ], [ 5, 7, 6, 2 ], [ 5, 7, 2, 8 ], [ 8, 7, 4, 6 ], [ 3, 5, 4, 7 ], [ 6, 2, 3, 1 ], [ 0, 8, 0, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 1, 3, 4 ], [ 4, 3, 0, 5 ], [ 1, 1, 4, 5 ], [ 2, 0, 6, 5 ], [ 2, 6, 5, 0 ], [ 6, 6, 3, 2 ], [], [], 4 ], [ [ 0 ], [ 1, 2, 2, 0 ], [ 3, 3, 1, 1 ], [ 4, 3, 3, 1 ], [ 2, 2, 4, 4 ], [ 4, 0, 0 ], 4 ], [ [ 0, 1, 2, 3 ], [ 0, 4, 1, 1 ], [ 5, 0, 6, 7 ], [ 8, 8, 4, 3 ], [ 3, 2, 6, 8 ], [ 6, 2, 5, 6 ], [ 7, 4, 8, 0 ], [ 7, 5, 5, 3 ], [ 1, 7, 4, 2 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 0, 3, 2, 4 ], [ 5, 4, 0, 0 ], [ 3, 6, 7, 8 ], [ 5, 8, 6, 3 ], [ 7, 8, 8, 2 ], [ 2, 5, 4, 3 ], [ 4, 5, 6, 7 ], [ 7, 1, 1, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 2 ], [ 1, 0, 0, 5 ], [ 2, 5, 1, 4 ], [ 2, 0, 3, 5 ], [ 6, 3, 1, 4 ], [ 3, 6, 4, 6 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 3 ], [ 5, 4, 3, 5 ], [ 1, 1, 5, 6 ], [ 2, 2, 6, 4 ], [ 6 ], [ 4, 3, 6, 1 ], [ 2, 0, 0, 5 ], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 5, 6 ], [ 1, 0, 7, 4 ], [ 1, 5, 5, 2 ], [ 7, 0, 1, 7 ], [ 8, 6, 7, 8 ], [ 5, 4, 6, 2 ], [ 2, 4, 8, 0 ], [ 3, 8, 3, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 4, 5, 6 ], [ 5, 4, 7, 5 ], [ 0, 6, 6, 7 ], [ 3, 2, 8, 2 ], [ 1, 5, 7, 8 ], [ 8, 0, 1, 4 ], [ 6, 3, 1, 3 ], [ 7, 4, 8, 0 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 4, 5, 0 ], [ 1, 6, 2, 0 ], [ 0, 6, 3, 2 ], [ 4, 6, 6, 4 ], [ 2, 3, 5, 1 ], [ 5, 4, 3, 5 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7 ], [ 3, 6, 2, 4 ], [ 7, 1, 1, 2 ], [ 0, 1, 5, 0 ], [ 4, 8, 5, 5 ], [ 7, 3, 8, 6 ], [ 8, 0, 3, 4 ], [ 6, 8, 7, 2 ], [], [], 4 ], [ [ 0 ], [ 0, 1, 2, 1 ], [ 3, 4, 4, 3 ], [ 2 ], [ 1, 5 ], [ 3, 5, 2, 5 ], [ 2, 5, 0, 3 ], [ 4, 4, 0, 1 ], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 2, 2, 4 ], [ 5, 6, 5, 5 ], [ 7, 8, 7, 3 ], [ 2, 1, 3, 0 ], [ 8, 8, 6, 0 ], [ 5, 6, 7, 3 ], [ 0, 4, 4, 6 ], [ 4, 1, 8, 7 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 1, 2, 2 ], [ 2, 0, 0, 3 ], [ 3, 2 ], [ 1, 0, 3, 3 ], 4 ], [ [ 0, 0, 1, 2 ], [ 1 ], [ 3, 3, 1, 4 ], [ 5, 5, 4 ], [ 4, 0, 3, 1 ], [ 2, 5, 0, 3 ], [ 2, 2, 4, 5 ], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 5, 6 ], [ 6, 5, 2, 1 ], [ 3, 6, 0, 6 ], [ 4, 4, 3, 0 ], [ 5, 5, 2, 4 ], [ 1, 2, 3, 0 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 0 ], [ 3, 4, 6, 5 ], [ 2, 0, 4, 7 ], [ 1, 2, 1, 8 ], [ 8, 5, 7, 1 ], [ 8, 5, 7, 8 ], [ 2, 0, 3, 4 ], [ 7, 3, 6, 6 ], [], [], 4 ], [ [ 0, 1, 2 ], [ 3, 4, 1, 3 ], [ 2 ], [ 1, 3, 2, 5 ], [ 6, 6, 0, 3 ], [ 5, 5, 4, 0 ], [ 4, 4, 5, 2 ], [ 1, 6, 6, 0 ], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 5, 2 ], [ 6, 3, 7, 8 ], [ 8, 0, 5, 4 ], [ 6, 6, 0, 4 ], [ 7, 7, 4, 1 ], [ 0, 2, 2, 5 ], [ 3, 6, 8, 1 ], [ 7, 5, 1, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 0, 2, 4, 4 ], [ 5, 3, 1, 0 ], [ 2, 6, 6, 4 ], [ 6, 1, 5, 3 ], [ 1, 5, 0, 3 ], [ 4, 2, 5, 6 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 0 ], [ 1, 2, 2 ], [ 3, 3, 0, 0 ], [ 2, 1 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 4, 0 ], [ 4, 2, 5, 0 ], [ 5, 2, 5, 1 ], [ 1, 3, 6, 6 ], [ 7, 7, 8, 5 ], [ 6, 7, 0, 1 ], [ 7, 3, 3, 8 ], [ 8, 8, 2, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 5, 5 ], [ 6, 2, 1, 2 ], [ 7, 6, 3, 0 ], [ 0, 6, 1, 7 ], [ 7, 6, 8, 5 ], [ 3, 4, 1, 2 ], [ 4, 8, 0, 8 ], [ 4, 7, 3, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 4, 3, 5 ], [ 4, 5, 1, 5 ], [ 2, 0, 6, 3 ], [ 2, 6, 2, 4 ], [ 6, 6, 0, 4 ], [ 5, 1, 3, 0 ], [], [], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 3, 4, 5 ], [ 6, 7, 4, 4 ], [ 0, 5, 6, 3 ], [ 5, 0, 8, 2 ], [ 2, 7, 6, 2 ], [ 0, 8, 7, 7 ], [ 5, 8, 3, 8 ], [ 1, 4, 1, 6 ], [], [], 4 ], [ [ 0, 1 ], [ 2, 0, 2, 0 ], [ 3, 3, 4, 2 ], [ 5, 3, 3, 5 ], [ 1, 1 ], [ 4, 4, 2, 1 ], [ 4, 5, 5, 0 ], 4 ], [ [ 0, 1, 0, 2 ], [ 0, 3, 4, 5 ], [ 0, 6, 5, 5 ], [ 3, 4, 4, 1 ], [ 6, 2, 3, 2 ], [ 7, 3, 7, 7 ], [ 7, 6, 5, 8 ], [ 1, 8, 2, 6 ], [ 1, 8, 8, 4 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 3, 4 ], [ 5, 3, 3, 5 ], [ 4, 4, 0, 1 ], [ 1, 1, 2 ], [ 6, 6, 5, 0 ], [ 2, 4 ], [ 6, 6, 2, 5 ], 4 ], [ [ 0, 1, 2 ], [ 1, 0, 3, 1 ], [ 4 ], [ 5, 4, 5, 4 ], [ 2, 2, 0, 5 ], [ 3, 3, 2, 3 ], [ 1, 0, 5, 4 ], 4 ], [ [ 0, 1, 2, 1 ], [ 1, 2, 3, 4 ], [ 5, 6, 6, 2 ], [ 4, 0, 1, 5 ], [ 3, 5, 2, 6 ], [ 4, 0, 5, 4 ], [ 3, 3, 0, 6 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 2, 4, 2 ], [ 5, 5, 6, 7 ], [ 5, 0, 7, 6 ], [ 1, 1, 8, 3 ], [ 0, 7, 8, 0 ], [ 3, 2, 4, 3 ], [ 6, 8, 4, 7 ], [ 8, 5, 6, 4 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 1 ], [ 3, 2, 2, 0 ], [ 1 ], [ 2, 3, 0, 0 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 0, 1 ], [ 1, 6, 7, 8 ], [ 7, 8, 8, 3 ], [ 5, 2, 3, 4 ], [ 4, 5, 2, 6 ], [ 2, 1, 4, 0 ], [ 3, 7, 6, 5 ], [ 7, 6, 8, 0 ], [], [], 4 ], [ [ 0, 1 ], [ 1, 1 ], [ 2, 3, 4, 5 ], [ 4, 4, 3, 2 ], [ 3, 2, 5, 0 ], [ 6, 6, 4, 2 ], [ 5, 6, 6, 0 ], [ 3, 5, 1, 0 ], 4 ], [ [ 0, 1, 2, 0 ], [ 1, 3, 4, 5 ], [ 5, 5, 6, 4 ], [ 6, 2, 1, 6 ], [ 2, 2, 4, 6 ], [ 4, 0, 3, 3 ], [ 0, 5, 3, 1 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 1, 1, 0, 0 ], [ 3, 2, 3 ], [ 0, 2, 2 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 4, 2, 5 ], [ 6, 7, 3, 5 ], [ 7, 4, 3, 4 ], [ 6, 1, 8, 0 ], [ 6, 8, 0, 2 ], [ 8, 1, 5, 5 ], [ 2, 3, 4, 8 ], [ 6, 0, 7, 7 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 1, 5 ], [ 2, 6, 7, 1 ], [ 6, 0, 6, 0 ], [ 3, 3, 4, 8 ], [ 7, 8, 1, 5 ], [ 5, 4, 2, 4 ], [ 8, 5, 3, 8 ], [ 0, 7, 6, 7 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 1, 2, 2, 3 ], [ 4, 0, 0, 3 ], [ 3 ], [ 2, 4, 0, 1 ], [ 2, 4, 4, 3 ], 4 ], [ [ 0, 1, 2 ], [ 3, 3, 4, 0 ], [ 1, 4, 0, 5 ], [ 2, 1, 0, 2 ], [ 4, 2, 5, 5 ], [ 5 ], [ 3, 3, 4, 1 ], 4 ], [ [ 0, 1, 2 ], [ 2 ], [ 1, 1, 3, 2 ], [ 4, 0, 4, 0 ], [ 3, 3, 4, 0 ], [ 5, 5, 1, 2 ], [ 4, 5, 5, 3 ], 4 ], [ [ 0, 1, 0, 2 ], [ 2, 2, 3, 2 ], [ 4, 1, 3, 5 ], [ 6, 4, 6, 0 ], [ 1, 4, 3, 0 ], [ 4, 5, 1, 6 ], [ 3, 5, 5, 6 ], [], [], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 2, 4, 5 ], [ 0, 6, 1, 2 ], [ 4, 7, 1, 5 ], [ 3, 3, 0, 8 ], [ 5, 8, 8, 4 ], [ 7, 7, 2, 0 ], [ 7, 8, 5, 6 ], [ 3, 6, 4, 6 ], [], [], 4 ], [ [ 0 ], [ 1, 1, 0, 2 ], [ 2, 3, 3, 1 ], [ 3, 2, 2 ], [ 3, 0, 0, 1 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 0, 1, 0 ], [ 4, 4, 3, 2 ], [ 1, 5, 6, 0 ], [ 4, 5, 7, 2 ], [ 1, 7, 8, 8 ], [ 5, 6, 7, 3 ], [ 6, 8, 7, 3 ], [ 6, 8, 5, 2 ], [], [], 4 ], [ [ 0, 1 ], [ 2, 1, 1 ], [ 1, 0, 0 ], [ 3, 2, 2, 3 ], [ 3, 3, 2, 0 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 5, 4 ], [ 6, 6, 4, 0 ], [ 6, 5, 2, 5 ], [ 3, 4, 6, 3 ], [ 2, 0, 3, 5 ], [ 1, 1, 1, 0 ], [], [], 4 ], [ [ 0, 0, 1, 1 ], [ 2, 3, 4, 5 ], [ 3, 0, 5, 6 ], [ 4, 2, 5, 3 ], [ 7, 3, 2, 1 ], [ 8, 7, 2, 7 ], [ 8, 1, 6, 6 ], [ 8, 6, 7, 4 ], [ 8, 5, 0, 4 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 1, 3, 3, 4 ], [ 2, 5, 6, 7 ], [ 8, 6, 4, 1 ], [ 4, 2, 8, 0 ], [ 7, 7, 5, 8 ], [ 4, 5, 6, 6 ], [ 0, 2, 8, 7 ], [ 3, 5, 1, 3 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 0, 1, 2, 4 ], [ 5, 6, 1, 3 ], [ 0, 6, 4, 2 ], [ 2, 4, 5, 6 ], [ 1, 3, 5, 5 ], [ 6, 0, 4, 3 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 1, 6 ], [ 4, 2, 1, 0 ], [ 2, 3, 7, 7 ], [ 4, 5, 2, 8 ], [ 8, 5, 3, 6 ], [ 7, 8, 0, 3 ], [ 7, 1, 4, 5 ], [ 6, 6, 8, 0 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 3, 4, 5 ], [ 6, 7, 0, 5 ], [ 4, 3, 6, 7 ], [ 1, 4, 4, 7 ], [ 8, 6, 8, 2 ], [ 7, 5, 5, 2 ], [ 0, 1, 8, 1 ], [ 8, 2, 3, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 1, 1, 4 ], [ 3, 5, 5, 4 ], [ 4, 2, 6, 2 ], [ 5, 3, 4, 0 ], [ 6, 6, 0, 0 ], [ 3, 6, 5, 1 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 3, 0 ], [ 4, 2, 3, 5 ], [ 2, 6, 6, 3 ], [ 0, 7, 7, 8 ], [ 6, 6, 4, 7 ], [ 2, 0, 8, 1 ], [ 1, 5, 5, 8 ], [ 5, 8, 7, 1 ], [], [], 4 ], [ [ 0 ], [ 1, 1, 2, 0 ], [ 2, 3, 2, 3 ], [ 3, 0, 0 ], [ 1, 1, 2, 3 ], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 1, 2 ], [ 5, 3, 6, 5 ], [ 6, 4, 0, 6 ], [ 4, 0, 1, 5 ], [ 6, 2, 2, 3 ], [ 4, 5, 0, 1 ], [], [], 4 ], [ [ 0, 1 ], [ 2, 1 ], [ 3, 0, 4, 2 ], [ 5, 5, 3, 1 ], [ 4, 4, 5, 2 ], [ 1, 0, 5, 0 ], [ 3, 3, 4, 2 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 0, 5, 6 ], [ 6, 7, 4, 7 ], [ 1, 1, 7, 3 ], [ 0, 2, 6, 8 ], [ 2, 8, 4, 8 ], [ 4, 5, 6, 5 ], [ 8, 3, 1, 7 ], [ 3, 2, 0, 5 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 2 ], [ 3, 4, 5 ], [ 1, 1, 0, 2 ], [ 4, 4, 3, 1 ], [ 6, 6, 5, 2 ], [ 5, 5, 0, 6 ], [ 3, 3, 4, 6 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 5 ], [ 2, 2, 1, 3 ], [ 5, 4 ], [ 6, 1, 4, 0 ], [ 1, 3, 0, 6 ], [ 5, 4, 5 ], [ 2, 6, 6, 3 ], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 3, 4, 0 ], [ 5 ], [ 6, 6, 3, 4 ], [ 2, 1, 5, 5 ], [ 1, 0, 2, 1 ], [ 4, 2, 5 ], [ 6, 6, 3, 4 ], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 5, 0 ], [ 1, 6, 3, 3 ], [ 5, 4, 7, 2 ], [ 1, 5, 6, 8 ], [ 4, 7, 6, 3 ], [ 0, 5, 7, 8 ], [ 2, 8, 4, 0 ], [ 7, 8, 6, 2 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 4, 5, 5 ], [ 2, 6, 3, 1 ], [ 0, 5, 5, 4 ], [ 4, 0, 2, 3 ], [ 0, 3, 4, 6 ], [ 6, 1, 1, 6 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 1, 2, 3 ], [ 4, 4, 2, 1 ], [ 2, 4, 4, 3 ], [ 3 ], [ 0, 0, 1, 3 ], 4 ], [ [ 0, 1, 0 ], [ 2, 2, 3, 4 ], [ 1, 4, 0, 5 ], [ 3, 3, 5, 3 ], [ 0, 1, 2 ], [ 5, 2 ], [ 4, 4, 1, 5 ], 4 ], [ [ 0, 1 ], [ 2, 1, 3 ], [ 3, 4, 5, 2 ], [ 1, 4, 1, 2 ], [ 6, 6, 3, 4 ], [ 4, 6, 6, 0 ], [ 5, 5, 3 ], [ 0, 0, 5, 2 ], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 0, 2, 3 ], [ 1, 0 ], [ 3, 0 ], [ 3, 1, 1, 2 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 3, 4, 2 ], [ 5, 6, 2, 7 ], [ 1, 3, 2, 5 ], [ 5, 6, 0, 7 ], [ 4, 6, 6, 7 ], [ 4, 5, 0, 8 ], [ 8, 8, 0, 8 ], [ 7, 3, 4, 1 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 0, 4 ], [ 4, 4, 0, 1 ], [ 5, 2, 2, 5 ], [ 5, 5, 6, 4 ], [ 6, 6, 3, 6 ], [ 1 ], [ 3, 3, 0, 2 ], 4 ], [ [ 0, 1, 0, 2 ], [ 1, 3, 4, 2 ], [ 5, 6, 4, 4 ], [ 7, 6, 3, 6 ], [ 8, 5, 7, 7 ], [ 0, 5, 5, 1 ], [ 3, 3, 2, 0 ], [ 4, 6, 8, 8 ], [ 7, 2, 8, 1 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 0, 2, 0 ], [ 1, 3, 5, 5 ], [ 4, 0, 4, 3 ], [ 6, 5, 1, 6 ], [ 3, 4, 6, 1 ], [ 2, 6, 5, 2 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 0, 3, 4, 2 ], [ 4, 4, 5, 6 ], [ 7, 6, 1, 7 ], [ 0, 1, 8, 2 ], [ 5, 7, 8, 8 ], [ 5, 7, 3, 5 ], [ 8, 1, 6, 3 ], [ 3, 6, 2, 4 ], [], [], 4 ], [ [ 0, 1, 2 ], [ 3, 3, 1, 4 ], [ 2 ], [ 1, 4, 3, 2 ], [ 5, 5, 3, 0 ], [ 6, 5, 5, 1 ], [ 4, 6, 0, 2 ], [ 6, 6, 0, 4 ], 4 ], [ [ 0, 1, 2, 1 ], [ 1, 3, 3, 4 ], [ 4, 4, 2, 5 ], [ 6, 2, 6, 5 ], [ 0, 1, 7, 7 ], [ 3, 8, 6, 6 ], [ 3, 5, 7, 0 ], [ 2, 4, 5, 0 ], [ 8, 8, 8, 7 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 3, 5 ], [ 6, 7, 3, 7 ], [ 4, 4, 0, 5 ], [ 5, 5, 6, 6 ], [ 2, 8, 8, 7 ], [ 2, 4, 3, 1 ], [ 1, 8, 0, 6 ], [ 0, 7, 8, 2 ], [], [], 4 ], [ [ 0, 1, 1, 2 ], [ 3 ], [ 4, 5, 4, 5 ], [ 6, 2, 0, 2 ], [ 4, 5, 3, 3 ], [ 2, 4, 3 ], [ 1, 6, 6, 5 ], [ 6, 0, 0, 1 ], 4 ], [ [ 0, 0, 1, 2 ], [ 2, 3, 3, 1 ], [ 4, 4, 0, 2 ], [ 3, 2, 5, 3 ], [ 6, 6, 4, 6 ], [ 6, 0, 1, 5 ], [ 5, 4, 1, 5 ], [], [], 4 ], [ [ 0, 0, 0, 1 ], [ 2, 3, 4, 5 ], [ 1, 6, 3, 7 ], [ 2, 3, 3, 7 ], [ 7, 6, 8, 2 ], [ 6, 8, 1, 8 ], [ 0, 4, 5, 7 ], [ 5, 2, 6, 4 ], [ 4, 1, 8, 5 ], [], [], 4 ], [ [ 0 ], [ 1, 1, 2 ], [ 3, 4, 5, 4 ], [ 6, 6, 2, 0 ], [ 5, 2, 6, 0 ], [ 2, 5, 0, 1 ], [ 4, 4, 1, 3 ], [ 3, 3, 5, 6 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 3, 5, 0 ], [ 1, 2, 6, 5 ], [ 5, 7, 1, 3 ], [ 2, 7, 0, 2 ], [ 8, 1, 5, 6 ], [ 8, 7, 4, 7 ], [ 6, 6, 4, 4 ], [ 3, 0, 8, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 0, 2 ], [ 5, 6, 5, 3 ], [ 2, 2, 4, 5 ], [ 4, 1, 6, 3 ], [ 3, 4, 1, 0 ], [ 0, 6, 1, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 5, 3 ], [ 2, 6, 1, 5 ], [ 3, 7, 0, 7 ], [ 5, 7, 8, 3 ], [ 2, 0, 1, 7 ], [ 2, 4, 6, 0 ], [ 4, 6, 8, 6 ], [ 5, 1, 8, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 4, 5, 5 ], [ 6, 7, 8, 3 ], [ 7, 0, 1, 4 ], [ 4, 7, 8, 6 ], [ 6, 2, 4, 3 ], [ 2, 8, 5, 0 ], [ 8, 5, 3, 6 ], [ 1, 7, 1, 0 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 0, 3, 1 ], [ 4, 1, 5, 0 ], [ 5, 6, 6, 4 ], [ 4, 3, 2, 2 ], [ 6, 5, 2, 1 ], [ 5, 6, 4, 3 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 3, 5, 1 ], [ 0, 4, 6, 1 ], [ 4, 5, 6, 7 ], [ 2, 8, 3, 5 ], [ 6, 8, 4, 7 ], [ 1, 2, 2, 5 ], [ 0, 8, 6, 3 ], [ 7, 0, 8, 7 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 5, 1 ], [ 6, 5, 1, 2 ], [ 7, 8, 6, 8 ], [ 3, 3, 0, 4 ], [ 1, 4, 2, 6 ], [ 5, 8, 0, 4 ], [ 3, 2, 7, 8 ], [ 5, 6, 7, 7 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 3, 4, 2 ], [ 4, 5, 1, 6 ], [ 6, 0, 1, 4 ], [ 5, 4, 2, 5 ], [ 0, 3, 5, 1 ], [ 3, 6, 6, 2 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 1, 3, 4, 0 ], [ 5, 6, 5, 1 ], [ 3, 7, 7, 6 ], [ 4, 3, 0, 8 ], [ 8, 8, 6, 2 ], [ 0, 4, 4, 7 ], [ 3, 2, 8, 7 ], [ 5, 2, 6, 5 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 5, 1 ], [ 6, 0, 0, 1 ], [ 5, 3, 7, 2 ], [ 6, 7, 3, 6 ], [ 7, 8, 4, 1 ], [ 7, 5, 2, 8 ], [ 8, 0, 5, 6 ], [ 2, 3, 4, 8 ], [], [], 4 ], [ [ 0, 1, 1, 0 ], [ 0, 2, 3, 3 ], [ 4, 5, 4, 0 ], [ 1, 3, 6, 6 ], [ 6, 5, 2, 2 ], [ 3, 2, 5, 1 ], [ 4, 4, 5, 6 ], [], [], 4 ], [ [ 0, 1, 0, 1 ], [ 2, 3, 3, 0 ], [ 1, 1, 4 ], [ 2, 4, 2 ], [ 3, 3, 0, 4 ], [ 4, 2 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 5, 3 ], [ 6, 4, 5, 0 ], [ 6, 5, 7, 4 ], [ 6, 7, 0, 3 ], [ 8, 2, 8, 4 ], [ 0, 7, 6, 1 ], [ 3, 8, 2, 1 ], [ 5, 1, 8, 7 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 0, 4, 5, 3 ], [ 1, 2, 4, 5 ], [ 6, 7, 2, 1 ], [ 6, 6, 3, 8 ], [ 6, 1, 0, 8 ], [ 7, 2, 8, 7 ], [ 7, 5, 3, 4 ], [ 0, 8, 4, 5 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 3, 1 ], [ 2 ], [ 2, 3, 4, 0 ], [ 5, 5, 3, 5 ], [ 6, 6, 5, 6 ], [ 1, 1, 2 ], [ 4, 4, 6, 0 ], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 3, 4, 0 ], [ 5, 4, 5, 3 ], [ 1, 6, 2, 5 ], [ 1, 2, 5, 6 ], [ 3, 1, 4, 6 ], [ 4, 0, 2, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 2, 5 ], [ 0, 6, 3, 7 ], [ 4, 5, 8, 5 ], [ 5, 8, 1, 7 ], [ 2, 7, 6, 8 ], [ 8, 1, 6, 7 ], [ 1, 2, 4, 0 ], [ 3, 0, 3, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 3, 5, 6 ], [ 1, 6, 6, 4 ], [ 6, 2, 1, 5 ], [ 4, 7, 0, 2 ], [ 0, 4, 3, 5 ], [ 3, 7, 2, 0 ], [ 7, 8, 8, 7 ], [ 5, 8, 1, 8 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 4, 5, 6 ], [ 2, 3, 0, 4 ], [ 6, 2, 0, 6 ], [ 6, 1, 5, 4 ], [ 5, 1, 4, 3 ], [ 2, 3, 1, 5 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 4, 0 ], [ 6, 0, 1, 3 ], [ 0, 7, 8, 8 ], [ 8, 2, 5, 8 ], [ 7, 7, 5, 5 ], [ 6, 4, 6, 3 ], [ 2, 1, 6, 1 ], [ 3, 2, 7, 4 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 6 ], [ 4, 7, 8, 8 ], [ 0, 9, 10, 1 ], [ 2, 3, 11, 5 ], [ 10, 7, 5, 1 ], [ 2, 0, 5, 4 ], [ 11, 9, 0, 2 ], [ 7, 6, 1, 3 ], [ 10, 8, 7, 6 ], [ 10, 9, 11, 4 ], [ 9, 8, 11, 3 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 4 ], [ 4 ], [ 5, 1, 0, 2 ], [ 2, 2, 5, 3 ], [ 6, 6, 1, 3 ], [ 1, 5, 3, 4 ], [ 6, 6, 0, 5 ], 4 ], [ [ 0, 0, 1, 2 ], [ 2, 1, 3, 4 ], [ 3, 5, 6, 0 ], [ 6, 1, 0, 6 ], [ 5, 1, 4, 2 ], [ 7, 7, 8, 7 ], [ 8, 4, 3, 5 ], [ 4, 6, 5, 2 ], [ 3, 8, 8, 7 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 5, 3 ], [ 6, 7, 0, 8 ], [ 9, 7, 3, 2 ], [ 2, 6, 10, 4 ], [ 5, 11, 4, 11 ], [ 7, 8, 6, 11 ], [ 11, 6, 10, 8 ], [ 9, 0, 10, 9 ], [ 3, 5, 0, 1 ], [ 7, 8, 9, 4 ], [ 1, 5, 1, 10 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 1, 1, 4 ], [ 5, 1, 6, 5 ], [ 7, 0, 8, 4 ], [ 7, 2, 5, 6 ], [ 5, 7, 3, 8 ], [ 0, 8, 8, 7 ], [ 0, 6, 6, 4 ], [ 2, 4, 3, 2 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 5, 6 ], [ 7, 8, 6, 9 ], [ 9, 8, 5, 9 ], [ 2, 10, 8, 1 ], [ 1, 7, 1, 10 ], [ 11, 8, 6, 7 ], [ 11, 5, 6, 11 ], [ 2, 0, 3, 4 ], [ 4, 3, 10, 7 ], [ 2, 11, 10, 3 ], [ 9, 5, 0, 4 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 4, 5, 0 ], [ 6, 7, 7, 4 ], [ 5, 1, 5, 0 ], [ 8, 8, 3, 6 ], [ 5, 8, 2, 0 ], [ 6, 6, 1, 2 ], [ 1, 2, 3, 8 ], [ 7, 7, 4, 3 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7 ], [ 6, 3, 8, 5 ], [ 9, 7, 8, 0 ], [ 6, 9, 10, 5 ], [ 0, 6, 2, 5 ], [ 11, 4, 2, 1 ], [ 8, 4, 11, 7 ], [ 3, 4, 10, 10 ], [ 1, 8, 9, 11 ], [ 1, 0, 3, 2 ], [ 10, 11, 9, 7 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 3, 3 ], [ 5, 2, 1, 1 ], [ 6, 7, 4, 8 ], [ 5, 6, 1, 4 ], [ 8, 5, 6, 0 ], [ 8, 2, 5, 7 ], [ 0, 7, 6, 7 ], [ 3, 8, 0, 4 ], [], [], 4 ], [ [ 0, 1 ], [ 1, 2 ], [ 3, 0, 4 ], [ 5, 2 ], [ 4, 3, 1, 5 ], [ 2, 1, 5, 4 ], [ 4, 3, 0, 5 ], [ 0, 3, 2 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 0 ], [ 3, 7, 8, 2 ], [ 6, 9, 6, 10 ], [ 6, 2, 4, 1 ], [ 11, 8, 5, 11 ], [ 10, 9, 10, 8 ], [ 9, 1, 5, 1 ], [ 4, 3, 5, 7 ], [ 7, 2, 8, 4 ], [ 11, 11, 7, 0 ], [ 10, 3, 9, 0 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 0, 4, 5, 6 ], [ 3, 7, 0, 7 ], [ 3, 0, 1, 6 ], [ 7, 4, 4, 4 ], [ 3, 1, 1, 6 ], [ 8, 5, 8, 8 ], [ 8, 2, 7, 6 ], [ 2, 2, 5, 5 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 0, 0 ], [ 3, 0, 4, 4 ], [ 5, 6, 6 ], [ 1, 3, 3, 7 ], [ 4, 8, 8, 5 ], [ 7, 7, 1 ], [ 8, 5, 5, 7 ], [ 6, 3, 2, 6 ], [ 4, 2, 2, 8 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 1 ], [ 0, 7, 8, 9 ], [ 1, 8, 2, 7 ], [ 4, 10, 6, 3 ], [ 1, 0, 11, 4 ], [ 11, 8, 6, 9 ], [ 2, 3, 4, 10 ], [ 0, 10, 5, 5 ], [ 8, 5, 6, 11 ], [ 11, 7, 9, 10 ], [ 9, 3, 7, 2 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 2, 1, 4 ], [ 5, 6, 7, 5 ], [ 4, 0, 7, 0 ], [ 6, 8, 0, 3 ], [ 3, 7, 8, 5 ], [ 6, 5, 1, 6 ], [ 4, 2, 2, 1 ], [ 7, 8, 8, 4 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 4, 0, 5 ], [ 6, 1, 4, 1 ], [ 7, 0, 8, 3 ], [ 8, 9, 3, 5 ], [ 6, 10, 1, 2 ], [ 9, 8, 11, 7 ], [ 10, 4, 11, 6 ], [ 10, 7, 4, 5 ], [ 7, 11, 9, 10 ], [ 5, 6, 2, 3 ], [ 8, 9, 2, 11 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 0, 4, 5 ], [ 1, 6, 6, 7 ], [ 8, 0, 1, 3 ], [ 7, 7, 5, 2 ], [ 1, 3, 6, 5 ], [ 8, 4, 5, 2 ], [ 3, 0, 2, 6 ], [ 8, 4, 8, 7 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 0, 3, 3, 4 ], [ 5, 4, 6, 7 ], [ 2, 0, 8, 1 ], [ 4, 6, 5, 1 ], [ 7, 6, 9, 7 ], [ 4, 10, 5, 9 ], [ 8, 11, 9, 11 ], [ 2, 8, 11, 10 ], [ 2, 11, 1, 6 ], [ 7, 5, 10, 8 ], [ 3, 3, 9, 10 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 4, 1 ], [ 5, 2, 5, 5 ], [ 3, 6, 6, 7 ], [ 3, 6, 2, 1 ], [ 8, 6, 5, 8 ], [ 4, 8, 7, 0 ], [ 0, 7, 2, 4 ], [ 3, 8, 0, 7 ], [], [], 4 ], [ [ 0, 1 ], [ 1, 0, 1 ], [ 0, 2 ], [ 2, 3 ], [ 4, 0, 1, 5 ], [ 5, 2, 5, 3 ], [ 5, 3, 3 ], [ 4, 4, 2, 4 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 0, 6 ], [ 3, 6, 3, 6 ], [ 1, 2, 7, 8 ], [ 3, 8, 7, 0 ], [ 1, 7, 9, 8 ], [ 2, 8, 10, 10 ], [ 0, 10, 5, 10 ], [ 9, 11, 6, 9 ], [ 4, 7, 2, 11 ], [ 5, 9, 11, 5 ], [ 4, 1, 11, 4 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 1, 1, 2 ], [ 4, 4, 5, 5 ], [ 6 ], [ 7, 4, 4, 5 ], [ 1, 8, 7, 7 ], [ 2, 6, 6 ], [ 8, 3, 3, 0 ], [ 5, 0, 0, 6 ], [ 3, 8, 8, 7 ], 4 ], [ [ 0, 1, 1, 2 ], [ 2, 3, 3 ], [ 4, 0, 0, 3 ], [ 3, 5, 5 ], [ 6, 4, 4, 1 ], [ 5, 5 ], [ 1, 0, 7, 7 ], [ 8, 6, 6, 8 ], [ 7, 7, 2, 2 ], [ 8, 8, 6, 4 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 4, 4 ], [ 5, 6, 6, 7 ], [ 4, 0, 0, 6 ], [ 2, 2, 8, 8 ], [ 7 ], [ 6, 4, 7, 7 ], [ 8, 8, 5, 5 ], [ 1, 3, 3, 5 ], [ 0, 3, 1, 2 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 1, 5 ], [ 1, 5, 4, 6 ], [ 4, 7, 8, 6 ], [ 0, 7, 5, 4 ], [ 2, 3, 8, 2 ], [ 5, 7, 6, 1 ], [ 2, 6, 7, 3 ], [ 0, 3, 8, 8 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 2, 3, 3 ], [ 4, 2, 2, 5 ], [ 6, 1, 0, 0 ], [ 7, 7, 5, 5 ], [ 5, 6, 6 ], [ 1, 4, 4, 7 ], [ 8, 8, 4, 7 ], [ 3, 3, 8, 8 ], [ 0, 6 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 3, 5, 6 ], [ 7, 5, 0, 8 ], [ 7, 4, 6, 7 ], [ 3, 7, 2, 9 ], [ 10, 8, 11, 1 ], [ 6, 11, 10, 0 ], [ 6, 0, 5, 3 ], [ 10, 11, 1, 11 ], [ 9, 4, 8, 5 ], [ 9, 4, 2, 10 ], [ 1, 9, 8, 2 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 1, 3, 3 ], [ 1, 5, 6, 6 ], [ 4, 6, 6, 4 ], [ 7, 3, 5, 4 ], [ 2, 2, 8, 0 ], [ 5, 7, 8, 2 ], [ 7, 5, 0, 0 ], [ 8, 1, 8, 7 ], [], [], 4 ], [ [ 0 ], [ 1, 1, 2 ], [ 2, 3, 0, 3 ], [ 0, 1, 3, 0 ], [ 4, 2, 1, 2 ], [ 4, 4, 3, 4 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 3, 1 ], [ 4, 6, 7, 8 ], [ 6, 5, 2, 9 ], [ 6, 10, 1, 5 ], [ 9, 6, 2, 11 ], [ 8, 4, 8, 0 ], [ 11, 4, 0, 8 ], [ 1, 7, 7, 9 ], [ 10, 3, 11, 10 ], [ 11, 2, 5, 0 ], [ 3, 9, 7, 10 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 5, 6 ], [ 5, 7, 7, 3 ], [ 0, 4, 3, 2 ], [ 7, 6, 1, 6 ], [ 1, 2, 5, 8 ], [ 2, 0, 8, 7 ], [ 0, 4, 6, 3 ], [ 8, 4, 8, 5 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 5, 2 ], [ 6, 7, 0, 3 ], [ 8, 5, 6, 1 ], [ 9, 0, 9, 0 ], [ 5, 10, 2, 11 ], [ 6, 8, 1, 10 ], [ 11, 4, 9, 4 ], [ 4, 2, 7, 7 ], [ 10, 3, 11, 7 ], [ 1, 11, 8, 10 ], [ 8, 9, 6, 5 ], [], [], 4 ], [ [ 0, 0, 1 ], [ 1, 0 ], [ 2, 2, 3, 1 ], [ 4, 4, 5, 2 ], [ 3, 3, 1, 3 ], [ 4, 4, 5, 2 ], [ 5, 5, 0 ], 4 ], [ [ 0, 1, 2, 1 ], [ 1, 0, 3, 4 ], [ 5, 6, 6, 5 ], [ 3, 2, 2, 4 ], [ 5, 7, 8, 4 ], [ 8, 5, 8, 7 ], [ 6, 1, 7, 4 ], [ 2, 3, 3, 6 ], [ 7, 8, 0, 0 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 1, 4, 2 ], [ 5, 6, 0, 4 ], [ 4, 7, 8, 8 ], [ 3, 7, 7, 6 ], [ 9, 0, 10, 11 ], [ 1, 0, 11, 6 ], [ 3, 5, 9, 9 ], [ 6, 3, 1, 8 ], [ 8, 11, 9, 10 ], [ 10, 11, 7, 5 ], [ 5, 10, 2, 4 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 1, 3, 4, 2 ], [ 5, 5, 4, 5 ], [ 3, 6, 6, 2 ], [ 7, 8, 4, 4 ], [ 0, 7, 7, 1 ], [ 0, 7, 8, 6 ], [ 5, 8, 8, 6 ], [ 1, 2, 3, 3 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 2, 3, 4, 0 ], [ 5, 0, 2, 6 ], [ 7, 5, 6, 8 ], [ 2, 6, 8, 0 ], [ 4, 8, 9, 4 ], [ 10, 5, 9, 11 ], [ 10, 11, 11, 7 ], [ 6, 11, 9, 3 ], [ 3, 10, 10, 7 ], [ 9, 7, 8, 5 ], [ 4, 1, 1, 3 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 0, 4, 3 ], [ 5, 2, 2, 5 ], [ 0, 5, 6, 6 ], [ 2, 4, 7, 0 ], [ 7, 4, 7, 6 ], [ 8, 3, 1, 4 ], [ 8, 8, 7, 6 ], [ 5, 3, 8, 1 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3 ], [ 1, 2, 3 ], [ 4, 4, 3, 2 ], [ 2, 4, 1, 4 ], [ 0, 3, 0, 1 ], 4 ], [ [ 0 ], [ 1, 1, 2, 2 ], [ 3, 0, 0 ], [ 4, 4, 5, 5 ], [ 5, 5, 1, 1 ], [ 6, 6, 7, 7 ], [ 7, 7, 4, 4 ], [ 2, 6, 6, 3 ], [ 2, 3, 3, 0 ], 4 ], [ [ 0, 1, 2, 3 ], [ 0, 4, 2, 5 ], [ 4, 0, 6, 7 ], [ 1, 8, 3, 1 ], [ 7, 4, 9, 5 ], [ 9, 5, 8, 10 ], [ 10, 9, 11, 6 ], [ 10, 2, 9, 7 ], [ 6, 4, 11, 3 ], [ 5, 11, 10, 1 ], [ 0, 8, 8, 7 ], [ 3, 11, 2, 6 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 3, 5, 0 ], [ 1, 6, 5, 7 ], [ 8, 2, 7, 1 ], [ 0, 1, 2, 5 ], [ 6, 8, 6, 8 ], [ 5, 4, 7, 3 ], [ 8, 7, 4, 2 ], [ 6, 4, 3, 0 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4 ], [ 5, 5, 4, 3 ], [ 4, 3 ], [ 1, 1, 4, 3 ], [ 2, 2, 0, 5 ], [ 6, 6, 0, 1 ], [ 5, 6, 6, 2 ], 4 ], [ [ 0, 1, 2, 2 ], [ 7, 11, 11, 6 ], [ 9, 9, 11, 1 ], [ 9, 9, 7, 1 ], [ 0, 0, 5, 3 ], [ 3, 4, 5, 6 ], [ 7, 8, 3, 8 ], [ 10, 4, 8, 6 ], [ 10, 5, 4, 11 ], [ 7, 8, 6, 10 ], [ 0, 10, 3, 5 ], [ 2, 1, 2, 4 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 4, 4, 5 ], [ 6, 7, 4, 6 ], [ 2, 1, 5, 3 ], [ 4, 5, 8, 2 ], [ 8, 0, 1, 7 ], [ 7, 0, 1, 5 ], [ 7, 2, 8, 6 ], [ 6, 3, 3, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 4, 5 ], [ 6, 0, 1, 7 ], [ 8, 9, 7, 10 ], [ 11, 3, 0, 8 ], [ 5, 4, 10, 10 ], [ 7, 9, 3, 11 ], [ 7, 5, 9, 2 ], [ 6, 9, 4, 6 ], [ 6, 1, 10, 0 ], [ 2, 1, 11, 8 ], [ 2, 8, 11, 5 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 1, 4, 5, 6 ], [ 2, 0, 0, 1 ], [ 7, 2, 3, 2 ], [ 4, 5, 7, 8 ], [ 0, 8, 4, 4 ], [ 8, 6, 6, 5 ], [ 1, 6, 8, 3 ], [ 3, 7, 5, 7 ], [], [], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 2, 0, 4 ], [ 2, 5 ], [ 1, 1, 3, 6 ], [ 4, 4, 5, 2 ], [ 6, 0, 3, 4 ], [ 5, 5 ], [ 3, 6, 6, 1 ], 4 ], [ [ 0, 0, 1 ], [ 1, 2, 3, 0 ], [ 2, 4, 2 ], [ 3, 1 ], [ 5, 5, 1, 4 ], [ 4, 4, 3, 2 ], [ 5, 5, 0, 3 ], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 4 ], [ 3, 3, 2, 5 ], [ 4, 0 ], [ 6, 6, 1, 4 ], [ 5, 5, 6, 6 ], [ 7, 7, 8, 8 ], [ 8, 7, 7, 5 ], [ 1, 2, 2, 4 ], [ 8, 0, 0 ], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 0, 4, 5 ], [ 6, 7, 8, 9 ], [ 5, 7, 7, 9 ], [ 1, 10, 11, 0 ], [ 11, 3, 6, 0 ], [ 10, 9, 10, 8 ], [ 11, 2, 1, 4 ], [ 7, 9, 6, 8 ], [ 8, 3, 2, 2 ], [ 5, 5, 6, 3 ], [ 11, 4, 10, 4 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 6 ], [ 5, 7, 7, 1 ], [ 1, 8, 3, 7 ], [ 0, 8, 3, 0 ], [ 2, 3, 6, 4 ], [ 5, 7, 1, 6 ], [ 4, 5, 2, 0 ], [ 2, 8, 4, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 3 ], [ 6, 7, 2, 4 ], [ 6, 4, 5, 8 ], [ 5, 8, 9, 4 ], [ 7, 1, 2, 1 ], [ 10, 11, 10, 6 ], [ 5, 8, 8, 3 ], [ 11, 11, 11, 3 ], [ 9, 0, 0, 1 ], [ 2, 0, 9, 10 ], [ 7, 9, 7, 10 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 0, 0 ], [ 4, 1, 1 ], [ 1, 4, 3, 3 ], [ 2, 2, 5, 6 ], [ 5, 7, 7, 3 ], [ 7, 6, 6 ], [ 6, 4, 4, 0 ], [ 7, 5, 5 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 2, 5, 2 ], [ 3, 5, 6, 6 ], [ 1, 7, 4, 8 ], [ 8, 0, 5, 7 ], [ 7, 1, 0, 2 ], [ 6, 0, 3, 1 ], [ 4, 8, 3, 5 ], [ 8, 4, 7, 6 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 3, 4, 5 ], [ 2, 6, 6 ], [ 7, 7, 3, 3 ], [ 8, 8, 7, 7 ], [ 4, 8, 8, 2 ], [ 6, 0, 6 ], [ 1, 0, 0 ], [ 5, 4, 4, 5 ], [ 5, 1, 1 ], 4 ], [ [ 0, 0, 1 ], [ 2, 2, 3, 1 ], [ 4, 4, 2, 5 ], [ 5, 5, 0, 6 ], [ 6 ], [ 3, 0, 6, 6 ], [ 1, 3, 1, 3 ], [ 5, 4, 4, 2 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 3, 4, 5 ], [ 6, 6, 1, 4 ], [ 1, 1, 6, 3 ], [ 5, 5, 2, 6 ], [ 4, 4, 2 ], [ 2 ], [ 0, 0, 5, 3 ], 4 ], [ [ 0, 0 ], [ 1, 2, 2 ], [ 3, 4, 4 ], [ 5, 6, 5, 3 ], [ 4, 1, 1 ], [ 2, 6, 6 ], [ 6, 5, 5 ], [ 7, 0, 0 ], [ 2, 3, 3, 7 ], [ 4, 7, 7, 1 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 4 ], [ 2, 5, 5 ], [ 4, 6, 6, 0 ], [ 6, 5, 6, 3 ], [ 7, 7, 8, 1 ], [ 5, 0, 0, 3 ], [ 8, 7, 7, 3 ], [ 1, 8, 8, 2 ], [ 2, 4, 4 ], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 4, 4 ], [ 2, 5, 6, 7 ], [ 8, 7, 9, 2 ], [ 6, 1, 4, 0 ], [ 10, 0, 8, 8 ], [ 10, 2, 9, 11 ], [ 7, 5, 6, 1 ], [ 5, 9, 5, 11 ], [ 3, 7, 11, 10 ], [ 1, 10, 8, 0 ], [ 11, 6, 9, 3 ], [], [], 4 ], [ [ 0, 1, 2, 2 ], [ 0, 3, 0, 4 ], [ 5, 0, 4, 3 ], [ 5, 6, 3, 5 ], [ 7, 1, 3, 1 ], [ 6, 6, 8, 2 ], [ 8, 4, 2, 6 ], [ 7, 1, 8, 7 ], [ 4, 5, 7, 8 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 0, 0 ], [ 6, 7, 0, 4 ], [ 1, 8, 9, 9 ], [ 8, 10, 6, 4 ], [ 11, 5, 8, 7 ], [ 10, 8, 10, 1 ], [ 1, 2, 5, 11 ], [ 9, 7, 11, 5 ], [ 7, 11, 3, 4 ], [ 3, 10, 2, 2 ], [ 6, 6, 9, 3 ], [], [], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 0, 0, 2 ], [ 1, 3, 4, 4 ], [ 5, 5, 6, 1 ], [ 2, 7, 7 ], [ 4, 4, 5, 5 ], [ 6, 3, 3, 2 ], [ 7 ], [ 7, 6, 6, 0 ], 4 ], [ [ 0, 1, 0, 2 ], [ 3, 4, 5, 5 ], [ 6, 2, 0, 7 ], [ 2, 6, 1, 7 ], [ 1, 4, 5, 3 ], [ 1, 2, 3, 7 ], [ 6, 8, 8, 6 ], [ 4, 4, 7, 8 ], [ 3, 8, 5, 0 ], [], [], 4 ], [ [ 0 ], [ 1, 2, 2 ], [ 3, 4, 4, 0 ], [ 5, 2, 3, 6 ], [ 4, 5, 5, 0 ], [ 6, 3, 3, 0 ], [ 7, 6, 6, 5 ], [ 2, 1, 1, 7 ], [ 1, 7, 7, 4 ], 4 ], [ [ 0, 1, 2, 0 ], [ 3, 4, 5, 2 ], [ 3, 4, 6, 3 ], [ 3, 7, 5, 8 ], [ 9, 6, 8, 10 ], [ 11, 6, 5, 2 ], [ 1, 1, 7, 4 ], [ 1, 0, 11, 8 ], [ 8, 9, 9, 10 ], [ 10, 7, 2, 11 ], [ 11, 4, 0, 7 ], [ 6, 10, 5, 9 ], [], [], 4 ], [ [ 0, 0, 1, 2 ], [ 3 ], [ 1, 3, 3 ], [ 4, 2, 2, 3 ], [ 2, 4, 5, 5 ], [ 5, 5, 0, 0 ], [ 1, 4, 4, 1 ], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 4, 5, 4 ], [ 5, 6, 3, 7 ], [ 7, 8, 6, 8 ], [ 4, 7, 5, 5 ], [ 4, 2, 0, 1 ], [ 2, 0, 6, 8 ], [ 8, 2, 6, 1 ], [ 7, 3, 3, 0 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 4, 5, 5, 4 ], [ 6, 2, 7, 8 ], [ 7, 3, 0, 9 ], [ 2, 9, 8, 10 ], [ 11, 11, 1, 8 ], [ 7, 2, 10, 3 ], [ 6, 5, 4, 9 ], [ 8, 11, 3, 0 ], [ 10, 6, 0, 7 ], [ 5, 1, 4, 10 ], [ 11, 9, 1, 6 ], [], [], 4 ], [ [ 0, 1, 0, 2 ], [ 2, 1, 3, 4 ], [ 3, 5, 6, 7 ], [ 0, 8, 1, 6 ], [ 4, 7, 6, 5 ], [ 8, 6, 2, 7 ], [ 4, 5, 0, 7 ], [ 5, 2, 4, 8 ], [ 3, 1, 8, 3 ], [], [], 4 ], [ [ 0, 1, 2, 3 ], [ 2, 1, 4, 0 ], [ 5, 6, 4, 7 ], [ 4, 4, 5, 8 ], [ 1, 9, 2, 10 ], [ 0, 5, 5, 3 ], [ 10, 7, 8, 6 ], [ 11, 9, 8, 1 ], [ 10, 9, 0, 6 ], [ 3, 11, 10, 8 ], [ 11, 11, 9, 7 ], [ 3, 7, 2, 6 ], [], [], 4 ], [ [ 0, 1, 2, 1 ], [ 3, 2, 4, 2 ], [ 5, 6, 4, 0 ], [ 1, 7, 7, 1 ], [ 3, 5, 2, 5 ], [ 8, 7, 8, 6 ], [ 0, 3, 3, 4 ], [ 6, 5, 7, 0 ], [ 8, 6, 8, 4 ], [], [], 4 ], [ [ 0, 1, 1, 2 ], [ 1, 3, 3 ], [ 4, 5, 4, 3 ], [ 2, 0, 0, 6 ], [ 7, 5, 5, 6 ], [ 3, 1, 2, 2 ], [ 5, 8, 8, 6 ], [ 8, 4, 4, 7 ], [ 6 ], [ 0, 7, 7, 8 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 5, 4 ], [ 6, 3, 5, 1 ], [ 3, 7, 6, 1 ], [ 4, 2, 0, 6 ], [ 3, 7, 2, 8 ], [ 1, 8, 6, 8 ], [ 0, 7, 5, 2 ], [ 7, 5, 8, 4 ], [], [], 4 ], [ [ 0, 1, 1 ], [ 2, 2, 3, 3 ], [ 3, 4, 4 ], [ 4, 5, 5 ], [ 1, 0, 0, 3 ], [ 5, 5, 4 ], [ 1, 0, 2, 2 ], 4 ], [ [ 0, 0, 1, 1 ], [ 2, 3, 3, 4 ], [ 5, 4, 4 ], [ 6, 6, 0, 0 ], [ 4 ], [ 7, 3, 6, 6 ], [ 3, 2, 2, 7 ], [ 1, 8, 8, 5 ], [ 8, 5, 5, 8 ], [ 2, 7, 7, 1 ], 4 ], [ [ 0, 0, 1, 2 ], [ 2, 3, 4 ], [ 1, 5, 5, 2 ], [ 4 ], [ 5, 5, 4, 0 ], [ 3, 3, 0, 2 ], [ 1, 1, 3, 4 ], 4 ], [ [ 0, 0, 1 ], [ 2, 3, 3 ], [ 4, 5, 6, 6 ], [ 7, 2, 2 ], [ 6, 4, 0, 0 ], [ 3, 2, 7, 3 ], [ 1, 7, 7 ], [ 5, 4, 4, 8 ], [ 8, 5, 5, 6 ], [ 8, 8, 1, 1 ], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 4, 4, 0 ], [ 1, 5, 5, 6 ], [ 4, 3, 3, 0 ], [ 5, 4, 7, 7 ], [ 8 ], [ 6, 6, 2, 8 ], [ 2, 8, 8 ], [ 7, 7, 5, 0 ], [ 3, 1, 1, 6 ], 4 ], [ [ 0, 1, 2 ], [ 3, 3, 4, 2 ], [ 1, 4, 3, 0 ], [ 4, 5, 0, 1 ], [ 2 ], [ 5, 5, 2, 1 ], [ 0, 3, 5, 4 ], 4 ], [ [ 0, 0, 1, 1 ], [ 2, 0, 0, 3 ], [ 4, 2, 2, 5 ], [ 6, 6, 4, 4 ], [ 3 ], [ 5, 5, 6, 6 ], [ 1, 1, 2, 5 ], [ 4, 3, 3 ], 4 ], [ [ 0, 1, 1 ], [ 2, 0, 3, 3 ], [ 4, 5, 5, 6 ], [ 7, 5, 2, 6 ], [ 1, 2, 2, 6 ], [ 5, 7, 7, 4 ], [ 6 ], [ 3, 0, 0, 1 ], [ 3, 4, 4, 7 ], 4 ], [ [ 0, 1, 2, 2 ], [ 3, 0, 0 ], [ 1, 4, 4 ], [ 4, 5 ], [ 5, 6 ], [ 6, 4, 3, 5 ], [ 2, 2, 7, 7 ], [ 7, 1, 1, 5 ], [ 0, 6, 6 ], [ 7, 3, 3 ], 4 ], [ [ 0, 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 2, 2 ], [ 1, 5, 5, 6 ], [ 5, 2, 6, 6 ], [ 7, 7, 4 ], [ 8, 8, 0, 0 ], [ 6, 3, 7, 7 ], [ 3, 8, 8, 5 ], [ 1, 4, 4 ], 4 ], [ [ 0, 1, 2, 3 ], [ 3, 4, 4 ], [ 5, 6, 6, 4 ], [ 2, 5, 5, 3 ], [ 4 ], [ 1, 0, 0, 3 ], [ 6, 2, 2, 5 ], [ 6, 1, 1, 0 ], 4 ], [ [ 0, 1, 2, 2 ], [ 2, 2, 3, 0 ], [ 1, 3, 3 ], [ 4, 0, 0, 5 ], [ 5, 5, 6, 6 ], [ 6, 6, 7, 7 ], [ 3, 4, 4, 5 ], [ 7, 1, 1, 4 ], [ 7 ], 4 ], [ [ 0, 1, 2, 3 ], [ 4 ], [ 5, 2, 2, 5 ], [ 6, 4, 4 ], [ 2, 3, 3, 7 ], [ 7, 7, 0, 6 ], [ 1, 0, 0, 4 ], [ 3, 1, 1, 7 ], [ 5, 5, 6, 6 ], 4 ], [ [ 0 ], [ 1, 0, 2 ], [ 2, 3, 2 ], [ 4, 1, 2, 4 ], [ 4 ], [ 5, 3, 1, 5 ], [ 0, 0, 3, 1 ], [ 5, 5, 3, 4 ], 4 ], [ [ 0 ], [ 1, 2, 2, 3 ], [ 2, 4, 4, 0 ], [ 4, 1, 1, 3 ], [ 3, 3, 0 ], [ 5, 5, 2, 0 ], [ 4, 1, 5, 5 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 4, 4 ], [ 5, 3, 3, 0 ], [ 1, 1, 3, 2 ], [ 2, 6, 6, 7 ], [ 7 ], [ 4, 0, 0, 2 ], [ 6, 4, 5, 5 ], [ 5, 6, 7, 7 ], 4 ], [ [ 0, 1, 1 ], [ 2, 2, 3, 3 ], [ 4, 4, 5, 5 ], [ 1, 6, 6 ], [ 5, 0, 0 ], [ 3, 3, 4, 4 ], [ 6, 2, 2, 5 ], [ 6, 0, 1 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 1, 4, 2 ], [ 4, 3, 5 ], [ 5 ], [ 1, 4, 5, 3 ], [ 2, 2, 3, 5 ], [ 0, 4, 0, 1 ], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 4, 5, 1 ], [ 3, 2, 3 ], [ 5, 6, 6, 4 ], [ 7, 7, 0, 0 ], [ 8, 5, 5, 7 ], [ 6, 6, 8, 0 ], [ 1, 2, 2 ], [ 7, 8, 8, 4 ], 4 ], [ [ 0, 1, 1 ], [ 2, 2, 3, 3 ], [ 4, 2, 2, 3 ], [ 5, 4, 4 ], [ 3, 0, 0, 5 ], [ 1, 0, 5, 5 ], [ 4, 1 ], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 1, 4 ], [ 4, 5, 5, 6 ], [ 7, 7 ], [ 1, 2, 2, 6 ], [ 5, 2, 5, 6 ], [ 6, 7, 7 ], [ 8, 3, 3, 4 ], [ 3, 8, 8, 0 ], [ 8, 0, 0, 4 ], 4 ], [ [ 0, 1, 2, 2 ], [ 1, 3, 3, 4 ], [ 3, 0, 0 ], [ 4, 5, 5 ], [ 6, 6, 4, 4 ], [ 2, 2, 6, 6 ], [ 5, 1, 1, 3 ], [ 5, 0 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 3, 2, 2 ], [ 4, 4, 3, 3 ], [ 5, 0, 0 ], [ 2, 0, 5, 5 ], [ 1, 1, 4, 4 ], [ 5 ], 4 ], [ [ 0, 1, 1 ], [ 1, 2, 2, 0 ], [ 3, 2, 4, 4 ], [ 5, 6, 5, 7 ], [ 8, 8, 3, 0 ], [ 7, 5, 5 ], [ 2, 3, 3, 0 ], [ 6, 7, 7 ], [ 4, 4, 8, 8 ], [ 1, 6, 6 ], 4 ], [ [ 0, 0, 1, 1 ], [ 2, 2, 3, 3 ], [ 1, 1, 4, 4 ], [ 3, 3, 5, 5 ], [ 4, 4, 2, 2 ], [ 6, 7, 7 ], [ 8, 0, 0, 6 ], [ 5, 5, 8, 8 ], [ 7 ], [ 8, 6, 6, 7 ], 4 ], [ [ 0 ], [ 1, 1, 2, 3 ], [ 3, 0, 0 ], [ 2, 4, 4, 0 ], [ 4, 4, 3, 3 ], [ 5, 6, 1, 1 ], [ 6, 5, 5, 2 ], [ 2, 6, 6, 5 ], 4 ], [ [ 0, 1, 1, 2 ], [ 1, 1, 0, 3 ], [ 2, 4, 4 ], [ 5, 6, 6, 7 ], [ 7, 2, 2, 4 ], [ 3, 3, 5, 5 ], [ 4 ], [ 6, 0, 0, 3 ], [ 5, 7, 7, 6 ], 4 ], [ [ 0, 1, 1, 0 ], [ 2 ], [ 3, 3, 2, 4 ], [ 5, 5, 4 ], [ 4, 3, 3, 2 ], [ 1, 1, 5, 4 ], [ 0, 0, 5, 2 ], 4 ], [ [ 0, 1, 1 ], [ 1, 1, 2, 2 ], [ 3, 4, 4 ], [ 4, 4, 5, 5 ], [ 6, 6, 0, 0 ], [ 7, 7, 6, 6 ], [ 2, 2, 7, 7 ], [ 8, 3, 3 ], [ 5, 5, 8, 3 ], [ 0, 8, 8 ], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 4 ], [ 5, 5, 0, 4 ], [ 4 ], [ 3, 2, 5, 5 ], [ 1, 0, 0, 4 ], [ 1, 2, 2, 3 ], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 4 ], [ 5, 6 ], [ 3, 1, 3, 0 ], [ 7, 4, 4, 7 ], [ 6, 2, 2, 5 ], [ 4, 0, 0, 2 ], [ 1, 6, 6 ], [ 7, 7, 5, 5 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4 ], [ 1, 1, 0, 3 ], [ 4, 2, 1, 2 ], [ 2, 0, 3 ], [ 4, 3, 4 ], 4 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 5, 0 ], [ 1, 1, 6, 2 ], [ 5, 1, 5, 0 ], [ 2, 2, 3, 6 ], [ 4 ], [ 6, 6, 4 ], [ 5, 3, 4, 3 ], 4 ], [ [ 0 ], [ 1, 2, 3, 3 ], [ 4, 5, 5 ], [ 3, 6, 6, 0 ], [ 2, 1, 1, 6 ], [ 7, 7, 5, 0 ], [ 5, 4, 4, 1 ], [ 6, 7, 7, 0 ], [ 4, 2, 2, 3 ], 4 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 3 ], [ 5, 5, 6, 6 ], [ 7, 0, 0, 4 ], [ 6, 6, 0, 8 ], [ 1, 7, 7, 5 ], [ 8, 8, 4, 4 ], [ 3, 2, 7, 5 ], [ 1, 2, 2, 8 ], 4 ], [ [ 0, 1, 1, 2 ], [ 3, 3, 3, 4 ], [ 0, 5, 6, 1 ], [ 4, 6, 7, 7 ], [ 7, 8, 9, 8 ], [ 3, 5, 10, 11 ], [ 5, 8, 4, 1 ], [ 6, 0, 0, 2 ], [ 9, 2, 2, 9 ], [ 6, 5, 9, 10 ], [ 10, 4, 11, 7 ], [ 10, 11, 11, 8 ], [], [], 4 ], [ [ 0, 0, 1, 2, 3 ], [ 3, 2, 2, 3 ], [ 4, 1, 0, 0, 1 ], [ 1, 3, 4 ], [ 2, 2, 0, 4, 1 ], [ 3, 4, 4 ], 5 ], [ [ 0, 1, 1, 2, 2 ], [ 2, 3, 3, 0, 4, 4 ], [ 1, 2, 2, 4, 4 ], [ 5, 2, 5 ], [ 3, 6, 6, 5, 5 ], [ 4, 0, 0, 3, 3, 5 ], [ 6, 0, 0, 1, 1, 5 ], [ 4, 6, 6, 1, 6, 3 ], 6 ], [ [ 0, 1, 2, 0 ], [ 3, 4, 2, 5 ], [ 2, 5 ], [ 4, 4, 0, 3, 0 ], [ 5, 0, 2, 5, 1 ], [ 1, 1, 4, 3, 4 ], [ 2, 3, 3, 1, 5 ], 5 ], [ [ 0, 0, 1 ], [ 1, 1, 2, 0, 3 ], [ 4, 1, 4 ], [ 3, 3, 2, 3, 1 ], [ 2, 4, 4, 0, 2 ], [ 0, 2, 3, 4 ], 5 ], [ [ 0, 0, 1, 0 ], [ 1, 2 ], [ 3, 2, 2, 0, 1 ], [ 4, 4, 3, 3, 5 ], [ 3, 3, 6, 6, 4 ], [ 5, 5, 1, 1, 6 ], [ 2, 5, 5, 2 ], [ 6, 4, 6, 4, 0 ], 5 ], [ [ 0, 1, 2, 0, 3 ], [ 1, 1, 2, 2, 3 ], [ 4, 4, 1, 1, 3 ], [ 3, 3, 4, 0 ], [ 2, 2, 4, 0, 4 ], [ 0 ], 5 ], [ [ 0, 1, 2, 0, 3 ], [ 2, 4, 4, 0, 1 ], [ 4, 4, 0, 2, 5 ], [ 1, 1, 0, 5, 1 ], [ 5, 5, 3, 6 ], [ 6 ], [ 3, 3, 6, 6, 3 ], [ 4, 2, 2, 6, 5 ], 5 ], [ [ 0, 1, 2, 3, 2 ], [ 3, 3, 0, 1 ], [ 2, 2, 0, 3, 1 ], [ 1 ], [ 4, 4, 0, 3, 1 ], [ 4, 4, 0, 2, 4 ], 5 ], [ [ 0, 1, 2 ], [ 3 ], [ 4, 0, 1 ], [ 5, 6 ], [ 6, 4, 0 ], [ 5, 5, 4 ], [ 2, 6, 3 ], [ 2, 1, 3 ], 3 ], [ [ 0, 1, 2 ], [ 3, 3, 2, 3 ], [ 2, 3, 1, 0 ], [ 4, 4, 1, 2 ], [ 1, 1, 4, 4, 5 ], [ 5, 5, 4, 0, 6 ], [ 5, 5, 6, 6, 0 ], [ 6, 6, 3, 0, 2 ], 5 ], [ [ 0, 1, 2, 3, 4 ], [ 5, 5, 4, 5 ], [ 2, 2, 0, 5, 4 ], [ 3, 3, 4, 2, 5 ], [ 4 ], [ 1, 0, 0, 1, 3 ], [ 2, 1, 1, 3, 0 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 2, 2 ], [ 1, 4, 4 ], [ 3, 0, 0, 3, 3 ], [ 4, 1, 4, 4 ], [ 1, 2, 2, 0, 0 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 2, 2, 1, 4 ], [ 3, 3, 1, 2 ], [ 4, 2, 4 ], [ 1, 1, 4, 0 ], [ 0, 3, 3, 0, 4 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 2 ], [ 4, 4, 0, 1, 4 ], [ 1, 1, 4, 3 ], [ 0, 0, 4, 2, 1 ], [ 3, 3, 2, 3, 2 ], 5 ], [ [ 0, 0, 1, 1, 2 ], [ 3, 3, 4, 3 ], [ 5, 5, 0, 4, 5 ], [ 4 ], [ 6, 6, 5, 5, 1 ], [ 2, 2, 3, 4, 3 ], [ 1, 1, 6, 0, 2 ], [ 4, 6, 6, 2, 0 ], 5 ], [ [ 0, 1 ], [ 1 ], [ 0, 2, 3 ], [ 4, 4, 5 ], [ 5, 2, 0 ], [ 6, 5, 3 ], [ 6, 6, 4 ], [ 2, 3, 1 ], 3 ], [ [ 0, 1, 1, 2, 2 ], [ 1, 3, 3, 2, 2 ], [ 4, 5, 5 ], [ 2, 6, 6, 7, 7 ], [ 6, 1, 1, 3, 5 ], [ 3, 7, 7, 4, 4 ], [ 5, 0, 0 ], [ 7, 6, 6, 4, 4 ], [ 3, 0, 0, 5 ], 5 ], [ [ 0 ], [ 1, 1, 0, 2 ], [ 0, 3, 4, 1, 3 ], [ 0, 5 ], [ 3, 4, 5, 4, 5 ], [ 2, 2, 3, 1, 0 ], [ 2, 1, 2, 4, 3 ], [ 5, 4, 5 ], 5 ], [ [ 0, 1 ], [ 0, 1, 2, 3, 4 ], [ 2, 1, 4 ], [ 4, 0, 4, 2 ], [ 1, 3, 2, 3 ], [ 0, 3, 0, 4, 1 ], [ 2, 3 ], 5 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 1, 1, 4, 4 ], [ 5, 5 ], [ 2, 3, 3, 6, 5 ], [ 4, 0, 0, 6, 6 ], [ 1, 2, 2, 7, 7 ], [ 7, 3, 3, 0, 0 ], [ 6, 4, 4, 7, 7 ], [ 6, 5, 5 ], 5 ], [ [ 0, 1, 0 ], [ 1, 0, 2 ], [ 3, 2, 3 ], [ 4, 1, 5, 4, 5 ], [ 5, 1, 0, 1, 3 ], [ 5, 4, 3, 0, 4 ], [ 2, 3, 2 ], [ 4, 5, 2 ], 5 ], [ [ 0, 1, 1 ], [ 2, 1, 1, 2, 2 ], [ 3, 2, 2, 1, 0 ], [ 4, 3, 3, 4, 4, 2 ], [ 1, 3, 4, 0, 0 ], [ 4, 4, 3, 3, 0, 0 ], 6 ], [ [ 0, 1, 2 ], [ 2, 3, 4, 3, 4 ], [ 1, 2 ], [ 3, 3, 0, 2, 0 ], [ 4, 4, 1, 2, 1 ], [ 1, 0, 0, 3, 4 ], 5 ], [ [ 0, 0, 1, 2 ], [ 1, 3, 0, 0, 3 ], [ 3, 2, 4, 2, 4 ], [ 2, 1, 4, 2, 4 ], [ 4 ], [ 1, 1, 3, 0, 3 ], 5 ], [ [ 0, 0, 1 ], [ 2, 2, 3, 4, 1 ], [ 3, 3, 1, 0, 4 ], [ 4, 1 ], [ 1, 4, 2, 2, 3 ], [ 2, 0, 3, 0, 4 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 1, 2, 2 ], [ 4 ], [ 5, 6, 6 ], [ 6, 7, 7 ], [ 7, 0 ], [ 3, 5, 5 ], [ 0, 4, 4 ], 3 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 4, 4, 5, 5 ], [ 2 ], [ 5, 5, 2, 2 ], [ 6, 3, 3, 0, 0 ], [ 4, 3, 3, 7, 7 ], [ 1, 7, 7, 0, 0 ], [ 7, 6, 6, 4, 4 ], [ 1, 1, 6, 6, 5 ], 5 ], [ [ 0, 1, 2, 1, 0 ], [ 3, 1, 1, 3, 2 ], [ 4, 4, 2 ], [ 5, 5, 2, 6 ], [ 6, 2, 6 ], [ 1, 3, 3, 0, 6 ], [ 0, 5, 4, 5, 6 ], [ 3, 0, 4, 4, 5 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 4, 4 ], [ 5 ], [ 4, 2, 2, 6, 5, 5 ], [ 3, 0, 0, 4, 4, 2 ], [ 6, 1, 5, 5 ], [ 1, 3, 3, 0, 0, 2 ], [ 0, 6, 6, 3, 1, 1 ], [ 2, 4, 6, 6, 5 ], 6 ], [ [ 0, 0, 1, 2 ], [ 3, 4, 4, 5, 2 ], [ 1, 1, 3, 5, 3 ], [ 2 ], [ 4, 4, 2, 4, 2 ], [ 5, 5, 0, 0, 1 ], [ 3, 3, 1, 5, 0 ], 5 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 3, 4, 4 ], [ 5, 4, 5 ], [ 6, 0, 0, 7, 7 ], [ 1, 2, 2, 6, 6 ], [ 2, 0, 0, 7, 7 ], [ 4, 4, 3, 6, 6 ], [ 7, 5, 5 ], [ 1, 1, 3, 3, 5 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 1 ], [ 3, 4, 4, 0, 0 ], [ 5, 6, 6, 0, 0, 4 ], [ 6, 3, 3, 4, 4, 0 ], [ 4, 5, 5, 1, 1, 6 ], [ 5, 2, 2, 5, 5, 2 ], [ 3, 2, 2, 6, 6, 1 ], 6 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 4, 4 ], [ 4, 3, 3, 5, 5 ], [ 1, 1 ], [ 5, 6, 6, 0, 0 ], [ 6, 0, 0, 6, 6 ], [ 3, 2, 2, 5, 5 ], [ 4, 4, 2, 2, 1 ], 5 ], [ [ 0, 0, 1 ], [ 2, 3, 0 ], [ 4, 5, 3 ], [ 5, 1, 1 ], [ 2, 3 ], [ 2 ], [], [ 6, 5, 6 ], [], [ 4, 4, 6 ], 3 ], [ [ 0 ], [ 1, 2, 1, 1, 3 ], [ 4, 3, 3, 2, 0 ], [ 2, 2, 5, 0, 5 ], [ 5, 2, 5, 0 ], [ 3, 4, 4, 3, 1 ], [ 4, 4, 1, 5, 0 ], 5 ], [ [ 0 ], [ 1, 2, 2 ], [ 3, 4, 4 ], [ 4, 5, 6 ], [ 6, 0 ], [ 7, 1, 1 ], [ 2, 6, 0 ], [ 5, 3, 3 ], [ 5, 7, 7 ], 3 ], [ [ 0, 0, 1, 2, 1 ], [ 3, 0, 0, 4, 2 ], [ 1, 1, 3, 2 ], [ 2, 3 ], [ 4, 4, 3, 2 ], [ 4, 1, 3, 4, 0 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3 ], [ 4, 5, 5 ], [ 6, 7, 7 ], [ 8, 6, 6 ], [ 7, 2, 2 ], [ 5, 8, 8 ], [ 1, 4, 4 ], [ 3, 0, 0 ], [ 3 ], 3 ], [ [ 0, 0, 1, 2, 0 ], [ 2, 2, 1, 0, 3 ], [ 3, 4 ], [ 1, 1, 2, 1, 2 ], [ 4, 3, 4 ], [ 0, 3, 4, 4, 3 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 5, 5, 1, 2, 2 ], [ 5, 2, 2, 6, 4, 6 ], [ 3, 0, 0, 6, 6 ], [ 1, 3, 3, 4, 4, 6 ], [ 6 ], [ 0, 5, 5, 1, 1, 3 ], [ 5, 4, 4, 2, 0, 0 ], 6 ], [ [ 0, 0, 1, 2, 1 ], [ 3, 2, 3, 4, 0 ], [ 1 ], [ 4, 4, 3, 4, 2 ], [ 4, 3, 0, 0, 1 ], [ 3, 2, 2, 1 ], 5 ], [ [ 0, 1, 1, 0, 0 ], [ 2, 3, 3, 2, 2, 4 ], [ 4 ], [ 1, 5, 5, 0, 5, 4 ], [ 3, 1, 1, 3, 2, 4 ], [ 6, 2, 2, 5, 5, 6 ], [ 5, 6, 6, 3, 3, 4 ], [ 0, 0, 6, 6, 1, 4 ], 6 ], [ [ 0, 1, 1, 2 ], [ 3, 1, 1, 0, 0 ], [ 4, 3, 3, 5, 5 ], [ 6, 3, 3, 6, 6 ], [ 2, 5, 5, 7, 7 ], [ 5, 6, 6, 4, 4 ], [ 1, 4, 4, 7, 7 ], [ 7, 0, 0, 2, 2 ], [ 2 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 2, 0 ], [ 4, 4, 1, 3, 2 ], [ 1, 1, 4, 4, 2 ], [ 3, 3, 0, 3, 2 ], [ 4, 1, 0 ], 5 ], [ [ 0, 1 ], [ 1, 1, 0 ], [ 2, 2, 0, 1, 0 ], [ 3, 3, 4, 4, 3 ], [ 4, 4, 3, 1, 2 ], [ 2, 2, 4, 3, 0 ], 5 ], [ [ 0, 1, 1 ], [ 2 ], [ 3, 4, 4 ], [ 1, 5, 5 ], [ 4, 0, 0 ], [ 5, 6 ], [ 6, 3, 3 ], [ 7, 2, 2 ], [ 6, 7, 7 ], 3 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 5, 5 ], [ 6 ], [ 5, 0, 0 ], [ 1, 7 ], [ 7, 2, 2 ], [ 3, 4, 4 ], [ 7, 6, 6 ], 3 ], [ [ 0, 1 ], [ 2 ], [ 3, 0, 4 ], [ 1, 2, 3, 4, 2 ], [ 3, 4, 0, 2, 1 ], [ 0, 0, 3, 4, 3 ], [ 1, 2, 1, 4 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 3 ], [ 2, 3, 2, 3, 1 ], [ 1, 1, 4, 2, 5 ], [ 6, 6, 4, 2, 4 ], [ 5, 5, 1, 3 ], [ 4, 4, 0, 0, 6 ], [ 5, 5, 6, 6, 0 ], 5 ], [ [ 0, 0, 1, 2 ], [ 3 ], [ 4, 4, 2, 3, 3 ], [ 5, 5, 0, 5, 1 ], [ 1, 1, 5, 3, 4 ], [ 2, 0, 5, 1, 4 ], [ 2, 2, 0, 3, 4 ], 5 ], [ [ 0 ], [ 1, 2, 2, 0, 0 ], [ 3, 3, 4, 1, 2, 3 ], [ 2, 1, 1, 4, 4, 3 ], [ 4, 2, 2, 1, 1, 0 ], [ 4, 4, 3, 3, 0, 0 ], 6 ], [ [ 0, 1 ], [ 1, 2 ], [ 0, 2, 3 ], [ 4, 4, 0 ], [ 1, 2 ], [ 3, 3, 4 ], 3 ], [ [ 0, 1, 1, 2 ], [ 3, 3, 4, 4, 2 ], [ 5, 0, 0, 1, 2 ], [ 2 ], [ 3, 3, 5, 5, 4 ], [ 1, 1, 0, 0, 2 ], [ 4, 4, 5, 5, 3 ], 5 ], [ [ 0, 0, 1, 2 ], [ 3, 3, 4, 1, 2 ], [ 5, 5, 4, 5, 4 ], [ 2, 2, 1, 1 ], [ 4, 3, 3, 0, 3 ], [ 2, 1 ], [ 4, 0, 5, 5, 0 ], 5 ], [ [ 0, 1, 1, 2, 3, 2 ], [ 2, 0, 0 ], [ 3, 1, 1, 3, 3 ], [ 4, 0, 0, 2, 4, 4 ], [ 1, 4, 4, 0 ], [ 3, 3, 1, 2, 2, 4 ], 6 ], [ [ 0, 1, 2 ], [ 3, 4, 2 ], [ 1, 1, 5 ], [ 6, 4, 2 ], [ 0, 3, 5 ], [ 0, 3, 5 ], [], [], [ 6, 6, 4 ], 3 ], [ [ 0, 0, 1, 1, 0 ], [ 2, 2, 3 ], [ 3, 3, 4, 4 ], [ 4, 4, 0, 0, 2 ], [ 5, 2, 2, 5, 1 ], [ 1, 3, 4 ], [ 5, 5, 3, 1, 5 ], 5 ], [ [ 0, 0, 1 ], [ 2, 3, 1, 1, 0 ], [ 4, 4, 5, 2, 0 ], [ 2, 3, 2, 3, 0 ], [ 6, 6, 4, 5, 4 ], [ 6, 6, 4, 2, 3 ], [ 1, 1 ], [ 5, 5, 6, 5, 3 ], 5 ], [ [ 0, 1, 1, 2, 3, 3 ], [ 2, 0, 0, 4, 4 ], [ 3, 2, 2, 1, 1, 4 ], [ 4 ], [ 1, 3, 3, 1, 0, 4 ], [ 3, 2, 2, 0, 0, 4 ], 6 ], [ [ 0 ], [ 1, 0 ], [ 2, 2, 3 ], [ 3, 4, 1 ], [ 4, 4, 5 ], [ 5, 6, 0 ], [ 6, 3, 1 ], [ 2, 5, 6 ], 3 ], [ [ 0, 1, 2 ], [], [ 3, 4 ], [ 2, 4, 5 ], [ 5, 1 ], [ 3, 4, 0 ], [ 3, 1 ], [ 0, 5, 2 ], 3 ], [ [ 0, 1, 2, 2 ], [ 3 ], [ 4, 0, 0 ], [ 5, 6, 6 ], [ 6, 1, 1, 3 ], [ 1, 6, 6, 3, 3 ], [ 7, 0, 0, 4, 4 ], [ 2, 5, 5, 7, 7 ], [ 2, 4, 4, 5, 5 ], [ 1, 7, 7, 2, 3 ], 5 ], [ [ 0, 0, 1, 2 ], [ 1, 1, 3, 3, 4 ], [ 3, 3, 1, 2, 0 ], [ 4, 4, 0 ], [ 4, 4, 3, 1, 2 ], [ 2, 0, 2 ], 5 ], [ [ 0, 0, 1 ], [ 2, 2, 3, 1 ], [ 1, 3, 1 ], [ 4, 4, 5, 3, 2 ], [ 3, 5, 0, 2, 5 ], [ 0, 4, 4, 1, 2 ], [ 5, 5, 4, 0, 3 ], 5 ], [ [ 0, 1, 2 ], [ 2, 1, 3 ], [ 3, 4 ], [ 5, 6, 0 ], [ 6, 6, 0 ], [ 4, 3, 1 ], [ 4 ], [ 5, 5, 2 ], 3 ], [ [ 0, 0, 1, 1, 2 ], [ 3, 2 ], [ 4, 4, 2, 3 ], [ 2, 4, 5, 3 ], [ 1, 1, 0, 0, 1 ], [ 5, 5, 4, 5, 3 ], [ 0, 4, 5, 3, 2 ], 5 ], [ [ 0 ], [ 1, 2, 3 ], [ 3, 1 ], [ 4, 1, 0 ], [ 4, 4, 2 ], [ 2, 5, 3 ], [ 6, 6, 0 ], [ 5, 5, 6 ], 3 ], [ [ 0, 1, 1, 2, 3 ], [ 3, 4, 4, 5, 5 ], [ 2, 0, 0, 5 ], [ 6, 1, 1, 6, 6 ], [ 5 ], [ 7, 3, 3, 0, 5 ], [ 4, 2, 2, 3, 0 ], [ 1, 7, 7, 4, 4 ], [ 6, 6, 7, 7, 2 ], 5 ], [ [ 0, 0 ], [ 1, 2, 2, 3, 3 ], [ 3, 1, 4, 4, 0 ], [ 2, 1, 1, 4, 4 ], [ 4, 0, 0 ], [ 1, 2, 2, 3, 3 ], 5 ], [ [ 0 ], [ 1, 2, 2 ], [ 3, 2, 2, 1, 4, 4 ], [ 5, 5, 1, 1 ], [ 2, 1, 1, 4, 4 ], [ 6, 6, 4, 0, 0 ], [ 4, 5, 5, 6, 6, 0 ], [ 3, 3, 5, 5, 3, 6 ], [ 2, 0, 0, 3, 3, 6 ], 6 ], [ [ 0, 1, 0, 0 ], [ 2, 3, 3 ], [ 4, 1, 1, 2, 2 ], [ 3, 4, 4 ], [ 1, 2, 2, 4, 4 ], [ 1, 0, 0, 3, 3 ], 5 ], [ [ 0, 1, 1, 2, 3 ], [ 1, 0 ], [ 2, 4, 4, 0, 2 ], [ 3, 0, 1 ], [ 4, 4, 2, 4, 3 ], [ 2, 3, 3, 1, 0 ], 5 ], [ [ 0, 0, 1, 2 ], [ 2, 2, 3, 2, 3 ], [ 3 ], [ 1, 1, 0, 1, 0 ], [ 4, 4, 3, 1, 3 ], [ 4, 4, 0, 4, 2 ], 5 ], [ [ 0, 1, 2, 3, 4 ], [ 4, 4, 2, 5 ], [ 5, 5 ], [ 3, 1, 1, 3, 4 ], [ 1, 0, 4, 2, 5 ], [ 2, 0, 0, 5 ], [ 6, 6, 3, 1, 2 ], [ 6, 0, 6, 6, 3 ], 5 ], [ [ 0, 1 ], [ 2, 2, 3, 0 ], [ 3, 0, 0, 3, 1 ], [ 4, 4, 5, 5, 6 ], [ 6, 6, 4, 4, 3 ], [ 1, 1, 2, 0 ], [ 5, 4, 2, 1, 2 ], [ 5, 6, 6, 3, 5 ], 5 ], [ [ 0, 0, 1, 0, 2 ], [ 3, 3, 1, 1, 2 ], [ 4, 5, 5, 0, 5 ], [ 2, 2, 3, 6 ], [ 1, 1, 6, 6, 2 ], [ 5, 5, 4, 0, 4 ], [ 6, 3 ], [ 4, 4, 3, 6 ], 5 ], [ [ 0, 1, 2, 0, 2 ], [ 1, 0 ], [ 3, 3, 4, 1, 0 ], [ 2, 2, 0 ], [ 4, 4, 2, 1, 3 ], [ 3, 3, 4, 1, 4 ], 5 ], [ [ 0 ], [ 1, 0, 1, 0, 1 ], [ 2, 3, 1, 0 ], [ 3, 3, 4, 1, 4 ], [ 5, 5, 2, 2, 6 ], [ 4, 4, 5, 5, 6 ], [ 6, 4, 3, 0, 3 ], [ 2, 5, 6, 6, 2 ], 5 ], [ [ 0, 0, 1, 1, 2 ], [ 2, 2, 3, 4, 3 ], [ 3, 4, 4 ], [ 3, 4 ], [ 1, 2, 1, 3, 0 ], [ 1, 0, 0, 4, 2 ], 5 ], [ [ 0, 0, 1, 1, 2 ], [ 3, 4, 4 ], [ 1, 5, 0, 2, 1 ], [ 4, 0, 0, 2, 3 ], [ 5, 5, 3, 4, 3 ], [ 2, 5, 2, 3, 5 ], [ 1, 4 ], 5 ], [ [ 0, 1 ], [ 2, 3, 3, 2, 4 ], [ 1, 1, 0 ], [ 3, 2, 0, 1, 0 ], [ 5, 5, 3, 3, 5 ], [ 4, 4, 5, 0, 1 ], [ 2, 2, 4, 4, 5 ], 5 ], [ [ 0, 0, 1, 1, 0 ], [ 2, 2, 3 ], [ 0, 0, 4, 4, 3 ], [ 5, 5, 4, 2 ], [ 1, 1, 2, 5, 3 ], [ 3, 2, 3 ], [ 4, 4, 5, 1, 5 ], 5 ], [ [ 0, 0, 1 ], [ 1, 1, 2 ], [ 3, 3, 2, 3 ], [ 2, 2, 4, 3, 0 ], [ 5, 4, 0, 4, 0 ], [ 4, 4, 5, 5, 1 ], [ 5, 5, 2, 3, 1 ], 5 ], [ [ 0, 1, 1 ], [ 2, 0, 0, 3 ], [ 4, 5, 5, 2, 2 ], [ 5, 6, 6, 4, 4 ], [ 1, 5, 5, 2, 2 ], [ 6, 3, 3 ], [ 3, 0, 0, 1, 1 ], [ 3, 4, 4, 6, 6 ], 5 ], [ [ 0, 1 ], [ 2, 3, 0 ], [ 3, 0, 4 ], [ 1, 2 ], [ 4, 1 ], [ 3, 2, 4 ], 3 ], [ [ 0, 1 ], [ 2, 0 ], [ 3, 2, 4 ], [ 5, 3, 1 ], [ 1, 0 ], [ 4, 5, 2 ], [ 4, 5, 3 ], 3 ], [ [ 0, 0, 1, 2 ], [ 2, 2, 3, 4 ], [ 4, 4, 1, 3 ], [ 5, 5, 1, 4, 3 ], [ 1, 1, 0, 4, 5 ], [ 3, 2, 3 ], [ 0, 0, 5, 5, 2 ], 5 ], [ [ 0 ], [ 1, 2, 2, 1, 3 ], [ 4, 4, 3, 0 ], [ 0, 0, 3, 0, 3 ], [ 2, 1, 1, 3, 5 ], [ 5, 5, 2, 5, 4 ], [ 1, 5, 4, 4, 2 ], 5 ], [ [ 0, 1, 0, 1 ], [ 2, 2, 3, 3, 2 ], [ 1 ], [ 4, 4, 5, 0, 4 ], [ 5, 5, 6, 0, 6 ], [ 3, 3, 2, 5, 1 ], [ 6, 6, 2, 4, 0 ], [ 3, 5, 6, 4, 1 ], 5 ], [ [ 0, 1, 1, 0, 0 ], [ 2, 2, 3, 3 ], [ 1, 4, 2, 2, 3 ], [ 5, 5, 4, 4, 2 ], [ 3 ], [ 4, 4, 6, 6, 5 ], [ 6, 6, 1, 1, 6 ], [ 0, 0, 5, 5, 3 ], 5 ], [ [ 0, 0, 1, 1 ], [ 2, 1, 1, 3, 3 ], [ 3 ], [ 4, 2, 2, 0, 0 ], [ 5, 4, 4, 2, 2 ], [ 1, 5, 5, 3, 3 ], [ 4, 5, 5, 4, 0 ], 5 ], [ [ 0, 1 ], [ 2 ], [ 3, 1, 4 ], [ 4, 0, 2 ], [ 1, 5, 4 ], [ 6, 5, 3 ], [ 5, 0, 2 ], [ 6, 6, 3 ], 3 ], [ [ 0, 0, 1, 0, 1 ], [ 1, 2 ], [ 2, 2, 3, 2, 3 ], [ 4, 4, 0, 1, 3 ], [ 4, 0, 4, 4, 1 ], [ 3, 2, 3 ], 5 ], [ [ 0, 1 ], [ 2 ], [ 3, 0, 2 ], [ 4, 3, 1 ], [ 1, 0, 2 ], [ 5, 5, 4 ], [ 4, 5, 3 ], 3 ], [ [ 0, 0, 1, 2 ], [ 1, 1, 0, 3, 4 ], [ 5, 5, 2, 1, 3 ], [ 2, 2, 5, 0, 4 ], [ 4 ], [ 6, 6, 5, 2, 4 ], [ 3, 3, 5, 0, 4 ], [ 6, 6, 1, 6, 3 ], 5 ], [ [ 0, 1, 2, 2 ], [ 2, 2, 1, 1, 3, 4 ], [ 3, 4, 4, 3, 3, 4 ], [ 1, 0, 0 ], [ 4, 4, 1, 1, 0 ], [ 3, 3, 2, 2, 0, 0 ], 6 ], [ [ 0, 1, 1, 2, 2 ], [ 1, 3, 3, 4, 4 ], [ 2 ], [ 3, 0, 0, 3, 3 ], [ 4, 1, 2, 2 ], [ 1, 0, 0, 4, 4 ], 5 ], [ [ 0, 1 ], [ 0, 2, 0, 1 ], [ 3, 3, 2, 1, 4 ], [ 1, 4, 0, 3, 4 ], [ 4, 2, 4, 1 ], [ 2, 2, 3, 3, 0 ], 5 ], [ [ 0 ], [ 1, 2, 2, 3, 2 ], [ 4, 5, 4, 0, 5 ], [ 1, 1, 4, 0 ], [ 5, 3, 5, 3, 0 ], [ 3, 5, 3, 4, 0 ], [ 2, 2, 1, 1, 4 ], 5 ], [ [ 0, 1, 2 ], [ 3, 4 ], [ 2, 5 ], [ 6, 1, 0 ], [ 1, 5, 2 ], [ 3, 3, 6 ], [ 4, 6, 0 ], [ 5, 4 ], 3 ], [ [ 0, 0, 1, 0, 1 ], [ 2 ], [ 3, 1, 2, 2, 4 ], [ 1, 4, 4, 2 ], [ 4, 3, 3, 0, 4 ], [ 3, 3, 2, 0, 1 ], 5 ], [ [ 0, 0, 1, 2 ], [ 1, 1, 0, 3, 4 ], [ 4, 2, 3, 2, 1 ], [ 2, 1, 3 ], [ 3, 2, 3 ], [ 4, 4, 0, 0, 4 ], 5 ], [ [ 0, 1, 1, 2, 3 ], [ 4, 5, 5 ], [ 6, 5 ], [ 2, 1, 1, 6, 6 ], [ 1, 7, 7, 4, 4 ], [ 7, 4, 4, 0, 5 ], [ 3, 3, 7, 7, 0 ], [ 5, 2, 2, 3, 3 ], [ 2, 0, 0, 6, 6 ], 5 ], [ [ 0, 1, 1, 2, 3 ], [ 1, 4, 4, 1, 2 ], [ 2, 3, 3 ], [ 4, 2, 2, 0, 0 ], [ 3, 3 ], [ 1, 0, 0, 4, 4 ], 5 ], [ [ 0, 1 ], [ 1, 1, 2, 1, 2 ], [ 3, 3, 0, 3, 0 ], [ 4, 4, 3, 0, 2 ], [ 4, 3, 4, 4, 0 ], [ 2, 1, 2 ], 5 ], [ [ 0, 0, 1, 0, 2 ], [ 1, 1, 3, 2, 0 ], [ 2, 1 ], [ 4, 4, 3, 0, 2 ], [ 3, 3, 4, 4, 2 ], [ 4, 3, 1 ], 5 ], [ [ 0, 1 ], [ 2, 3 ], [ 0, 1 ], [ 4, 4, 2 ], [ 1, 0, 3 ], [ 5, 5, 2 ], [ 5, 3, 4 ], 3 ], [ [ 0, 0, 1, 1, 2, 3 ], [ 4, 2, 2, 4, 4 ], [ 3, 3, 1, 1, 2, 2 ], [ 2, 0, 0, 3, 5, 6 ], [ 6, 6, 0, 0, 4, 5 ], [ 1, 1, 6, 6 ], [ 5, 5, 3, 3 ], [ 4, 4, 5, 5, 6 ], 6 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 4, 4, 3, 1, 2 ], [ 5, 6, 6, 7 ], [ 7, 1, 1, 8, 8, 7 ], [ 2, 2, 0, 0, 6, 5 ], [ 8, 7, 7 ], [ 4, 5, 5, 4, 4, 8 ], [ 6, 8, 8, 3, 3, 0 ], [ 1, 3, 3, 5, 5, 7 ], [ 4, 0, 0, 6, 6, 2 ], 6 ], [ [ 0, 1, 1, 2, 1, 3 ], [ 2, 0, 0, 4, 4 ], [ 5, 2, 2, 1, 1, 4 ], [ 3, 5, 5, 0, 0, 6 ], [ 1, 2, 2, 5, 5, 6 ], [ 4, 4, 0, 3, 3, 6 ], [ 6 ], [ 3, 5, 4, 3, 6, 6 ], 6 ], [ [ 0, 1, 2, 2 ], [ 3 ], [ 4, 0, 0 ], [ 1, 0, 0, 3 ], [ 5, 6, 6, 5, 2, 2 ], [ 6, 1, 1, 5, 5, 3 ], [ 2, 2, 4, 4, 5, 6 ], [ 4, 1, 1, 6, 6, 3 ], [ 5, 4, 4, 0, 3, 3 ], 6 ], [ [ 0, 1, 0 ], [ 1, 0, 1, 2 ], [ 3 ], [ 3, 2 ], [ 0, 4, 1, 3, 2 ], [ 1, 4, 3, 4, 0 ], [ 4, 2, 3, 4, 2 ], 5 ], [ [ 0, 0, 1, 0, 2 ], [ 3, 3, 4, 2 ], [ 3, 1, 3, 3, 1 ], [ 2, 1 ], [ 4, 4, 1, 2 ], [ 0, 4, 4, 2, 0 ], 5 ], [ [ 0, 0, 1, 2 ], [ 3, 3, 0, 3, 4 ], [ 2, 5, 2, 5 ], [ 1, 0, 4, 2 ], [ 4, 4, 1, 4, 5 ], [ 5, 2, 5 ], [ 1, 1, 3, 3, 0 ], 5 ], [ [ 0 ], [ 1, 2, 2, 3, 1, 3 ], [ 2, 4, 4, 3, 3 ], [ 3, 0, 0, 3, 0, 0 ], [ 4, 1, 1, 2, 2, 4 ], [ 2, 4, 4, 1, 1, 0 ], 6 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 2, 2, 1, 2, 4 ], [ 1, 3, 3, 4, 4 ], [ 2, 1, 1, 3, 3 ], [ 4, 0, 0 ], [ 4, 3, 0, 0, 4, 0 ], 6 ], [ [ 0, 1, 1 ], [ 2, 3 ], [ 1, 4, 4 ], [ 5, 2, 2 ], [ 4, 5, 5 ], [ 6, 7, 7 ], [ 7, 0, 0 ], [ 3 ], [ 3, 6, 6 ], 3 ], [ [ 0 ], [ 1, 1, 2, 0, 0 ], [ 3, 3, 2, 0, 3 ], [ 4, 4, 5, 1, 2 ], [ 5, 5, 4, 1, 5 ], [ 2, 2, 5, 0 ], [ 3, 3, 4, 1, 4 ], 5 ], [ [ 0 ], [ 1, 2, 3 ], [ 3, 4, 5 ], [ 2, 5 ], [ 6, 6, 1 ], [ 4, 6, 2 ], [ 5, 4, 0 ], [ 1, 0, 3 ], 3 ], [ [ 0, 1 ], [ 1, 2, 3 ], [ 2 ], [ 3, 1, 2, 3 ], [ 0, 0, 2, 0, 3 ], [ 0, 1, 1, 2, 3 ], 5 ], [ [ 0 ], [ 1 ], [ 2, 2 ], [ 1, 0 ], [ 2, 3, 0 ], [ 3, 4, 3 ], [ 4, 1, 4 ], 3 ], [ [ 0, 0, 1 ], [ 2, 3, 0, 4, 3 ], [ 4, 4, 3, 0, 4 ], [ 3, 2, 4, 1 ], [ 1, 2, 2, 3, 0 ], [ 2, 1, 1 ], 5 ], [ [ 0, 1, 0, 1 ], [ 2, 2, 3 ], [ 3, 3, 1, 4, 2 ], [ 1, 3, 1, 0 ], [ 4, 4, 2, 2, 4 ], [ 4, 0, 3, 0 ], 5 ], [ [ 0, 1, 1, 2, 3 ], [ 3 ], [ 4, 1, 1, 5, 5 ], [ 1, 5, 5, 0, 0 ], [ 2, 0, 0, 3, 3 ], [ 5, 2, 2, 4, 4 ], [ 2, 4, 4, 3 ], 5 ], [ [ 0, 1, 2, 2 ], [ 3 ], [ 4, 2, 2, 0, 0 ], [ 2, 1, 1, 5, 5 ], [ 1, 4, 4, 3, 3 ], [ 5, 4, 4, 3, 3 ], [ 1, 0, 0, 5, 5 ], 5 ], [ [], [ 0, 1 ], [ 2, 3 ], [ 0, 3, 2 ], [ 4, 5, 0 ], [ 1, 3 ], [ 4, 5, 1 ], [ 4, 5, 2 ], 3 ], [ [ 0, 0, 1 ], [ 2, 2, 0, 2 ], [ 1, 2, 1 ], [ 3, 3, 4, 1, 4 ], [ 4, 4, 2, 0, 1 ], [ 3, 3, 0, 3, 4 ], 5 ], [ [ 0, 1, 2, 1, 3 ], [ 3, 0 ], [ 4, 4, 5, 4, 5 ], [ 1, 2, 5, 5, 2 ], [ 1, 1, 3, 0 ], [ 2, 3, 0, 0 ], [ 4, 5, 4, 2, 3 ], 5 ], [ [ 0, 1 ], [ 2, 1, 2, 1, 3 ], [ 3, 3, 4, 0 ], [ 4, 4, 3, 4, 0 ], [ 1, 0, 1, 0 ], [ 2, 2, 4, 2, 3 ], 5 ], [ [ 0, 1 ], [ 2, 1, 3 ], [ 4, 4 ], [ 5, 5, 6 ], [ 6, 2, 0 ], [ 1, 4 ], [ 3, 3, 0 ], [ 2, 5, 6 ], 3 ], [ [ 0, 0, 1, 2, 0 ], [ 3, 3, 1 ], [ 4, 4, 5, 5, 1 ], [ 2, 2, 0, 6, 3 ], [ 1, 1 ], [ 5, 5, 3, 6, 3 ], [ 2, 2, 6, 0, 4 ], [ 6, 6, 4, 4, 5 ], 5 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 4, 4, 3, 3 ], [ 1, 3, 3, 0, 0 ], [ 5 ], [ 2, 1, 1, 5, 5 ], [ 4, 0, 0, 4, 4 ], [ 2, 2, 5, 5 ], 5 ], [ [ 0, 1, 1, 2, 2 ], [ 3 ], [ 2, 0, 0, 1, 4 ], [ 1, 4, 4, 3 ], [ 4, 2, 2, 4, 3 ], [ 1, 0, 0, 3, 3 ], 5 ], [ [ 0, 1, 1, 2 ], [ 1, 3, 3, 4, 4 ], [ 2 ], [ 3, 0, 0, 1, 1 ], [ 4, 5, 5, 3, 3 ], [ 5, 0, 5, 5, 2 ], [ 0, 4, 4, 2, 2 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 4, 4, 5 ], [ 1, 0, 1, 1 ], [ 3, 2, 2, 4, 6, 6 ], [ 7, 4, 4, 7, 5, 5 ], [ 5, 6, 6, 0, 0 ], [ 4, 7, 7, 5, 5, 6 ], [ 6, 2, 2, 0, 0, 1 ], [ 3, 7, 7, 3, 3, 2 ], 6 ], [ [ 0, 0, 1 ], [ 2, 2, 0, 3 ], [ 3, 0, 1 ], [ 1, 2, 4, 4, 5 ], [ 5, 4, 5, 0, 1 ], [ 4, 1, 2, 2, 3 ], [ 5, 3, 4, 5, 3 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 0, 0 ], [ 1, 4, 4, 3, 3 ], [ 4, 2, 2, 5, 5 ], [ 6, 4, 4, 7, 7 ], [ 3, 7, 7, 2, 2 ], [ 7, 6, 6, 5, 5 ], [ 5, 1 ], [ 0, 0, 6, 6, 1 ], 5 ], [ [ 0, 1, 1 ], [ 2, 0, 0 ], [ 3, 2, 2 ], [ 4, 5 ], [ 1, 6, 6 ], [ 7, 3, 5 ], [ 8, 4, 4 ], [ 5 ], [ 6, 7, 7 ], [ 3, 8, 8 ], 3 ], [ [ 0, 0, 1, 0, 2 ], [ 2, 2, 0, 3, 4 ], [ 3, 3, 5, 6, 5 ], [ 4, 4 ], [ 1, 6, 6, 1, 5 ], [ 5, 5, 4 ], [ 6, 0, 2, 1, 4 ], [ 1, 3, 2, 6, 3 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 3, 2, 4, 5 ], [ 2, 2, 0, 3, 4 ], [ 4 ], [ 5, 3, 5, 4, 5 ], [ 1, 1, 2, 5, 4 ], [ 6, 6, 3, 1, 0 ], [ 1, 6, 6, 0, 6 ], 5 ], [ [ 0, 0, 1, 1, 2 ], [ 3 ], [ 4, 4, 1, 4, 2 ], [ 2, 2, 3, 3, 0 ], [ 1, 1, 4, 4, 2 ], [ 0, 0, 3, 3 ], 5 ], [ [ 0, 1, 1, 0, 2 ], [ 2, 0, 0, 3, 4 ], [ 4, 4, 2 ], [ 1, 2 ], [ 2, 1, 3, 3, 1 ], [ 3, 0, 4, 4, 3 ], 5 ], [ [ 0, 1, 1, 0, 0 ], [ 2 ], [ 3, 4, 4, 3, 3 ], [ 4, 5, 5, 2 ], [ 1, 4, 4, 2, 2 ], [ 5, 3, 3, 1, 1 ], [ 0, 0, 5, 5, 2 ], 5 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 0, 0, 4, 4 ], [ 2, 3, 3, 0, 0 ], [ 4, 4, 3, 1, 0, 2 ], [ 1, 4, 4, 3, 3 ], [ 2, 2, 1, 1 ], 6 ], [ [ 0, 0, 1, 2 ], [ 2, 2, 1, 0, 3 ], [ 3, 2, 4, 1, 4 ], [ 1, 1, 4, 2, 0 ], [ 4, 4, 0, 3 ], [ 3, 3 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 3, 3, 4, 2, 5 ], [ 4, 4 ], [ 1, 1, 6, 4, 5 ], [ 6, 6, 3, 3, 2 ], [ 2, 2, 6, 6, 5 ], [ 5, 5, 4 ], [ 0, 0, 1, 1, 0 ], 5 ], [ [ 0, 0, 1, 0, 2 ], [ 3, 3, 4, 2, 4 ], [ 2, 1 ], [ 4, 4, 1, 2 ], [ 1, 0, 0, 2 ], [ 4, 3, 3, 1, 3 ], 5 ], [ [ 0, 1, 2, 3, 4 ], [ 2, 3, 1, 1, 3 ], [ 3, 3, 0 ], [ 1, 0, 0, 2, 4 ], [ 4, 0, 4 ], [ 1, 2, 2, 4 ], 5 ], [ [ 0, 0, 1 ], [ 2, 2, 3, 2, 3 ], [ 4, 4, 1, 3, 4 ], [ 1, 1, 2 ], [ 3, 3, 1, 0 ], [ 5, 5, 0, 2, 0 ], [ 5, 5, 4, 4, 5 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 1, 4, 4 ], [ 4, 2 ], [ 5, 6, 6 ], [ 3, 0, 0 ], [ 7, 5, 5 ], [ 8 ], [ 6, 8, 8 ], [ 2, 7, 7 ], 3 ], [ [ 0, 1, 2 ], [ 1, 1 ], [ 3, 3, 2 ], [ 2, 3 ], [ 0 ], [ 0 ], 3 ], [ [ 0, 1, 1, 2, 2 ], [ 3, 1, 1, 0, 0 ], [ 2, 3, 3 ], [ 4, 0, 0, 2, 2 ], [ 1, 4, 4 ], [ 4, 3, 3, 4 ], 5 ], [ [ 0, 1, 0 ], [ 2, 3, 4 ], [ 5, 4, 0 ], [ 3, 1 ], [ 3 ], [ 5, 5 ], [ 1 ], [ 2, 4, 2 ], 3 ], [ [ 0, 0, 1, 2 ], [ 3, 1 ], [ 1, 1, 0, 1, 0 ], [ 2, 2, 3, 2 ], [ 4, 4, 3, 0, 3 ], [ 2, 4, 4, 3, 4 ], 5 ], [ [ 0, 1, 2, 3, 0 ], [ 4, 2, 2, 3, 5 ], [ 2, 2, 0, 0, 3 ], [ 1, 1, 5, 4, 5 ], [ 3, 1, 3, 5, 1 ], [ 5, 4, 4 ], [ 0, 4 ], 5 ], [ [ 0 ], [ 1, 1, 2, 3, 1 ], [ 4, 4, 1, 3, 0 ], [ 2, 2, 4, 0 ], [ 3, 4, 0, 3, 0 ], [ 4, 2, 3, 2, 1 ], 5 ], [ [ 0, 1, 2 ], [ 2, 3, 4 ], [ 4, 3 ], [ 4, 2, 3 ], [ 1, 2, 1, 0, 4 ], [ 1, 0, 4, 0, 3 ], [ 0, 1, 2, 3 ], 5 ], [ [ 0 ], [ 1, 2, 2, 3, 3 ], [ 3, 4, 4, 5, 5 ], [ 6, 6, 7, 7, 5 ], [ 5, 5, 0, 0 ], [ 2, 4, 4, 1, 1 ], [ 7, 7, 6, 7, 0 ], [ 4, 8, 8, 3, 3 ], [ 8, 2, 2, 8, 8 ], [ 1, 1, 6, 6, 0 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3, 0, 2 ], [ 4, 2, 4, 4 ], [ 1, 4, 4 ], [ 3, 2, 2, 1, 1 ], [ 0, 3, 3, 0, 0 ], 5 ], [ [ 0, 0, 1, 2, 3 ], [ 3, 1, 0, 3, 0 ], [ 2, 2, 4 ], [ 4, 4, 2, 0, 4 ], [ 1, 1, 3, 1, 2 ], [ 3, 4 ], 5 ], [ [ 0, 1, 1 ], [ 2, 3, 3 ], [ 4, 5, 6 ], [ 6 ], [ 1, 2, 2 ], [ 3, 7, 7 ], [ 5, 4, 4 ], [ 7, 6 ], [ 5, 0, 0 ], 3 ], [ [ 0, 0, 1 ], [ 2, 3, 1, 0, 3 ], [ 3, 4, 0, 1, 4 ], [ 4, 2, 5, 4, 0 ], [ 1, 3 ], [ 5, 6, 6, 2, 1 ], [ 6, 6, 2, 5, 6 ], [ 5, 2, 3, 5, 4 ], 5 ], [ [ 0, 0, 1, 2 ], [ 2 ], [ 1, 3, 3, 1, 3 ], [ 4, 4, 0, 2, 0 ], [ 3, 3, 1, 2, 2 ], [ 4, 4, 0, 4, 1 ], 5 ], [ [ 0 ], [ 1, 2, 0, 0, 2 ], [ 2, 2, 0, 0 ], [ 3, 3, 2, 4, 1 ], [ 5, 5, 4, 4, 5 ], [ 6, 6, 4, 1, 6 ], [ 4, 6, 6, 3, 1 ], [ 5, 5, 3, 1, 3 ], 5 ], [ [ 0, 0, 1 ], [ 2, 2, 3, 4, 0 ], [ 4, 4, 0, 0, 4 ], [ 1, 3, 3, 1, 2 ], [ 1, 1 ], [ 3, 2, 2, 3, 4 ], 5 ], [ [ 0, 0, 1, 2, 1 ], [ 3, 3, 4, 4, 0 ], [ 4, 4, 1, 3, 2 ], [ 1, 1, 0, 4, 0 ], [ 2, 2 ], [ 3, 3, 2 ], 5 ], [ [ 0, 1, 1, 2, 3 ], [ 2, 1, 4, 4, 2 ], [ 5, 3, 3 ], [ 4, 3 ], [ 3, 5, 5, 0, 0 ], [ 1, 5, 5, 0, 0 ], [ 1, 2, 2, 4, 4 ], 5 ], [ [ 0, 0, 1 ], [ 2, 3, 0 ], [ 4, 5, 3 ], [ 5, 1, 1 ], [ 2, 2, 3 ], [], [ 7, 5, 7 ], [], [ 4, 4, 7 ], 3 ] ];
        _this.solutions = [ [ 0, 2, 1, 0, 1, 2 ], [ 0, 3, 1, 2 ], [ 0, 2, 1, 0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 2 ], [ 0, 3, 2, 0, 0, 4, 0, 2, 1, 0, 3, 0, 1, 3, 2, 1, 2, 0, 2, 3, 3, 4 ], [ 0, 5, 3, 0, 0, 6, 1, 5, 4, 1, 1, 6, 2, 3, 0, 2, 1, 0, 2, 1, 3, 2, 3, 5, 3, 1, 2, 3, 2, 5, 4, 3, 0, 4 ], [ 0, 5, 4, 0, 1, 5, 3, 1, 1, 6, 1, 0, 2, 1, 2, 0, 2, 1, 3, 1, 3, 2, 2, 6, 3, 4 ], [ 0, 5, 0, 6, 1, 0, 2, 0, 0, 5, 1, 6, 2, 1, 3, 1, 4, 2, 4, 0, 3, 4, 3, 2, 3, 0, 4, 6, 4, 0 ], [ 0, 5, 0, 6, 1, 0, 4, 0, 3, 1, 2, 4, 2, 5, 4, 2, 3, 4, 4, 6, 4, 5, 0, 4, 0, 6, 1, 0, 1, 4, 2, 1, 2, 0, 3, 1, 3, 5 ], [ 0, 5, 3, 0, 0, 6, 2, 5, 1, 2, 3, 1, 0, 3, 0, 5, 1, 0, 3, 1, 3, 5, 2, 3, 2, 1, 4, 6, 4, 3, 4, 0 ], [ 0, 5, 3, 0, 0, 6, 1, 0, 2, 1, 2, 5, 1, 2, 1, 5, 0, 1, 3, 0, 4, 3, 3, 6, 2, 3, 2, 0, 4, 5, 4, 1, 4, 0 ], [ 2, 1, 4, 1, 5, 1, 6, 2, 0, 6, 4, 0, 5, 4, 0, 5, 6, 0, 3, 5, 2, 3, 2, 6 ], [ 4, 2, 3, 4, 6, 4, 6, 2, 4, 6, 0, 4, 1, 4, 5, 4, 1, 5, 1, 3, 0, 1, 3, 0, 5, 3, 1, 5 ], [ 0, 7, 2, 0, 0, 8, 7, 0, 1, 7, 3, 8, 4, 7, 4, 8, 6, 4, 6, 3, 1, 6, 1, 4, 3, 1, 6, 3, 6, 7, 0, 6, 0, 3, 2, 0, 5, 0, 2, 6, 5, 7, 5, 6 ], [ 2, 1, 0, 2, 4, 3, 1, 4, 0, 1, 4, 0, 2, 4, 1, 2, 1, 4, 2, 1, 3, 2, 3, 1 ], [ 0, 7, 1, 7, 1, 8, 6, 8, 7, 6, 0, 7, 0, 1, 0, 7, 2, 0, 3, 0, 3, 1, 4, 2, 3, 4, 6, 3, 2, 6, 0, 2, 4, 0, 5, 0, 4, 8, 5, 4, 4, 7, 5, 6 ], [ 0, 5, 3, 0, 4, 0, 0, 6, 1, 0, 1, 6, 1, 0, 2, 5, 2, 3, 2, 1, 2, 0, 3, 2, 4, 2, 4, 1, 4, 2, 3, 5, 3, 1 ], [ 0, 7, 1, 8, 0, 1, 2, 7, 6, 2, 3, 8, 3, 6, 3, 7, 1, 3, 2, 1, 5, 2, 4, 8, 4, 2, 0, 4, 5, 0, 6, 0, 5, 1, 4, 5, 4, 8, 2, 4, 2, 5, 6, 7, 6, 4 ], [ 4, 0, 1, 2, 0, 1, 6, 2, 0, 6, 1, 0, 6, 1, 5, 4, 3, 5, 3, 1, 5, 3, 4, 5, 4, 6 ], [ 0, 7, 1, 8, 3, 1, 2, 3, 2, 0, 2, 8, 2, 0, 1, 2, 1, 0, 1, 7, 3, 1, 3, 8, 4, 3, 4, 2, 6, 3, 5, 4, 5, 1, 4, 5, 4, 3, 5, 4, 6, 4, 6, 1, 6, 2, 5, 8 ], [ 0, 5, 4, 0, 0, 6, 3, 0, 2, 3, 1, 2, 1, 4, 1, 0, 2, 1, 2, 0, 2, 1, 3, 2, 5, 2, 4, 3, 4, 6, 4, 2 ], [ 6, 7, 1, 6, 2, 6, 3, 6, 0, 3, 0, 1, 0, 7, 3, 0, 2, 3, 4, 2, 5, 2, 4, 3, 1, 4, 5, 1, 7, 5, 7, 0 ], [ 3, 7, 6, 3, 1, 6, 1, 7, 1, 0, 2, 1, 6, 1, 0, 6, 2, 0, 4, 0, 5, 4, 5, 2, 3, 5, 4, 3, 4, 2, 4, 7 ], [ 0, 7, 0, 8, 1, 0, 7, 0, 1, 7, 1, 0, 5, 1, 5, 8, 3, 5, 6, 3, 6, 7, 6, 8, 2, 6, 3, 2, 3, 7, 5, 3, 5, 1, 2, 5, 4, 2, 2, 6, 4, 3, 4, 1, 4, 5 ], [ 0, 7, 2, 0, 0, 8, 6, 0, 4, 2, 7, 4, 0, 7, 4, 0, 3, 4, 3, 7, 5, 3, 5, 4, 5, 6, 3, 5, 3, 0, 1, 3, 1, 5, 1, 8, 6, 1, 2, 3, 2, 1, 2, 8, 4, 2, 6, 2, 4, 3 ], [ 0, 5, 0, 6, 4, 0, 5, 4, 0, 5, 1, 0, 2, 0, 3, 0, 1, 2, 3, 6, 1, 3, 1, 5, 2, 1, 4, 1, 2, 6, 2, 5, 3, 4 ], [ 0, 7, 4, 0, 0, 8, 1, 4, 1, 7, 4, 1, 0, 4, 1, 0, 1, 4, 2, 1, 3, 1, 5, 1, 5, 0, 6, 8, 2, 6, 2, 5, 3, 2, 4, 2, 3, 7, 3, 6, 4, 5 ], [ 0, 7, 0, 8, 1, 7, 5, 1, 6, 7, 6, 8, 5, 6, 8, 5, 1, 8, 1, 7, 5, 1, 3, 5, 3, 8, 2, 3, 2, 5, 2, 6, 2, 5, 3, 2, 4, 2, 6, 3, 6, 2, 4, 8, 0, 4 ], [ 2, 3, 0, 2, 4, 3, 5, 3, 4, 5, 2, 4, 5, 2, 1, 5, 0, 1, 0, 5, 4, 0, 1, 4, 6, 2, 6, 4, 1, 6 ], [ 0, 5, 2, 0, 0, 6, 1, 0, 1, 6, 1, 2, 4, 1, 3, 5, 3, 1, 3, 0, 2, 3, 2, 5, 4, 3, 4, 1, 4, 0 ], [ 0, 7, 2, 0, 0, 8, 5, 0, 6, 2, 5, 8, 5, 0, 5, 7, 1, 5, 3, 5, 3, 6, 3, 8, 4, 5, 1, 4, 6, 1, 6, 3, 6, 7, 1, 6, 1, 3, 2, 1, 4, 1, 2, 7, 2, 6, 4, 3 ], [ 1, 0, 0, 4, 2, 0, 3, 2, 1, 3, 1, 4, 2, 1, 0, 2, 3, 0, 5, 1, 5, 0, 3, 5 ], [ 5, 0, 5, 1, 4, 2, 2, 5, 4, 2, 0, 4, 3, 0, 3, 4, 1, 3, 1, 0, 1, 5 ], [ 0, 7, 1, 8, 2, 8, 2, 7, 6, 2, 3, 8, 1, 3, 5, 1, 4, 8, 4, 1, 2, 4, 6, 2, 2, 7, 0, 2, 3, 6, 3, 5, 2, 3, 0, 2, 5, 0, 1, 2, 1, 3, 4, 1, 5, 1, 4, 3 ], [ 0, 5, 1, 6, 2, 6, 3, 2, 3, 6, 3, 1, 0, 3, 2, 0, 2, 3, 2, 1, 4, 5, 4, 0, 4, 3, 4, 0 ], [ 3, 0, 6, 2, 6, 0, 2, 6, 4, 3, 4, 2, 3, 4, 1, 3, 7, 3, 5, 7, 5, 2, 1, 5, 1, 0, 7, 1, 7, 5 ], [ 2, 0, 1, 3, 4, 3, 1, 4, 0, 1, 4, 0, 5, 1, 2, 4, 5, 2, 6, 5, 6, 2, 6, 4, 0, 6, 2, 0, 2, 5 ], [ 0, 7, 0, 8, 2, 0, 1, 7, 1, 8, 5, 1, 6, 2, 5, 8, 5, 6, 3, 5, 4, 5, 4, 8, 4, 5, 2, 4, 1, 2, 3, 1, 3, 4, 6, 7, 6, 1, 6, 0 ], [ 0, 7, 3, 0, 0, 8, 6, 3, 5, 7, 5, 0, 5, 8, 1, 5, 2, 5, 2, 0, 2, 6, 3, 2, 4, 5, 4, 1, 4, 2, 4, 0, 1, 4, 1, 5, 3, 1, 6, 1, 3, 4, 6, 7 ], [ 1, 0, 3, 0, 4, 1, 3, 4, 3, 0, 1, 3, 5, 3, 2, 5, 2, 3, 4, 2, 5, 4, 1, 5 ], [ 0, 5, 0, 6, 4, 0, 2, 5, 2, 6, 2, 0, 1, 2, 3, 1, 3, 2, 3, 5, 1, 3, 1, 6, 4, 3, 4, 6, 4, 2 ], [ 0, 7, 5, 0, 0, 8, 2, 0, 4, 0, 4, 8, 7, 4, 0, 7, 5, 0, 3, 5, 1, 3, 1, 5, 3, 1, 3, 4, 2, 3, 2, 7, 2, 0, 6, 5, 6, 3, 6, 8 ], [ 0, 2, 5, 0, 3, 2, 4, 2, 3, 5, 0, 3, 4, 3, 1, 4, 6, 4, 0, 6, 1, 0, 5, 0, 6, 5, 1, 6 ], [ 0, 7, 1, 0, 0, 8, 2, 7, 3, 2, 3, 1, 0, 3, 6, 8, 5, 6, 5, 0, 3, 5, 3, 8, 1, 3, 1, 5, 2, 1, 4, 1, 2, 7, 2, 1, 4, 3, 4, 2, 4, 0, 6, 2, 6, 7, 6, 2 ], [ 4, 1, 5, 1, 4, 5, 0, 4, 2, 4, 2, 1, 0, 2, 5, 0, 3, 4, 3, 5, 2, 3, 2, 5 ], [ 0, 7, 1, 8, 5, 1, 2, 7, 3, 5, 3, 0, 4, 3, 5, 8, 1, 5, 2, 1, 6, 8, 6, 0, 2, 6, 2, 0, 3, 2, 6, 3, 6, 2, 4, 6, 4, 2, 4, 3, 5, 4, 5, 1, 6, 4 ], [ 1, 3, 0, 1, 0, 3, 1, 0, 2, 0, 5, 3, 2, 5, 4, 2, 4, 1, 2, 4, 5, 2, 5, 1 ], [ 3, 5, 4, 5, 4, 3, 1, 4, 3, 1, 0, 3, 2, 3, 2, 0, 2, 5 ], [ 0, 9, 4, 0, 1, 10, 7, 1, 7, 4, 1, 7, 8, 1, 9, 1, 4, 9, 4, 8, 1, 4, 3, 1, 6, 1, 2, 3, 5, 2, 6, 4, 6, 9, 2, 6, 8, 2, 8, 1, 0, 8, 0, 6, 0, 10, 2, 0, 2, 10, 3, 2, 3, 8, 5, 3, 5, 2, 7, 3, 7, 0, 5, 10 ], [ 0, 9, 2, 0, 0, 10, 0, 9, 6, 0, 3, 2, 1, 3, 7, 1, 6, 9, 6, 0, 7, 6, 8, 7, 8, 10, 1, 8, 1, 7, 1, 9, 2, 1, 5, 1, 3, 2, 4, 3, 4, 1, 5, 3, 4, 7, 4, 0, 2, 4, 8, 2, 3, 8, 3, 6, 5, 10, 5, 4 ], [ 2, 0, 0, 3, 1, 0, 4, 1, 4, 2, 1, 4, 0, 1, 2, 0, 5, 0, 5, 2, 5, 0 ], [ 4, 0, 3, 1, 5, 3, 5, 0, 1, 5, 1, 4, 0, 1, 2, 0, 3, 0, 4, 3, 2, 4, 5, 2, 5, 1 ], [ 0, 7, 0, 8, 5, 0, 6, 0, 7, 0, 1, 7, 1, 6, 2, 1, 4, 1, 2, 7, 5, 2, 5, 7, 1, 5, 4, 1, 3, 4, 3, 1, 3, 8, 3, 1, 4, 3, 6, 3, 4, 8, 6, 5, 6, 7 ], [ 0, 2, 3, 0, 5, 2, 1, 5, 1, 3, 4, 1, 4, 0, 3, 4, 1, 3, 1, 5, 0, 1, 3, 0, 3, 1 ], [ 4, 2, 0, 4, 0, 2, 6, 0, 6, 2, 0, 6, 1, 0, 3, 0, 5, 1, 5, 0, 1, 5, 3, 1, 6, 3, 6, 4 ], [ 0, 9, 6, 0, 0, 10, 7, 9, 4, 7, 4, 0, 7, 4, 7, 6, 1, 7, 10, 1, 0, 10, 3, 0, 3, 4, 3, 9, 3, 0, 2, 3, 8, 3, 8, 0, 8, 3, 8, 9, 1, 8, 2, 1, 2, 3, 2, 1, 5, 2, 5, 1, 5, 2, 6, 2, 5, 8, 6, 10, 6, 7 ], [ 1, 3, 5, 1, 5, 0, 5, 3, 1, 5, 0, 1, 4, 0, 6, 3, 6, 4, 2, 6, 2, 5, 2, 6, 4, 2, 6, 4, 6, 0 ], [ 2, 1, 4, 1, 5, 1, 6, 2, 4, 5, 4, 0, 3, 4, 3, 6, 0, 3, 5, 4, 2, 5, 6, 2, 0, 6 ], [ 0, 9, 3, 0, 0, 10, 7, 0, 0, 9, 2, 7, 2, 3, 1, 2, 1, 9, 1, 0, 7, 1, 7, 10, 3, 7, 6, 3, 5, 7, 5, 2, 5, 3, 4, 5, 4, 10, 8, 5, 8, 0, 8, 5, 8, 0, 2, 8, 6, 8, 6, 2, 6, 1, 3, 6, 3, 2, 4, 6, 4, 2 ], [ 0, 7, 6, 0, 0, 8, 7, 6, 2, 7, 5, 2, 3, 5, 1, 3, 4, 7, 5, 7, 4, 5, 2, 4, 1, 2, 0, 1, 4, 0, 4, 8, 1, 4, 3, 1, 3, 4, 2, 3, 2, 1, 5, 2, 6, 3, 2, 6, 5, 8 ], [ 1, 0, 5, 0, 4, 5, 1, 4, 2, 1, 3, 1, 3, 2, 3, 5 ], [ 0, 9, 8, 0, 0, 10, 1, 0, 1, 8, 6, 1, 3, 9, 4, 6, 5, 4, 7, 9, 5, 7, 5, 10, 4, 5, 4, 10, 4, 9, 0, 4, 0, 1, 2, 0, 2, 5, 2, 1, 7, 2, 0, 7, 3, 0, 8, 0, 6, 3, 6, 0, 6, 7, 8, 7, 8, 4 ], [ 0, 9, 5, 0, 0, 10, 0, 9, 2, 0, 1, 2, 1, 10, 4, 1, 6, 1, 6, 2, 3, 5, 7, 3, 7, 4, 6, 7, 6, 10, 1, 6, 1, 0, 2, 1, 7, 2, 7, 1, 3, 7, 8, 3, 8, 9, 8, 7, 3, 8, 3, 6, 4, 8, 4, 3, 4, 2, 5, 3, 5, 7 ], [ 0, 7, 1, 0, 0, 8, 6, 1, 3, 6, 3, 0, 2, 3, 4, 3, 4, 7, 2, 4, 0, 2, 4, 0, 4, 8, 3, 4, 3, 8, 1, 3, 1, 4, 5, 1, 6, 1, 5, 2, 6, 3, 5, 6, 5, 3, 6, 7 ], [ 3, 5, 2, 3, 1, 2, 4, 1, 4, 5, 0, 4, 6, 0, 6, 5, 2, 6, 1, 2, 6, 1, 2, 6, 3, 2, 0, 3, 7, 2, 7, 0, 7, 4 ], [ 0, 9, 3, 0, 0, 10, 6, 10, 8, 6, 9, 8, 0, 9, 7, 0, 5, 7, 4, 5, 4, 9, 4, 0, 5, 4, 1, 5, 1, 3, 2, 1, 2, 4, 2, 0, 2, 9, 1, 2, 8, 1, 7, 8, 7, 2, 7, 10, 3, 7, 3, 9, 5, 3, 6, 3, 6, 2, 8, 5, 8, 1, 6, 7 ], [ 0, 9, 4, 0, 0, 10, 5, 4, 3, 5, 1, 3, 2, 1, 7, 9, 7, 0, 9, 7, 2, 9, 6, 2, 6, 0, 5, 9, 1, 5, 1, 2, 1, 10, 0, 1, 6, 0, 8, 0, 4, 6, 4, 10, 7, 4, 3, 7, 3, 0, 2, 3, 5, 2, 5, 1, 8, 6, 8, 3, 8, 9 ], [ 0, 7, 3, 0, 0, 8, 5, 0, 3, 7, 6, 5, 6, 7, 4, 6, 4, 3, 6, 4, 5, 6, 5, 7, 5, 8, 0, 5, 1, 0, 2, 0, 1, 6, 1, 4, 1, 5, 2, 8, 2, 1, 3, 1, 3, 0, 2, 5 ], [ 0, 9, 3, 0, 0, 10, 3, 0, 1, 3, 6, 1, 8, 10, 8, 3, 6, 8, 6, 9, 6, 3, 1, 6, 5, 1, 5, 8, 2, 5, 2, 10, 2, 6, 2, 9, 0, 2, 4, 0, 7, 5, 7, 9, 7, 0, 8, 7, 8, 6, 1, 8, 1, 5, 4, 8, 4, 2, 4, 0 ], [ 5, 4, 5, 3, 4, 5, 1, 4, 1, 3, 1, 4, 0, 1, 2, 0, 6, 0, 6, 1, 7, 4, 7, 1, 2, 7, 2, 0, 5, 2, 5, 0, 6, 2, 6, 3 ], [ 0, 9, 0, 10, 3, 9, 6, 9, 6, 3, 7, 6, 1, 7, 1, 10, 0, 1, 4, 0, 5, 0, 4, 9, 4, 1, 4, 10, 2, 4, 2, 5, 2, 4, 3, 2, 8, 2, 3, 8, 3, 2, 5, 3, 6, 3, 6, 4, 8, 5, 8, 1, 7, 6, 7, 0, 8, 6 ], [ 1, 3, 1, 0, 2, 1, 4, 1, 2, 4, 3, 2, 3, 1, 0, 3, 4, 0, 4, 3 ], [ 4, 1, 2, 3, 2, 1, 4, 2, 5, 2, 4, 5, 3, 4, 6, 3, 6, 4, 0, 6, 0, 1, 5, 0, 5, 3, 5, 6 ], [ 0, 7, 0, 8, 2, 0, 0, 7, 4, 0, 6, 0, 2, 8, 4, 6, 5, 4, 5, 8, 2, 5, 1, 2, 1, 5, 1, 4, 6, 1, 3, 2, 3, 0, 3, 2, 3, 1, 6, 8, 6, 7 ], [ 0, 9, 0, 10, 5, 0, 3, 5, 7, 3, 9, 7, 4, 9, 4, 0, 10, 4, 5, 10, 2, 5, 6, 9, 6, 10, 5, 6, 5, 9, 0, 5, 1, 0, 2, 1, 3, 2, 3, 0, 4, 3, 4, 5, 1, 4, 8, 4, 7, 8, 7, 0, 7, 3, 1, 7, 2, 1, 8, 2, 6, 7, 6, 9, 8, 10 ], [ 0, 2, 6, 2, 3, 6, 3, 2, 1, 3, 0, 1, 5, 0, 7, 0, 4, 3, 4, 0, 7, 4, 1, 7, 1, 5, 3, 1, 3, 7, 5, 3, 6, 5, 3, 6 ], [ 0, 9, 1, 0, 0, 10, 5, 0, 7, 0, 6, 1, 2, 7, 4, 5, 6, 10, 6, 4, 1, 6, 5, 1, 2, 5, 9, 2, 1, 9, 2, 1, 3, 9, 3, 6, 4, 3, 2, 4, 0, 2, 3, 0, 7, 3, 8, 3, 8, 2, 7, 4, 7, 1, 8, 6, 8, 5 ], [ 0, 7, 0, 8, 4, 7, 5, 7, 2, 5, 0, 2, 5, 0, 4, 5, 2, 4, 2, 7, 5, 2, 4, 5, 6, 4, 6, 2, 6, 8, 1, 6, 1, 8, 1, 0, 3, 6, 3, 4, 3, 8 ], [ 0, 4, 1, 0, 3, 0, 1, 3, 2, 1, 4, 2, 4, 1 ], [ 0, 9, 0, 10, 3, 0, 6, 0, 1, 6, 5, 3, 7, 5, 9, 7, 3, 9, 3, 10, 3, 9, 0, 3, 2, 0, 6, 0, 2, 9, 2, 10, 2, 1, 4, 2, 8, 2, 8, 10, 5, 8, 6, 5, 6, 2, 4, 6, 4, 3, 7, 4, 6, 4, 7, 5 ], [ 0, 9, 2, 0, 0, 10, 0, 2, 3, 0, 9, 3, 2, 9, 10, 2, 7, 10, 7, 0, 8, 7, 10, 7, 3, 10, 8, 10, 4, 8, 4, 9, 3, 4, 3, 8, 2, 3, 4, 2, 4, 0, 1, 4, 6, 3, 5, 4, 6, 9, 6, 1, 6, 10, 5, 6, 5, 2, 8, 5, 8, 1, 7, 6, 7, 1 ], [ 0, 7, 1, 8, 3, 1, 1, 7, 4, 1, 0, 4, 5, 1, 2, 8, 0, 2, 5, 0, 6, 0, 3, 5, 3, 0, 4, 3, 4, 5, 4, 3, 1, 4, 2, 1, 2, 8, 2, 4, 6, 7, 6, 1, 6, 8 ], [ 0, 9, 0, 10, 4, 9, 7, 4, 3, 7, 8, 3, 5, 9, 8, 10, 2, 8, 6, 2, 4, 6, 0, 4, 2, 0, 3, 2, 1, 3, 5, 2, 5, 0, 5, 9, 1, 5, 7, 1, 8, 5, 8, 10, 3, 8, 4, 3, 4, 8, 6, 4, 6, 3, 7, 4, 7, 8 ], [ 0, 4, 1, 0, 6, 0, 3, 6, 5, 4, 1, 5, 1, 0, 2, 1, 5, 1, 2, 5, 3, 2, 6, 3, 6, 5 ], [ 0, 9, 1, 10, 8, 1, 2, 10, 7, 2, 4, 7, 6, 8, 6, 10, 2, 6, 2, 0, 1, 2, 1, 4, 0, 1, 3, 0, 3, 2, 4, 3, 7, 4, 4, 9, 6, 4, 5, 6, 5, 3, 5, 6, 0, 5, 0, 1, 7, 0, 8, 0, 7, 5, 8, 5 ], [ 0, 4, 6, 1, 4, 6, 3, 4, 0, 3, 0, 4, 3, 0, 5, 0, 1, 3, 2, 5, 2, 1, 5, 2, 7, 2, 7, 6, 5, 7 ], [ 3, 2, 6, 2, 3, 6, 3, 2, 4, 3, 6, 3, 4, 6, 0, 4, 1, 0, 5, 1, 5, 4, 1, 5, 1, 6, 0, 1, 6, 0, 6, 1 ], [ 0, 7, 2, 0, 0, 8, 0, 7, 4, 2, 4, 8, 3, 4, 3, 7, 3, 0, 1, 3, 5, 3, 5, 4, 5, 0, 5, 3, 1, 5, 1, 8, 1, 7, 2, 1, 6, 1, 6, 0, 4, 2, 4, 5, 5, 6 ], [ 0, 9, 1, 0, 0, 10, 9, 0, 8, 1, 1, 9, 1, 10, 4, 1, 6, 1, 3, 8, 2, 3, 6, 9, 6, 10, 6, 1, 0, 6, 5, 0, 4, 5, 4, 6, 2, 4, 8, 4, 8, 2, 5, 8, 3, 5, 3, 0, 3, 2, 5, 3, 5, 0, 7, 3, 7, 9, 7, 8, 7, 4 ], [ 1, 0, 0, 3, 2, 0, 4, 0, 1, 4, 2, 1, 4, 2, 4, 1 ], [ 0, 9, 0, 10, 1, 0, 6, 1, 3, 9, 2, 3, 4, 6, 4, 9, 4, 10, 7, 4, 5, 7, 5, 10, 5, 4, 6, 5, 0, 6, 1, 0, 8, 0, 1, 4, 1, 5, 2, 1, 7, 2, 7, 1, 7, 9, 2, 7, 6, 2, 6, 10, 3, 6, 3, 1, 8, 6, 8, 7, 8, 1 ], [ 0, 1, 4, 0, 6, 0, 7, 0, 7, 1, 2, 4, 4, 7, 3, 4, 5, 4, 2, 5, 2, 3, 4, 2, 3, 4, 5, 3, 6, 5, 7, 6, 7, 4 ], [ 0, 7, 2, 8, 4, 2, 8, 4, 5, 8, 5, 7, 4, 5, 0, 4, 6, 0, 6, 8, 1, 6, 1, 5, 1, 8, 0, 1, 0, 7, 2, 0, 3, 0, 3, 1, 6, 2, 3, 4, 3, 0, 6, 7 ], [ 3, 1, 3, 4, 1, 3, 4, 1, 2, 4, 0, 2, 0, 4 ], [ 0, 9, 0, 10, 4, 0, 7, 4, 3, 7, 5, 9, 5, 0, 4, 5, 10, 4, 1, 10, 1, 9, 7, 1, 2, 10, 7, 2, 6, 10, 7, 9, 1, 7, 2, 1, 3, 1, 8, 2, 8, 0, 3, 7, 2, 3, 2, 8, 4, 2, 6, 2, 4, 8, 5, 4, 6, 4, 5, 8 ], [ 0, 9, 1, 10, 5, 10, 1, 5, 0, 1, 5, 0, 4, 5, 6, 4, 6, 1, 4, 6, 9, 4, 0, 9, 3, 0, 2, 9, 8, 2, 3, 8, 3, 0, 8, 3, 2, 8, 2, 3, 1, 2, 6, 1, 7, 5, 7, 4, 7, 6, 5, 7, 8, 5, 8, 0, 6, 10 ], [ 4, 0, 1, 3, 2, 3, 4, 2, 5, 3, 4, 5, 1, 4, 0, 1, 2, 0, 5, 2, 5, 4 ], [ 3, 0, 2, 5, 2, 3, 4, 5, 0, 4, 6, 0, 2, 6, 0, 2, 1, 0, 3, 0, 3, 2, 4, 3, 1, 4, 6, 4, 1, 6 ], [ 0, 1, 2, 1, 5, 1, 0, 5, 3, 0, 4, 0, 6, 2, 3, 4, 3, 0, 4, 3, 2, 4, 5, 2, 6, 5, 6, 3 ], [ 0, 7, 3, 0, 0, 8, 1, 7, 5, 3, 0, 5, 4, 0, 0, 8, 1, 0, 4, 0, 1, 7, 2, 1, 2, 0, 5, 2, 5, 1, 4, 5, 2, 4, 2, 5, 3, 2, 6, 2, 6, 1, 6, 0, 3, 5, 3, 2 ], [ 0, 9, 0, 10, 6, 0, 2, 6, 2, 10, 7, 2, 1, 7, 8, 2, 1, 8, 9, 1, 2, 9, 2, 0, 5, 2, 8, 2, 4, 5, 4, 0, 8, 9, 8, 4, 1, 8, 1, 4, 3, 1, 7, 1, 3, 10, 6, 8, 3, 6, 3, 2, 5, 3, 5, 1, 7, 3, 7, 6 ], [ 1, 3, 1, 0, 2, 1, 4, 1, 4, 0, 2, 4, 3, 2, 3, 4 ], [ 0, 9, 2, 0, 0, 10, 6, 2, 2, 9, 4, 10, 4, 6, 7, 9, 8, 10, 4, 8, 4, 2, 0, 4, 1, 0, 3, 0, 1, 4, 1, 0, 1, 2, 3, 1, 8, 3, 5, 8, 6, 5, 6, 1, 3, 6, 3, 4, 5, 3, 7, 3, 5, 4, 7, 5, 7, 1, 8, 5, 8, 1 ], [ 0, 1, 2, 0, 4, 0, 1, 2, 4, 1, 3, 4, 3, 1, 3, 4 ], [ 0, 7, 1, 8, 3, 1, 3, 0, 5, 3, 4, 5, 5, 7, 2, 5, 2, 8, 4, 2, 4, 8, 4, 7, 0, 4, 6, 5, 0, 6, 5, 0, 5, 4, 1, 5, 1, 4, 1, 8, 3, 5, 3, 2 ], [ 0, 9, 1, 10, 7, 1, 4, 9, 5, 7, 4, 5, 3, 4, 3, 10, 5, 3, 7, 5, 2, 7, 2, 10, 2, 0, 2, 4, 6, 2, 7, 2, 6, 9, 6, 7, 1, 6, 8, 6, 8, 0, 8, 10, 8, 7, 1, 8, 3, 1, 3, 6, 4, 3, 8, 3, 5, 4, 5, 7 ], [ 0, 9, 4, 0, 0, 10, 3, 0, 1, 3, 8, 1, 8, 0, 5, 4, 8, 5, 1, 8, 0, 1, 0, 10, 4, 0, 4, 9, 3, 4, 6, 3, 5, 6, 2, 5, 7, 5, 7, 0, 7, 9, 7, 10, 2, 7, 3, 7, 3, 0, 2, 3, 2, 9, 6, 2, 3, 2, 6, 4 ], [ 0, 7, 3, 0, 0, 8, 2, 7, 0, 2, 6, 7, 6, 3, 0, 6, 1, 0, 3, 0, 1, 8, 2, 1, 2, 3, 5, 2, 4, 3, 4, 2, 4, 0, 4, 8, 1, 4, 6, 1, 3, 6, 3, 1, 5, 7, 5, 4 ], [ 0, 9, 0, 10, 6, 9, 2, 6, 0, 2, 6, 0, 8, 0, 4, 6, 4, 10, 7, 4, 8, 6, 1, 8, 5, 8, 5, 9, 4, 5, 7, 4, 7, 1, 3, 7, 3, 9, 3, 10, 1, 3, 2, 3, 2, 10, 2, 4, 1, 2, 1, 4, 5, 1, 2, 1, 6, 2, 5, 2, 6, 7 ], [ 0, 9, 0, 10, 7, 0, 5, 9, 5, 7, 8, 5, 6, 9, 2, 6, 2, 10, 3, 2, 4, 2, 3, 5, 3, 8, 4, 3, 0, 4, 0, 10, 1, 0, 6, 0, 1, 3, 8, 1, 2, 6, 5, 2, 7, 5, 7, 4, 7, 10, 8, 9, 8, 5 ], [ 0, 7, 3, 0, 1, 8, 6, 1, 2, 8, 6, 2, 6, 3, 6, 7, 1, 6, 0, 1, 0, 6, 4, 0, 5, 0, 3, 5, 3, 1, 4, 3, 3, 8, 2, 3, 4, 2, 2, 7, 4, 3 ], [ 0, 9, 0, 10, 6, 0, 8, 0, 3, 9, 4, 6, 8, 4, 7, 8, 2, 7, 2, 9, 10, 2, 3, 10, 3, 2, 4, 3, 1, 4, 1, 9, 5, 3, 5, 1, 5, 10, 0, 5, 0, 4, 2, 0, 2, 1, 6, 2, 8, 2, 6, 4, 6, 0, 7, 6, 7, 5, 8, 6 ], [ 1, 0, 3, 0, 2, 3, 2, 1, 2, 3, 1, 2, 4, 3, 4, 2, 1, 4 ], [ 0, 7, 1, 0, 0, 8, 0, 1, 5, 7, 5, 8, 3, 5, 0, 3, 2, 0, 4, 0, 2, 5, 2, 7, 2, 0, 1, 2, 4, 2, 6, 2, 3, 4, 1, 3, 1, 7, 3, 1, 3, 5, 4, 3, 4, 1, 6, 3, 6, 0, 6, 1 ], [ 1, 0, 3, 0, 2, 1, 4, 1, 6, 1, 2, 6, 5, 2, 4, 5, 6, 4, 3, 6, 5, 3, 2, 5, 2, 6, 0, 2, 5, 0, 5, 2 ], [ 0, 9, 0, 10, 3, 9, 7, 3, 7, 0, 9, 7, 1, 9, 6, 1, 9, 6, 1, 9, 8, 9, 8, 1, 10, 8, 0, 10, 0, 1, 2, 0, 3, 0, 3, 10, 1, 3, 2, 1, 2, 0, 6, 2, 6, 9, 6, 1, 4, 6, 4, 2, 4, 8, 4, 3, 5, 4, 5, 1, 5, 4, 6, 4, 8, 5, 7, 6, 7, 4, 8, 6 ], [ 0, 1, 4, 0, 3, 1, 5, 1, 5, 2, 6, 5, 3, 6, 0, 3, 6, 0, 2, 6, 7, 5, 2, 7, 4, 2, 7, 4, 2, 7 ], [ 1, 6, 1, 3, 2, 1, 7, 1, 5, 7, 4, 5, 4, 3, 2, 4, 0, 2, 0, 4, 5, 0, 5, 1, 4, 5, 7, 4, 7, 2, 3, 7, 6, 3, 6, 7, 6, 3 ], [ 4, 2, 6, 2, 0, 6, 1, 0, 3, 1, 5, 4, 5, 6, 0, 5, 0, 4, 5, 0, 4, 5, 6, 4, 1, 6, 3, 1, 7, 6, 7, 1, 3, 7 ], [ 0, 9, 3, 0, 0, 10, 9, 0, 2, 9, 5, 9, 2, 5, 2, 0, 4, 2, 6, 2, 3, 6, 8, 10, 8, 4, 2, 8, 0, 2, 1, 0, 7, 0, 3, 7, 3, 1, 4, 3, 5, 3, 6, 5, 4, 6, 4, 2, 1, 4, 7, 1, 6, 4, 6, 0, 1, 6, 1, 9, 5, 1, 5, 6, 7, 5, 8, 5, 8, 1, 7, 10 ], [ 0, 7, 0, 8, 2, 0, 4, 2, 2, 7, 5, 2, 6, 2, 3, 5, 8, 4, 0, 8, 6, 8, 2, 6, 4, 2, 4, 0, 5, 4, 5, 7, 5, 0, 1, 5, 1, 4, 1, 2, 3, 5, 3, 0 ], [ 3, 1, 1, 4, 0, 1, 5, 4, 2, 5, 2, 1, 3, 2, 1, 3, 5, 1, 0, 5, 0, 1, 0, 5 ], [ 5, 4, 2, 5, 0, 2, 6, 5, 0, 6, 2, 0, 1, 2, 3, 1, 3, 5, 1, 3, 4, 1, 6, 4, 2, 6, 4, 2, 4, 0 ], [ 1, 6, 1, 0, 2, 1, 3, 1, 3, 0, 7, 1, 2, 7, 2, 3, 6, 2, 4, 3, 4, 2, 7, 6, 5, 7, 5, 4, 3, 5, 0, 3, 0, 7 ], [ 3, 2, 0, 3, 1, 3, 1, 0, 1, 2, 0, 1, 4, 1, 0, 4, 2, 0, 4, 2, 4, 3 ], [ 0, 9, 8, 0, 1, 9, 1, 8, 2, 10, 2, 9, 4, 10, 5, 10, 2, 5, 3, 2, 3, 9, 3, 1, 0, 3, 0, 4, 5, 0, 8, 5, 8, 1, 8, 10, 4, 8, 4, 0, 4, 2, 6, 4, 7, 4, 6, 7, 6, 2, 6, 5, 7, 8, 4, 7 ], [ 2, 0, 0, 6, 2, 0, 1, 2, 1, 0, 4, 2, 5, 4, 1, 5, 7, 1, 7, 0, 5, 7, 4, 5, 3, 4, 3, 1, 3, 4 ], [ 0, 9, 6, 0, 0, 10, 5, 0, 8, 0, 9, 6, 0, 9, 0, 10, 4, 0, 4, 5, 7, 4, 3, 7, 8, 4, 6, 8, 3, 6, 3, 7, 3, 0, 1, 3, 8, 3, 8, 0, 1, 8, 1, 6, 1, 9, 2, 1, 8, 1, 2, 8, 5, 2, 5, 10, 7, 5, 7, 1, 8, 5 ], [ 0, 7, 6, 0, 0, 8, 5, 0, 3, 7, 4, 5, 4, 0, 2, 4, 2, 7, 0, 2, 1, 0, 1, 8, 1, 0, 3, 1, 3, 0, 3, 1, 4, 3, 6, 3, 5, 4, 5, 1, 6, 4, 5, 7, 6, 8 ], [ 0, 9, 0, 10, 1, 9, 8, 1, 4, 8, 8, 9, 2, 8, 6, 2, 7, 6, 7, 8, 0, 7, 0, 10, 4, 0, 5, 0, 3, 5, 4, 3, 4, 10, 1, 4, 6, 1, 5, 6, 2, 5, 2, 4, 1, 2, 1, 10, 3, 1, 7, 1, 7, 0, 3, 7, 6, 3, 6, 5, 8, 6, 8, 2, 7, 6 ], [ 0, 2, 3, 2, 6, 2, 4, 6, 3, 4, 1, 3, 0, 1, 6, 0, 7, 3, 7, 0, 6, 7, 3, 6, 1, 3, 4, 1, 5, 3, 5, 4, 5, 7 ], [ 0, 9, 0, 10, 0, 9, 6, 0, 7, 0, 2, 7, 10, 2, 4, 10, 4, 9, 4, 0, 1, 4, 8, 6, 6, 10, 7, 6, 7, 4, 2, 7, 2, 4, 1, 2, 1, 9, 3, 1, 6, 1, 6, 2, 3, 6, 3, 7, 5, 3, 6, 3, 5, 8, 5, 2 ], [ 0, 9, 8, 0, 0, 10, 6, 0, 9, 0, 2, 9, 2, 6, 5, 2, 2, 9, 4, 2, 1, 4, 7, 2, 3, 4, 7, 3, 5, 7, 5, 10, 1, 5, 6, 5, 1, 6, 1, 5, 0, 1, 3, 0, 6, 3, 6, 10, 7, 6, 7, 1, 8, 6, 8, 9, 8, 0 ], [ 4, 1, 5, 1, 2, 4, 2, 5, 2, 4, 2, 5, 0, 2, 7, 0, 3, 2, 3, 7, 2, 3, 4, 2, 6, 2, 5, 4, 3, 5, 6, 3, 0, 6, 7, 0, 7, 3 ], [ 0, 7, 1, 0, 0, 8, 3, 1, 2, 7, 2, 0, 5, 3, 5, 8, 5, 0, 4, 5, 4, 2, 4, 5, 1, 4, 1, 7, 3, 1, 6, 1, 3, 7, 3, 4, 6, 8, 6, 2, 6, 1 ], [ 0, 9, 1, 10, 7, 1, 8, 10, 5, 8, 5, 9, 8, 5, 9, 8, 2, 9, 3, 9, 2, 3, 2, 7, 8, 2, 1, 8, 6, 9, 6, 10, 6, 8, 6, 0, 1, 6, 4, 1, 3, 6, 3, 1, 4, 3, 5, 3, 4, 5, 4, 9, 7, 5, 7, 1, 7, 10 ], [ 3, 0, 4, 0, 1, 3, 5, 1, 5, 0, 7, 4, 5, 7, 3, 5, 4, 3, 4, 5, 7, 4, 6, 7, 6, 1, 2, 6, 2, 4, 2, 6, 2, 7 ], [ 0, 9, 4, 0, 0, 10, 3, 9, 0, 3, 0, 4, 2, 0, 5, 2, 0, 5, 2, 0, 10, 2, 7, 10, 0, 7, 1, 0, 4, 0, 6, 4, 6, 10, 6, 4, 8, 6, 8, 0, 8, 9, 1, 8, 1, 9, 1, 10, 2, 1, 3, 2, 5, 8, 5, 2, 5, 6, 3, 5, 3, 8, 4, 3, 4, 1, 5, 3 ], [ 0, 7, 1, 0, 0, 8, 5, 1, 0, 5, 1, 0, 3, 1, 2, 7, 2, 1, 6, 2, 4, 7, 4, 2, 5, 4, 3, 5, 3, 8, 1, 3, 5, 1, 5, 7, 2, 5, 2, 3, 4, 2, 4, 1, 6, 2, 6, 5, 6, 0 ], [ 0, 9, 0, 10, 1, 9, 2, 1, 0, 2, 6, 0, 4, 9, 7, 6, 4, 7, 3, 4, 3, 0, 3, 4, 3, 9, 7, 3, 8, 3, 2, 8, 2, 7, 2, 10, 6, 2, 7, 2, 6, 7, 6, 10, 1, 6, 1, 7, 4, 1, 5, 1, 4, 6, 5, 4, 5, 0, 8, 4, 5, 10, 8, 6 ], [ 0, 9, 1, 10, 3, 1, 2, 9, 5, 9, 5, 1, 0, 5, 0, 3, 6, 0, 8, 0, 6, 10, 6, 2, 5, 6, 4, 5, 7, 5, 7, 9, 7, 10, 2, 7, 4, 7, 2, 4, 2, 5, 1, 2, 1, 6, 3, 1, 3, 0, 8, 1, 4, 3, 4, 2, 8, 3, 8, 1 ], [ 0, 7, 2, 0, 0, 8, 1, 0, 5, 0, 6, 1, 3, 6, 4, 7, 1, 4, 1, 8, 4, 1, 6, 4, 3, 6, 2, 3, 5, 7, 5, 3, 6, 5, 6, 3, 0, 6, 0, 8, 2, 6, 2, 4 ], [ 0, 9, 0, 10, 1, 0, 2, 0, 4, 1, 9, 4, 1, 9, 4, 1, 6, 9, 10, 6, 1, 10, 7, 10, 2, 7, 1, 2, 3, 1, 5, 1, 8, 1, 5, 2, 4, 5, 6, 4, 0, 6, 8, 5, 8, 0, 8, 1, 2, 8, 2, 0, 3, 2, 7, 2, 3, 9, 3, 8, 5, 3, 5, 2, 7, 3, 7, 0 ], [ 0, 9, 1, 0, 0, 10, 2, 9, 2, 10, 1, 2, 6, 1, 6, 0, 3, 6, 5, 3, 5, 9, 5, 1, 5, 10, 1, 5, 4, 5, 4, 0, 1, 4, 2, 1, 3, 2, 3, 6, 8, 3, 8, 2, 8, 1, 6, 8, 6, 1, 7, 8, 7, 3, 7, 9, 7, 4 ], [ 0, 7, 0, 8, 5, 0, 1, 7, 3, 1, 3, 0, 3, 8, 2, 3, 4, 5, 6, 4, 6, 3, 4, 7, 1, 4, 6, 1, 0, 6, 0, 8, 2, 6, 2, 0, 5, 0, 5, 1, 4, 2, 4, 0, 5, 8 ], [ 0, 9, 5, 0, 0, 10, 2, 0, 0, 9, 1, 0, 8, 2, 8, 5, 10, 8, 3, 10, 6, 3, 1, 6, 5, 10, 4, 5, 4, 0, 1, 4, 1, 9, 2, 1, 2, 10, 2, 1, 3, 2, 7, 2, 4, 3, 6, 4, 6, 0, 7, 5, 7, 6, 7, 3, 8, 6, 8, 1 ], [ 0, 9, 3, 0, 3, 10, 9, 3, 4, 9, 4, 3, 4, 10, 7, 4, 9, 4, 0, 9, 1, 0, 2, 0, 7, 1, 2, 7, 2, 4, 0, 2, 7, 0, 5, 2, 6, 7, 6, 9, 1, 6, 5, 1, 5, 7, 5, 10, 3, 5, 6, 3, 6, 10, 8, 7, 8, 1, 8, 5, 8, 9 ], [ 0, 7, 5, 0, 0, 8, 2, 0, 7, 0, 1, 7, 4, 1, 4, 5, 3, 4, 3, 7, 3, 8, 1, 3, 1, 0, 2, 1, 5, 2, 5, 3, 6, 4, 5, 7, 2, 5, 1, 2, 6, 5, 2, 6 ], [ 4, 2, 3, 5, 2, 3, 0, 2, 0, 4, 0, 2, 1, 0, 4, 0, 1, 4, 5, 1, 3, 5, 3, 1 ], [ 0, 9, 0, 10, 6, 0, 7, 0, 1, 9, 4, 9, 2, 4, 1, 2, 1, 7, 3, 1, 5, 1, 8, 3, 5, 8, 7, 5, 5, 10, 7, 5, 8, 5, 7, 9, 0, 7, 4, 0, 3, 4, 2, 3, 2, 1, 6, 2, 8, 7, 3, 8, 3, 2, 4, 3, 4, 2, 6, 3, 6, 0 ], [ 0, 9, 0, 10, 3, 0, 1, 9, 2, 1, 7, 2, 3, 10, 6, 3, 4, 6, 4, 7, 7, 9, 1, 7, 2, 1, 2, 10, 2, 0, 3, 2, 3, 4, 5, 3, 6, 3, 6, 10, 6, 2, 0, 6, 5, 0, 5, 6, 5, 4, 1, 5, 1, 0, 7, 1, 8, 1, 7, 2, 8, 5, 8, 3, 8, 0 ], [ 0, 2, 1, 0, 6, 2, 0, 6, 3, 0, 7, 0, 5, 7, 4, 5, 1, 4, 1, 3, 4, 1, 5, 4, 7, 5, 3, 7, 3, 1, 3, 2 ], [ 0, 7, 1, 0, 1, 8, 2, 1, 3, 2, 3, 7, 4, 3, 5, 3, 8, 5, 2, 8, 5, 2, 4, 8, 4, 7, 5, 4, 5, 1, 0, 5, 0, 4, 0, 5, 2, 0, 2, 8, 3, 2, 6, 2, 3, 4, 6, 7, 6, 5, 6, 0 ], [ 0, 9, 1, 10, 0, 1, 3, 10, 5, 3, 8, 5, 9, 8, 2, 9, 4, 9, 4, 0, 3, 4, 10, 3, 2, 10, 5, 2, 6, 5, 5, 9, 1, 5, 8, 10, 7, 8, 7, 1, 7, 5, 0, 7, 8, 0, 8, 10, 2, 8, 2, 0, 3, 2, 3, 1, 4, 3, 4, 2, 6, 8, 6, 7, 6, 3 ], [ 0, 9, 4, 0, 0, 10, 6, 4, 6, 10, 7, 6, 8, 7, 0, 8, 4, 0, 4, 6, 2, 4, 1, 2, 5, 1, 5, 9, 5, 4, 5, 0, 1, 5, 1, 9, 1, 4, 2, 1, 8, 2, 3, 5, 3, 2, 3, 10, 3, 1, 6, 3, 6, 9, 7, 6, 7, 3, 8, 6, 8, 5 ], [ 0, 7, 1, 8, 6, 1, 3, 8, 3, 7, 0, 3, 0, 6, 0, 7, 1, 0, 2, 1, 4, 1, 4, 0, 2, 7, 5, 2, 6, 4, 2, 6, 3, 2, 3, 8, 1, 3, 6, 1, 6, 2, 5, 3, 4, 6, 4, 8, 5, 6, 5, 0 ], [ 0, 9, 0, 10, 7, 0, 2, 9, 2, 0, 1, 2, 8, 1, 6, 9, 6, 7, 1, 6, 5, 1, 8, 5, 8, 10, 8, 9, 0, 8, 2, 0, 7, 2, 7, 8, 7, 10, 1, 7, 6, 1, 6, 2, 3, 6, 3, 5, 3, 0, 4, 6, 4, 7, 4, 10, 4, 6 ], [ 0, 12, 7, 0, 0, 13, 3, 0, 5, 0, 4, 5, 8, 12, 11, 12, 4, 11, 4, 12, 4, 13, 0, 4, 0, 7, 1, 0, 9, 0, 5, 1, 8, 4, 8, 0, 5, 8, 5, 3, 1, 5, 6, 1, 10, 1, 6, 5, 7, 6, 9, 8, 2, 9, 2, 8, 2, 1, 3, 2, 3, 7, 6, 3, 6, 13, 7, 6, 10, 7, 10, 6, 10, 2, 11, 7, 9, 10, 9, 2, 11, 10, 11, 6 ], [ 1, 2, 4, 1, 5, 1, 6, 2, 6, 1, 4, 6, 0, 4, 0, 5, 3, 4, 3, 0, 5, 3, 7, 6, 7, 0, 5, 7, 3, 5, 6, 3, 6, 5 ], [ 0, 9, 0, 10, 2, 0, 3, 2, 3, 0, 3, 10, 2, 3, 6, 2, 4, 9, 1, 4, 1, 6, 1, 10, 7, 1, 1, 9, 2, 1, 7, 1, 6, 2, 7, 3, 4, 6, 4, 10, 4, 1, 5, 4, 8, 4, 5, 8, 4, 5, 6, 4, 7, 4, 8, 6, 8, 2 ], [ 0, 12, 3, 0, 0, 13, 9, 0, 12, 3, 2, 12, 9, 2, 7, 12, 11, 7, 11, 0, 9, 11, 1, 9, 1, 11, 1, 13, 4, 1, 10, 1, 3, 9, 8, 10, 8, 4, 2, 8, 3, 2, 10, 3, 10, 12, 10, 2, 0, 10, 8, 0, 8, 3, 4, 8, 7, 8, 4, 7, 4, 13, 2, 4, 7, 2, 5, 7, 5, 1, 6, 5, 6, 2, 5, 7, 11, 5, 6, 12, 6, 4, 11, 10 ], [ 0, 9, 8, 0, 0, 10, 8, 9, 1, 8, 1, 0, 1, 9, 2, 1, 4, 2, 4, 1, 3, 8, 5, 3, 4, 10, 6, 4, 5, 9, 5, 4, 5, 1, 3, 5, 6, 5, 3, 6, 3, 4, 0, 3, 0, 6, 2, 0, 2, 3, 2, 1, 7, 2, 7, 0, 8, 2, 7, 6, 8, 10 ], [ 1, 12, 2, 13, 2, 12, 3, 13, 1, 3, 8, 1, 11, 1, 10, 8, 5, 10, 4, 5, 4, 2, 10, 4, 7, 10, 7, 12, 3, 7, 3, 2, 3, 13, 2, 3, 6, 2, 9, 2, 6, 12, 6, 3, 6, 10, 4, 6, 0, 4, 9, 6, 8, 9, 8, 11, 8, 4, 0, 8, 11, 0, 5, 8, 5, 2, 5, 8, 1, 5, 9, 1, 9, 5, 7, 9, 10, 7, 10, 4, 11, 9, 11, 13 ], [ 0, 9, 6, 0, 0, 10, 0, 6, 1, 0, 3, 0, 5, 0, 1, 3, 2, 1, 5, 10, 7, 5, 8, 7, 8, 1, 2, 8, 4, 2, 4, 9, 5, 4, 3, 5, 6, 3, 2, 6, 3, 2, 3, 5, 7, 9, 7, 10, 7, 2 ], [ 0, 12, 10, 0, 1, 13, 7, 13, 9, 7, 12, 10, 1, 12, 2, 1, 5, 1, 11, 13, 9, 11, 9, 2, 6, 9, 5, 6, 12, 5, 0, 12, 9, 0, 1, 9, 4, 9, 6, 12, 6, 1, 7, 6, 7, 1, 2, 7, 10, 2, 3, 10, 3, 7, 3, 13, 11, 3, 11, 6, 4, 11, 4, 3, 5, 4, 10, 5, 0, 10, 0, 5, 2, 0, 2, 4, 8, 11, 8, 1, 8, 0 ], [ 0, 9, 0, 10, 2, 0, 1, 9, 1, 2, 4, 1, 8, 1, 10, 2, 0, 10, 5, 0, 8, 0, 3, 8, 3, 1, 6, 3, 7, 3, 4, 10, 4, 5, 4, 6, 2, 4, 6, 2, 6, 4, 8, 6, 8, 9, 3, 8, 5, 3, 5, 2, 7, 3, 5, 6, 7, 8, 7, 0 ], [ 1, 3, 0, 1, 5, 2, 7, 3, 4, 5, 4, 1, 4, 7, 2, 4, 2, 0, 7, 2, 7, 0, 3, 7, 5, 3, 5, 1, 6, 3, 6, 0, 6, 2, 6, 4, 5, 7 ], [ 0, 12, 2, 0, 0, 13, 4, 0, 7, 0, 9, 4, 2, 9, 8, 2, 8, 7, 12, 8, 2, 12, 2, 8, 6, 2, 9, 2, 3, 6, 9, 13, 9, 12, 0, 9, 1, 0, 10, 0, 11, 0, 1, 3, 7, 1, 7, 9, 7, 11, 1, 7, 4, 1, 4, 13, 3, 4, 11, 3, 10, 12, 5, 10, 5, 7, 5, 2, 5, 10, 3, 5, 3, 4, 6, 3, 6, 5, 6, 3, 8, 6, 8, 1, 11, 6, 11, 3 ], [ 0, 9, 1, 10, 3, 10, 5, 10, 3, 5, 7, 10, 2, 7, 2, 3, 7, 2, 7, 0, 6, 7, 6, 1, 6, 7, 2, 6, 2, 9, 3, 2, 3, 9, 4, 3, 4, 6, 1, 4, 1, 3, 1, 2, 0, 1, 8, 4, 1, 8, 0, 1, 0, 2, 5, 0, 1, 0, 5, 9 ], [ 6, 0, 8, 3, 4, 6, 7, 6, 5, 7, 9, 5, 8, 9, 4, 8, 0, 4, 1, 0, 9, 1, 2, 9, 2, 0, 8, 2, 3, 8, 7, 3, 5, 7, 5, 9 ], [ 0, 12, 11, 0, 0, 13, 1, 0, 3, 11, 3, 13, 4, 12, 1, 4, 8, 1, 7, 8, 5, 7, 9, 5, 10, 8, 2, 10, 2, 3, 11, 2, 11, 12, 6, 11, 6, 9, 3, 6, 3, 0, 1, 3, 7, 1, 7, 12, 7, 13, 2, 7, 10, 11, 10, 7, 5, 10, 5, 2, 0, 5, 0, 2, 4, 0, 9, 0, 9, 3, 6, 9, 6, 10, 4, 6, 4, 1, 8, 4, 8, 2, 6, 4 ], [ 0, 9, 0, 10, 7, 0, 4, 9, 3, 4, 7, 10, 1, 7, 1, 0, 1, 10, 1, 9, 0, 1, 4, 0, 8, 7, 4, 8, 6, 4, 6, 1, 2, 6, 2, 3, 2, 4, 5, 2, 6, 2, 6, 4, 3, 6, 3, 0, 3, 7, 5, 3, 8, 3, 5, 6, 5, 9, 8, 6 ], [ 0, 12, 5, 0, 0, 13, 0, 5, 0, 12, 1, 0, 4, 0, 8, 0, 1, 12, 1, 8, 3, 1, 4, 1, 10, 1, 10, 13, 7, 10, 11, 7, 11, 13, 4, 11, 4, 3, 2, 4, 5, 4, 9, 5, 9, 11, 7, 9, 2, 7, 2, 4, 10, 2, 10, 0, 5, 10, 5, 2, 7, 5, 8, 5, 6, 8, 7, 10, 3, 7, 3, 12, 8, 3, 8, 10, 6, 8, 6, 7, 11, 6, 11, 7, 9, 8, 9, 3 ], [ 0, 9, 4, 0, 0, 10, 1, 4, 3, 9, 0, 3, 6, 10, 5, 6, 7, 5, 7, 10, 7, 0, 7, 9, 1, 7, 1, 0, 1, 7, 4, 1, 6, 1, 2, 4, 8, 4, 6, 7, 8, 6, 8, 7, 8, 6, 2, 8, 3, 2, 3, 0, 3, 6, 5, 8, 5, 9, 5, 2 ], [ 0, 12, 3, 0, 0, 13, 10, 3, 4, 13, 8, 10, 7, 8, 6, 7, 4, 6, 9, 4, 9, 13, 8, 9, 3, 8, 3, 0, 3, 12, 6, 3, 10, 6, 3, 10, 8, 3, 8, 12, 9, 8, 9, 12, 7, 9, 7, 8, 7, 3, 2, 7, 5, 7, 5, 9, 5, 2, 5, 7, 2, 5, 1, 2, 4, 5, 2, 4, 10, 2, 10, 7, 1, 10, 1, 0, 6, 1, 11, 1, 6, 4, 11, 9, 10, 11 ], [ 0, 9, 0, 10, 1, 0, 4, 0, 0, 9, 6, 0, 7, 1, 3, 6, 10, 4, 2, 10, 2, 7, 2, 10, 4, 2, 7, 2, 6, 7, 5, 6, 5, 10, 5, 3, 5, 6, 3, 5, 4, 5, 3, 4, 1, 3, 1, 4, 6, 1, 6, 3, 7, 6, 7, 0, 8, 6, 8, 0, 8, 1, 8, 4 ], [ 0, 1, 3, 6, 2, 3, 0, 2, 1, 0, 1, 2, 1, 0, 4, 1, 4, 0, 4, 2, 7, 4, 7, 3, 4, 7, 5, 4, 5, 1, 5, 3, 5, 1, 6, 4, 6, 1 ], [ 0, 12, 1, 13, 4, 1, 2, 13, 2, 12, 2, 13, 2, 12, 3, 2, 5, 2, 3, 4, 0, 3, 8, 5, 8, 13, 9, 8, 9, 3, 4, 9, 4, 2, 4, 12, 3, 4, 3, 0, 6, 3, 6, 2, 7, 3, 6, 4, 0, 6, 1, 0, 1, 7, 11, 1, 11, 8, 11, 6, 11, 1, 7, 11, 7, 3, 7, 0, 8, 7, 5, 8, 10, 11, 10, 7, 10, 8, 10, 11, 5, 10, 5, 6, 9, 5, 9, 1, 10, 5 ], [ 6, 3, 0, 6, 1, 6, 0, 1, 7, 0, 8, 3, 8, 0, 2, 8, 4, 8, 4, 2, 5, 4, 9, 4, 5, 9, 1, 5, 7, 1, 9, 7, 9, 1 ], [ 2, 1, 3, 5, 1, 3, 0, 1, 4, 0, 8, 1, 9, 4, 6, 8, 2, 6, 4, 2, 9, 4, 7, 9, 7, 4, 7, 9, 0, 7, 6, 0, 6, 7 ], [ 2, 5, 3, 2, 6, 5, 6, 1, 2, 6, 7, 2, 8, 2, 4, 7, 0, 4, 9, 4, 9, 0, 8, 9, 0, 8, 3, 0, 1, 3, 9, 1, 9, 0 ], [ 0, 9, 6, 0, 1, 10, 2, 6, 4, 2, 10, 4, 3, 10, 5, 9, 3, 5, 6, 10, 3, 6, 2, 3, 4, 2, 6, 4, 2, 6, 2, 1, 5, 2, 8, 2, 7, 5, 5, 8, 5, 9, 0, 5, 1, 5, 1, 3, 8, 1, 8, 0, 4, 8, 4, 0, 7, 8, 7, 10, 7, 9 ], [ 5, 9, 2, 5, 4, 5, 6, 4, 7, 4, 7, 6, 8, 7, 1, 8, 2, 1, 6, 2, 0, 6, 3, 0, 3, 6, 9, 3, 9, 0 ], [ 0, 12, 11, 0, 0, 13, 5, 0, 2, 11, 6, 2, 8, 5, 8, 0, 5, 8, 11, 5, 4, 11, 4, 13, 3, 4, 1, 3, 10, 6, 7, 12, 1, 7, 1, 12, 10, 13, 10, 1, 11, 10, 0, 11, 2, 0, 7, 2, 7, 0, 3, 7, 3, 1, 4, 3, 4, 12, 2, 4, 2, 3, 5, 2, 9, 4, 9, 2, 9, 1, 6, 5, 9, 10, 6, 9, 6, 7, 8, 6, 8, 5, 9, 6 ], [ 0, 9, 6, 0, 0, 10, 1, 9, 0, 1, 5, 0, 7, 0, 5, 6, 5, 10, 2, 5, 2, 7, 1, 2, 3, 1, 4, 1, 3, 5, 3, 1, 4, 3, 7, 3, 4, 9, 4, 7, 6, 4, 6, 7, 6, 3, 8, 7, 8, 4, 8, 2, 8, 4 ], [ 3, 0, 4, 1, 2, 3, 2, 0, 3, 2, 3, 4, 3, 0, 1, 3, 4, 1, 3, 4, 2, 3, 4, 2, 5, 4, 5, 3, 4, 5 ], [ 0, 12, 0, 13, 1, 0, 1, 12, 4, 1, 4, 0, 9, 4, 11, 4, 5, 9, 13, 5, 0, 13, 6, 0, 10, 0, 10, 1, 2, 6, 11, 2, 3, 11, 10, 3, 8, 11, 9, 10, 12, 9, 2, 12, 8, 12, 8, 13, 3, 8, 5, 8, 5, 2, 11, 5, 9, 11, 4, 9, 4, 2, 1, 4, 3, 4, 2, 3, 1, 2, 6, 1, 7, 1, 7, 0, 6, 2, 6, 1, 7, 2, 7, 10 ], [ 0, 9, 3, 0, 0, 10, 9, 0, 1, 9, 8, 1, 2, 3, 6, 2, 4, 9, 4, 0, 4, 9, 2, 4, 1, 2, 5, 6, 5, 2, 10, 5, 1, 10, 3, 1, 7, 1, 3, 10, 7, 9, 7, 10, 3, 7, 0, 3, 0, 7, 5, 0, 5, 3, 6, 5, 8, 5, 6, 7, 6, 0, 8, 10, 8, 5 ], [ 0, 12, 1, 0, 0, 13, 3, 0, 11, 1, 2, 12, 4, 2, 3, 11, 1, 3, 7, 1, 4, 7, 2, 4, 8, 2, 8, 13, 1, 8, 1, 12, 0, 1, 4, 0, 7, 4, 7, 8, 5, 7, 5, 13, 6, 5, 6, 1, 10, 5, 6, 10, 11, 6, 11, 4, 10, 11, 10, 7, 10, 1, 2, 10, 2, 6, 3, 2, 3, 11, 5, 3, 5, 2, 9, 10, 9, 7, 9, 12, 9, 3 ], [ 2, 0, 1, 6, 0, 1, 6, 0, 4, 2, 4, 1, 2, 4, 3, 2, 5, 2, 3, 5, 5, 6, 3, 5 ], [ 0, 9, 0, 10, 9, 0, 1, 9, 3, 9, 3, 10, 1, 3, 8, 1, 4, 9, 4, 8, 5, 4, 5, 8, 2, 5, 7, 2, 7, 3, 6, 9, 6, 4, 0, 6, 1, 0, 6, 1, 2, 6, 5, 2, 8, 5, 4, 8, 4, 2, 7, 10 ], [ 1, 12, 11, 1, 3, 13, 8, 13, 12, 11, 4, 12, 3, 4, 1, 3, 1, 8, 11, 1, 2, 3, 6, 12, 5, 6, 9, 5, 5, 11, 2, 5, 12, 2, 0, 12, 0, 1, 8, 0, 12, 8, 0, 12, 5, 0, 7, 5, 9, 5, 6, 9, 6, 0, 6, 12, 2, 6, 7, 2, 10, 2, 8, 7, 8, 6, 4, 8, 4, 7, 9, 4, 10, 8, 10, 4, 9, 13, 11, 9, 11, 2, 10, 9 ], [ 0, 9, 5, 0, 1, 9, 1, 10, 8, 1, 3, 8, 6, 3, 4, 10, 4, 6, 5, 4, 8, 9, 0, 8, 5, 0, 1, 5, 1, 8, 2, 1, 2, 10, 1, 2, 3, 1, 7, 1, 3, 5, 6, 3, 7, 3, 7, 2, 6, 4, 6, 0 ], [ 0, 12, 0, 13, 0, 12, 1, 0, 4, 0, 5, 1, 3, 4, 2, 3, 13, 2, 1, 13, 8, 1, 11, 1, 5, 8, 4, 5, 3, 4, 10, 3, 11, 12, 11, 13, 1, 11, 2, 1, 2, 0, 2, 3, 4, 2, 4, 1, 5, 4, 10, 4, 5, 13, 3, 5, 7, 3, 9, 3, 10, 3, 6, 7, 6, 10, 6, 5, 9, 6, 8, 10, 9, 11, 7, 9, 7, 6, 8, 9, 8, 2 ], [ 0, 9, 0, 10, 8, 0, 1, 9, 6, 1, 6, 0, 6, 9, 8, 6, 8, 9, 2, 8, 2, 10, 2, 8, 3, 2, 5, 2, 7, 2, 3, 8, 4, 3, 4, 5, 1, 4, 1, 3, 0, 1, 0, 3, 4, 0, 4, 10, 5, 4, 5, 0, 5, 4, 7, 4, 6, 7 ], [ 2, 1, 0, 2, 3, 2, 3, 1, 4, 3, 4, 0, 4, 3, 2, 4, 0, 2, 5, 2, 5, 0, 5, 1, 5, 0 ], [ 2, 0, 8, 0, 7, 2, 8, 2, 1, 8, 4, 1, 3, 4, 6, 3, 5, 6, 7, 5, 7, 8 ], [ 0, 12, 0, 13, 3, 0, 9, 0, 8, 3, 3, 12, 5, 9, 5, 3, 1, 5, 13, 1, 2, 13, 6, 2, 4, 5, 6, 8, 4, 6, 7, 13, 7, 6, 1, 7, 4, 1, 10, 4, 4, 13, 3, 4, 0, 3, 10, 4, 0, 10, 1, 0, 1, 10, 2, 1, 11, 1, 2, 10, 2, 0, 5, 2, 6, 5, 9, 6, 8, 9, 8, 0, 8, 1, 7, 8, 7, 6, 9, 7, 9, 2, 11, 8, 11, 7, 11, 12 ], [ 0, 9, 7, 0, 0, 10, 3, 0, 2, 3, 4, 2, 4, 10, 0, 4, 1, 0, 8, 0, 6, 8, 8, 9, 7, 8, 6, 7, 6, 8, 1, 6, 1, 9, 8, 1, 2, 6, 2, 8, 4, 2, 4, 0, 3, 4, 3, 10, 5, 3, 7, 4, 7, 3, 5, 7, 5, 3, 5, 7, 7, 8 ], [ 2, 3, 1, 2, 3, 1, 4, 1, 2, 3, 5, 2, 4, 3, 6, 4, 5, 6, 0, 5, 0, 4, 6, 0, 7, 5, 7, 6, 7, 2 ], [ 0, 12, 2, 0, 3, 0, 0, 13, 8, 2, 11, 8, 11, 12, 11, 13, 11, 12, 4, 11, 10, 4, 10, 11, 9, 10, 7, 9, 6, 7, 6, 11, 7, 6, 8, 7, 4, 8, 0, 4, 6, 0, 6, 3, 7, 6, 10, 7, 10, 4, 8, 10, 8, 7, 1, 8, 5, 8, 5, 10, 5, 6, 5, 11, 1, 5, 3, 1, 2, 5, 2, 3, 9, 8, 9, 0, 9, 1 ], [ 0, 9, 4, 0, 0, 10, 8, 4, 3, 8, 6, 3, 0, 6, 0, 9, 1, 0, 3, 0, 6, 3, 9, 6, 3, 9, 3, 10, 4, 3, 4, 0, 1, 4, 8, 1, 2, 8, 2, 4, 5, 2, 5, 9, 7, 8, 7, 3, 7, 10, 2, 7, 2, 8, 5, 2, 6, 2, 5, 3, 6, 7 ], [ 0, 12, 7, 0, 1, 13, 11, 13, 6, 11, 6, 12, 7, 6, 13, 7, 1, 13, 1, 12, 3, 1, 5, 1, 2, 3, 5, 13, 7, 5, 3, 7, 3, 6, 4, 3, 10, 3, 9, 4, 9, 1, 2, 9, 4, 2, 4, 12, 10, 4, 11, 4, 11, 3, 0, 11, 10, 0, 10, 11, 0, 10, 2, 0, 8, 2, 8, 13, 9, 10, 9, 2, 6, 9, 6, 7, 8, 9, 8, 2 ], [ 0, 9, 3, 0, 0, 10, 2, 0, 7, 3, 3, 9, 3, 10, 8, 3, 4, 7, 4, 3, 6, 4, 1, 6, 8, 1, 8, 3, 8, 9, 0, 8, 2, 0, 2, 10, 1, 2, 5, 1, 4, 2, 1, 4, 1, 8, 5, 1, 5, 0, 7, 1, 6, 5, 6, 1, 7, 5, 7, 8 ], [ 2, 6, 4, 2, 4, 6, 1, 4, 0, 1, 0, 2, 7, 0, 3, 7, 5, 4, 3, 5, 0, 3, 1, 0, 1, 2, 5, 1, 5, 0, 7, 5, 7, 1 ], [ 3, 0, 5, 2, 5, 3, 6, 3, 1, 6, 1, 3, 2, 1, 4, 2, 2, 5, 1, 2, 0, 1, 6, 0, 4, 1, 4, 6 ], [ 3, 9, 1, 3, 4, 3, 4, 0, 8, 3, 5, 4, 2, 5, 2, 8, 1, 2, 8, 1, 0, 8, 9, 0, 7, 5, 6, 9, 7, 6, 7, 9 ], [ 0, 12, 0, 13, 0, 12, 4, 0, 5, 0, 9, 13, 10, 9, 5, 10, 5, 9, 5, 4, 7, 5, 11, 5, 7, 12, 7, 13, 4, 7, 4, 11, 4, 12, 10, 4, 1, 10, 1, 5, 1, 0, 9, 1, 6, 9, 8, 9, 8, 4, 2, 8, 2, 9, 3, 8, 2, 3, 2, 4, 3, 2, 3, 10, 6, 3, 11, 3, 11, 5, 11, 7, 6, 11, 6, 3, 8, 6, 8, 2, 11, 6 ], [ 0, 9, 0, 10, 2, 0, 3, 2, 9, 3, 0, 9, 4, 0, 7, 0, 10, 7, 3, 10, 8, 3, 4, 10, 3, 4, 3, 9, 2, 3, 5, 8, 6, 5, 6, 9, 6, 3, 2, 6, 1, 2, 1, 6, 8, 1, 5, 2, 5, 10, 7, 5, 7, 6, 7, 1, 4, 7, 4, 0, 8, 7, 8, 5 ], [ 0, 12, 0, 13, 5, 0, 9, 0, 1, 12, 6, 1, 13, 5, 0, 13, 9, 0, 10, 6, 7, 12, 3, 7, 8, 12, 9, 10, 6, 9, 6, 8, 6, 9, 5, 6, 5, 13, 11, 9, 11, 5, 10, 11, 10, 0, 10, 6, 1, 10, 1, 3, 2, 1, 4, 1, 2, 6, 2, 5, 2, 10, 3, 2, 3, 1, 3, 10, 4, 3, 11, 3, 11, 5, 4, 11, 4, 2, 7, 4, 7, 2, 11, 4 ], [ 7, 1, 4, 6, 4, 8, 0, 4, 0, 2, 1, 0, 3, 1, 5, 1, 3, 7, 2, 3, 7, 2, 6, 7, 5, 6, 8, 5, 8, 6 ], [ 0, 9, 1, 0, 0, 10, 6, 0, 7, 1, 5, 10, 6, 7, 5, 6, 0, 5, 6, 0, 2, 6, 1, 2, 1, 10, 8, 6, 4, 8, 7, 9, 3, 7, 3, 1, 8, 3, 8, 1, 7, 8, 7, 1, 2, 7, 2, 9, 3, 2, 5, 3, 5, 2, 4, 7, 4, 0, 4, 8 ], [ 6, 2, 6, 7, 2, 6, 0, 2, 0, 9, 7, 0, 5, 2, 9, 7, 1, 9, 8, 9, 1, 8, 3, 1, 4, 3, 5, 4, 8, 5, 8, 9 ], [ 3, 4, 5, 4, 5, 3, 6, 5, 6, 0, 6, 5, 0, 6, 3, 0, 1, 6, 1, 5, 7, 1, 2, 3, 2, 1, 7, 2, 7, 3 ], [ 0, 5, 5, 6, 2, 5, 2, 0, 4, 2, 4, 6, 1, 4, 1, 5, 3, 1, 7, 1, 3, 2, 0, 3, 7, 4, 0, 7 ], [ 7, 0, 9, 4, 8, 7, 3, 8, 3, 6, 3, 5, 6, 3, 5, 6, 1, 5, 4, 1, 2, 4, 8, 2, 8, 5, 9, 7, 9, 4 ], [ 1, 9, 4, 1, 6, 1, 7, 1, 3, 6, 4, 3, 2, 4, 0, 2, 5, 0, 8, 2, 5, 8, 7, 5, 8, 7, 0, 8, 6, 0, 4, 6, 3, 4, 9, 3, 9, 2 ], [ 0, 12, 3, 0, 1, 13, 11, 1, 12, 1, 2, 12, 3, 11, 3, 12, 5, 3, 4, 5, 4, 13, 7, 4, 2, 7, 10, 5, 10, 3, 9, 10, 8, 9, 2, 8, 0, 2, 0, 4, 5, 0, 10, 5, 4, 10, 7, 4, 8, 7, 11, 8, 11, 4, 6, 11, 9, 11, 9, 12, 9, 1, 6, 9, 6, 2, 6, 5, 7, 6, 7, 12, 8, 7, 8, 6, 9, 7 ], [ 0, 9, 4, 0, 0, 10, 2, 4, 1, 2, 1, 0, 4, 1, 4, 10, 7, 4, 5, 9, 5, 7, 6, 5, 6, 9, 2, 6, 0, 2, 1, 0, 2, 1, 3, 2, 3, 0, 3, 5, 3, 2, 6, 3, 7, 6, 8, 6, 8, 4, 8, 2, 8, 3, 7, 10, 7, 4 ], [ 0, 12, 0, 13, 6, 0, 10, 13, 10, 6, 11, 10, 12, 10, 0, 12, 1, 0, 8, 1, 7, 8, 7, 1, 7, 13, 7, 12, 1, 7, 2, 1, 2, 0, 4, 1, 9, 1, 5, 2, 9, 10, 8, 9, 2, 8, 4, 2, 6, 4, 5, 6, 5, 7, 9, 5, 8, 9, 3, 8, 3, 6, 3, 12, 4, 3, 6, 4, 6, 3, 11, 8, 2, 11 ], [ 4, 7, 0, 4, 3, 0, 1, 4, 8, 1, 3, 8, 5, 3, 2, 5, 6, 4, 2, 6, 0, 2, 1, 0, 6, 1, 8, 6, 8, 7 ], [ 0, 9, 8, 0, 1, 10, 8, 10, 7, 8, 5, 7, 4, 5, 4, 10, 1, 4, 5, 1, 9, 5, 2, 9, 3, 9, 7, 9, 4, 7, 4, 3, 0, 4, 3, 0, 2, 4, 2, 5, 3, 2, 6, 2, 5, 3, 0, 5, 0, 4, 6, 0, 8, 0, 8, 1, 6, 2 ], [ 2, 0, 4, 0, 5, 0, 8, 2, 6, 4, 3, 6, 3, 5, 1, 3, 7, 8, 7, 1, 3, 7, 4, 3, 2, 4, 5, 2, 6, 5, 8, 6, 8, 1 ], [ 0, 12, 1, 0, 0, 13, 5, 13, 1, 5, 6, 1, 10, 6, 10, 12, 10, 1, 9, 10, 9, 13, 6, 9, 0, 6, 0, 12, 3, 0, 7, 0, 7, 10, 7, 12, 7, 6, 4, 7, 4, 0, 8, 7, 11, 8, 11, 3, 11, 7, 4, 11, 8, 4, 8, 0, 1, 8, 2, 1, 2, 11, 2, 8, 2, 1, 3, 2, 5, 2, 5, 11, 5, 10, 3, 5, 3, 1, 9, 3, 5, 3, 9, 7 ], [ 2, 1, 3, 1, 0, 3, 0, 2, 5, 0, 6, 2, 4, 5, 4, 6, 3, 4, 6, 3, 6, 2 ], [ 0, 9, 0, 10, 5, 0, 7, 0, 0, 9, 5, 0, 8, 0, 10, 5, 2, 10, 2, 8, 2, 7, 4, 2, 4, 10, 1, 4, 1, 2, 1, 4, 8, 1, 8, 10, 3, 8, 6, 8, 3, 6, 3, 8, 3, 10, 5, 3, 5, 4, 6, 5, 6, 0, 6, 3, 7, 5, 7, 3, 7, 8 ], [ 0, 12, 2, 13, 9, 2, 5, 13, 6, 12, 4, 6, 4, 13, 3, 4, 3, 9, 12, 3, 1, 12, 7, 4, 7, 12, 1, 7, 1, 12, 4, 1, 4, 0, 6, 4, 0, 6, 0, 5, 8, 0, 9, 0, 10, 4, 11, 9, 10, 12, 10, 11, 7, 10, 9, 7, 9, 4, 5, 9, 11, 9, 11, 1, 11, 5, 3, 11, 2, 3, 8, 11, 8, 5, 8, 13, 2, 8, 2, 7, 6, 2, 8, 2, 6, 3 ], [ 0, 9, 1, 10, 8, 1, 7, 8, 7, 10, 9, 7, 2, 9, 3, 2, 5, 9, 5, 7, 2, 5, 4, 2, 6, 9, 0, 6, 0, 3, 6, 0, 6, 2, 6, 10, 3, 6, 8, 3, 8, 6, 1, 8, 1, 6, 7, 1, 2, 7, 2, 8, 3, 2, 3, 0, 4, 3, 5, 3, 5, 2, 4, 9, 4, 10 ], [ 0, 12, 0, 13, 7, 0, 5, 12, 9, 7, 4, 9, 13, 4, 6, 13, 3, 6, 3, 5, 8, 13, 1, 8, 1, 3, 1, 0, 4, 1, 11, 13, 11, 1, 2, 11, 2, 3, 2, 13, 5, 2, 8, 5, 4, 8, 0, 4, 0, 5, 6, 0, 7, 0, 6, 11, 9, 6, 7, 8, 9, 7, 9, 12, 8, 9, 8, 6, 10, 8, 11, 8, 10, 9, 7, 10, 11, 12 ], [ 0, 9, 1, 0, 0, 10, 3, 0, 0, 9, 2, 0, 7, 0, 1, 2, 1, 10, 7, 3, 4, 7, 4, 10, 4, 7, 1, 4, 2, 1, 6, 1, 8, 1, 5, 2, 6, 4, 6, 0, 2, 6, 7, 2, 5, 8, 7, 6, 3, 7, 3, 9, 5, 7, 8, 3, 5, 3, 8, 6, 8, 3 ], [ 2, 1, 3, 8, 4, 8, 6, 8, 9, 6, 7, 9, 2, 7, 2, 4, 7, 2, 6, 7, 4, 6, 9, 4, 3, 9, 0, 3, 5, 3, 0, 5, 0, 9, 1, 0, 5, 1, 5, 0 ], [ 0, 9, 2, 0, 0, 10, 3, 10, 4, 3, 4, 0, 7, 4, 7, 2, 4, 9, 1, 4, 8, 4, 5, 8, 5, 9, 7, 5, 7, 0, 1, 7, 1, 4, 2, 7, 2, 1, 3, 2, 3, 5, 3, 1, 5, 3, 5, 1, 6, 5, 6, 2, 6, 5, 8, 5, 6, 10, 8, 7, 8, 3 ], [ 5, 2, 3, 5, 2, 3, 1, 2, 6, 1, 4, 2, 4, 6, 0, 4, 6, 0, 6, 4 ], [ 1, 2, 2, 4, 7, 2, 8, 7, 8, 2, 7, 8, 0, 7, 3, 0, 5, 3, 1, 5, 9, 7, 6, 9, 6, 1, 5, 6, 9, 5, 9, 1 ], [ 1, 3, 6, 3, 1, 6, 0, 1, 2, 1, 5, 1, 4, 5, 4, 3, 2, 4, 0, 2, 5, 0, 6, 5, 2, 6 ], [ 5, 1, 5, 6, 3, 5, 6, 3, 0, 6, 4, 0, 9, 6, 7, 9, 4, 7, 2, 4, 8, 4, 2, 8, 7, 2, 8, 7, 8, 9, 1, 8, 5, 1, 5, 8 ], [ 6, 5, 7, 5, 0, 7, 6, 7, 2, 6, 9, 6, 0, 9, 1, 0, 3, 0, 8, 0, 8, 2, 4, 8, 1, 4, 3, 1, 4, 3, 2, 4, 9, 2, 9, 1 ], [ 1, 0, 0, 4, 3, 0, 5, 0, 6, 1, 2, 3, 5, 4, 6, 5, 2, 6, 1, 2, 6, 1, 3, 6, 3, 5, 2, 3, 0, 2, 0, 6 ], [ 1, 4, 7, 4, 3, 7, 5, 3, 2, 5, 6, 5, 6, 2, 0, 6, 1, 0, 2, 1, 2, 7 ], [ 7, 0, 2, 6, 3, 6, 4, 6, 3, 4, 2, 3, 5, 2, 8, 5, 8, 2, 1, 8, 1, 7, 4, 1, 0, 4, 7, 0, 7, 8, 3, 7, 5, 3, 5, 7 ], [ 5, 3, 7, 3, 4, 8, 3, 4, 2, 3, 7, 2, 5, 9, 5, 3, 8, 5, 1, 8, 9, 1, 6, 7, 0, 6, 0, 2, 0, 8, 9, 7 ], [ 5, 9, 7, 5, 7, 1, 3, 7, 8, 3, 4, 7, 2, 4, 9, 2, 0, 9, 6, 0, 8, 6, 1, 8, 4, 1, 3, 4, 3, 9 ], [ 2, 1, 1, 4, 0, 1, 3, 1, 5, 1, 6, 3, 0, 6, 7, 5, 0, 7, 5, 0, 7, 5, 2, 7, 3, 2, 6, 3, 6, 7 ], [ 5, 8, 4, 5, 3, 4, 1, 3, 1, 2, 0, 1, 6, 4, 7, 6, 0, 7, 3, 0, 6, 3, 2, 6, 7, 2, 7, 8 ], [ 3, 1, 6, 1, 5, 3, 8, 3, 2, 8, 5, 6, 4, 5, 0, 4, 0, 2, 7, 5, 0, 7, 6, 0, 7, 6, 4, 7, 2, 4, 2, 8 ], [ 1, 2, 1, 0, 6, 1, 3, 4, 7, 4, 6, 7, 0, 6, 2, 0, 3, 0, 3, 1, 7, 2, 3, 4, 2, 3, 2, 0, 5, 7, 5, 1, 5, 3, 5, 7 ], [ 2, 0, 4, 0, 5, 0, 1, 4, 5, 1, 3, 4, 6, 5, 3, 6, 2, 3, 1, 2, 6, 1, 6, 3 ], [ 4, 5, 8, 5, 4, 8, 0, 4, 3, 4, 6, 4, 2, 6, 3, 2, 0, 3, 6, 0, 1, 6, 2, 1, 7, 2, 7, 6, 8, 7, 8, 2 ], [ 7, 0, 4, 7, 2, 4, 5, 2, 1, 5, 6, 4, 6, 1, 3, 6, 0, 3, 7, 0, 7, 6 ], [ 2, 3, 4, 2, 4, 3, 5, 3, 5, 2, 0, 5, 6, 0, 1, 5, 1, 4, 0, 1, 6, 0, 4, 6, 1, 4, 2, 1, 6, 2, 6, 0 ], [ 2, 0, 3, 1, 3, 8, 1, 3, 8, 1, 0, 8, 5, 0, 7, 0, 6, 5, 2, 6, 4, 2, 9, 2, 7, 9, 4, 7, 6, 4, 9, 6, 9, 5 ], [ 6, 0, 3, 6, 4, 3, 5, 3, 4, 5, 1, 4, 2, 4, 2, 1, 2, 6, 0, 2, 5, 0, 5, 2 ], [ 6, 3, 2, 6, 4, 6, 5, 6, 5, 2, 5, 4, 2, 5, 1, 2, 1, 0, 7, 2, 1, 7, 4, 1, 0, 4, 8, 0, 9, 2, 9, 0, 8, 9, 7, 8, 7, 9 ], [ 7, 2, 3, 7, 1, 3, 6, 1, 4, 3, 5, 4, 0, 5, 0, 6, 2, 0, 1, 2, 6, 1, 6, 7 ], [ 4, 6, 3, 4, 3, 6, 0, 3, 1, 3, 2, 1, 5, 2, 0, 5, 4, 0, 4, 3 ], [ 3, 7, 3, 5, 3, 9, 5, 3, 7, 5, 9, 7, 0, 9, 1, 0, 4, 0, 6, 0, 4, 6, 8, 4, 2, 8, 1, 2, 1, 9, 2, 1, 6, 2, 6, 1 ], [ 5, 8, 6, 5, 9, 8, 9, 5, 7, 9, 3, 7, 1, 3, 4, 1, 2, 4, 0, 2, 6, 0, 6, 9 ], [ 2, 0, 3, 0, 1, 2, 6, 1, 4, 2, 3, 4, 1, 3, 5, 1, 7, 6, 5, 7, 6, 5, 7, 6, 7, 3 ], [ 4, 2, 0, 4, 2, 6, 4, 2, 3, 4, 8, 3, 8, 4, 5, 8, 1, 5, 7, 5, 1, 7, 0, 1, 7, 0, 3, 7, 3, 8 ], [ 4, 1, 6, 1, 2, 3, 2, 1, 4, 2, 3, 4, 6, 3, 0, 6, 5, 4, 5, 3, 0, 5, 0, 6 ], [ 8, 7, 8, 9, 3, 8, 2, 3, 7, 2, 9, 7, 4, 9, 5, 4, 6, 5, 1, 6, 0, 1, 0, 9 ], [ 1, 3, 6, 1, 2, 3, 5, 3, 2, 5, 4, 2, 4, 6, 1, 4, 6, 1, 0, 6, 5, 0, 5, 6 ], [ 2, 7, 5, 2, 8, 2, 4, 8, 1, 4, 6, 5, 3, 6, 3, 1, 0, 3, 6, 0, 4, 6, 4, 8, 1, 4, 5, 1, 7, 5, 3, 7, 3, 4 ], [ 1, 5, 2, 1, 4, 1, 4, 2, 0, 4, 3, 4, 0, 3, 2, 0, 3, 2, 3, 4, 5, 3, 5, 1, 5, 3 ], [ 6, 5, 4, 6, 7, 4, 7, 5, 4, 7, 0, 4, 2, 4, 2, 6, 0, 2, 1, 0, 3, 0, 1, 3, 1, 5, 7, 1, 3, 7, 3, 2, 3, 7 ], [ 3, 0, 5, 0, 7, 0, 5, 2, 4, 3, 6, 4, 7, 5, 3, 7, 1, 3, 8, 3, 1, 8, 4, 1, 8, 4, 6, 8, 2, 6, 2, 8 ], [ 2, 1, 4, 2, 7, 2, 5, 7, 5, 4, 3, 5, 6, 3, 8, 3, 8, 6, 9, 7, 8, 9, 1, 8, 9, 1, 0, 9, 4, 0, 6, 4, 6, 9 ], [ 0, 12, 2, 0, 0, 13, 6, 13, 1, 6, 7, 12, 7, 0, 7, 2, 3, 7, 2, 3, 10, 7, 5, 10, 9, 5, 8, 9, 8, 12, 9, 8, 2, 9, 2, 0, 3, 2, 6, 3, 4, 6, 4, 8, 4, 6, 4, 7, 5, 4, 5, 9, 5, 1, 6, 5, 11, 5, 9, 6, 9, 2, 10, 9, 10, 3, 10, 4, 11, 9, 11, 4 ], [ 0, 1, 3, 5, 1, 3, 0, 1, 2, 0, 4, 0, 4, 5, 2, 4, 0, 2, 4, 0, 1, 4, 3, 1, 2, 3, 5, 2, 5, 1 ], [ 3, 4, 3, 0, 4, 3, 5, 3, 6, 3, 7, 5, 7, 4, 7, 6, 7, 4, 1, 7, 2, 7, 0, 2, 6, 0, 1, 6, 5, 1, 5, 6, 5, 7, 0, 5, 6, 0, 4, 6, 1, 4, 2, 1, 2, 5 ], [ 3, 0, 1, 2, 6, 2, 4, 6, 4, 2, 1, 4, 5, 1, 3, 5, 0, 3, 0, 4, 6, 0, 5, 6, 1, 5, 6, 1, 4, 6, 3, 4, 5, 3, 0, 5, 4, 0, 2, 4, 2, 6 ], [ 3, 0, 1, 3, 2, 5, 0, 2, 1, 0, 4, 1, 4, 0, 5, 4, 3, 5, 1, 3, 2, 1, 4, 2, 3, 4, 5, 3, 5, 4, 5, 0 ], [ 1, 6, 2, 1, 0, 2, 0, 1, 2, 0, 7, 0, 6, 2, 3, 6, 4, 7, 5, 4, 5, 1, 6, 5, 2, 6, 2, 3, 4, 2, 3, 4, 7, 3, 7, 2, 7, 3, 7, 2 ], [ 3, 5, 4, 3, 4, 5, 3, 4, 0, 3, 0, 5, 1, 3, 0, 1, 2, 3, 0, 2, 0, 5, 1, 0, 2, 1, 4, 2, 4, 0 ], [ 4, 5, 0, 4, 6, 4, 6, 5, 4, 6, 2, 4, 7, 4, 7, 5, 2, 7, 0, 2, 0, 7, 1, 0, 3, 0, 3, 4, 3, 1, 0, 3, 1, 0, 2, 0, 1, 2, 7, 1, 7, 2 ], [ 2, 1, 1, 3, 4, 3, 2, 4, 1, 2, 4, 1, 2, 4, 0, 2, 0, 1, 0, 2, 0, 3, 4, 0, 5, 4, 5, 2, 5, 0, 5, 4 ], [ 6, 1, 7, 1, 2, 7, 4, 2, 3, 6, 5, 4, 3, 5, 7, 3, 0, 7, 0, 3, 2, 0, 4, 2, 6, 4, 6, 7 ], [ 3, 0, 7, 0, 2, 7, 2, 3, 2, 1, 0, 2, 0, 3, 6, 0, 7, 0, 1, 7, 1, 2, 7, 1, 5, 6, 5, 0, 6, 7, 4, 6, 4, 5, 3, 4, 5, 3, 5, 6 ], [ 0, 4, 2, 4, 1, 2, 1, 4, 2, 1, 3, 1, 6, 2, 0, 6, 3, 0, 3, 4, 5, 3, 6, 3, 5, 6, 2, 5, 0, 2, 0, 6, 5, 0, 6, 5, 6, 2 ], [ 4, 2, 0, 4, 5, 0, 1, 5, 3, 1, 3, 0, 1, 3, 5, 1, 4, 5, 2, 4, 2, 5 ], [ 3, 1, 3, 2, 1, 3, 5, 3, 4, 5, 4, 3, 1, 4, 2, 1, 2, 4, 0, 2, 0, 1, 0, 4, 5, 0, 5, 2, 5, 0 ], [ 5, 1, 5, 3, 5, 1, 0, 5, 0, 1, 4, 0, 4, 1, 2, 4, 2, 0, 3, 5, 3, 4, 0, 3, 2, 0, 4, 2, 4, 0 ], [ 5, 1, 5, 3, 1, 5, 1, 3, 5, 1, 0, 5, 4, 0, 2, 4, 2, 3, 7, 2, 6, 5, 6, 2, 7, 5, 6, 7, 0, 6, 2, 0, 4, 2, 7, 4, 7, 3 ], [ 0, 1, 4, 0, 7, 1, 2, 7, 2, 4, 2, 0, 5, 2, 7, 2, 3, 5, 6, 3, 4, 7, 5, 4, 5, 6 ], [ 4, 2, 8, 2, 6, 8, 2, 6, 5, 2, 7, 2, 3, 5, 3, 7, 0, 3, 1, 3, 4, 1, 0, 4, 8, 0, 1, 8, 4, 1, 7, 4, 5, 7, 5, 8 ], [ 5, 0, 4, 3, 3, 7, 3, 0, 1, 3, 1, 0, 5, 1, 2, 5, 2, 1, 2, 4, 2, 5, 2, 0, 5, 2, 6, 2, 3, 5, 4, 3, 6, 3, 6, 5, 6, 1, 6, 5, 4, 6, 4, 3, 4, 2, 7, 4, 7, 3, 6, 4, 7, 4 ], [ 5, 0, 1, 2, 1, 4, 1, 3, 0, 1, 5, 2, 5, 0, 4, 5, 3, 4, 5, 6, 5, 0, 1, 5, 1, 0, 2, 1, 3, 1, 3, 0, 3, 1, 2, 5, 4, 2, 4, 3, 6, 3, 6, 2, 4, 5 ], [ 3, 2, 8, 2, 3, 8, 4, 8, 6, 4, 6, 3, 5, 6, 0, 5, 7, 6, 1, 7, 0, 1, 4, 0, 7, 4, 7, 8, 1, 7, 3, 1, 5, 3, 5, 7 ], [ 1, 6, 0, 1, 4, 2, 0, 4, 1, 0, 4, 1, 4, 0, 4, 1, 3, 4, 5, 3, 5, 0, 2, 5, 2, 6, 5, 2, 3, 5, 3, 4, 3, 1, 5, 3, 5, 4, 6, 5, 6, 2, 6, 5, 7, 5, 7, 4, 7, 3 ], [ 3, 1, 2, 4, 0, 2, 4, 0, 5, 0, 3, 4, 3, 5, 4, 3, 5, 4, 5, 3, 1, 5, 2, 1, 2, 5, 4, 2, 1, 4, 1, 5 ], [ 0, 2, 4, 0, 4, 2, 0, 4, 3, 0, 3, 2, 0, 3, 1, 0, 5, 0, 1, 5, 0, 1, 3, 0, 5, 3, 5, 0, 4, 5, 1, 4, 1, 3, 2, 1, 2, 5 ], [ 2, 4, 2, 0, 3, 2, 2, 4, 0, 2, 3, 2, 3, 4, 3, 0, 2, 3, 1, 2, 5, 2, 5, 1, 5, 2, 0, 5, 1, 0, 1, 2, 1, 5 ], [ 1, 0, 3, 0, 2, 1, 1, 3, 4, 1, 5, 3, 5, 2, 1, 5, 4, 1, 4, 3, 0, 4, 2, 0, 2, 4, 5, 2, 5, 0, 5, 1 ], [ 8, 3, 6, 8, 5, 6, 4, 5, 7, 4, 1, 7, 2, 1, 0, 2, 0, 8 ], [ 0, 2, 3, 2, 1, 3, 7, 1, 8, 3, 8, 7, 0, 8, 4, 0, 6, 0, 5, 6, 4, 5, 7, 4, 6, 7, 6, 8, 1, 6, 5, 1, 5, 6 ], [ 4, 3, 4, 2, 3, 4, 3, 2, 7, 3, 5, 4, 6, 4, 6, 3, 6, 7, 6, 3, 6, 5, 1, 6, 2, 6, 7, 2, 0, 7, 5, 7, 1, 5, 0, 1, 0, 6, 0, 1, 7, 0, 5, 7, 1, 5, 1, 7 ], [ 7, 0, 3, 2, 5, 2, 0, 5, 8, 2, 3, 8, 4, 3, 6, 3, 6, 0, 6, 7, 5, 6, 8, 5, 1, 8, 7, 1, 4, 8, 4, 0, 1, 4, 3, 1, 8, 3, 8, 1, 7, 5, 7, 0 ], [ 1, 0, 0, 3, 5, 0, 4, 3, 6, 5, 6, 1, 0, 6, 5, 0, 1, 5, 4, 1, 4, 3, 1, 4, 2, 1, 2, 5, 2, 1, 6, 2, 6, 1 ], [ 2, 7, 2, 1, 7, 2, 8, 2, 3, 7, 5, 7, 3, 5, 4, 3, 0, 4, 6, 3, 6, 8, 1, 6, 8, 1, 0, 8, 5, 0, 4, 5, 4, 8 ], [ 0, 2, 3, 0, 5, 0, 8, 2, 4, 3, 4, 0, 5, 3, 1, 5, 7, 1, 6, 4, 6, 2, 8, 4, 8, 1, 5, 8, 4, 5, 6, 4, 3, 6, 3, 8, 7, 4, 7, 1, 7, 4 ], [ 0, 3, 4, 0, 7, 3, 5, 4, 5, 0, 4, 5, 2, 4, 6, 4, 7, 6, 1, 7, 1, 2, 6, 1, 2, 6, 2, 7 ], [ 0, 6, 1, 0, 2, 1, 1, 8, 1, 5, 2, 1, 3, 6, 1, 3, 4, 8, 7, 1, 9, 1, 2, 9, 7, 3, 7, 1, 4, 5 ], [ 2, 0, 4, 0, 6, 0, 3, 4, 3, 0, 4, 3, 4, 2, 3, 4, 2, 3, 1, 2, 6, 4, 1, 6, 1, 3, 5, 1, 6, 1, 5, 2, 5, 6, 2, 5, 2, 6 ], [ 4, 0, 6, 0, 3, 4, 6, 4, 1, 6, 5, 1, 8, 5, 3, 8, 2, 3, 7, 2, 7, 8 ], [ 2, 4, 3, 2, 1, 3, 4, 3, 2, 4, 0, 2, 0, 3, 0, 2, 5, 0, 1, 5, 1, 0, 4, 1, 5, 4, 5, 1, 5, 2, 5, 4 ], [ 1, 9, 5, 1, 3, 5, 4, 3, 6, 4, 2, 6, 7, 2, 0, 7, 8, 0, 8, 9 ], [ 4, 2, 1, 4, 0, 1, 3, 0, 5, 4, 5, 2, 4, 5, 2, 4, 5, 2, 1, 5, 1, 3, 0, 1, 3, 0, 3, 1, 0, 3, 0, 5 ], [ 7, 1, 7, 0, 3, 4, 4, 6, 8, 4, 2, 8, 2, 0, 2, 7, 3, 2, 5, 3, 5, 2, 1, 5, 8, 1, 8, 2, 3, 6, 3, 1, 7, 3, 8, 3, 0, 8, 4, 0, 7, 0, 5, 4, 5, 8 ], [ 0, 2, 3, 0, 4, 2, 1, 4, 1, 3, 5, 2, 0, 5, 0, 2, 4, 0, 4, 1, 3, 4, 3, 1, 3, 4, 5, 3, 1, 5, 1, 3, 1, 5 ], [ 1, 2, 3, 2, 4, 2, 4, 1, 6, 2, 7, 2, 4, 6, 7, 4, 5, 7, 3, 5, 0, 3, 0, 4, 3, 0, 5, 3, 1, 5, 6, 1, 7, 6, 7, 0, 1, 7, 5, 1, 6, 5, 3, 6, 4, 3, 4, 7 ], [ 0, 8, 7, 8, 1, 7, 0, 1, 7, 0, 4, 7, 2, 4, 6, 7, 5, 6, 3, 5, 2, 3, 6, 2, 1, 6, 3, 1, 5, 3, 4, 5, 4, 8 ], [ 1, 5, 2, 1, 3, 1, 4, 1, 4, 2, 4, 5, 0, 4, 0, 1, 2, 4, 0, 2, 5, 0, 2, 5, 3, 2, 5, 3, 5, 2 ], [ 2, 1, 0, 2, 1, 0, 5, 0, 2, 1, 2, 0, 4, 2, 4, 1, 3, 4, 5, 4, 3, 5, 4, 3, 5, 4, 5, 2 ], [ 7, 1, 8, 7, 5, 8, 3, 5, 0, 3, 4, 0, 2, 4, 6, 2, 6, 8 ], [ 8, 3, 5, 8, 0, 5, 4, 0, 2, 4, 7, 2, 1, 7, 6, 1, 6, 8 ], [ 4, 0, 3, 1, 4, 1, 2, 3, 2, 4, 5, 2, 5, 6, 5, 2, 4, 5, 3, 4, 3, 2, 3, 1, 0, 3, 0, 5, 4, 0, 6, 0, 4, 2, 6, 3, 6, 1, 6, 3 ], [ 0, 1, 5, 1, 2, 5, 2, 1, 2, 0, 2, 1, 0, 2, 0, 5, 7, 0, 6, 7, 6, 0, 4, 6, 4, 2, 4, 6, 7, 4, 3, 7, 3, 2, 3, 6, 5, 3, 5, 7 ], [ 2, 1, 2, 0, 4, 2, 4, 1, 5, 2, 6, 2, 6, 1, 3, 5, 3, 4, 3, 6, 4, 3, 5, 4, 5, 3, 5, 6, 0, 5, 0, 4, 6, 0, 6, 5 ], [ 1, 0, 4, 0, 5, 0, 2, 5, 2, 1, 2, 4, 3, 5, 2, 3, 5, 2, 3, 5, 4, 3, 1, 4, 3, 1, 4, 3, 4, 5 ], [ 1, 4, 1, 0, 4, 1, 0, 4, 3, 0, 5, 3, 2, 5, 2, 1, 2, 0 ], [ 1, 0, 0, 3, 4, 1, 2, 3, 2, 0, 5, 3, 5, 2, 0, 5, 2, 0, 4, 2, 6, 4, 6, 2, 1, 6, 1, 4 ], [ 1, 0, 5, 1, 0, 5, 3, 0, 3, 5, 0, 3, 6, 0, 1, 3, 2, 1, 2, 6, 1, 2, 4, 1, 4, 0, 4, 1, 2, 4, 6, 2, 6, 0, 6, 4 ], [ 1, 4, 0, 1, 0, 2, 1, 0, 3, 1, 5, 1, 3, 5, 4, 3, 1, 4, 0, 1, 5, 1, 0, 5, 3, 0, 4, 3, 5, 4, 2, 5, 2, 4, 2, 5 ], [ 0, 6, 1, 6, 1, 7, 3, 6, 3, 7, 8, 7, 3, 8, 2, 3, 0, 2, 4, 3, 4, 1, 0, 4, 5, 3, 5, 1, 5, 4 ], [ 5, 2, 5, 1, 4, 5, 6, 4, 6, 5, 1, 6, 3, 1, 0, 3, 0, 5, 3, 0, 2, 3, 6, 2, 4, 6, 4, 1, 4, 6 ], [ 0, 6, 1, 0, 2, 0, 3, 0, 1, 6, 1, 3, 1, 2, 3, 1, 5, 1, 7, 1, 3, 5, 3, 1, 2, 3, 7, 2, 5, 3, 4, 5, 4, 2, 4, 5, 7, 4, 2, 7, 5, 2, 5, 4 ], [ 2, 1, 1, 3, 4, 3, 4, 1, 2, 4, 5, 3, 5, 1, 2, 5, 0, 2, 0, 5, 4, 0, 4, 2, 0, 4, 1, 0, 5, 1, 5, 2 ], [ 1, 0, 5, 0, 3, 1, 6, 1, 2, 6, 7, 5, 4, 7, 3, 4, 6, 3, 5, 6, 7, 5, 7, 2 ], [ 0, 1, 0, 4, 5, 0, 7, 1, 3, 7, 3, 2, 3, 1, 2, 3, 5, 3, 2, 5, 4, 2, 6, 2, 7, 4, 7, 0, 6, 5 ], [ 4, 1, 5, 1, 9, 1, 9, 0, 3, 5, 8, 3, 6, 8, 2, 6, 8, 2, 0, 8, 0, 4, 6, 0, 7, 6, 7, 3, 9, 6, 4, 9, 5, 4, 5, 9, 7, 8 ], [ 4, 0, 2, 3, 5, 2, 5, 3, 0, 5, 0, 4, 3, 0, 1, 3, 2, 5, 4, 2, 1, 4, 2, 1, 4, 2, 4, 3 ], [ 1, 0, 2, 0, 1, 2, 3, 1, 5, 1, 3, 2, 6, 2, 4, 3, 4, 1, 4, 6, 4, 3, 2, 4, 0, 2, 6, 0, 5, 2, 5, 6, 5, 0, 3, 5, 6, 3, 6, 5 ], [ 2, 6, 1, 2, 5, 1, 5, 2, 5, 6, 1, 5, 0, 1, 0, 5, 3, 0, 4, 0, 7, 1, 3, 4, 3, 7 ], [ 6, 1, 2, 3, 1, 2, 3, 1, 5, 1, 6, 1, 3, 5, 5, 6, 3, 5, 0, 3, 4, 0, 2, 3, 5, 2, 6, 5, 6, 2, 4, 6, 0, 4, 0, 6 ], [ 3, 0, 6, 0, 2, 3, 1, 2, 4, 1, 5, 2, 7, 6, 5, 7, 1, 5, 3, 1, 3, 4 ], [ 1, 4, 7, 1, 2, 4, 6, 2, 0, 6, 8, 0, 5, 4, 5, 2, 6, 5, 0, 6, 8, 7, 3, 8, 0, 3, 2, 0, 6, 2, 1, 6, 5, 1, 7, 5, 3, 7, 3, 8 ], [ 2, 0, 4, 0, 2, 4, 3, 4, 2, 3, 1, 2, 5, 2, 1, 5, 3, 1, 5, 3, 5, 1 ], [ 5, 0, 6, 0, 2, 5, 2, 3, 1, 2, 1, 3, 2, 1, 8, 6, 8, 2, 8, 0, 8, 1, 4, 8, 5, 8, 6, 5, 7, 5, 7, 2, 6, 7, 6, 8, 3, 6, 7, 3, 7, 2, 4, 6, 4, 1 ], [ 5, 1, 0, 5, 4, 3, 2, 4, 0, 2, 5, 0, 2, 5, 3, 2, 1, 3, 4, 1, 4, 5 ], [ 5, 1, 3, 5, 1, 3, 5, 1, 0, 5, 2, 0, 2, 3, 4, 5, 4, 2, 0, 4, 0, 1, 3, 0, 5, 3, 4, 5, 2, 4, 2, 5 ], [ 1, 2, 1, 0, 1, 2, 0, 1, 5, 1, 4, 2, 4, 0, 4, 2, 5, 4, 3, 5, 3, 0, 3, 5, 0, 3, 5, 0, 5, 4 ], [ 1, 2, 4, 2, 1, 4, 0, 1, 3, 1, 0, 3, 4, 0, 4, 1, 5, 2, 5, 4, 0, 5, 6, 5, 0, 6, 4, 0, 6, 4, 3, 6, 3, 4, 6, 3, 7, 3, 7, 6, 7, 0, 7, 6 ], [ 2, 0, 1, 5, 2, 1, 4, 1, 5, 2, 6, 5, 6, 0, 5, 6, 0, 5, 2, 0, 1, 2, 6, 1, 4, 6, 3, 4, 7, 3, 7, 2, 7, 4, 3, 7, 6, 3, 6, 7 ], [ 3, 7, 6, 3, 7, 6, 3, 7, 0, 3, 1, 3, 4, 3, 4, 6, 1, 4, 7, 1, 5, 7, 0, 5, 0, 4, 5, 0, 5, 7, 2, 5, 2, 0, 2, 5, 2, 7 ], [ 2, 1, 3, 1, 0, 3, 0, 1, 0, 3, 0, 2, 1, 0, 2, 1, 5, 2, 5, 1, 2, 5, 4, 2, 4, 1, 4, 3, 5, 4, 5, 2 ], [ 2, 0, 1, 2, 1, 0, 1, 2, 1, 0, 2, 1, 6, 2, 6, 0, 6, 2, 3, 6, 3, 1, 6, 3, 4, 6, 7, 4, 5, 6, 7, 6, 5, 7, 3, 5, 2, 3, 4, 2, 7, 4, 7, 2 ], [ 2, 3, 1, 2, 1, 3, 2, 1, 3, 2, 1, 3, 0, 1, 5, 1, 5, 2, 4, 5, 4, 3, 0, 4, 5, 0, 4, 5, 4, 1, 4, 5 ], [ 1, 6, 3, 1, 0, 3, 2, 0, 4, 1, 4, 6, 4, 1, 5, 4, 5, 1, 5, 2, 5, 4, 2, 5, 3, 5, 2, 3, 2, 4, 0, 2, 3, 0, 6, 3, 6, 2 ], [ 5, 0, 3, 2, 3, 0, 2, 3, 0, 2, 3, 0, 5, 0, 4, 5, 6, 5, 1, 6, 1, 3, 4, 1, 5, 4, 6, 5, 3, 6, 1, 3, 1, 6 ], [ 2, 1, 5, 1, 5, 3, 1, 5, 3, 1, 2, 3, 0, 2, 4, 5, 6, 4, 6, 0, 4, 6, 4, 1, 0, 4, 0, 2, 3, 0, 6, 3, 6, 0 ], [ 5, 0, 6, 0, 2, 6, 2, 1, 6, 2, 1, 6, 0, 1, 3, 0, 4, 0, 3, 2, 3, 4, 6, 3, 5, 6, 4, 5, 4, 0, 4, 5, 4, 6 ], [ 6, 0, 1, 5, 1, 6, 2, 1, 4, 1, 2, 4, 3, 2, 7, 3, 7, 2, 5, 7, 3, 5, 4, 3, 0, 4, 6, 0, 6, 7 ], [ 4, 0, 2, 4, 1, 2, 5, 4, 3, 5, 0, 3, 2, 0, 1, 2, 5, 1, 5, 2 ], [ 3, 0, 1, 4, 5, 1, 6, 3, 5, 6, 2, 5, 2, 1, 3, 2, 6, 3, 6, 5, 0, 6, 4, 0, 4, 6 ], [ 3, 2, 1, 3, 5, 1, 5, 0, 1, 5, 0, 1, 6, 1, 2, 5, 2, 0, 3, 2, 0, 3, 4, 6, 4, 2, 4, 0, 3, 4, 6, 3, 6, 0 ], [ 2, 0, 3, 2, 3, 0, 3, 2, 3, 0, 1, 3, 2, 3, 5, 2, 4, 5, 4, 3, 1, 4, 6, 1, 6, 2, 5, 6, 5, 1, 6, 5, 4, 6, 1, 4, 1, 6 ], [ 0, 2, 5, 2, 7, 2, 3, 7, 0, 3, 0, 2, 3, 0, 6, 0, 3, 5, 6, 3, 1, 6, 7, 3, 4, 7, 4, 0, 4, 7, 5, 4, 5, 6, 1, 5, 6, 1, 7, 6, 7, 4, 7, 5 ], [ 2, 1, 1, 4, 2, 1, 3, 1, 2, 3, 7, 4, 5, 7, 6, 5, 6, 2, 5, 6, 3, 5, 7, 3, 0, 7, 0, 2, 0, 7 ], [ 1, 2, 0, 1, 3, 0, 6, 0, 5, 2, 4, 3, 6, 4, 5, 6, 1, 5, 3, 1, 4, 3, 6, 4, 6, 3 ], [ 3, 1, 6, 1, 3, 6, 2, 3, 0, 2, 6, 0, 4, 3, 4, 6, 2, 4, 5, 2, 7, 2, 5, 6, 5, 7 ], [ 2, 5, 1, 2, 0, 1, 4, 1, 3, 5, 3, 1, 0, 3, 0, 1, 3, 0, 4, 3, 4, 0, 4, 3, 5, 4, 2, 5, 2, 4, 5, 2, 5, 4 ], [ 3, 0, 2, 1, 4, 1, 2, 4, 3, 2, 6, 2, 5, 3, 6, 5, 6, 3, 0, 6, 4, 0, 4, 6 ], [ 1, 4, 2, 1, 3, 4, 5, 4, 0, 5, 0, 2, 3, 0, 6, 4, 6, 0, 3, 6, 5, 3, 6, 5, 1, 6, 1, 0, 2, 1, 2, 3, 5, 2, 7, 6, 7, 5, 7, 1, 7, 5 ], [ 4, 3, 5, 3, 0, 5, 0, 4, 3, 0, 4, 3, 1, 4, 2, 4, 1, 2, 1, 3, 5, 1, 2, 5, 2, 4, 2, 5 ], [ 0, 2, 4, 2, 4, 0, 1, 4, 3, 1, 5, 4, 3, 5, 1, 3, 0, 1, 5, 0, 5, 1 ], [ 1, 0, 4, 0, 5, 1, 2, 4, 2, 0, 3, 4, 3, 5, 1, 3, 1, 2, 3, 1, 4, 3, 2, 4, 5, 2, 4, 5, 3, 4, 0, 3, 0, 1 ], [ 3, 0, 4, 0, 5, 0, 5, 3, 4, 5, 2, 4, 2, 0, 2, 3, 2, 4, 3, 2, 6, 2, 6, 3, 1, 6, 1, 5, 1, 6, 1, 3, 4, 1, 5, 4, 5, 1, 4, 5, 4, 1 ], [ 7, 1, 2, 7, 0, 2, 4, 2, 4, 7, 0, 4, 3, 0, 6, 0, 3, 4, 5, 3, 6, 3, 1, 6, 1, 5 ], [ 3, 1, 2, 3, 2, 1, 0, 2, 5, 2, 0, 5, 0, 2, 5, 0, 5, 1, 4, 3, 4, 0, 4, 5, 3, 4, 2, 3, 2, 5 ], [ 3, 4, 2, 3, 0, 2, 3, 0, 2, 3, 4, 2, 4, 3, 2, 4, 2, 3, 1, 2, 1, 4, 5, 2, 1, 5, 0, 1, 5, 0, 5, 2 ], [ 2, 1, 5, 1, 3, 2, 8, 2, 6, 5, 5, 8, 4, 5, 6, 4, 0, 6, 7, 6, 0, 7, 0, 3, 8, 0, 7, 8, 1, 7, 5, 1, 4, 5, 3, 4, 3, 8 ], [ 0, 2, 1, 0, 2, 4, 0, 2, 1, 0, 5, 1, 3, 5, 3, 2, 1, 3, 0, 1, 5, 0, 5, 1 ], [ 1, 5, 0, 1, 2, 0, 4, 0, 3, 5, 3, 0, 2, 3, 2, 0, 3, 2, 4, 3, 4, 2, 4, 3, 5, 4, 1, 5, 1, 4, 5, 1, 5, 4 ], [ 2, 5, 0, 2, 3, 2, 0, 3, 0, 5, 1, 0, 3, 0, 1, 2, 1, 3, 5, 1, 4, 2, 3, 5, 4, 3, 5, 4, 5, 3 ], [ 0, 2, 4, 1, 4, 0, 2, 4, 2, 0, 1, 2, 3, 1, 5, 1, 6, 3, 6, 2, 6, 5 ], [ 0, 6, 3, 5, 4, 3, 4, 1, 7, 5, 3, 7, 3, 6, 3, 4, 0, 3, 2, 3, 0, 2, 4, 0, 5, 4, 2, 5, 6, 2, 7, 6, 1, 7, 1, 3, 1, 7 ], [ 9, 0, 3, 2, 2, 5, 9, 2, 6, 3, 8, 5, 4, 8, 4, 2, 7, 4, 4, 9, 0, 4, 1, 4, 1, 0, 1, 7, 6, 1, 8, 6, 7, 8, 3, 7, 0, 3, 9, 0, 1, 9, 8, 1, 3, 8, 5, 3, 7, 5, 2, 7, 6, 2, 6, 9 ], [ 3, 6, 4, 6, 5, 6, 7, 6, 7, 5, 7, 1, 7, 4, 0, 7, 5, 7, 5, 3, 1, 5, 3, 1, 2, 5, 0, 2, 4, 3, 0, 4, 2, 0, 2, 4, 3, 2, 3, 7, 0, 3, 1, 0, 4, 1, 4, 3 ], [ 4, 0, 3, 1, 5, 1, 7, 1, 8, 1, 2, 3, 8, 3, 8, 2, 4, 5, 6, 4, 7, 4, 5, 8, 5, 7, 4, 5, 6, 4, 6, 2, 0, 6, 0, 7, 3, 0, 7, 3, 7, 2, 4, 8 ], [ 5, 0, 1, 3, 4, 3, 4, 2, 1, 4, 0, 1, 0, 4, 1, 0, 4, 1, 6, 3, 4, 5, 4, 0, 3, 4, 3, 2, 5, 3, 5, 2, 5, 3, 5, 1, 6, 3, 6, 2, 6, 4, 6, 3 ], [ 0, 1, 5, 0, 4, 5, 3, 4, 1, 3, 5, 3, 5, 1, 0, 5, 0, 4, 0, 5, 2, 0, 4, 0, 1, 4, 2, 1, 2, 0, 2, 1 ], [ 0, 3, 4, 2, 1, 4, 2, 5, 3, 2, 4, 3, 0, 4, 6, 0, 1, 6, 1, 0, 6, 1, 4, 6, 3, 4, 3, 0, 3, 6, 2, 3, 5, 2, 5, 3, 2, 5, 2, 3 ], [ 3, 0, 5, 0, 1, 2, 1, 5, 3, 1, 3, 0, 1, 3, 2, 3, 4, 2, 4, 1, 5, 4, 2, 5, 1, 2, 4, 1, 5, 4, 5, 2 ], [ 5, 4, 5, 2, 5, 4, 5, 3, 1, 5, 1, 0, 2, 5, 3, 2, 1, 3, 0, 1, 0, 3, 4, 0, 4, 5, 1, 4, 2, 1, 3, 2, 3, 4 ], [ 1, 7, 3, 1, 4, 3, 2, 4, 0, 2, 6, 0, 5, 6, 8, 5, 8, 7 ], [ 1, 0, 5, 0, 3, 1, 4, 5, 3, 4, 5, 3, 1, 5, 4, 1, 6, 4, 6, 1, 4, 6, 3, 4, 6, 3, 2, 6, 2, 0, 2, 5, 2, 6 ], [ 6, 0, 2, 3, 2, 6, 1, 2, 5, 1, 7, 2, 7, 0, 4, 7, 5, 4, 6, 5, 3, 6, 1, 3, 1, 7 ], [ 1, 3, 1, 2, 1, 0, 3, 1, 4, 1, 5, 1, 3, 2, 0, 3, 4, 0, 4, 2, 0, 4, 3, 0, 3, 1, 5, 2, 5, 0, 5, 4 ], [ 3, 0, 4, 0, 1, 3, 4, 1, 5, 1, 4, 2, 5, 4, 5, 1, 6, 4, 6, 3, 6, 4 ], [ 0, 3, 4, 0, 1, 4, 2, 1, 2, 0, 4, 2, 3, 5, 1, 3, 1, 0, 2, 1, 3, 2, 3, 4, 1, 3, 4, 1, 5, 4, 5, 1 ], [ 3, 5, 0, 3, 5, 0, 1, 5, 2, 1, 4, 2, 4, 1, 2, 4, 2, 3, 5, 2, 0, 5, 3, 0, 3, 2, 0, 3, 5, 0, 5, 4 ], [ 0, 1, 4, 1, 6, 1, 3, 4, 2, 3, 5, 6, 0, 5, 0, 2, 4, 0, 5, 4, 3, 5, 2, 3, 6, 2, 6, 4 ], [ 4, 1, 5, 1, 5, 4, 3, 5, 6, 5, 2, 6, 0, 2, 0, 3, 6, 0, 3, 6, 2, 3, 4, 2, 4, 6 ], [ 1, 0, 6, 0, 4, 1, 5, 2, 5, 0, 2, 5, 3, 2, 7, 2, 3, 5, 3, 1, 4, 3, 6, 3, 7, 3, 4, 6, 7, 6 ], [ 2, 0, 4, 0, 1, 2, 1, 4, 2, 1, 0, 2, 4, 0, 4, 1, 3, 4, 3, 2, 3, 4, 5, 4, 5, 3, 5, 0, 5, 3 ], [ 4, 1, 0, 4, 5, 1, 4, 5, 0, 4, 3, 0, 2, 3, 6, 5, 6, 0, 6, 2, 3, 6, 0, 3, 0, 4, 1, 0, 5, 1, 3, 5, 3, 4, 6, 3, 2, 6, 2, 3, 2, 6 ], [ 4, 2, 0, 4, 2, 0, 3, 0, 2, 3, 1, 2, 1, 4, 5, 2, 1, 5, 4, 1, 4, 0, 1, 4, 5, 1, 3, 5, 3, 2, 5, 3, 5, 1 ], [ 5, 2, 0, 5, 4, 0, 6, 0, 1, 6, 1, 5, 4, 1, 3, 4, 7, 4, 7, 3, 7, 1 ], [ 2, 1, 1, 4, 3, 1, 5, 1, 7, 2, 3, 5, 0, 3, 6, 7, 6, 3, 5, 6, 5, 1, 2, 5, 7, 2, 6, 7, 0, 6, 0, 4, 3, 0, 3, 6 ], [ 4, 3, 6, 3, 0, 6, 0, 4, 2, 0, 1, 2, 5, 1, 5, 0, 1, 5, 2, 1, 4, 2, 4, 6 ], [ 3, 1, 4, 1, 5, 1, 2, 3, 4, 3, 0, 4, 2, 0, 2, 5, 4, 2, 3, 4, 0, 3, 5, 0, 5, 3 ], [ 0, 2, 3, 0, 5, 2, 6, 2, 1, 6, 4, 1, 5, 4, 3, 5, 1, 3, 0, 1, 5, 0, 4, 5, 6, 4, 6, 0 ], [ 0, 2, 0, 5, 2, 0, 7, 0, 2, 7, 2, 0, 5, 2, 7, 2, 3, 5, 6, 5, 1, 6, 3, 1, 3, 7, 8, 7, 3, 8, 4, 3, 6, 3, 4, 6, 1, 4, 8, 1, 6, 8, 4, 6, 8, 4, 1, 8, 7, 1, 5, 7, 5, 3 ], [ 0, 2, 6, 1, 4, 2, 4, 0, 3, 4, 6, 4, 6, 3, 1, 6, 1, 0, 5, 6, 5, 1, 2, 5, 2, 0, 6, 2, 4, 6, 3, 4, 3, 1, 5, 3, 4, 5, 4, 6 ], [ 7, 0, 8, 0, 3, 7, 5, 3, 4, 5, 6, 7, 8, 6, 1, 8, 2, 1, 2, 4, 0, 2, 0, 8, 1, 0, 3, 1, 4, 3, 6, 4, 5, 6, 5, 0 ], [ 5, 3, 3, 7, 6, 3, 9, 6, 5, 9, 8, 5, 4, 8, 0, 4, 1, 0, 2, 1, 2, 9 ], [ 1, 3, 7, 1, 5, 3, 2, 5, 2, 7, 4, 2, 2, 5, 1, 2, 6, 3, 4, 6, 7, 4, 0, 7, 0, 1, 6, 0, 6, 7, 1, 6, 7, 1, 7, 2, 0, 7, 6, 0, 4, 6, 4, 7 ], [ 4, 1, 2, 3, 4, 3, 5, 3, 4, 5, 4, 2, 1, 4, 1, 3, 5, 4, 1, 5, 0, 1, 0, 5, 2, 1, 6, 2, 0, 6, 2, 0, 5, 2, 6, 5, 6, 1, 7, 6, 7, 0, 7, 6, 7, 5 ], [ 5, 1, 3, 5, 3, 1, 0, 3, 2, 3, 4, 3, 2, 4, 0, 2, 0, 5, 2, 0, 4, 2, 4, 0 ], [ 0, 2, 2, 3, 1, 2, 5, 1, 5, 2, 5, 0, 1, 5, 0, 1, 4, 0, 4, 5, 0, 4, 1, 0, 3, 1, 4, 3, 4, 1 ], [ 3, 1, 4, 1, 6, 1, 6, 3, 0, 6, 5, 0, 2, 5, 2, 4, 5, 2, 3, 5, 4, 3, 0, 4, 0, 6 ], [ 3, 0, 3, 2, 3, 5, 3, 4, 1, 3, 2, 1, 4, 2, 4, 3, 5, 4, 0, 5, 0, 4, 1, 0, 2, 1, 2, 5 ], [ 1, 4, 3, 1, 0, 3, 4, 5, 1, 4, 0, 1, 4, 0, 2, 4, 2, 1, 2, 4, 3, 2, 3, 4, 1, 3, 2, 1, 2, 5 ], [ 6, 2, 1, 6, 4, 1, 0, 4, 3, 6, 3, 2, 5, 6, 5, 3, 0, 5, 1, 5, 1, 2, 4, 1, 3, 4, 0, 3, 7, 0, 7, 3, 7, 0 ], [ 3, 4, 2, 3, 0, 2, 4, 2, 0, 4, 0, 3, 4, 0, 3, 4, 1, 3, 1, 2, 1, 3, 5, 1, 5, 4, 5, 1, 5, 3 ], [ 4, 5, 4, 2, 0, 4, 1, 0, 3, 4, 5, 4, 3, 5, 2, 3, 0, 2, 0, 5, 0, 1, 3, 0, 1, 3, 1, 2, 5, 1, 5, 3 ], [ 5, 4, 5, 3, 4, 5, 0, 4, 5, 0, 6, 5, 2, 6, 1, 2, 1, 3, 2, 1, 2, 4, 6, 2, 6, 5, 1, 6, 3, 1, 4, 3, 4, 6 ], [ 8, 7, 4, 8, 6, 4, 9, 6, 3, 9, 2, 3, 0, 2, 5, 0, 1, 5, 1, 9 ], [ 4, 5, 0, 4, 0, 1, 0, 5, 2, 4, 3, 2, 3, 4 ], [ 5, 4, 2, 5, 0, 2, 3, 2, 1, 3, 0, 1, 3, 0, 4, 3, 1, 4, 5, 1, 5, 3 ], [ 3, 6, 3, 4, 0, 3, 0, 6, 2, 0, 3, 0, 1, 2, 1, 4, 7, 1, 2, 3, 2, 5, 7, 3, 7, 1 ], [ 0, 3, 0, 1, 2, 0, 2, 1, 2, 0, 1, 2, 4, 1, 4, 0, 4, 1, 5, 4, 5, 1, 5, 4, 3, 5, 3, 1, 3, 5 ], [ 5, 6, 1, 5, 2, 1, 0, 2, 3, 5, 3, 6, 3, 5, 4, 3, 4, 5, 4, 0, 4, 3, 0, 4, 1, 4, 0, 1, 0, 3, 2, 0, 1, 2, 6, 1, 6, 0 ], [ 2, 0, 3, 0, 4, 0, 4, 2, 4, 0, 4, 3, 2, 4, 1, 2, 1, 4, 5, 2, 1, 5, 2, 1, 3, 2, 5, 3, 5, 4, 5, 3, 5, 2 ], [ 4, 1, 2, 3, 1, 2, 1, 3, 0, 1, 5, 6, 4, 5, 0, 4, 5, 0, 5, 2, 5, 0, 4, 5, 4, 1, 4, 5, 3, 4, 3, 1, 3, 2, 6, 4, 6, 1, 6, 5, 6, 0 ], [ 4, 0, 6, 0, 9, 0, 2, 4, 3, 4, 6, 3, 6, 9, 3, 6, 9, 3, 5, 9, 2, 5, 1, 2, 7, 2, 8, 7, 1, 8, 1, 9, 5, 1, 8, 5, 7, 8, 7, 1 ], [ 4, 0, 1, 4, 2, 3, 2, 4, 3, 2, 0, 3, 1, 0, 5, 0, 1, 5, 4, 1, 5, 4, 5, 0 ], [ 3, 2, 1, 3, 0, 1, 4, 0, 2, 5, 0, 2, 0, 4, 3, 0, 3, 2, 5, 3, 1, 5, 1, 0, 4, 1, 4, 5, 1, 4, 1, 5 ], [ 2, 3, 7, 3, 5, 7, 1, 5, 4, 1, 0, 4, 8, 0, 2, 8, 6, 2, 6, 8 ], [ 1, 4, 3, 1, 2, 3, 0, 2, 1, 0, 2, 1, 2, 0, 3, 2, 7, 2, 7, 3, 4, 7, 1, 4, 7, 1, 5, 4, 5, 7, 6, 5, 6, 3, 6, 7, 5, 6, 3, 5, 3, 7, 2, 3, 1, 2, 7, 1, 7, 5 ], [ 0, 1, 5, 0, 4, 1, 0, 4, 3, 0, 3, 1, 3, 0, 5, 3, 5, 0, 5, 3, 4, 5, 2, 4, 2, 5, 2, 4, 2, 5 ], [ 2, 0, 1, 2, 1, 0, 1, 2, 3, 1, 6, 1, 7, 6, 7, 1, 6, 7, 5, 6, 5, 1, 5, 3, 6, 5, 3, 6, 3, 2, 7, 3, 4, 7, 4, 6, 4, 7 ], [ 0, 4, 1, 0, 2, 1, 2, 0, 1, 2, 5, 2, 1, 5, 3, 1, 3, 4, 5, 3, 5, 1, 3, 5, 3, 4 ], [ 2, 4, 5, 4, 2, 5, 0, 2, 0, 4, 0, 2, 1, 0, 3, 0, 3, 1, 3, 0, 2, 3, 1, 2, 1, 5 ], [ 0, 2, 1, 0, 3, 2, 1, 3, 6, 3, 0, 6, 0, 1, 4, 0, 5, 0, 4, 5, 2, 4, 5, 2, 1, 5, 6, 1, 6, 5 ], [ 0, 5, 1, 0, 2, 1, 1, 7, 3, 5, 2, 3, 4, 7, 1, 4, 6, 1, 8, 1, 2, 8, 6, 3, 6, 1 ] ];
        return _this;
      }
      GameLevels.prototype.getSolution = function(id) {
        return this.solutions[id].slice();
      };
      GameLevels.prototype.getLevel = function(id) {
        return this.levels[id];
      };
      GameLevels.prototype.getMaxLevel = function() {
        return this.levels.length;
      };
      GameLevels = __decorate([ ccclass ], GameLevels);
      return GameLevels;
    }(cc.Component);
    exports.default = GameLevels;
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7977LWPHhIqaoXsFrrln2X", "Game");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("./Global");
    var LevelPanel_1 = require("./LevelPanel");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Game = function(_super) {
      __extends(Game, _super);
      function Game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelStage = null;
        _this.labelVersion = null;
        return _this;
      }
      Game.prototype.showHideStage = function() {
        this.levelStage.getComponent(LevelPanel_1.default).visible = !this.levelStage.getComponent(LevelPanel_1.default).visible;
      };
      Game.prototype.onLoad = function() {
        this.levelStage.getComponent(LevelPanel_1.default).visible = false;
        Global_1.Global.getInstance().userData.initFromLocalData();
        cc.sys.platform === cc.sys.ANDROID || cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD ? this.labelVersion.node.active = false : this.labelVersion.node.active = true;
      };
      Game.prototype.start = function() {};
      __decorate([ property(cc.Node) ], Game.prototype, "levelStage", void 0);
      __decorate([ property(cc.Label) ], Game.prototype, "labelVersion", void 0);
      Game = __decorate([ ccclass ], Game);
      return Game;
    }(cc.Component);
    exports.default = Game;
    cc._RF.pop();
  }, {
    "./Global": "Global",
    "./LevelPanel": "LevelPanel"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9616fOk4RRCG47Dn1fxEXrT", "Global");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Global = exports.UserData = void 0;
    var UserData = function() {
      function UserData() {
        this._currentLevel = 0;
        this._unlockLevel = 0;
        this._sound = false;
        this._vibrate = false;
        this._backgroundID = 0;
        this._bottleID = 0;
      }
      Object.defineProperty(UserData.prototype, "bottleID", {
        get: function() {
          return this._bottleID;
        },
        set: function(id) {
          this._bottleID = id;
          cc.sys.localStorage.setItem("bottleID", this._bottleID);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UserData.prototype, "backgroundID", {
        get: function() {
          return this._backgroundID;
        },
        set: function(id) {
          this._backgroundID = id;
          cc.sys.localStorage.setItem("backgroundID", this._backgroundID);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UserData.prototype, "sound", {
        get: function() {
          return this._sound;
        },
        set: function(enable) {
          this._sound = enable;
          cc.sys.localStorage.setItem("sound", this._sound);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UserData.prototype, "vibrate", {
        get: function() {
          return this._vibrate;
        },
        set: function(enable) {
          this._vibrate = enable;
          cc.sys.localStorage.setItem("vibrate", this._vibrate);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UserData.prototype, "currentLevel", {
        get: function() {
          return this._currentLevel;
        },
        set: function(level) {
          level > this.unlockLevel && (this.unlockLevel = level);
          this._currentLevel = level;
          cc.sys.localStorage.setItem("currentLevel", this._currentLevel);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UserData.prototype, "unlockLevel", {
        get: function() {
          return this._unlockLevel;
        },
        set: function(level) {
          if (level < this._unlockLevel) return;
          this._unlockLevel = level;
          cc.sys.localStorage.setItem("unlockLevel", this._unlockLevel);
        },
        enumerable: false,
        configurable: true
      });
      UserData.prototype.initFromLocalData = function() {
        var unlockLevel = parseInt(cc.sys.localStorage.getItem("unlockLevel"));
        var currentLevel = parseInt(cc.sys.localStorage.getItem("currentLevel"));
        this._unlockLevel = isNaN(unlockLevel) ? 0 : unlockLevel;
        this._currentLevel = isNaN(currentLevel) ? 0 : currentLevel;
        cc.log("@@@ unlockLevel : " + this._unlockLevel);
        cc.log("@@@ currentLevel : " + this._currentLevel);
        var soundEnable = cc.sys.localStorage.getItem("sound");
        var vibrateEnable = cc.sys.localStorage.getItem("vibrate");
        this._sound = !("false" === soundEnable);
        this._vibrate = !("false" === vibrateEnable);
        cc.log("@@@ sound : " + this._sound);
        cc.log("@@@ vibrate : " + this._vibrate);
        var backgroundID = parseInt(cc.sys.localStorage.getItem("backgroundID"));
        this._backgroundID = isNaN(backgroundID) ? 0 : backgroundID;
        cc.log("@@@ backgroundID : " + this._backgroundID);
        var bottleID = parseInt(cc.sys.localStorage.getItem("bottleID"));
        this._bottleID = isNaN(bottleID) ? 0 : bottleID;
        cc.log("@@@ bottleID : " + this._bottleID);
      };
      return UserData;
    }();
    exports.UserData = UserData;
    var Global = function() {
      function Global() {
        this.inGame = null;
        this.LEVEL_SCALE = 1;
        this.userData = new UserData();
      }
      Global.getInstance = function() {
        this._instance || (this._instance = new Global());
        return this._instance;
      };
      Global._instance = null;
      return Global;
    }();
    exports.Global = Global;
    cc._RF.pop();
  }, {} ],
  InGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23f17uUhUFJ35TqyF1GpZ5k", "InGame");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ActionObject = void 0;
    var Bottle_1 = require("./Bottle");
    var GameLevels_1 = require("./GameLevels");
    var Global_1 = require("./Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ActionObject = function() {
      function ActionObject(from, to, amount, color) {
        this.from = 0;
        this.to = 0;
        this.amount = 0;
        this.color = 0;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.color = color;
      }
      return ActionObject;
    }();
    exports.ActionObject = ActionObject;
    var InGame = function(_super) {
      __extends(InGame, _super);
      function InGame() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.undoBtn = null;
        _this.redoBtn = null;
        _this.bgNodes = [];
        _this.gameLevels = null;
        _this.bottleHolderNode = null;
        _this.completePanel = null;
        _this.levelLabel = null;
        _this.pourAudio = null;
        _this.bottleSelectAudio = null;
        _this.bottleCompleteAudio = null;
        _this.passLevelAudio = null;
        _this.bottlePrefabList = [];
        _this.ROW_PADDING = 100;
        _this.COLUM_PADDING = 40;
        _this._zIndexPourBottle = 0;
        _this.hintMode = false;
        _this._bottleList = [];
        _this._isPlayFirstMovement = false;
        _this.SELECTED_BOTTLE = null;
        _this.solution = [];
        _this.maxLevel = 0;
        _this.currentLvID = -1;
        _this._bottleTypeID = 0;
        _this._undoActionList = [];
        _this._actionList = [];
        return _this;
      }
      InGame.prototype.onLoad = function() {
        Global_1.Global.getInstance().inGame = this;
        this.completePanel.active = false;
        this.node.on("ON_BOTTLE_TOUCH", this.onBottleTouch, this);
        this.node.on("ON_BOTTLE_SELECTED", this.onBottleSelected, this);
        this.node.on("ON_BOTTLE_UNSELECTED", this.onBottleUnselected, this);
        this.node.on("ON_POUR_COMPLETE", this.onPourComplete, this);
        this.setBackground(Global_1.Global.getInstance().userData.backgroundID);
        this.preloadAudio();
      };
      InGame.prototype.preloadAudio = function() {
        if (cc.sys.isNative) {
          cc.audioEngine.play(this.pourAudio, false, 0);
          cc.audioEngine.play(this.passLevelAudio, false, 0);
          cc.audioEngine.play(this.bottleCompleteAudio, false, 0);
          cc.audioEngine.play(this.bottleSelectAudio, false, 0);
          cc.log("@@@ preloadAudio on Native Platform");
        }
      };
      InGame.prototype.setBackground = function(id) {
        for (var i = 0; i < this.bgNodes.length; i++) this.bgNodes[i].active = i === id;
      };
      InGame.prototype.setBottle = function(id) {
        if (id != Global_1.Global.getInstance().userData.bottleID) {
          Global_1.Global.getInstance().userData.bottleID = id;
          this.loadLevel(Global_1.Global.getInstance().userData.currentLevel);
        }
      };
      InGame.prototype.onPourComplete = function(event) {
        event.stopPropagation();
        this.hintMode && this.solution.length >= 2 && this.pour(this._bottleList[this.solution.shift()], this._bottleList[this.solution.shift()]);
        this.isLevelComplete() && this.onLevelComplete();
      };
      InGame.prototype.isLevelComplete = function() {
        for (var i = 0; i < this._bottleList.length; i++) {
          var bottle = this._bottleList[i];
          if (!bottle.isComplete && !bottle.isEmpty || bottle.bottleState != Bottle_1.BottleState.IDLE) return false;
        }
        return true;
      };
      InGame.prototype.onLevelComplete = function() {
        Global_1.Global.getInstance().userData.sound && cc.audioEngine.playEffect(this.passLevelAudio, false);
        this.completePanel.active = true;
      };
      InGame.prototype.nextLevel = function() {
        this.loadLevel(Global_1.Global.getInstance().userData.currentLevel + 1);
        this.completePanel.active = false;
      };
      InGame.prototype.playSoundBottleComplete = function() {
        if (!Global_1.Global.getInstance().userData.sound) return 0;
        return cc.audioEngine.playEffect(this.bottleCompleteAudio, false);
      };
      InGame.prototype.playPourSound = function() {
        if (!Global_1.Global.getInstance().userData.sound) return 0;
        return cc.audioEngine.playEffect(this.pourAudio, false);
      };
      InGame.prototype.stopPourSound = function(pourAudioID) {
        if (!Global_1.Global.getInstance().userData.sound) return;
        cc.audioEngine.stop(pourAudioID);
      };
      InGame.prototype.pad = function(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length - size);
      };
      InGame.prototype.startHint = function() {
        var _this = this;
        if (this.solution.length >= 2 && !this._isPlayFirstMovement && !this.hintMode) {
          this.hintMode = true;
          this.SELECTED_BOTTLE ? this.SELECTED_BOTTLE.getComponent(Bottle_1.default).unSelected(function() {
            _this.pour(_this._bottleList[_this.solution.shift()], _this._bottleList[_this.solution.shift()]);
          }) : this.pour(this._bottleList[this.solution.shift()], this._bottleList[this.solution.shift()]);
        }
      };
      InGame.prototype.resetLevel = function() {
        this.loadLevel(Global_1.Global.getInstance().userData.currentLevel);
        this.completePanel.active = false;
      };
      InGame.prototype.testLevel = function() {};
      InGame.prototype.loadLevel = function(id) {
        Global_1.Global.getInstance().userData.currentLevel = id;
        this.clearLevel();
        var levelData = this.gameLevels.getLevel(id);
        this.parseLevel(levelData);
        var levelStr = id + 1;
        this.levelLabel.string = "LEVEL " + levelStr;
        this.solution = this.gameLevels.getSolution(id);
        cc.log("@@@ solution for Level " + id + " with " + this.solution.length / 2 + " step : " + this.solution.toString());
      };
      InGame.prototype.loadLevelFromTxtFile = function(level) {
        var _this = this;
        this.clearLevel();
        var levelUrl = "level/level" + this.pad(level, 3);
        cc.resources.load(levelUrl, function(err, file) {
          var levelData;
          try {
            levelData = JSON.parse(file.text);
          } catch (e) {
            cc.log("@@@ Level JSON Error");
            cc.log(e);
          }
          _this.parseLevel(levelData);
        });
      };
      InGame.prototype.parseLevel = function(levelData) {
        this._bottleTypeID = Global_1.Global.getInstance().userData.bottleID;
        this.completePanel.active = false;
        this.SELECTED_BOTTLE = null;
        this._zIndexPourBottle = 0;
        this._isPlayFirstMovement = false;
        this.hintMode = false;
        this._bottleList = [];
        this._actionList = [];
        this._undoActionList = [];
        var bottleTemp = cc.instantiate(this.bottlePrefabList[this._bottleTypeID]);
        var bottleWidth = bottleTemp.width;
        var bottleHeight = bottleTemp.height;
        var maxLevel = levelData[levelData.length - 1];
        var numBottle = levelData.length - 1;
        var maxBottleOnRow = numBottle <= 5 ? numBottle : Math.ceil(numBottle / 2);
        var beginYrow = numBottle <= 5 ? 0 : (bottleHeight + this.ROW_PADDING) / 2;
        for (var index = 0; index < numBottle; index++) {
          var bottleData = levelData[index];
          var bottle = cc.instantiate(this.bottlePrefabList[this._bottleTypeID]);
          var bottleComponent = bottle.getComponent(Bottle_1.default);
          bottleComponent.initData(bottleData, maxLevel, index);
          var i = index % maxBottleOnRow;
          var tempVal = Math.floor(numBottle / maxBottleOnRow) * maxBottleOnRow;
          var bottleOnRow = index >= tempVal ? numBottle - tempVal : maxBottleOnRow;
          bottle.x = -(bottleOnRow / 2 - i - .5) * (bottleWidth + this.COLUM_PADDING);
          bottle.y = beginYrow - (bottleHeight + this.ROW_PADDING) * Math.floor(index / maxBottleOnRow);
          this.bottleHolderNode.addChild(bottle);
          this._bottleList.push(bottleComponent);
        }
        Global_1.Global.getInstance().LEVEL_SCALE = maxBottleOnRow < 5 ? 1 : 5 / (maxBottleOnRow + 1);
        this.bottleHolderNode.scale = Global_1.Global.getInstance().LEVEL_SCALE;
        this.updateUndoRedoBtn();
      };
      InGame.prototype.addMoreBottle = function() {};
      InGame.prototype.clearLevel = function() {
        this.bottleHolderNode.removeAllChildren();
        Global_1.Global.getInstance().userData.sound && cc.audioEngine.stopAllEffects();
      };
      InGame.prototype.onBottleSelected = function(event) {
        event.stopPropagation();
        this.SELECTED_BOTTLE = event.target;
        Global_1.Global.getInstance().userData.sound && cc.audioEngine.playEffect(this.bottleSelectAudio, false);
      };
      InGame.prototype.onBottleTouch = function(event) {
        event.stopPropagation();
        if (this.SELECTED_BOTTLE) {
          var secondBottle = event.target.getComponent(Bottle_1.default);
          var isPourSuccess = this.pour(this.SELECTED_BOTTLE.getComponent(Bottle_1.default), secondBottle);
          if (isPourSuccess) {
            secondBottle.bottleState != Bottle_1.BottleState.GETTING_WATER && (secondBottle.bottleState = Bottle_1.BottleState.WAITING_FOR_GETTING);
            this.SELECTED_BOTTLE = null;
            this._isPlayFirstMovement || (this._isPlayFirstMovement = true);
          } else {
            this.SELECTED_BOTTLE.getComponent(Bottle_1.default).unSelected();
            secondBottle.selected();
          }
        }
      };
      InGame.prototype.onBottleUnselected = function(event) {
        event.stopPropagation();
        this.SELECTED_BOTTLE = null;
      };
      InGame.prototype.start = function() {
        this.loadLevel(Global_1.Global.getInstance().userData.currentLevel);
      };
      InGame.prototype.isIdle = function() {
        for (var i = 0; i < this._bottleList.length; i++) if (this._bottleList[i].bottleState != Bottle_1.BottleState.IDLE) return false;
        return true;
      };
      InGame.prototype.redo = function() {
        if (0 === this._undoActionList.length) return;
        if (this.isLevelComplete()) return;
        if (!this.isIdle()) return;
        if (this.hintMode) return;
        var actionObj = this._undoActionList.pop();
        this._actionList.push(actionObj);
        this._bottleList[actionObj.to].add(actionObj.amount, actionObj.color);
        this._bottleList[actionObj.from].remove(actionObj.amount);
        this.updateUndoRedoBtn();
      };
      InGame.prototype.undo = function() {
        if (0 === this._actionList.length) return;
        if (this.isLevelComplete()) return;
        if (!this.isIdle()) return;
        if (this.hintMode) return;
        var actionObj = this._actionList.pop();
        this._undoActionList.push(actionObj);
        this._bottleList[actionObj.to].remove(actionObj.amount);
        this._bottleList[actionObj.from].add(actionObj.amount, actionObj.color);
        this.updateUndoRedoBtn();
      };
      InGame.prototype.updateUndoRedoBtn = function() {
        this.redoBtn.interactable = 0 !== this._undoActionList.length;
        this.undoBtn.interactable = 0 !== this._actionList.length;
      };
      InGame.prototype.pour = function(pourBottle, getBottle) {
        var _this = this;
        if (this.isCanPour(pourBottle, getBottle)) {
          var numWater_1 = Math.min(pourBottle.numWaterCanPourLogic(), getBottle.numWaterCanGetLogic());
          var actionObj = new ActionObject(pourBottle.id, getBottle.id, numWater_1, pourBottle.topColorLogic);
          this._actionList.push(actionObj);
          this._undoActionList = [];
          var isGettingBottleOnLeft_1 = true;
          isGettingBottleOnLeft_1 = 0 === getBottle.node.x ? pourBottle.node.x > getBottle.node.x : getBottle.node.x < 0;
          var newPos = getBottle.node.position.clone();
          newPos = newPos.add(cc.v3(getBottle.POUR_POS_X * (isGettingBottleOnLeft_1 ? 1 : -1), getBottle.POUR_POS_Y, 0));
          var timeTween = .2 * newPos.sub(pourBottle.node.position).len() / 150;
          this._zIndexPourBottle++;
          pourBottle.node.zIndex = this._zIndexPourBottle;
          cc.tween(pourBottle.node).to(timeTween, {
            position: newPos
          }, {
            easing: "sineOut"
          }).start();
          var remainLevel = pourBottle.remainLevel;
          var TIME_FOR_FULL_BOTTLE_ROTATE = .3;
          var TIME_FOR_EACH_LEVEL_ROTATE = .25;
          var timeForPourBottleRotate = TIME_FOR_FULL_BOTTLE_ROTATE + remainLevel * TIME_FOR_EACH_LEVEL_ROTATE;
          cc.tween(pourBottle.node).delay(Math.max(0, timeTween - timeForPourBottleRotate)).call(function() {
            pourBottle.prepareForPour(numWater_1, getBottle, isGettingBottleOnLeft_1);
            _this.updateUndoRedoBtn();
          }).start();
          return true;
        }
        return false;
      };
      InGame.prototype.isCanPour = function(pourBottle, getBottle) {
        if ((pourBottle.topColor === getBottle.topColor || getBottle.isEmpty) && !pourBottle.isEmpty && !getBottle.isFull) return true;
        return false;
      };
      __decorate([ property(cc.Button) ], InGame.prototype, "undoBtn", void 0);
      __decorate([ property(cc.Button) ], InGame.prototype, "redoBtn", void 0);
      __decorate([ property(cc.Node) ], InGame.prototype, "bgNodes", void 0);
      __decorate([ property(GameLevels_1.default) ], InGame.prototype, "gameLevels", void 0);
      __decorate([ property(cc.Node) ], InGame.prototype, "bottleHolderNode", void 0);
      __decorate([ property(cc.Node) ], InGame.prototype, "completePanel", void 0);
      __decorate([ property(cc.Label) ], InGame.prototype, "levelLabel", void 0);
      __decorate([ property(cc.AudioClip) ], InGame.prototype, "pourAudio", void 0);
      __decorate([ property(cc.AudioClip) ], InGame.prototype, "bottleSelectAudio", void 0);
      __decorate([ property(cc.AudioClip) ], InGame.prototype, "bottleCompleteAudio", void 0);
      __decorate([ property(cc.AudioClip) ], InGame.prototype, "passLevelAudio", void 0);
      __decorate([ property(cc.Prefab) ], InGame.prototype, "bottlePrefabList", void 0);
      __decorate([ property ], InGame.prototype, "ROW_PADDING", void 0);
      __decorate([ property ], InGame.prototype, "COLUM_PADDING", void 0);
      InGame = __decorate([ ccclass ], InGame);
      return InGame;
    }(cc.Component);
    exports.default = InGame;
    cc._RF.pop();
  }, {
    "./Bottle": "Bottle",
    "./GameLevels": "GameLevels",
    "./Global": "Global"
  } ],
  LevelItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb587y2J2tACZnuQiQ1oohd", "LevelItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LevelState = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelState;
    (function(LevelState) {
      LevelState[LevelState["LOCK"] = 0] = "LOCK";
      LevelState[LevelState["UNLOCK"] = 1] = "UNLOCK";
      LevelState[LevelState["ACTIVE"] = 2] = "ACTIVE";
    })(LevelState = exports.LevelState || (exports.LevelState = {}));
    var LevelItem = function(_super) {
      __extends(LevelItem, _super);
      function LevelItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.bgUnlock = null;
        _this.bgActive = null;
        _this._level = 1;
        _this._state = LevelState.LOCK;
        return _this;
      }
      LevelItem_1 = LevelItem;
      Object.defineProperty(LevelItem.prototype, "level", {
        get: function() {
          return this._level;
        },
        set: function(level) {
          this._level = level;
          this.label.string = "" + (level + 1);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LevelItem.prototype, "state", {
        get: function() {
          return this._state;
        },
        set: function(state) {
          this._state = state;
          switch (state) {
           case LevelState.LOCK:
            this.bgUnlock.active = true;
            this.bgActive.active = false;
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouch, this);
            this.node.opacity = 150;
            break;

           case LevelState.UNLOCK:
            this.bgUnlock.active = true;
            this.bgActive.active = false;
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
            this.node.opacity = 255;
            break;

           case LevelState.ACTIVE:
            this.bgUnlock.active = false;
            this.bgActive.active = true;
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouch, this);
            this.node.opacity = 255;
          }
        },
        enumerable: false,
        configurable: true
      });
      LevelItem.prototype.start = function() {};
      LevelItem.prototype.onTouch = function(event) {
        var eventCustom = new cc.Event.EventCustom("ON_LEVEL_SELECTED", true);
        eventCustom.setUserData(event.target.getComponent(LevelItem_1).level);
        this.node.dispatchEvent(eventCustom);
      };
      var LevelItem_1;
      __decorate([ property(cc.Label) ], LevelItem.prototype, "label", void 0);
      __decorate([ property(cc.Node) ], LevelItem.prototype, "bgUnlock", void 0);
      __decorate([ property(cc.Node) ], LevelItem.prototype, "bgActive", void 0);
      LevelItem = LevelItem_1 = __decorate([ ccclass ], LevelItem);
      return LevelItem;
    }(cc.Component);
    exports.default = LevelItem;
    cc._RF.pop();
  }, {} ],
  LevelPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b02143sWvZLzbrnFSFTcHYp", "LevelPanel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("./Global");
    var LevelItem_1 = require("./LevelItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelPanel = function(_super) {
      __extends(LevelPanel, _super);
      function LevelPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.scrollView = null;
        _this.item = null;
        _this.columSpace = 10;
        _this.rowSpace = 10;
        _this.itemList = [];
        _this.activeLevel = 0;
        _this.unlockLevel = 0;
        _this._visible = false;
        return _this;
      }
      LevelPanel.prototype.onLoad = function() {
        this.activeLevel = Global_1.Global.getInstance().userData.currentLevel;
        this.unlockLevel = Global_1.Global.getInstance().userData.unlockLevel;
        var numLevel = 435;
        var itemDistance = this.item.width + this.columSpace;
        var numColum = Math.floor((cc.Canvas.instance.node.width - this.columSpace) / itemDistance);
        var numRow = Math.ceil(numLevel / numColum);
        this.content.height = numRow * (this.item.height + this.rowSpace) + this.rowSpace;
        var beginX = (this.content.width - (numColum * itemDistance - this.columSpace)) / 2;
        for (var i = 0; i < numRow; i++) for (var j = 0; j < numColum; j++) {
          var level = 0 + i * numColum + j;
          if (level > numLevel) break;
          var item = cc.instantiate(this.item);
          this.content.addChild(item);
          var levelItem = item.getComponent(LevelItem_1.default);
          levelItem.level = level;
          levelItem.state = level <= this.unlockLevel ? level == this.activeLevel ? LevelItem_1.LevelState.ACTIVE : LevelItem_1.LevelState.UNLOCK : LevelItem_1.LevelState.LOCK;
          this.itemList.push(levelItem);
          item.x = -this.content.width / 2 + beginX + this.item.width / 2 + j * itemDistance;
          item.y = -(i + .5) * this.item.height - this.rowSpace * (i + 1);
        }
      };
      LevelPanel.prototype.start = function() {
        this.node.on("ON_LEVEL_SELECTED", this.onLevelSelected, this);
      };
      Object.defineProperty(LevelPanel.prototype, "visible", {
        get: function() {
          return this._visible;
        },
        set: function(enable) {
          this._visible = enable;
          this._visible ? this.show() : this.hide();
        },
        enumerable: false,
        configurable: true
      });
      LevelPanel.prototype.show = function() {
        this.node.active = true;
        if (0 === this.itemList.length) return;
        if (this.unlockLevel < Global_1.Global.getInstance().userData.unlockLevel) {
          for (var i = this.unlockLevel + 1; i <= Global_1.Global.getInstance().userData.unlockLevel; i++) this.itemList[i].state = LevelItem_1.LevelState.UNLOCK;
          this.unlockLevel = Global_1.Global.getInstance().userData.unlockLevel;
        }
        if (this.activeLevel != Global_1.Global.getInstance().userData.currentLevel) {
          this.itemList[Global_1.Global.getInstance().userData.currentLevel].state = LevelItem_1.LevelState.ACTIVE;
          this.itemList[this.activeLevel].state = LevelItem_1.LevelState.UNLOCK;
          this.activeLevel = Global_1.Global.getInstance().userData.currentLevel;
        }
      };
      LevelPanel.prototype.hide = function() {
        this.node.active = false;
      };
      LevelPanel.prototype.onLevelSelected = function(event) {
        event.stopPropagation();
        Global_1.Global.getInstance().inGame.loadLevel(event.getUserData());
        this.visible = false;
      };
      __decorate([ property(cc.Node) ], LevelPanel.prototype, "content", void 0);
      __decorate([ property(cc.ScrollView) ], LevelPanel.prototype, "scrollView", void 0);
      __decorate([ property(cc.Node) ], LevelPanel.prototype, "item", void 0);
      __decorate([ property() ], LevelPanel.prototype, "columSpace", void 0);
      __decorate([ property() ], LevelPanel.prototype, "rowSpace", void 0);
      LevelPanel = __decorate([ ccclass ], LevelPanel);
      return LevelPanel;
    }(cc.Component);
    exports.default = LevelPanel;
    cc._RF.pop();
  }, {
    "./Global": "Global",
    "./LevelItem": "LevelItem"
  } ],
  Loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b700w4f0RKarxzF6MIGzP5", "Loading");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Loading = function(_super) {
      __extends(Loading, _super);
      function Loading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        return _this;
      }
      Loading.prototype.onLoad = function() {};
      Loading.prototype.start = function() {
        var _this = this;
        cc.director.preloadScene("game", function(progress1, total, item) {
          cc.log("progress :" + progress1 + "   total : " + total + "   item : " + item);
          _this.progressBar.progress = progress1 / total;
        }, this.onComplete);
      };
      Loading.prototype.onComplete = function(error) {
        cc.director.loadScene("game");
      };
      __decorate([ property(cc.ProgressBar) ], Loading.prototype, "progressBar", void 0);
      Loading = __decorate([ ccclass ], Loading);
      return Loading;
    }(cc.Component);
    exports.default = Loading;
    cc._RF.pop();
  }, {} ],
  MenuTabPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3601ccW8vtFDZhuMBKxzICs", "MenuTabPanel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MenuTabPanel = function(_super) {
      __extends(MenuTabPanel, _super);
      function MenuTabPanel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btnGroup = null;
        _this.bottleHolderNode = null;
        _this.tabList = [];
        _this.contentList = [];
        return _this;
      }
      MenuTabPanel.prototype.onLoad = function() {
        this.node.active = false;
        this.addTabEvent();
        this.activeTab(0);
        this.activeTabPanel(0);
      };
      MenuTabPanel.prototype.show = function() {
        this.node.active = true;
        this.btnGroup.active = false;
        this.bottleHolderNode.active = false;
      };
      MenuTabPanel.prototype.hide = function() {
        this.node.active = false;
        this.btnGroup.active = true;
        this.bottleHolderNode.active = true;
      };
      MenuTabPanel.prototype.addTabEvent = function() {
        for (var i = 0; i < this.tabList.length; i++) {
          var tabNode = this.tabList[i];
          tabNode["tabIndex"] = i;
          tabNode.on(cc.Node.EventType.TOUCH_END, this.onTab, this);
        }
      };
      MenuTabPanel.prototype.onTab = function(event) {
        var tabIndex = event.target["tabIndex"];
        this.activeTab(tabIndex);
        this.activeTabPanel(tabIndex);
      };
      MenuTabPanel.prototype.activeTab = function(index) {
        void 0 === index && (index = 0);
        for (var i = 0; i < this.tabList.length; i++) {
          var tabNode = this.tabList[i];
          var isActive = i === index;
          tabNode.children[0].active = isActive;
          tabNode.children[1].active = !isActive;
        }
      };
      MenuTabPanel.prototype.activeTabPanel = function(index) {
        void 0 === index && (index = 0);
        for (var i = 0; i < this.contentList.length; i++) {
          var tabPanel = this.contentList[i];
          var isActive = i === index;
          tabPanel.active = isActive;
        }
      };
      MenuTabPanel.prototype.start = function() {};
      __decorate([ property(cc.Node) ], MenuTabPanel.prototype, "btnGroup", void 0);
      __decorate([ property(cc.Node) ], MenuTabPanel.prototype, "bottleHolderNode", void 0);
      __decorate([ property(cc.Node) ], MenuTabPanel.prototype, "tabList", void 0);
      __decorate([ property(cc.Node) ], MenuTabPanel.prototype, "contentList", void 0);
      MenuTabPanel = __decorate([ ccclass ], MenuTabPanel);
      return MenuTabPanel;
    }(cc.Component);
    exports.default = MenuTabPanel;
    cc._RF.pop();
  }, {} ],
  Shop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39bc6UBZPFGnJS1TAqQo2QB", "Shop");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Global_1 = require("./Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bgPanel = null;
        _this.bottlePanel = null;
        _this.bgShopBtn = null;
        _this.bottleShopBtn = null;
        return _this;
      }
      NewClass.prototype.onLoad = function() {
        this.bgPanel.active = false;
        this.bgShopBtn.color = cc.color(80, 80, 80);
        this.bottlePanel.active = true;
        this.bottleShopBtn.color = cc.color(255, 255, 255);
        var bgID = Global_1.Global.getInstance().userData.backgroundID;
        var bgList = this.bgPanel.children;
        for (var i = 0; i < bgList.length; i++) {
          bgList[i].color = bgID === i ? cc.color(255, 255, 255) : cc.color(80, 80, 80);
          bgList[i].on(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
        }
        var bottleID = 0;
        var bottleList = this.bottlePanel.children;
        for (var i = 0; i < bottleList.length; i++) {
          bottleList[i].color = bottleID === i ? cc.color(255, 255, 255) : cc.color(80, 80, 80);
          bottleList[i].on(cc.Node.EventType.TOUCH_START, this.onBottleItemTouchStart, this);
        }
      };
      NewClass.prototype.close = function() {
        this.node.active = false;
      };
      NewClass.prototype.onBottleItemTouchStart = function(event) {
        event.stopPropagation();
        var bottleList = this.bottlePanel.children;
        for (var i = 0; i < bottleList.length; i++) if (bottleList[i] === event.target) {
          bottleList[i].color = cc.color(255, 255, 255);
          Global_1.Global.getInstance().inGame.setBottle(i);
        } else bottleList[i].color = cc.color(80, 80, 80);
      };
      NewClass.prototype.onBgTouchStart = function(event) {
        event.stopPropagation();
        var bgList = this.bgPanel.children;
        for (var i = 0; i < bgList.length; i++) if (bgList[i] === event.target) {
          bgList[i].color = cc.color(255, 255, 255);
          Global_1.Global.getInstance().userData.backgroundID = i;
          Global_1.Global.getInstance().inGame.setBackground(i);
        } else bgList[i].color = cc.color(80, 80, 80);
      };
      NewClass.prototype.showShopBg = function() {
        this.bgPanel.active = true;
        this.bgShopBtn.color = cc.color(255, 255, 255);
        this.bottlePanel.active = false;
        this.bottleShopBtn.color = cc.color(80, 80, 80);
      };
      NewClass.prototype.showShopBottle = function() {
        this.bgPanel.active = false;
        this.bgShopBtn.color = cc.color(80, 80, 80);
        this.bottlePanel.active = true;
        this.bottleShopBtn.color = cc.color(255, 255, 255);
      };
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Node) ], NewClass.prototype, "bgPanel", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "bottlePanel", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "bgShopBtn", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "bottleShopBtn", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./Global": "Global"
  } ],
  Solution: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73d09vgDYRFL5t9nRaLe+s8", "Solution");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Solution = exports.LevelState = exports.BottleLogic = void 0;
    var MAX_LEVEL = 4;
    var MAX_SOLUTION = 1;
    var BottleLogic = function() {
      function BottleLogic() {
        this.waterColors = [];
      }
      BottleLogic.prototype.isEqual = function(bottleLogic) {
        if (this.waterColors.length != bottleLogic.waterColors.length) return false;
        for (var i = 0; i < this.waterColors.length; i++) if (this.waterColors[i] != bottleLogic.waterColors[i]) return false;
        return true;
      };
      BottleLogic.prototype.remainSpace = function() {
        return MAX_LEVEL - this.waterColors.length;
      };
      BottleLogic.prototype.isEmpty = function() {
        return 0 === this.waterColors.length;
      };
      BottleLogic.prototype.isFull = function() {
        return this.waterColors.length === MAX_LEVEL;
      };
      BottleLogic.prototype.isComplete = function() {
        if (!this.isFull()) return false;
        for (var i = 1; i < this.waterColors.length; i++) if (this.waterColors[0] != this.waterColors[i]) return false;
        return true;
      };
      BottleLogic.prototype.getSameColor = function() {
        if (this.isEmpty()) return 0;
        if (1 === this.waterColors.length) return 1;
        for (var i = 1; i < this.waterColors.length; i++) if (this.waterColors[0] != this.waterColors[i]) return 0;
        return this.waterColors.length;
      };
      BottleLogic.prototype.getNumTopColor = function() {
        if (this.isEmpty()) return 0;
        if (1 === this.waterColors.length) return 1;
        var count = 1;
        var waterLength = this.waterColors.length;
        while (count < waterLength && this.waterColors[waterLength - count] === this.waterColors[waterLength - count - 1]) count++;
        return count;
      };
      BottleLogic.prototype.pourTo = function(bottle) {
        if (this.isComplete()) return false;
        if (bottle.isFull()) return false;
        if (this.isEmpty()) return false;
        if (bottle.isEmpty()) {
          if (this.getSameColor() > 0) return false;
          do {
            bottle.waterColors.push(this.waterColors.pop());
          } while (!this.isEmpty() && this.waterColors[this.waterColors.length - 1] === bottle.waterColors[bottle.waterColors.length - 1]);
          return true;
        }
        if (this.waterColors[this.waterColors.length - 1] != bottle.waterColors[bottle.waterColors.length - 1]) return false;
        if (this.getNumTopColor() <= bottle.remainSpace()) {
          do {
            bottle.waterColors.push(this.waterColors.pop());
          } while (!this.isEmpty() && !bottle.isFull() && this.waterColors[this.waterColors.length - 1] === bottle.waterColors[bottle.waterColors.length - 1]);
          return true;
        }
        return false;
      };
      BottleLogic.prototype.canPourTo = function(bottle) {
        if (this.isComplete()) return false;
        if (bottle.isFull()) return false;
        if (this.isEmpty()) return false;
        if (bottle.isEmpty()) {
          if (this.getSameColor() > 0) return false;
          return true;
        }
        return this.waterColors[this.waterColors.length - 1] == bottle.waterColors[bottle.waterColors.length - 1] && this.getNumTopColor() <= bottle.remainSpace();
      };
      return BottleLogic;
    }();
    exports.BottleLogic = BottleLogic;
    var LevelState = function() {
      function LevelState() {
        this.bottles = [];
      }
      LevelState.prototype.init = function(levelData) {
        MAX_LEVEL = levelData[levelData.length - 1];
        for (var i = 0; i < levelData.length - 1; i++) {
          this.bottles[i] = new BottleLogic();
          this.bottles[i].waterColors = levelData[i].slice();
        }
      };
      LevelState.prototype.isEqual = function(levelState) {
        var dirtList = [];
        for (var i = 0; i < this.bottles.length; i++) {
          var found = false;
          for (var j = 0; j < levelState.bottles.length; j++) {
            var element = levelState.bottles[j];
            if (void 0 === dirtList[j] && this.bottles[i].isEqual(levelState.bottles[j])) {
              dirtList[j] = true;
              found = true;
              break;
            }
          }
          if (!found) return false;
        }
        return true;
      };
      LevelState.prototype.isEqualAt2Bottle = function(levelState, bottleID1, bottleID2) {
        if (this.bottles[bottleID1].isEqual(levelState.bottles[bottleID1]) && this.bottles[bottleID2].isEqual(levelState.bottles[bottleID2])) return true;
        return false;
      };
      LevelState.prototype.clone = function() {
        var levelState = new LevelState();
        for (var i = 0; i < this.bottles.length; i++) {
          levelState.bottles[i] = new BottleLogic();
          levelState.bottles[i].waterColors = this.bottles[i].waterColors.slice();
        }
        return levelState;
      };
      LevelState.prototype.isComplete = function() {
        for (var i = 0; i < this.bottles.length; i++) if (!this.bottles[i].isComplete() && !this.bottles[i].isEmpty()) return false;
        return true;
      };
      LevelState.prototype.isLock = function() {
        for (var i = 0; i < this.bottles.length - 1; i++) for (var j = i + 1; j < this.bottles.length; j++) {
          var elementI = this.bottles[i];
          var elementJ = this.bottles[j];
          if (elementI.canPourTo(elementJ) || elementJ.canPourTo(elementI)) return false;
        }
        return true;
      };
      return LevelState;
    }();
    exports.LevelState = LevelState;
    var Solution = function() {
      function Solution() {
        this.levelState = null;
        this.chainOfState = [];
        this.chainOfAction = [];
        this.solutionCount = 0;
        this.solutionActions = [];
        this.allLevelState = [];
        this.dicDrt = {};
        this.levelFindingID = 0;
      }
      Solution.getInstance = function() {
        this._instance || (this._instance = new Solution());
        return this._instance;
      };
      Solution.prototype.isEnoughSolution = function() {
        return this.solutionCount === MAX_SOLUTION;
      };
      Solution.prototype.initAllLevelState = function(allLevelData) {
        this.allLevelState = [];
        for (var i = 0; i < allLevelData.length; i++) {
          var levelState = new LevelState();
          levelState.init(allLevelData[i]);
          this.allLevelState.push(levelState);
        }
      };
      Solution.prototype.findSameLevel = function(levelId, allLevelData) {
        this.initAllLevelState(allLevelData);
        var result = [ levelId ];
        var findLevelState = this.allLevelState[levelId];
        for (var i = 0; i < this.allLevelState.length; i++) i != levelId && findLevelState.isEqual(this.allLevelState[i]) && result.push(i);
        return result;
      };
      Solution.prototype.countSameLevelFrom = function(levelId) {
        var result = [ levelId ];
        var findLevelState = this.allLevelState[levelId];
        for (var i = levelId + 1; i < this.allLevelState.length; i++) if (findLevelState.isEqual(this.allLevelState[i])) {
          result.push(i);
          this.dicDrt["id" + i] = 1;
        }
        return result;
      };
      Solution.prototype.findAllSameLevel = function(allLevelData) {
        this.initAllLevelState(allLevelData);
        var result = [];
        for (var i = 0; i < this.allLevelState.length - 1; i++) {
          var countArr = this.countSameLevelFrom(i);
          countArr.length > 1 && result.push(countArr);
        }
        return result;
      };
      Solution.prototype.removeSameLevel = function(allLevelData) {
        this.initAllLevelState(allLevelData);
        var i = 0;
        var j = 0;
        while (i < this.allLevelState.length) {
          j = i + 1;
          while (j < this.allLevelState.length) {
            if (this.allLevelState[j].isEqual(this.allLevelState[i])) {
              this.allLevelState.splice(j, 1);
              allLevelData.splice(j, 1);
              j--;
            }
            j++;
          }
          i++;
        }
        cc.sys.localStorage.setItem("allLevelUnique435", JSON.stringify(allLevelData));
        return;
      };
      Solution.prototype.find = function(levelData, levelid) {
        this.levelFindingID = levelid;
        this.solutionCount = 0;
        this.chainOfState = [];
        this.chainOfAction = [];
        this.solutionActions = [];
        this.levelState = new LevelState();
        this.levelState.init(levelData);
        this.chainOfState.push(this.levelState);
        this.findSolutionRECURSIVELY(this.levelState, this.chainOfState);
        if (this.solutionCount > 0) return this.solutionActions[0];
        cc.log("@@@ NOT FOUND SOLUTION");
        cc.log("@@@ FIND FINISH");
        return [];
      };
      Solution.prototype.isContainLevelState = function(levelStateList, desLevelState) {
        for (var i = 0; i < levelStateList.length; i++) if (levelStateList[i].isEqual(desLevelState)) return true;
        return false;
      };
      Solution.prototype.is2BottleBackToOldState = function(levelStateList, desLevelState, bottleID1, bottleID2) {
        for (var i = 0; i < levelStateList.length; i++) if (levelStateList[i].isEqualAt2Bottle(desLevelState, bottleID1, bottleID2)) return true;
        return false;
      };
      Solution.prototype.optimizeCurrentSolution = function() {
        var chainOfActionOptimize = this.chainOfAction.slice();
        var result = [];
        for (var i = 0; i < this.chainOfAction.length - 1; i++) {
          var bottleID = this.chainOfAction[i];
          if (i % 2 === 1 && bottleID === this.chainOfAction[i + 1]) {
            var actionNth = Math.floor(i / 2);
            var stateBeforeActionNth = this.chainOfState[actionNth];
            var stateBeforeActionN2th = this.chainOfState[actionNth + 2];
            stateBeforeActionNth.bottles[bottleID].isEqual(stateBeforeActionN2th.bottles[bottleID]) && result.push(i);
          }
        }
        if (result.length > 0) {
          var index = 0;
          for (var i = 0; i < result.length; i++) {
            chainOfActionOptimize.splice(result[i] - index, 2);
            index += 2;
          }
        }
        return chainOfActionOptimize;
      };
      Solution.prototype.isExistIn = function(num, nums, from, to) {
        for (var i = from; i <= to; i++) if (num === nums[i]) return true;
        return false;
      };
      Solution.prototype.optimizeCurrentSolution2 = function() {
        var chainOfActionOptimize = this.chainOfAction.slice();
        var result = [];
        var i = 1;
        while (i < chainOfActionOptimize.length - 2) {
          var bottleId1 = chainOfActionOptimize[i];
          var j = i + 1;
          while (j < chainOfActionOptimize.length - 1) {
            var bottleId2 = chainOfActionOptimize[j];
            if (bottleId1 === bottleId2) {
              if (j % 2 === 1) break;
              if (chainOfActionOptimize[i - 1] === chainOfActionOptimize[j + 1]) break;
              if (this.isExistIn(chainOfActionOptimize[j + 1], chainOfActionOptimize, i, j)) break;
              var actionI = Math.floor(i / 2);
              var actionJ = Math.floor(j / 2);
              var stateBeforeActionI = this.chainOfState[actionI];
              var stateAfterActionJ = this.chainOfState[actionJ + 1];
              stateBeforeActionI.bottles[bottleId1].isEqual(stateAfterActionJ.bottles[bottleId1]) && result.push([ i, j ]);
            }
            j += 1;
          }
          i += 2;
        }
        if (result.length > 0) {
          cc.log("@@@ optimize level " + (this.levelFindingID + 1) + " : " + result.toString());
          for (var i_1 = 0; i_1 < result.length; i_1++) {
            chainOfActionOptimize[result[i_1][0]] = chainOfActionOptimize[result[i_1][1] + 1];
            chainOfActionOptimize[result[i_1][1]] = -1;
            chainOfActionOptimize[result[i_1][1] + 1] = -1;
          }
          var j = 0;
          while (j < chainOfActionOptimize.length) -1 === chainOfActionOptimize[j] ? chainOfActionOptimize.splice(j, 1) : j++;
        }
        return chainOfActionOptimize;
      };
      Solution.prototype.findSolutionRECURSIVELY = function(levelState, chainOfState) {
        if (this.isEnoughSolution()) return false;
        if (levelState.isComplete()) {
          this.solutionCount++;
          this.solutionActions.push(this.optimizeCurrentSolution2());
          return true;
        }
        if (levelState.isLock()) return false;
        var result = false;
        for (var i = 0; i < levelState.bottles.length - 1; i++) for (var j = i + 1; j < levelState.bottles.length; j++) {
          var x = 0;
          var y = 0;
          if (levelState.bottles[i].getSameColor() <= levelState.bottles[j].getSameColor()) {
            x = i;
            y = j;
          } else {
            x = j;
            y = i;
          }
          var levelStateClone = levelState.clone();
          var elementX = levelStateClone.bottles[x];
          var elementY = levelStateClone.bottles[y];
          if (elementX.pourTo(elementY) && !this.isContainLevelState(chainOfState, levelStateClone)) {
            chainOfState.push(levelStateClone);
            this.chainOfAction.push(x, y);
            result = this.findSolutionRECURSIVELY(levelStateClone, chainOfState);
            chainOfState.pop();
            this.chainOfAction.pop();
            this.chainOfAction.pop();
          }
          var levelStateClone2 = levelState.clone();
          var elementX2 = levelStateClone2.bottles[x];
          var elementY2 = levelStateClone2.bottles[y];
          if (elementY2.pourTo(elementX2) && !this.isContainLevelState(chainOfState, levelStateClone2)) {
            chainOfState.push(levelStateClone2);
            this.chainOfAction.push(y, x);
            result = this.findSolutionRECURSIVELY(levelStateClone2, chainOfState);
            chainOfState.pop();
            this.chainOfAction.pop();
            this.chainOfAction.pop();
          }
        }
        return result;
      };
      Solution._instance = null;
      return Solution;
    }();
    exports.Solution = Solution;
    cc._RF.pop();
  }, {} ],
  Tools: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2d5ecXKWElE+a+dRwPw7Yi4", "Tools");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Tools = void 0;
    var Global_1 = require("./Global");
    var Solution_1 = require("./Solution");
    var Tools = function() {
      function Tools() {
        this.maxBottles = 0;
        this.maxColors = 0;
      }
      Tools.getInstance = function() {
        this._instance || (this._instance = new Tools());
        return this._instance;
      };
      Tools.prototype.remove0 = function(bottleData) {
        while (0 === bottleData[0]) bottleData.splice(0, 1);
      };
      Tools.prototype.reverseAndDescrease = function(bottleData) {
        for (var i = 0; i < Math.floor(bottleData.length / 2); i++) {
          var temp = bottleData[i] - 1;
          bottleData[i] = bottleData[bottleData.length - 1 - i] - 1;
          bottleData[bottleData.length - 1 - i] = temp;
        }
        bottleData.length % 2 === 1 && (bottleData[Math.floor(bottleData.length / 2)] -= 1);
      };
      Tools.prototype.changeColorIndex = function(level) {
        var newColorId = 0;
        var dic = {};
        for (var i = 0; i < level.length; i++) {
          var bottleData = level[i];
          for (var j = 0; j < bottleData.length; j++) {
            var colorId = bottleData[j];
            if (void 0 === dic["color" + colorId]) {
              dic["color" + colorId] = newColorId;
              newColorId++;
            }
            bottleData[j] = dic["color" + colorId];
          }
        }
      };
      Tools.prototype.modifyLevels = function(levelData) {
        for (var i = 0; i < levelData.length; i++) {
          var level = levelData[i];
          var numLevelWater = level[0].length;
          for (var j = 0; j < level.length; j++) {
            var bottleData = level[j];
            this.remove0(bottleData);
            this.reverseAndDescrease(bottleData);
          }
          this.changeColorIndex(level);
          level.push(numLevelWater);
        }
      };
      Tools.prototype.convertLevelData = function() {
        var _this = this;
        var levelUrl = "levelListAll";
        cc.resources.load(levelUrl, function(err, file) {
          var levelData;
          try {
            levelData = JSON.parse(file.text);
            _this.modifyLevels(levelData);
            cc.sys.localStorage.setItem("levelDataAll", JSON.stringify(levelData));
          } catch (e) {
            cc.log("@@@ Parse JSON File Error");
            cc.log(e);
          }
        });
      };
      Tools.prototype.numColorOnEachLevel = function(level) {
        var dic = {};
        for (var i = 0; i < level.length; i++) {
          var bottleData = level[i];
          for (var j = 0; j < bottleData.length; j++) {
            var element = bottleData[j];
            dic["color" + bottleData[j]] = 1;
          }
        }
        return Object.keys(dic).length;
      };
      Tools.prototype.countMax = function(levelData) {
        for (var i = 0; i < levelData.length; i++) {
          var level = levelData[i];
          level.length > this.maxBottles && (this.maxBottles = level.length);
          var numColorOnLevel = this.numColorOnEachLevel(level);
          numColorOnLevel > this.maxColors && (this.maxColors = numColorOnLevel);
        }
        cc.log("@@@ maxBottles : " + this.maxBottles);
        cc.log("@@@ maxColors : " + this.maxColors);
      };
      Tools.prototype.countMaxBottleAndColorOnEachLevel = function() {
        var _this = this;
        var levelUrl = "levelDataAll";
        cc.resources.load(levelUrl, function(err, file) {
          var levelData;
          try {
            levelData = JSON.parse(file.text);
            _this.countMax(levelData);
          } catch (e) {
            cc.log("@@@ Parse JSON File Error");
            cc.log(e);
          }
        });
      };
      Tools.prototype.countLevelType = function() {
        var _this = this;
        var levelUrl = "levelDataAll";
        cc.resources.load(levelUrl, function(err, file) {
          var levelData;
          try {
            levelData = JSON.parse(file.text);
            _this.countNumLevelType(levelData);
          } catch (e) {
            cc.log("@@@ Parse JSON File Error");
            cc.log(e);
          }
        });
      };
      Tools.prototype.countNumLevelType = function(levelData) {
        return 0;
      };
      Tools.prototype.findAllLevelSolution = function() {
        var allSolution = [];
        var numLevel = Global_1.Global.getInstance().inGame.gameLevels.getMaxLevel();
        for (var i = 0; i < numLevel; i++) {
          var levelData = Global_1.Global.getInstance().inGame.gameLevels.getLevel(i);
          allSolution.push(Solution_1.Solution.getInstance().find(levelData, i));
        }
        cc.sys.localStorage.setItem("allSolution", JSON.stringify(allSolution));
      };
      Tools._instance = null;
      return Tools;
    }();
    exports.Tools = Tools;
    cc._RF.pop();
  }, {
    "./Global": "Global",
    "./Solution": "Solution"
  } ]
}, {}, [ "AssistiveButton", "Bottle", "DropWater", "Game", "GameLevels", "Global", "InGame", "LevelItem", "LevelPanel", "Loading", "MenuTabPanel", "Shop", "Solution", "Tools" ]);