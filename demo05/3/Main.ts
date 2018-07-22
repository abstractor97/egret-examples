/**
 * @copyright www.egret.com
 * @author city
 * @desc 缓动控制函数Tween.to()可以设置控制缓动过程的参数，这个参数是一
 *      个特定的插值计算方程，Egret已经提供了所有常见的27中缓动方程，均在
 *      egret.Ease类中。
 */

 
class EaseFunc{
  public name:string;
  public func:Function;
  constructor( name:string, func:Function ){
      this.name = name;
      this.func = func;
  }
}


class Main extends egret.DisplayObjectContainer {
  private _bird:egret.Bitmap;
  private _txInfo:egret.TextField;
  private _vcLocation:Array<egret.Point>;
  private _idxCurrLocation:number;
  private _vcEaseFunc: Array<EaseFunc>;
  private _idxEase:number;

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
      var data = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = data;
      this._bird = new egret.Bitmap(texture);
      this._bird.anchorOffsetX = data.width/2;
      this._bird.anchorOffsetY = data.height/2;
      this.addChild( this._bird );

      /// 设计几个位置便于运动
      this._vcLocation = [
          new egret.Point( data.width/2, 100 + data.height/2 )
          ,new egret.Point( this.stage.stageWidth - data.width/2, this.stage.stageHeight - data.height/2 )
          ,new egret.Point( data.width/2, this.stage.stageHeight - data.height/2 )
          ,new egret.Point( this.stage.stageWidth - data.width/2, 100 + data.height/2 )
      ];

       /// 提示信息
      this._txInfo = new egret.TextField;
      this.addChild( this._txInfo );

      this._txInfo.size = 28;
      this._txInfo.x = 50;
      this._txInfo.y = 50;
      this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
      this._txInfo.textColor = 0x000000;
      this._txInfo.type = egret.TextFieldType.DYNAMIC;
      this._txInfo.lineSpacing = 6;
      this._txInfo.multiline = true;
      
      this._txInfo.text = "轻触屏幕启动一个随机位置的缓动过程";
      
      this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
          this.launchTween();
      }, this );


      this._idxEase = -1;

      /// 缓动方程库定义
      this._vcEaseFunc = [];
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.sineIn" ,egret.Ease.sineIn ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.sineOut" ,egret.Ease.sineOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.sineInOut" ,egret.Ease.sineInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.backIn" ,egret.Ease.backIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.backOut" ,egret.Ease.backOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.backInOut" ,egret.Ease.backInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.circIn" ,egret.Ease.circIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.circOut" ,egret.Ease.circOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.circInOut" ,egret.Ease.circInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.bounceIn" ,egret.Ease.bounceIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.bounceOut" ,egret.Ease.bounceOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.bounceInOut" ,egret.Ease.bounceInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.elasticIn" ,egret.Ease.elasticIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.elasticOut" ,egret.Ease.elasticOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.elasticInOut" ,egret.Ease.elasticInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quadIn" ,egret.Ease.quadIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quadOut" ,egret.Ease.quadOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quadInOut" ,egret.Ease.quadInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.cubicIn" ,egret.Ease.cubicIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.cubicOut" ,egret.Ease.cubicOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.cubicInOut" ,egret.Ease.cubicInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quartIn" ,egret.Ease.quartIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quartOut" ,egret.Ease.quartOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quartInOut" ,egret.Ease.quartInOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quintIn" ,egret.Ease.quintIn  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quintOut" ,egret.Ease.quintOut  ) );
      this._vcEaseFunc.push( new EaseFunc( "egret.Ease.quintInOut" ,egret.Ease.quintInOut  ) );

       /// 开启显示
      this._idxCurrLocation = -1;
      
      //this.updateRdmLocation( true );       /// 从一个随机位置开启
      this._bird.x = this.stage.stageWidth / 2; 
      this._bird.y = this.stage.stageHeight / 2; 
  }

  private launchTween(){
      var loc:egret.Point = this.updateRdmLocation();
      /*** 本示例关键代码段开始 ***/
      var params:EaseFunc = this._vcEaseFunc[ ++this._idxEase % this._vcEaseFunc.length ];
      egret.Tween.get( this._bird ).to( {x:loc.x,y:loc.y}, 600, params.func );
      /*** 本示例关键代码段结束 ***/
  }

  /// 获得一个非当前的随机位置
  private updateRdmLocation( bApply:boolean = false ):egret.Point {
      var vcIdxLocation = [0,1,2,3];
      if( this._idxCurrLocation != -1 ){     /// 避免与之前选择雷同
          vcIdxLocation.splice( this._idxCurrLocation, 1 );
      }
      var loc:egret.Point = this._vcLocation[ this._idxCurrLocation = vcIdxLocation[ Math.floor( Math.random()*vcIdxLocation.length ) ] ];
      if( bApply ){
          this._bird.x = loc.x;
          this._bird.y = loc.y;
      }
      return loc;
  }
}
