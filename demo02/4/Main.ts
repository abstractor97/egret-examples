/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 绘制圆形矢量，点击舞台，会在点击位置出现一个随机圆。
 */

class Main extends egret.DisplayObjectContainer {
  public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event: egret.Event) {
     this.drawCircle(this.stage.stageWidth / 4, this.stage.stageHeight / 2);
     this.initGraphics(this.stage.stageWidth, this.stage.stageHeight / 2);
     this.drawRect(this.stage.stageWidth / 2, this.stage.stageHeight / 2);
  }   

  private drawCircle(x:number, y:number):void {
      var shape:egret.Shape = new egret.Shape();
      shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
      shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
      shape.graphics.drawCircle(x, y, Math.random() * 50 + 50);
      shape.graphics.endFill();
      this.addChild(shape);
  }

   //初始化赋值
  private initGraphics(x:number, y:number):void {
      var shape:egret.Shape = new egret.Shape();
      /*** 本示例关键代码段开始 ***/
      shape.graphics.lineStyle(10, 0xff00ff);
      shape.graphics.moveTo(320, 400);
      shape.graphics.lineTo(x + 120, y + 20);
      /*** 本示例关键代码段结束 ***/
      this.addChild(shape);
  }

   private drawRect(x:number, y:number):void {
      var shape:egret.Shape = new egret.Shape();
      var w:number = Math.random() * 200 + 100;
      var h:number = Math.random() * 200 + 100;
      /*** 本示例关键代码段开始 ***/
      shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
      shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
      shape.graphics.drawRect(x - w / 2, y - h / 2, w, h);
      shape.graphics.endFill();
      /*** 本示例关键代码段结束 ***/
      this.addChild(shape);
  }
}
