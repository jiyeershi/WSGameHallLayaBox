enum HallEvent{
  "LocationChanged",
  "HallNotification",
  "HallPay",
  "QuaryUserInfo",
  "QuaryWesaiUid",
  "QuaryGameId",
  "Share",
  "AddAchivement"
};

class Utils{
    static insatance:Utils;
    public platformObj;
    public handler:any; //ios采用注册形式进行通知

    public getPlatform(){
      let userAgent = window.navigator.userAgent;
      if(Laya.Browser.window.conch) {//app打开
        let androidReg = /android/i;
        let iosReg = /iphone/i;
        let isAndroid = window.navigator.userAgent.match(androidReg);
        let isIos= window.navigator.userAgent.match(iosReg);
        if(isAndroid){
          return 1;
        }else if(isIos) {
          return 2;
        }else{
          return 3;
        }
      }else{//浏览器打开
          if(Laya.Browser.onPC) {
            return 4;
          }else{
            //Todo:继续统计是weixin,qq或其他浏览器
            return 5;
          }
      }
   }

  private constructor(){
      let platform = this.getPlatform()
      if (platform == 1){
        let AppUtils=Laya.PlatformClass.createClass("demo.Utils");
        this.platformObj= AppUtils.newObject();
      }else if(platform == 2){
        let gameCenter=Laya.PlatformClass.createClass("WSGameCenterLayaBox");
        this.platformObj = gameCenter.newObject();
        //注册位置改变通知
        this.registIOSLocationListener();
        //注册推送回调
        this.registIOSHallPushListener();
      }
    }

    static getInstance(){
      if(Utils.insatance == null){
        Utils.insatance = new Utils;
      }
      return Utils.insatance;
    }

    //通过该接口把事件统一发给界面
    //注意界面的生命周期
    private handleEvent(event:HallEvent, result:string){
      if (this.handler == null) return ;
      if (this.handler.caller == null) return;
      if (this.handler.handleName == null) return;
      let instance = this.handler.caller;
      let func = this.handler.handleName;
      // func.apply(instance, event, result);
      func.call(instance, event, result);
    }
    
    //Todo:暴露给android 层进行事件处理,去掉android 层调用原来的onHallEvent.这样的目的是为了保证ios 和android接口统一
   public static handleAndroidHallEvent(event, result){
      //Todo事件重新命名
      // Utils.getInstance().handleEvent(HallEvent.HallPay, result);
      // HallEvent.HallPay
      Utils.getInstance().handleEvent(event, result);
    }

   //给界面注册事件监听
   public registEventHandler(caller:any, callBack:any){
       this.handler = {caller:caller, handleName:callBack}
    }

   static orderCount = 1;
   public doPay(){
     //生成随机订单，暂时无约定
    // var PrefixInteger = function (num, n) {
    //     return (Array(n).join("0") + num).slice(-n);
    // }
      var timestamp1=new Date().getTime();
      if(Laya.Browser.window.conch) {
          let platform = this.getPlatform()
          if (platform == 1){
            this.platformObj.call("doPay", timestamp1.toString(), "10", "测试商品购买", "");
            // this.platformObj.call("doShareRichText", title, content, iconUrl, h5Url);
          }else{
            this.platformObj.callWithBack(function(result){
              console.log("doPay = "+result);
              Utils.getInstance().handleEvent(HallEvent.HallPay, result);
            },"doPay:withAmount:withDescription:withExtraContent:", timestamp1.toString(), "11", "测试商品购买", "");
          }
      }
   } 

  public doQueryUserInfo(){
      if(Laya.Browser.window.conch) {
        let platform = this.getPlatform()
        if(platform == 1) {
          this.platformObj.call("doQueryUserInfo");
        }else{
          this.platformObj.callWithBack(function(result){
              console.log("doQueryUserInfo = "+result);
              Utils.getInstance().handleEvent(HallEvent.QuaryUserInfo, result);
            },"doQueryUserInfo");
        }
      }
   }

  public doQueryWesaiUid(callBack?:any){
      let id = "";
      if(Laya.Browser.window.conch) {
        let platform = this.getPlatform()
        if(platform == 1) {
          id =  this.platformObj.call("doQueryWesaiUid");
          // callBack(id);
        }else{
          this.platformObj.callWithBack(function(result){
              console.log("getWesaiUid = "+result);
              // Utils.getInstance().handleEvent(HallEvent.QuaryWesaiUid, result);
              //注意:在回调中操作界面可能会引起崩溃
              callBack(result);
            },"getWesaiUid");
        }
      }
      return id;
   }

