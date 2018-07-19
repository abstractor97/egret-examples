/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 贝塞尔曲线示例。
 *      拖动舞台上圆点，可以查看贝塞尔曲线不同的显示。
 */

class Main extends egret.DisplayObjectContainer {
  private _shape:egret.Shape;
  private _startShape:egret.Shape;
  private _control:egret.Shape;
  private _anchor:egret.Shape;
  private drapShape:egret.Shape;

  public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }
  private onAddToStage(event: egret.Event) {
      this._shape = new egret.Shape();
      this.addChild(this._shape);
      
      this.init();
              
      this.initGraphics();
  }

  private init():void {
      this._startShape = this.initShape(140, 400, 0xffff00);
      this._control = this.initShape(340, 200, 0xff0000);
      this._anchor = this.initShape(480, 500, 0x000ff0);
  }

  //初始化赋值
  private initGraphics(): void {
      var shape: egret.Shape = this._shape;
      /*** 本示例关键代码段开始 ***/
      shape.graphics.lineStyle(3, 0xff0ff0);
      shape.graphics.moveTo(140, 400);
      shape.graphics.curveTo(340, 200, 480, 500);
      /*** 本示例关键代码段结束 ***/
  }

  private initShape(x:number, y:number, color:number):egret.Shape {
      var shape:egret.Shape = new egret.Shape();
      shape.graphics.beginFill(color);
      shape.graphics.drawCircle(0, 0, 20);
      shape.graphics.endFill();
      this.addChild(shape);
      shape.x = x;
      shape.y = y;
      shape.touchEnabled = true;
      shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
      return shape;
  }
  private onBeginHandler(e:egret.TouchEvent):void {
      e.stopImmediatePropagation();
      
      this.drapShape = <egret.Shape>e.currentTarget;
      this.drapShape.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
      
      this.drapShape.touchEnabled = false;
      
      this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
      this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
  }    
   private onMoveHandler(e:egret.TouchEvent):void {
      this.drapShape.x = e.stageX;
      this.drapShape.y = e.stageY;
      
      this.resetCure();
  }
  
  private onEndHandler(e:egret.TouchEvent):void {
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveHandler, this);
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndHandler, this);
      
      this.drapShape.touchEnabled = true;;
      
      this.drapShape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginHandler, this);
  }

  private resetCure():void {
      var shape: egret.Shape = this._shape;
      /*** 本示例关键代码段开始 ***/
      shape.graphics.clear();
      shape.graphics.lineStyle(3, 0xff0ff0);
      shape.graphics.moveTo(this._startShape.x, this._startShape.y);
      shape.graphics.curveTo(this._control.x, this._control.y, this._anchor.x, this._anchor.y);
      /*** 本示例关键代码段结束 ***/
  }
}
