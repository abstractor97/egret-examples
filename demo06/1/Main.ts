/**
 * @copyright www.egret.com
 * @author dily
 * @desc 动态帧频
 *      在输入框中设置项目的帧频，点击舞台的时候设置项目的帧频
 */

class Main extends egret.DisplayObjectContainer {

  private textInput: egret.TextField;
  private textTips: egret.TextField;
  public constructor() {
      super();

      this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event:egret.Event) {
      var imgLoader:egret.ImageLoader = new egret.ImageLoader;
      imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
      imgLoader.load("resource/assets/cartoon-egret_00.png");
  }

  private imgLoadHandler(event:egret.Event) {
      /*** 先初始化1个白鹭小鸟 ***/
      var data = event.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = data;
      var egretBird: egret.Bitmap = new egret.Bitmap(texture);
      egretBird.anchorOffsetX = egretBird.width/2;
      egretBird.anchorOffsetY = egretBird.height/2;
      egretBird.x = this.stage.stageWidth/2;
      egretBird.y = this.stage.stageHeight/2 + 50;
      this.addChild(egretBird);
      egretBird.touchEnabled = false;

      // 输入帧频
      this.textInput = new egret.TextField;
      this.textInput.size = 50;
      this.textInput.type = "input";
      this.textInput.width = 300;
      this.textInput.height = 60;
      this.textInput.border = true;
      this.textInput.borderColor = 0x000000;
      this.textInput.textAlign = egret.HorizontalAlign.CENTER;
      this.textInput.textColor = 0x77787b;
      this.textInput.text = "输入帧频";
      this.textInput.x = this.stage.stageWidth / 2 - this.textInput.width / 2;
      this.textInput.y = 200;
      this.textInput.touchEnabled = true;
      this.addChild(this.textInput);

      // 提示信息
      this.textTips = new egret.TextField;
      this.textTips.size = 24;
      this.textTips.textAlign = egret.HorizontalAlign.CENTER;
      this.textTips.textColor = 0x843900;
      this.textTips.text = "点击舞台的时候设置项目的帧频";
      this.textTips.x = this.stage.stageWidth / 2 - this.textTips.width / 2;
      this.textTips.y = this.stage.stageHeight - 100;
      this.addChild(this.textTips);

      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
          /*** 点击舞台的时候设置项目的帧频 ***/
          this.stage.frameRate = Number(this.textInput.text);
          /*** 本示例关键代码段结束 ***/
      }, this); 

      this.textInput.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
          this.textInput.text = "";
          this.textInput.textColor = 0x000000;
      }, this); 
     
      //白鹭小鸟不停旋转
      this.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
          egretBird.rotation += 3;
      }, this ); 
  }


}