  public doQueryGameId(callBack?:any){
      let id = "";
      if(Laya.Browser.window.conch) {
        let platform = this.getPlatform()
        if(platform == 1) {
          id = this.platformObj.call("doQueryGameId");
          // callBack(id);
          }else{
          this.platformObj.callWithBack(function(result){
              console.log("getGameId = "+result);
              // Utils.getInstance().handleEvent(HallEvent.QuaryGameId, result);
              //注意:在回调中操作界面可能会引起崩溃
              callBack(result);
            },"getGameId");
        }
      }
      return id;
   }

  public doShare(title:String, content:String, iconUrl:String, h5Url:String){
     if(Laya.Browser.window.conch) {
        let platform = this.getPlatform()
        if(platform == 1) {
          this.platformObj.call("doShareRichText", title, content, iconUrl, h5Url);
          }else{
          this.platformObj.callWithBack(function(result){
              console.log("doShare = "+result);
              Utils.getInstance().handleEvent(HallEvent.Share, result);
            },"doShare:withContent:withTitle:withIconUrl:withUrl:", "", content, title, iconUrl, h5Url);
        }
      }
  }

  public getLocation():string{
    let msg = "null"
    if(Laya.Browser.window.conch) {
       let platform = this.getPlatform()
       if (platform == 1){
          msg = this.platformObj.call("getLocationStr");
       }else{
           this.platformObj.callWithBack(function(result){
              console.log("getLocationInfo = "+result);
              Utils.getInstance().handleEvent(HallEvent.LocationChanged, result);
            },"getLocationInfo");
       }
      }
    return msg;
  }

   public getMessagePush():string{
    let msg = "null";
    if(Laya.Browser.window.conch) {
       let platform = this.getPlatform()
       if (platform == 1){
          msg = this.platformObj.call("getPushStr");
       }else{
           this.platformObj.callWithBack(function(result){
              console.log("getPushInfo = "+result);
              Utils.getInstance().handleEvent(HallEvent.HallNotification, result);
            },"getPushInfo");
       }
      }
      return msg;
  }


  //Todo: 将android的推送也支持js注册模式
  static locationChangedListener(data){
      Utils.getInstance().handleEvent(HallEvent.LocationChanged, data);
  }
  public registIOSLocationListener(){
    if(Laya.Browser.window.conch) {
       let platform = this.getPlatform()
       if (platform == 2){
          this.platformObj.call("registerLocationListenerFun:", "Utils.locationChangedListener");
      }
     }
  }

   //Todo: 将android的推送也支持js注册模式
   static hallPushListener(data){
        Utils.getInstance().handleEvent(HallEvent.HallNotification, data);
    }

   public registIOSHallPushListener(){
    if(Laya.Browser.window.conch) {
       let platform = this.getPlatform()
       if (platform == 2){
          this.platformObj.call("registerPushListenerFun:", "Utils.hallPushListener");
      }
     }
  }

   public doQuit(){
    if(Laya.Browser.window.conch) {
       let platform = this.getPlatform()
       if (platform == 1){
          this.platformObj.call("doQuitGame");
       }else{
          this.platformObj.call("stopGame");
       }
      }
   }

   //Todo:ios添加成就网络请求放在这里,注意将andorid也换到这里
    private HttpRequestComplete(data):void {
        console.log("Utils HttpRequestComplete " + data);
        Utils.getInstance().handleEvent(HallEvent.AddAchivement, data);
    }

	  private onHttpRequestError():void {
      console.log("onHttpRequestError");
    }

   public addAchivement(api){
      let uid = "";
      let gid = "";
      let request = function(){
          if( gid == "" || uid == "") return;
          let param = "user_id="+uid+"&game_id="+gid+"&medal_value=1";
          var hr = new laya.net.HttpRequest();
          var instance = Utils.getInstance();
          hr.once(Laya.Event.COMPLETE, instance, instance.HttpRequestComplete);
          hr.once(Laya.Event.ERROR, instance, instance.onHttpRequestError);
          hr.send(api, param, 'post', 'json');
          console.log("onBtnClickAddAchivement curUrl: " + api + " uid = "+uid+" gameId = "+ gid);
      }

      let gameIdCallBack = function(id:string){
        gid = id;
        request();
      }
      let wesaiIdCallBack = function(id:string){
        uid = id;
        request();
      }
      Utils.getInstance().doQueryWesaiUid(wesaiIdCallBack);
      Utils.getInstance().doQueryGameId(gameIdCallBack);
    }
}