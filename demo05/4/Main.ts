/**
 * @copyright www.egret.com
 * @author city
 * @desc 复合动画是Tween的重要特色。
 *      不同的动画可以按照顺序通过链式调用依次连接循环调用。
 *      每次缓动调用结束时可以通过Tween.call()来进行该阶段的完成事件
 *      处理。
 *      不同的缓动之间可以通过Tween.wait()来控制延迟时间。
 *      按照本示例所示，开发者可以使用egret.Tween创建各种丰富而灵活的
 *      动画组合。
 */


class Main extends egret.DisplayObjectContainer {
  public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event: egret.Event) {
      var imgLoader: egret.ImageLoader = new egret.ImageLoader;
      imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
      imgLoader.load("resource/assets/cartoon-egret_00.png");
  }

  private _bird: egret.Bitmap;
  private _txInfo: egret.TextField;

  private _vcLocation: Array<egret.Point>;
  private _idxCurrLocation: number;

  private _rotCommon: number;

  private imgLoadHandler(evt: egret.Event): void {
      var data = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = data;
      this._bird = new egret.Bitmap(texture);
      this._bird.anchorOffsetX = data.width / 2;
      this._bird.anchorOffsetY = data.height / 2;
      this.addChild(this._bird);

      /// 设计几个位置便于运动
      this._vcLocation = [
          new egret.Point(data.width / 2, 100 + data.height / 2)
          , new egret.Point(this.stage.stageWidth - data.width / 2, this.stage.stageHeight - data.height / 2)
          , new egret.Point(data.width / 2, this.stage.stageHeight - data.height / 2)
          , new egret.Point(this.stage.stageWidth - data.width / 2, 100 + data.height / 2)
      ];

      this._rotCommon = 180 / Math.PI * Math.atan2(this._vcLocation[1].y - this._vcLocation[0].y, this._vcLocation[1].x - this._vcLocation[0].x);


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

      this._txInfo.text = "这是由四个阶段的缓动动画组成的复合动画，并且往复循环（您不需要接触屏幕！）";

      /// 开启显示
      this._idxCurrLocation = -1;

      this._bird.x = this.stage.stageWidth / 2;
      this._bird.y = this.stage.stageHeight / 2;

      this.launchTween();
  }

  private launchTween() {
      /*** 本示例关键代码段开始 ***/
       egret.Tween.get( this._bird, { loop:true} )
          .to( {x:this._vcLocation[0].x, y:this._vcLocation[0].y}, 500 )
              .call( ()=>{ this._bird.rotation = 180 - this._rotCommon;  } ).wait( 200 )
          .to( {x:this._vcLocation[1].x, y:this._vcLocation[1].y}, 500 )
              .call( ()=>{ this._bird.rotation = - 90; } ).wait( 200 )
          .to( {x:this._vcLocation[2].x, y:this._vcLocation[2].y}, 500 )
              .call( ()=>{ this._bird.rotation = this._rotCommon; } ).wait( 200 )
          .to( {x:this._vcLocation[3].x, y:this._vcLocation[3].y}, 500 )
              .call( ()=>{ this._bird.rotation = - 90; } ).wait( 200 );
      /*** 本示例关键代码段结束 ***/
  }
}
