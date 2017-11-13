var HallEvent;
(function (HallEvent) {
    HallEvent[HallEvent["LocationChanged"] = 0] = "LocationChanged";
    HallEvent[HallEvent["HallNotification"] = 1] = "HallNotification";
    HallEvent[HallEvent["HallPay"] = 2] = "HallPay";
    HallEvent[HallEvent["QuaryUserInfo"] = 3] = "QuaryUserInfo";
    HallEvent[HallEvent["QuaryWesaiUid"] = 4] = "QuaryWesaiUid";
    HallEvent[HallEvent["QuaryGameId"] = 5] = "QuaryGameId";
    HallEvent[HallEvent["Share"] = 6] = "Share";
    HallEvent[HallEvent["AddAchivement"] = 7] = "AddAchivement";
})(HallEvent || (HallEvent = {}));
;
var Utils = (function () {
    function Utils() {
        var platform = this.getPlatform();
        if (platform == 1) {
            var AppUtils = Laya.PlatformClass.createClass("demo.Utils");
            this.platformObj = AppUtils.newObject();
        }
        else if (platform == 2) {
            var gameCenter = Laya.PlatformClass.createClass("WSGameCenterLayaBox");
            this.platformObj = gameCenter.newObject();
            //注册位置改变通知
            this.registIOSLocationListener();
            //注册推送回调
            this.registIOSHallPushListener();
        }
    }
    Utils.prototype.getPlatform = function () {
        var userAgent = window.navigator.userAgent;
        if (Laya.Browser.window.conch) {
            var androidReg = /android/i;
            var iosReg = /iphone/i;
            var isAndroid = window.navigator.userAgent.match(androidReg);
            var isIos = window.navigator.userAgent.match(iosReg);
            if (isAndroid) {
                return 1;
            }
            else if (isIos) {
                return 2;
            }
            else {
                return 3;
            }
        }
        else {
            if (Laya.Browser.onPC) {
                return 4;
            }
            else {
                //Todo:继续统计是weixin,qq或其他浏览器
                return 5;
            }
        }
    };
    Utils.getInstance = function () {
        if (Utils.insatance == null) {
            Utils.insatance = new Utils;
        }
        return Utils.insatance;
    };
    //通过该接口把事件统一发给界面
    //注意界面的生命周期
    Utils.prototype.handleEvent = function (event, result) {
        if (this.handler == null)
            return;
        if (this.handler.caller == null)
            return;
        if (this.handler.handleName == null)
            return;
        var instance = this.handler.caller;
        var func = this.handler.handleName;
        // func.apply(instance, event, result);
        func.call(instance, event, result);
    };
    //Todo:暴露给android 层进行事件处理,去掉android 层调用原来的onHallEvent.这样的目的是为了保证ios 和android接口统一
    Utils.handleAndroidHallEvent = function (event, result) {
        //Todo事件重新命名
        // Utils.getInstance().handleEvent(HallEvent.HallPay, result);
        // HallEvent.HallPay
        Utils.getInstance().handleEvent(event, result);
    };
    //给界面注册事件监听
    Utils.prototype.registEventHandler = function (caller, callBack) {
        this.handler = { caller: caller, handleName: callBack };
    };
    Utils.prototype.doPay = function () {
        //生成随机订单，暂时无约定
        // var PrefixInteger = function (num, n) {
        //     return (Array(n).join("0") + num).slice(-n);
        // }
        var timestamp1 = new Date().getTime();
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                this.platformObj.call("doPay", timestamp1.toString(), "10", "测试商品购买", "");
                // this.platformObj.call("doShareRichText", title, content, iconUrl, h5Url);
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("doPay = " + result);
                    Utils.getInstance().handleEvent(HallEvent.HallPay, result);
                }, "doPay:withAmount:withDescription:withExtraContent:", timestamp1.toString(), "11", "测试商品购买", "");
            }
        }
    };
    Utils.prototype.doQueryUserInfo = function () {
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                this.platformObj.call("doQueryUserInfo");
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("doQueryUserInfo = " + result);
                    Utils.getInstance().handleEvent(HallEvent.QuaryUserInfo, result);
                }, "doQueryUserInfo");
            }
        }
    };
    Utils.prototype.doQueryWesaiUid = function (callBack) {
        var id = "";
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                id = this.platformObj.call("doQueryWesaiUid");
                // callBack(id);
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("getWesaiUid = " + result);
                    // Utils.getInstance().handleEvent(HallEvent.QuaryWesaiUid, result);
                    //注意:在回调中操作界面可能会引起崩溃
                    callBack(result);
                }, "getWesaiUid");
            }
        }
        return id;
    };
    Utils.prototype.doQueryGameId = function (callBack) {
        var id = "";
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                id = this.platformObj.call("doQueryGameId");
                // callBack(id);
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("getGameId = " + result);
                    // Utils.getInstance().handleEvent(HallEvent.QuaryGameId, result);
                    //注意:在回调中操作界面可能会引起崩溃
                    callBack(result);
                }, "getGameId");
            }
        }
        return id;
    };
    Utils.prototype.doShare = function (title, content, iconUrl, h5Url) {
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                this.platformObj.call("doShareRichText", title, content, iconUrl, h5Url);
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("doShare = " + result);
                    Utils.getInstance().handleEvent(HallEvent.Share, result);
                }, "doShare:withContent:withTitle:withIconUrl:withUrl:", "", content, title, iconUrl, h5Url);
            }
        }
    };
    Utils.prototype.getLocation = function () {
        var msg = "null";
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                msg = this.platformObj.call("getLocationStr");
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("getLocationInfo = " + result);
                    Utils.getInstance().handleEvent(HallEvent.LocationChanged, result);
                }, "getLocationInfo");
            }
        }
        return msg;
    };
    Utils.prototype.getMessagePush = function () {
        var msg = "null";
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                msg = this.platformObj.call("getPushStr");
            }
            else {
                this.platformObj.callWithBack(function (result) {
                    console.log("getPushInfo = " + result);
                    Utils.getInstance().handleEvent(HallEvent.HallNotification, result);
                }, "getPushInfo");
            }
        }
        return msg;
    };
    //Todo: 将android的推送也支持js注册模式
    Utils.locationChangedListener = function (data) {
        Utils.getInstance().handleEvent(HallEvent.LocationChanged, data);
    };
    Utils.prototype.registIOSLocationListener = function () {
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 2) {
                this.platformObj.call("registerLocationListenerFun:", "Utils.locationChangedListener");
            }
        }
    };
    //Todo: 将android的推送也支持js注册模式
    Utils.hallPushListener = function (data) {
        Utils.getInstance().handleEvent(HallEvent.HallNotification, data);
    };
    Utils.prototype.registIOSHallPushListener = function () {
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 2) {
                this.platformObj.call("registerPushListenerFun:", "Utils.hallPushListener");
            }
        }
    };
    Utils.prototype.doQuit = function () {
        if (Laya.Browser.window.conch) {
            var platform = this.getPlatform();
            if (platform == 1) {
                this.platformObj.call("doQuitGame");
            }
            else {
                this.platformObj.call("stopGame");
            }
        }
    };
    //Todo:ios添加成就网络请求放在这里,注意将andorid也换到这里
    Utils.prototype.HttpRequestComplete = function (data) {
        console.log("Utils HttpRequestComplete " + data);
        Utils.getInstance().handleEvent(HallEvent.AddAchivement, data);
    };
    Utils.prototype.onHttpRequestError = function () {
        console.log("onHttpRequestError");
    };
    Utils.prototype.addAchivement = function (api) {
        var uid = "";
        var gid = "";
        var request = function () {
            if (gid == "" || uid == "")
                return;
            var param = "user_id=" + uid + "&game_id=" + gid + "&medal_value=1";
            var hr = new laya.net.HttpRequest();
            var instance = Utils.getInstance();
            hr.once(Laya.Event.COMPLETE, instance, instance.HttpRequestComplete);
            hr.once(Laya.Event.ERROR, instance, instance.onHttpRequestError);
            hr.send(api, param, 'post', 'json');
            console.log("onBtnClickAddAchivement curUrl: " + api + " uid = " + uid + " gameId = " + gid);
        };
        var gameIdCallBack = function (id) {
            gid = id;
            request();
        };
        var wesaiIdCallBack = function (id) {
            uid = id;
            request();
        };
        Utils.getInstance().doQueryWesaiUid(wesaiIdCallBack);
        Utils.getInstance().doQueryGameId(gameIdCallBack);
    };
    return Utils;
}());
Utils.orderCount = 1;
//# sourceMappingURL=Utils.js.map