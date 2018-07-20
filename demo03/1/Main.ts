/**
 * @copyright www.egret.com
 * @author city
 * @desc 脏矩形是2D图形性能优化一个重要的概念。Egret2.5开始脏矩形完全可
 *      以由引擎自动计算，即大名鼎鼎的"自动脏矩形"。
 *      简单说脏矩形，就是画面刷新时，产生变化而需要重绘的舞台局部区域。使用脏矩
 *      形将大大减少无用的渲染工作量，降低额外性能消耗。对移动设备来说，会节省大
 *      量电能以及降低设备运行温度。
 *      大多数情况，开发者不需要关系脏矩形如何工作。用网游术语说，自动脏矩形是E
 *      gret引擎的一项被动技能，引擎运行时会每帧自动释放该技能来提升你的程序
 *      性能！
 *      脏矩形的红框可以在index.html中搜索data-show-pain
 *      t-rect属性，设置其值为"true"即可，发布给用户前，确保该值重置
 *      为"false"。
 */


class MotionMode {
  public static ROT: number = 0;
  public static MOV: number = 1;
}

class Main extends egret.DisplayObjectContainer {
  private static NUM: number = 32;
  private static SCALE_BASE: number = .5;
  private static SCALE_RANGE: number = .5;
  private _vcBird: Array<egret.Bitmap>;    /// 所有的白鹭小鸟存下引用，便于管理
  private _vcMotion: Array<number>;      /// 当前运动的小鸟索引
  private _iMotionMode: number;            /// 运动模式
  private _nScaleBase: number;                 /// 缩放比例基数
  private _txInfo: egret.TextField;               /// 文本提示信息
  private _bgInfo: egret.Shape;               /// 文本提示信息背景
  private _rectScope: egret.Rectangle;         /// 小鸟出现的范围（确保不出屏幕）

