/**
 * @copyright www.egret.com
 * @author dily
 * @desc 向一个容器中添加或者删除一个显示对象。
 *      整个示例分四个区域，如果当前区域有对象点击则移除，如果没有显示对象则添加
 *      一个显示对象。
 */

class Main extends egret.DisplayObjectContainer {
    private _txInfo:egret.TextField;

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
    }
    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/cartoon-egret_00.png");
    }
    private imgLoadHandler(evt: egret.Event) {
        // 存储加载完毕的数据
        var data = evt.currentTarget.data;

        /*** 以下代码使用shape和graphics ***/
        var upLeft = new egret.Shape();
        upLeft.graphics.beginFill(0xf7acbc);
        upLeft.graphics.drawRect(0, 0, this.stage.stageWidth/2, this.stage.stageHeight/2);
        upLeft.graphics.endFill();
        upLeft.touchEnabled = true;
        upLeft.x = 0;
        upLeft.y = 0;
        this.addChild(upLeft);

        /*** 先初始化白鹭小鸟 ***/
        var texture = new egret.Texture();
        texture.bitmapData = data;
        var upLeftBird:egret.Bitmap = new egret.Bitmap( texture );
        upLeftBird.x = upLeft.x + upLeft.width/2 - upLeftBird.width/2;
        upLeftBird.y = upLeft.y + upLeft.height/2 - upLeftBird.height/2;

        /*** 以下代码四个区域添加监听事件 ***/
        upLeft.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            /*** 本示例关键代码段开始 ***/
            if(this.contains(upLeftBird)){
                this.removeChild(upLeftBird);
            }else{
                this.addChild(upLeftBird);
            }
            /*** 本示例关键代码段结束 ***/
        }, this );      
    }
}
