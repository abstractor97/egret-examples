var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AnimModes = (function () {
    function AnimModes() {
    }
    AnimModes.ANIM_ROT = 0;
    AnimModes.ANIM_SCALE = 1;
    return AnimModes;
}());
__reflect(AnimModes.prototype, "AnimModes");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load('resource/assets/cartoon-egret_00.png');
    };
    Main.prototype.imgLoadHandler = function (evt) {
        /// 展示用显示对象： 白鹭小鸟
        var data = evt.currentTarget.data;
        var texture = new egret.Texture();
        texture.bitmapData = data;
        this._bird = new egret.Bitmap(texture);
        this.addChild(this._bird);
        this._bird.anchorOffsetX = this._bird.width / 2;
        this._bird.anchorOffsetY = this._bird.height / 2;
        this._bird.x = this.stage.stageWidth / 2;
        this._bird.y = this.stage.stageHeight * 0.618;
        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);
        this._txInfo.size = 28; /* private _txInfo:egret.TextField; */
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this.launchAnimations();
    };
    Main.prototype.launchAnimations = function () {
        var _this = this;
        this._iAnimMode = AnimModes.ANIM_ROT;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._iAnimMode = (_this._iAnimMode + 1) % 3;
        }, this);
        this._nScaleBase = 0;
        /// 根据当前模式调整旋转度数或缩放正弦基数形成相应动画
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            /*** 本示例关键代码段开始 ***/
            switch (_this._iAnimMode) {
                case AnimModes.ANIM_ROT:/// 仅旋转
                    _this._bird.rotation += Main.STEP_ROT;
                    break;
                case AnimModes.ANIM_SCALE:/// 仅缩放，缩放范围 0.5~1
                    _this._bird.scaleX = _this._bird.scaleY = 0.5 + 0.5 * Math.abs(Math.sin(_this._nScaleBase += Main.STEP_SCALE));
                    break;
            }
            /*** 本示例关键代码段结束 ***/
            _this._txInfo.text =
                "旋转角度:" + _this._bird.rotation
                    + "\n缩放比例:" + _this._bird.scaleX.toFixed(2)
                    + "\n\n轻触进入" + (["缩放", "静止", "旋转"][_this._iAnimMode]) + "模式";
            return false; /// 友情提示： startTick 中回调返回值表示执行结束是否立即重绘
        }, this);
    };
    Main.STEP_ROT = 3;
    Main.STEP_SCALE = .03;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map