  public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event: egret.Event) {
      var imgLoader: egret.ImageLoader = new egret.ImageLoader;
      imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
      imgLoader.load("resource/assets/cartoon-egret_00.png");
  }

  private imgLoadHandler(evt: egret.Event): void {
      var bmd: egret.BitmapData = evt.currentTarget.data;
      
      
      /// 产生确定数量的白鹭小鸟
      var wHalfBird: number = bmd.width / 2;
      var hHalfBird: number = bmd.height / 2;

      this._rectScope = new egret.Rectangle(
          wHalfBird * Main.SCALE_BASE, hHalfBird * Main.SCALE_BASE
          , this.stage.stageWidth - wHalfBird * Main.SCALE_BASE * 2
          , this.stage.stageHeight - hHalfBird * Main.SCALE_BASE * 2
      );
      
      this._vcBird = new Array<egret.Bitmap>();
      for (var i = 0; i < Main.NUM; ++i) {
          var texture = new egret.Texture();
          texture.bitmapData = bmd;
          var bird: egret.Bitmap = new egret.Bitmap(texture);
          bird.anchorOffsetX = wHalfBird;
          bird.anchorOffsetY = hHalfBird;

          /// 给一个随机的初始位置
          bird.x = this._rectScope.x + this._rectScope.width * Math.random();
          bird.y = this._rectScope.y + this._rectScope.height * Math.random();

          bird.scaleX = bird.scaleY = Main.SCALE_BASE;

          this._vcBird.push(bird);
          this.addChild(bird);
      }

      /// 提示信息
      this._txInfo = new egret.TextField;
      this.addChild(this._txInfo);

      this._txInfo.size = 28;
      this._txInfo.x = 50;
      this._txInfo.y = 50;
      this._txInfo.width = this.stage.stageWidth - 100;
      this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
      this._txInfo.textColor = 0x000000;
      this._txInfo.type = egret.TextFieldType.DYNAMIC;
      this._txInfo.lineSpacing = 6;
      this._txInfo.multiline = true;
      this._txInfo.touchEnabled = true;
      //this._txInfo.background = true;
      //this._txInfo.backgroundColor = 0xffffff;
      this._txInfo.text =
          "轻触以改变运动的小鸟及运动模式，观察不同的小鸟变化对应的脏矩形变化";

      this._bgInfo = new egret.Shape;
      this.addChild(this._bgInfo);

      this._bgInfo.x = this._txInfo.x;
      this._bgInfo.y = this._txInfo.y;
      this._bgInfo.graphics.clear();
      this._bgInfo.graphics.beginFill(0xffffff, .5);
      this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
      this._bgInfo.graphics.endFill();
      this._bgInfo.cacheAsBitmap = true;


      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
          this.planRdmMotion();
      }, this);

      this.planRdmMotion();

      this._nScaleBase = 0;

      /// 产生动画
      this.stage.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
          /*** 本示例关键代码段开始 ***/
          switch (this._iMotionMode) {
              case MotionMode.ROT:        /// 旋转并伴随缩放
                  this._vcBird[this._vcMotion[0]].rotation += 3;
                  this._vcBird[this._vcMotion[1]].rotation -= 3;
                  this._vcBird[this._vcMotion[2]].rotation += 3;
                  var scale: number = Main.SCALE_BASE + Math.abs(Math.sin(this._nScaleBase += 0.03)) * Main.SCALE_RANGE;
                  //console.log( "scale at:", Math.abs( Math.sin( this._nScaleBase ) ) );
                  this._vcBird[this._vcMotion[0]].scaleX = this._vcBird[this._vcMotion[0]].scaleY = scale;
                  this._vcBird[this._vcMotion[1]].scaleX = this._vcBird[this._vcMotion[1]].scaleY = scale;
                  this._vcBird[this._vcMotion[2]].scaleX = this._vcBird[this._vcMotion[2]].scaleY = scale;
                  break;
              case MotionMode.MOV:
                  var xTo: number;
                  if ((xTo = this._vcBird[this._vcMotion[0]].x - 3) < this._rectScope.left) xTo = this._rectScope.right;
                  this._vcBird[this._vcMotion[0]].x = xTo;
                  if ((xTo = this._vcBird[this._vcMotion[1]].x + 3) > this._rectScope.right) xTo = this._rectScope.left;
                  this._vcBird[this._vcMotion[1]].x = xTo;
                  if ((xTo = this._vcBird[this._vcMotion[2]].x - 3) < this._rectScope.left) xTo = this._rectScope.right;
                  this._vcBird[this._vcMotion[2]].x = xTo;
                  break;
          }
          /*** 本示例关键代码段结束 ***/
      }, this);
  }

  /// 随机设置运动内容
  private planRdmMotion(): void {

      /// 随机一个运动模式
      this._iMotionMode = Math.random() > .5 ? 0 : 1;

      /// 还原比例
      if (this._vcMotion && this._vcMotion.length == 3) {
          this._vcBird[this._vcMotion[0]].scaleX = this._vcBird[this._vcMotion[0]].scaleY = Main.SCALE_BASE;
          this._vcBird[this._vcMotion[1]].scaleX = this._vcBird[this._vcMotion[1]].scaleY = Main.SCALE_BASE;
          this._vcBird[this._vcMotion[2]].scaleX = this._vcBird[this._vcMotion[2]].scaleY = Main.SCALE_BASE;
      }

      this.setChildIndex(this._txInfo, this.numChildren - 1);       /// 重置提示文字及背景深度
      this.setChildIndex(this._bgInfo, this.numChildren - 2);

      /// 随机取三个位置的白鹭小鸟并且确保深度最高
      this._vcMotion = new Array<number>();
      this._vcMotion.push(Math.floor(Main.NUM * Math.random()));
      this._vcMotion.push(Math.floor(Main.NUM * Math.random()));
      this._vcMotion.push(Math.floor(Main.NUM * Math.random()));
      this.setChildIndex(this._vcBird[this._vcMotion[0]], this.numChildren - 3);
      this.setChildIndex(this._vcBird[this._vcMotion[1]], this.numChildren - 4);
      this.setChildIndex(this._vcBird[this._vcMotion[2]], this.numChildren - 5);
  }
}
