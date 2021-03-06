/**
 * @copyright www.egret.com
 * @author dily
 * @desc 区分两个不同的容器
 *      点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动
 */

class Main extends egret.DisplayObjectContainer {
    private _txInfo:egret.TextField;
    private leftTF:egret.TextField;
    private rightTF:egret.TextField;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/assets/cartoon-egret_00.png");
    }
    private imgLoadHandler(evt: egret.Event):void{
        // 存储加载完毕的数据
        var data = evt.currentTarget.data;
        /*** 先初始化三个白鹭小鸟 ***/
        var texture = new egret.Texture();
        texture.bitmapData = data;
        var egretBird: egret.Bitmap = new egret.Bitmap(texture);
        egretBird.x = this.stage.stageWidth / 2 - egretBird.width / 2;
        egretBird.y = this.stage.stageHeight / 2 + 50;
        this.addChild(egretBird);
        egretBird.touchEnabled = false;

        /*** 按钮生成代码 ***/
        this.leftTF = new egret.TextField;
        this.leftTF.size = 28;
        this.leftTF.textAlign = egret.HorizontalAlign.CENTER;
        this.leftTF.textColor = 0xffffff;
        this.leftTF.background = true;
        this.leftTF.backgroundColor = 0xd71345;
        this.leftTF.text = "红色容器";
        this.leftTF.x = this.stage.stageWidth/4 - this.leftTF.width/2;
        this.leftTF.y = 120;
        this.leftTF.touchEnabled = true;
        this.addChild(this.leftTF);

        this.rightTF = new egret.TextField;
        this.rightTF.size = 28;
        this.rightTF.textAlign = egret.HorizontalAlign.CENTER;
        this.rightTF.textColor = 0xffffff;
        this.rightTF.background = true;
        this.rightTF.backgroundColor = 0x102b6a;
        this.rightTF.text = "蓝色容器";
        this.rightTF.x = this.stage.stageWidth/2 + this.stage.stageWidth/4 - this.rightTF.width/2;
        this.rightTF.y = 120;
        this.rightTF.touchEnabled = true;
        this.addChild(this.rightTF);

        var leftCon = new egret.DisplayObjectContainer();
        this.addChild(leftCon);

        var leftCage = new egret.Shape();
        leftCage.graphics.lineStyle(10, 0xd71345, 1, true)
        leftCage.graphics.lineTo(0,0);
        leftCage.graphics.lineTo(250,0);
        leftCage.graphics.lineTo(250,250);
        leftCage.graphics.lineTo(0,250);
        leftCage.graphics.lineTo(0,0);
        leftCage.graphics.endFill();
        leftCon.addChild(leftCage);

        leftCon.x = this.stage.stageWidth / 4 - leftCon.width / 2;
        leftCon.y = 200;
        
        var rightCon = new egret.DisplayObjectContainer();
        this.addChild(rightCon);

        var rightCage = new egret.Shape();
        rightCage.graphics.lineStyle(10, 0x102b6a, 1, true)
        rightCage.graphics.lineTo(0, 0);
        rightCage.graphics.lineTo(250, 0);
        rightCage.graphics.lineTo(250, 250);
        rightCage.graphics.lineTo(0, 250);
        rightCage.graphics.lineTo(0, 0);
        rightCage.graphics.endFill();
        rightCon.addChild(rightCage);

        rightCon.x = this.stage.stageWidth / 2 + this.stage.stageWidth / 4 - rightCon.width / 2;
        rightCon.y = 200;

        /// 提示信息
        this._txInfo = new egret.TextField;
        this._txInfo.size = 28;
        this._txInfo.width = 550;
        this._txInfo.textAlign = egret.HorizontalAlign.CENTER;
        this._txInfo.textColor = 0x000000;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;
        this._txInfo.text = "点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动";
        this._txInfo.x = this.stage.stageWidth/2 - this._txInfo.width/2;
        this._txInfo.y = 10;
        this.addChild( this._txInfo );

        /*** 以下代码两个按钮添加监听事件 ***/
        this.leftTF.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            if (this.getChildIndex(egretBird) != -1) {
                this.removeChild(egretBird);
                leftCon.addChild(egretBird);
                egretBird.x = leftCage.width/2 - egretBird.width/2;
                egretBird.y = leftCage.height / 2 - egretBird.height / 2;
            } else if (rightCon.getChildIndex(egretBird) != -1) {
                rightCon.removeChild(egretBird);
                leftCon.addChild(egretBird);
                egretBird.x = leftCage.width / 2 - egretBird.width / 2;
                egretBird.y = leftCage.height / 2 - egretBird.height / 2;
            } 
            leftCon.touchEnabled = true;
            rightCon.touchEnabled = false;
            /*** 本示例关键代码段结束 ***/
        }, this);

        this.rightTF.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            /*** 本示例关键代码段开始 ***/
            if (this.getChildIndex(egretBird) != -1) {
                this.removeChild(egretBird);
                rightCon.addChild(egretBird);
                egretBird.x = rightCage.width / 2 - egretBird.width / 2;
                egretBird.y = rightCage.height / 2 - egretBird.height / 2;
            } else if (leftCon.getChildIndex(egretBird) != -1) {
                leftCon.removeChild(egretBird);
                rightCon.addChild(egretBird);
                egretBird.x = rightCage.width / 2 - egretBird.width / 2;
                egretBird.y = rightCage.height / 2 - egretBird.height / 2;
            }
            leftCon.touchEnabled = false;
            rightCon.touchEnabled = true;
            /*** 本示例关键代码段结束 ***/
        }, this); 

         /*** 对于两个容器添加拖动代码 ***/
        var leftDrag: boolean = false;
        var rightDrag: boolean = false;
        leftCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            leftDrag = true;
        }, this); 
        leftCon.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            leftDrag = false;
        }, this); 
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            if(leftDrag){
                leftCon.x = e.stageX - leftCage.width/2;
                leftCon.y = e.stageY - leftCage.height/2;
            }
        }, this); 

        rightCon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            rightDrag = true;
        }, this); 
        rightCon.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            rightDrag = false;
        }, this); 
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            if(rightDrag){
                rightCon.x = e.stageX - rightCage.width/2;
                rightCon.y = e.stageY - rightCage.height/2;
            }
        }, this); 
    }
}
