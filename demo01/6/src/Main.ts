/**
 * @copyright www.egret.com
 * @author dily
 * @desc 向一个容器中添加或者删除一个显示对象。
 *      整个示例分四个区域，如果当前区域有对象点击则移除，如果没有显示对象则添加
 *      一个显示对象。
 */

class Main extends egret.DisplayObjectContainer {
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
        // 存储加载完毕的数据
        var data = evt.currentTarget.data;
        /*** 先初始化三个白鹭小鸟 ***/
        var texture = new egret.Texture();
        texture.bitmapData = data;
        var upBird: egret.Bitmap = new egret.Bitmap(texture);
        upBird.x = this.stage.stageWidth / 2 - upBird.width / 2;
        upBird.y = this.stage.stageHeight/2 - upBird.height/2;
        upBird.touchEnabled = true;
        upBird.pixelHitTest = true;
        this.addChild(upBird);

        var leftBird: egret.Bitmap = new egret.Bitmap(texture);
        leftBird.x = this.stage.stageWidth / 2 - leftBird.width;
        leftBird.y = this.stage.stageHeight / 2 - leftBird.height / 2;
        leftBird.touchEnabled = true;
        leftBird.pixelHitTest = true;
        this.addChild(leftBird);

        var rightBird: egret.Bitmap = new egret.Bitmap(texture);
        rightBird.x = this.stage.stageWidth / 2 ;
        rightBird.y = this.stage.stageHeight / 2 - rightBird.height / 2;
        rightBird.touchEnabled = true;
        rightBird.pixelHitTest = true;
        this.addChild(rightBird);


        /*** 以下代码三个按钮添加监听事件 ***/
        upBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(upBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this);

        leftBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(leftBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this);

        rightBird.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            this.setChildIndex(rightBird, this.numChildren - 1);
            /*** 本示例关键代码段结束 ***/
        }, this);
    }
}
