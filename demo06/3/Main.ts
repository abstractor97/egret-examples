/**
 * @copyright www.egret.com
 * @author dily
 * @desc 定时器
 *      定时器示例，指针按照定时每次旋转6度，60秒旋转一周
 */

class Main extends egret.DisplayObjectContainer {

  private _txInfo: egret.TextField;
  private timer: egret.Timer
  public constructor() {
      super();

      this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }
  
  private pointer = new egret.Shape();
  private onAddToStage(event:egret.Event) {
      /*** 生成表盘 ***/
      var circle = new egret.Shape();
      circle.graphics.lineStyle(5, 0x000000, 1, true)
      circle.graphics.drawCircle(0,0,170);
      circle.graphics.endFill();
      circle.x = this.stage.stageWidth / 2;
      circle.y = this.stage.stageHeight / 2;
      this.addChild(circle);

      /*** 生成指针 ***/
      this.pointer = new egret.Shape();
      this.pointer.graphics.beginFill(0x000000);
      this.pointer.graphics.drawRect(0, 0, 160, 5);
      this.pointer.graphics.endFill();
      this.pointer.anchorOffsetY = this.pointer.height / 2;
      this.pointer.x = this.stage.stageWidth / 2 ;
      this.pointer.y = this.stage.stageHeight / 2;
      this.addChild(this.pointer);

      /// 提示信息
      this._txInfo = new egret.TextField;
      this._txInfo.size = 24;
      this._txInfo.textColor = 0x000000;
      this._txInfo.lineSpacing = 10;
      this._txInfo.multiline = true;
      this._txInfo.text = "定时器示例\n点击舞台启动或者暂停定时器\n";
      this._txInfo.x = 30;
      this._txInfo.y = 30;
      this.addChild(this._txInfo);

      var self = this;

      /*** 本示例关键代码段开始 ***/
      this.timer = new egret.Timer(1000, 0);

      this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
      
      this.timer.start();
      /*** 点击舞台的时候会调用延迟方法 ***/
      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
          if(this.timer.running){
              this._txInfo.text += "定时器关闭！\n";
              this.timer.stop();
          }else{
              this._txInfo.text += "定时器启动！\n";
              this.timer.start();
          }
      }, this); 
      /*** 本示例关键代码段结束 ***/
  }

  private timerFunc(event: egret.Event) {
      this.pointer.rotation += 6;
      if(this.pointer.rotation > 360){
          this.pointer.rotation -= 360;
      }
  }

}


