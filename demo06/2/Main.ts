/**
 * @copyright www.egret.com
 * @author dily
 * @desc 延迟调用
 *      点击舞台，将会触发延迟调用，每个字符延迟150毫秒调用，实现打字机效果
 */

class Main extends egret.DisplayObjectContainer {

  private _txInfo: egret.TextField;
  public constructor() {
      super();

      this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private isComplete: boolean;
  private onAddToStage(event:egret.Event) {
      /// 提示信息
      this._txInfo = new egret.TextField;
      this._txInfo.size = 24;
      this._txInfo.textColor = 0x000000;
      this._txInfo.lineSpacing = 10;
      this._txInfo.multiline = true;
      this._txInfo.text = "延迟调用示例\n点击舞台显示效果\n";
      this._txInfo.x = 30;
      this._txInfo.y = 30;
      this.addChild(this._txInfo);

      var self = this;
      self.isComplete = true;

      var backFun: Function = function() {
          self.isComplete = true;
      };

      /*** 点击舞台的时候会调用延迟方法 ***/
      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
          /*** 本示例关键代码段开始 ***/
          if (self.isComplete){
              self.isComplete = false;
              this.typerEffect(this._txInfo, "每个字符延迟150毫秒调用，实现打字机效果\n", 150, backFun);
          }
          /*** 本示例关键代码段结束 ***/
      }, this); 

      
  }

  /**
  * 文字打字机效果
  * obj           文本对象
  * content       文字
  * interval      打字间隔 毫秒
  */    
  private typerEffect(obj,content:string = "",interval:number = 200,backFun:Function = null):void{
      var strArr:Array<any> = content.split("");
      var len:number = strArr.length;
      for (var i = 0; i < len; i++){
          egret.setTimeout(function () {              
              obj.appendText(strArr[Number(this)]);
              if ((Number(this) >= len - 1) && (backFun != null)) {
                  backFun();
              }
          }, i, interval*i);              
      }
  }
}


