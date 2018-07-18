
class Main extends egret.DisplayObjectContainer {
    private _bird: egret.Bitmap;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load('resource/assets/cartoon-egret_00.png');
    }

    private imgLoadHandler(evt: egret.Event): void {
        /// 展示用显示对象： 白鹭小鸟
        var data = evt.currentTarget.data
        var texture = new egret.Texture();
        texture.bitmapData = data;
        this._bird = new egret.Bitmap(texture);
        this.addChild(this._bird);
        this._bird.anchorOffsetX = this._bird.width / 2;
        this._bird.anchorOffsetY = this._bird.height / 2;
        this._bird.x = this.stage.stageWidth / 2;
        this._bird.y = this.stage.stageHeight * 0.618;
    }
}