var Utils = (function () {
    function Utils() {
    }
    Utils.doPay = function () {
        if (Laya.Browser.window.conch) {
            var AppUtils = Laya.PlatformClass.createClass("demo.Utils");
            var AppUtilsObj = AppUtils.newObject();
            AppUtilsObj.call("doPay");
        }
    };
    Utils.doQueryUserInfo = function () {
        if (Laya.Browser.window.conch) {
            var AppUtils = Laya.PlatformClass.createClass("demo.Utils");
            var AppUtilsObj = AppUtils.newObject();
            AppUtilsObj.call("doQueryUserInfo");
        }
    };
    Utils.doQueryWesaiUid = function () {
        var id = "";
        if (Laya.Browser.window.conch) {
            var AppUtils = Laya.PlatformClass.createClass("demo.Utils");
            var AppUtilsObj = AppUtils.newObject();
            id = AppUtilsObj.call("doQueryWesaiUid");
        }
        return id;
    };
    Utils.doQueryGameId = function () {
        var id = "";
        if (Laya.Browser.window.conch) {
            var AppUtils = Laya.PlatformClass.createClass("demo.Utils");
            var AppUtilsObj = AppUtils.newObject();
            AppUtilsObj.call("doQueryGameId");
        }
        return id;
    };
    Utils.doQuit = function () {
        if (Laya.Browser.window.conch) {
            var AppUtils = Laya.PlatformClass.createClass("demo.Utils");
            var AppUtilsObj = AppUtils.newObject();
            AppUtilsObj.call("doQuitGame");
        }
    };
    return Utils;
}());
//# sourceMappingURL=Utils.js.map