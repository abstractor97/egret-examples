/**
 * @copyright www.egret.com
 * @author city
 * @desc 任何显示对象都可以作为其他显示对象的遮罩。
 *      显示对象作为遮罩后，就好像在屏幕的垂直方向有一个直射光源对齐投射产生影子
 *      。被遮罩的显示对象只能显示遮罩被投射后的影子区域。
 */

class Main extends egret.DisplayObjectContainer {
    private _shpBeMask: egret.Shape;
    private _bird: egret.Bitmap;
    private _txInfo: egret.TextField;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/cartoon-egret_00.png");
    }
    private imgLoadHandler(evt: egret.Event) {
        /// 用以被遮罩的形状
        this._shpBeMask = new egret.Shape;
        this._shpBeMask.graphics.lineStyle(0x000000)
        this._shpBeMask.graphics.beginFill(this.getRdmClr());
        this._shpBeMask.graphics.drawEllipse(0, 0, 200, 300);
        this._shpBeMask.graphics.endFill();
        this._shpBeMask.x = (this.stage.stageWidth - 200) / 2;
        this._shpBeMask.y = (this.stage.stageHeight - 300) / 2;
        this.addChild(this._shpBeMask);

        /// 展示用显示对象： 白鹭小鸟
        var data = evt.currentTarget.data
        var texture = new egret.Texture();
        texture.bitmapData = data;
        this._bird = new egret.Bitmap(texture);
        var wHalfBird: number = this._bird.width / 2;
        var hHalfBird: number = this._bird.height / 2;
        this._bird.anchorOffsetX = wHalfBird;
        this._bird.anchorOffsetY = hHalfBird;
        /// 给一个随机的初始位置
        this._bird.x = wHalfBird + (this.stage.stageWidth - wHalfBird * 2) * Math.random();
        this._bird.y = hHalfBird + (this.stage.stageHeight - hHalfBird * 2) * Math.random();
        this.addChild(this._bird);

        /// 提示信息
        this._txInfo = new egret.TextField;
        this.addChildAt(this._txInfo, 0);
        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.width = this.stage.stageWidth - 100;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0x000000;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.touchEnabled = true;
        this._txInfo.text = "接触屏幕后白鹭小鸟将变为椭圆形状的遮罩区域，可以移动手指（白鹭小鸟）并观察椭圆在遮罩下的显示变化";
        this.launchMask();
    }
    private getRdmClr(): number {
        return (Math.floor(Math.random() * 0xff) << 16)
            + (Math.floor(Math.random() * 0xff) << 8)
            + Math.floor(Math.random() * 0xff);
    }
    private launchMask(): void {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
    }
    private touchHandler(evt: egret.TouchEvent) {
        switch (evt.type) {
            case egret.TouchEvent.TOUCH_MOVE:
                this.updateBird(evt.stageX, evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_BEGIN:
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                this.stage.once(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                /*** 本示例关键代码段开始 ***/
                this._shpBeMask.mask = this._bird;
                /*** 本示例关键代码段结束 ***/
                this.updateBird(evt.stageX, evt.stageY);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
                this._shpBeMask.mask = null;
                this._bird.$maskedObject = null;
                break;
        }
    }
    private updateBird(stageX: number, stageY: number): void {
        /// 小鸟同步手指位置
        this._bird.x = stageX;
        this._bird.y = stageY;
    }
}
