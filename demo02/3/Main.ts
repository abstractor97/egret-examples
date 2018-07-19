/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 本示例基于画弧api，实现圆形遮罩功能。
 */

class Main extends egret.DisplayObjectContainer {
    private _shape: egret.Shape;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.initGraphics();

        this.changeGraphics();
    }   

    //初始化赋值
    private initGraphics(): void {
        var shape: egret.Shape = this._shape = new egret.Shape();
        shape.x = this.stage.stageWidth / 2;
        shape.y = this.stage.stageHeight / 2;
        this.addChild(shape);
        
        var bitmap:egret.Bitmap = new egret.Bitmap();
        this.addChild(bitmap);
        bitmap.width = 228;
        bitmap.height = 380;
        bitmap.x = shape.x - bitmap.width / 2;
        bitmap.y = shape.y - bitmap.height / 2;
        
        bitmap.mask = shape;    
        
        var loader:egret.ImageLoader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e:egret.Event) {
            var data = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = data;
            bitmap.texture = texture;
        }, this);
        
        loader.load("resource/assets/cartoon-egret_00.png");
    }

    //轻触修改属性
    private changeGraphics(): void {
        var shape: egret.Shape = this._shape;
        
        /*** 本示例关键代码段开始 ***/
        var angle:number = 0;
        var i:number = 1;
        egret.startTick(function (timeStamp:number):boolean {
            changeGraphics(angle);
            angle += 1;
            if (angle >= 360) {
                angle = angle % 360;
                i *= -1;
            }

            return false;
        }, this);

        function changeGraphics(angle:number):void {
            shape.graphics.clear();

            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(200, 0);
            shape.graphics.drawArc(0, 0, 200, 0, angle * Math.PI / 180, i == -1);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
        /*** 本示例关键代码段结束 ***/
    }

}
