/**
 * @copyright www.egret.com
 * @author A闪
 * @desc 显示对象拖拽实例，点击显示元素开始拖拽，释放鼠标（或者抬起触摸手指）结束
 *      拖拽操作。
 */


class Main extends egret.DisplayObjectContainer {
  private _txInfo: egret.TextField;
  private _bgInfo: egret.Shape;

  public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event: egret.Event) {
      var imgLoader: egret.ImageLoader = new egret.ImageLoader;
      imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
      imgLoader.load("resource/assets/cartoon-egret_00.png");
  }

  private _bird: egret.Bitmap;                        //舞台中唯一显示对象
  private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
  private _distance: egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差

  private imgLoadHandler(evt: egret.Event): void {
      var data = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = data;
      this._bird = new egret.Bitmap(texture);
      this._bird.x = this.stage.stageWidth / 2;
      this._bird.y = this.stage.stageHeight / 2;
      this.addChild(this._bird);
      this.drawText();
      this._bird.touchEnabled = true;
      this._bird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
      this._bird.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
  }

  private drawText() {
      /// 提示信息
      this._txInfo = new egret.TextField;
      this.addChild(this._txInfo);

      this._txInfo.size = 28;
      this._txInfo.x = 50;
      this._txInfo.y = 50;
      this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
      this._txInfo.textColor = 0x000000;
      this._txInfo.type = egret.TextFieldType.DYNAMIC;
      this._txInfo.lineSpacing = 6;
      this._txInfo.multiline = true;

      this._txInfo.text =
          "按住显示对象即可拖拽，释放鼠标停止拖拽";

      this._bgInfo = new egret.Shape;
      this.addChildAt(this._bgInfo, this.numChildren - 1);

      this._bgInfo.x = this._txInfo.x;
      this._bgInfo.y = this._txInfo.y;
      this._bgInfo.graphics.clear();
      this._bgInfo.graphics.beginFill(0xffffff, .5);
      this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
      this._bgInfo.graphics.endFill();
  }

  private mouseDown(evt: egret.TouchEvent) {
      console.log("Mouse Down.");
      this._touchStatus = true;
      this._distance.x = evt.stageX - this._bird.x;
      this._distance.y = evt.stageY - this._bird.y;
      this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
  }

  private mouseMove(evt: egret.TouchEvent) {
      if (this._touchStatus) {
          console.log("moving now ! Mouse: [X:" + evt.stageX + ",Y:" + evt.stageY + "]");
          this._bird.x = evt.stageX - this._distance.x;
          this._bird.y = evt.stageY - this._distance.y;
      }
  }

  private mouseUp(evt: egret.TouchEvent) {
      console.log("Mouse Up.");
      this._touchStatus = false;
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
  }
}
