var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var test = ui.test.TestPageUI;
var Label = laya.ui.Label;
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var TestUI = (function (_super) {
    __extends(TestUI, _super);
    function TestUI() {
        var _this = _super.call(this) || this;
        //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
        _this.btn.on(laya.events.Event.CLICK, _this, _this.onBtnClick);
        _this.btn2.on(laya.events.Event.CLICK, _this, _this.onBtn2Click);
        return _this;
    }
    TestUI.prototype.onBtnClick = function () {
        //手动控制组件属性
        this.radio.selectedIndex = 1;
        this.clip.index = 8;
        this.tab.selectedIndex = 2;
        this.combobox.selectedIndex = 0;
        this.check.selected = true;
    };
    TestUI.prototype.onBtn2Click = function () {
        //通过赋值可以简单快速修改组件属性
        //赋值有两种方式：
        //简单赋值，比如：progress:0.2，就是更改progress组件的value为2
        //复杂复制，可以通知某个属性，比如：label:{color:"#ff0000",text:"Hello LayaAir"}
        this.box.dataSource = { slider: 50, scroll: 80, progress: 0.2, input: "This is a input", label: { color: "#ff0000", text: "Hello LayaAir" } };
        //list赋值，先获得一个数据源数组
        var arr = [];
        for (var i = 0; i < 100; i++) {
            arr.push({ label: "item " + i, clip: i % 9 });
        }
        //给list赋值更改list的显示
        this.list.array = arr;
        //还可以自定义list渲染方式，可以打开下面注释看一下效果
        //list.renderHandler = new Handler(this, onListRender);
    };
    TestUI.prototype.onListRender = function (item, index) {
        //自定义list的渲染方式
        var label = item.getChildByName("label");
        if (index % 2) {
            label.color = "#ff0000";
        }
        else {
            label.color = "#000000";
        }
    };
    return TestUI;
}(ui.test.TestPageUI));
Utils.getInstance();
var MainUi = (function (_super) {
    __extends(MainUi, _super);
    function MainUi() {
        var _this = _super.call(this) || this;
        _this.urlArr = [
            "http://game.test.api.wesai.com/intra/virtualMedal",
            "http://game-pre.api.wesai.com/intra/virtualMedal",
            "http://game.api.wesai.com/intra/virtualMedal",
        ];
        _this.curUrl = _this.urlArr[0];
        //api动态切换
        _this.count = 0;
        //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
        _this.btn_pay.on(laya.events.Event.CLICK, _this, _this.onBtnClickPay);
        _this.btn_quaryUserInfo.on(laya.events.Event.CLICK, _this, _this.onBtnClickQuary);
        _this.btn_add.on(laya.events.Event.CLICK, _this, _this.onBtnClickAddAchivement);
        _this.btn_quit.on(laya.events.Event.CLICK, _this, _this.onBtnClickQuit);
        _this.btn_changeApi.on(laya.events.Event.CLICK, _this, _this.onBtnClickChange);
        _this.btn_share.on(laya.events.Event.CLICK, _this, _this.onBtnClickShare);
        _this.btn_push.on(laya.events.Event.CLICK, _this, _this.onBtnClickPush);
        _this.btn_getLocation.on(laya.events.Event.CLICK, _this, _this.onBtnClickLocation);
        _this.lab_api.text = _this.urlArr[0];
        Utils.getInstance().registEventHandler(_this, _this.onIosHallEvent);
        return _this;
    }
    MainUi.prototype.onBtnClickChange = function () {
        var index = (++this.count) % 3;
        this.curUrl = this.urlArr[index];
        this.lab_api.text = this.curUrl;
    };
    // static iosPushInfoListener(data):void{
    // 	console.log("iosPushInfoListener = "+data);
    // 	let jsonObj = JSON.parse(data);
    // 	console.log("jsonObj ");
    // 	console.log("jsonObj.localCity = "+jsonObj.localCity);
    // 	console.log("jsonObj.longitude = "+jsonObj.longitude);
    // 	console.log("jsonObj.latitude = "+jsonObj.latitude);
    // }
    MainUi.prototype.onIosHallEvent = function (event, result) {
        console.log("onIosHallEvent eventName = " + event + " result = " + result);
        if (event == HallEvent.LocationChanged) {
            this.updateLocationInfo(result);
        }
        else if (event == HallEvent.AddAchivement) {
            var data = "添加成就返回：" + "code = " + result.code + " message: " + result.message;
            this.updateText(data);
        }
        else {
            this.updateText(result);
        }
    };
    MainUi.prototype.onBtnClickPay = function () {
        Utils.getInstance().doPay();
        console.log("onBtnClickPay");
    };
    MainUi.prototype.onBtnClickQuary = function () {
        Utils.getInstance().doQueryUserInfo();
        console.log("onBtnClickQuary");
    };
    MainUi.prototype.HttpRequestComplete = function (data) {
        this.lab_HallResult.text = "添加成就返回：" + "code = " + data.code + " message: " + data.message;
        console.log(data);
        // this.lab_HallResult.text =data;
    };
    MainUi.prototype.onHttpRequestError = function () {
        console.log("onHttpRequestError");
    };
    // private onBtnClickAddAchivement(): void {
    // 	let uid = "";
    // 	let gid = "";
    // 	//注意异步问题：界面是否存在
    // 	let request = function(){
    // 		if( gid == "" || uid == "") return;
    // 		let param = "user_id="+uid+"&game_id="+gid+"&medal_value=1";
    // 		var hr = new laya.net.HttpRequest();
    // 		hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete);
    // 		hr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
    // 		hr.send(this.curUrl, param, 'post', 'json');
    // 		console.log("onBtnClickAddAchivement curUrl: " + this.curUrl + " uid = "+uid+" gameId = "+ gid);
    // 	}
    // 	let gameIdCallBack = function(id:string){
    // 		gid = id;
    // 		request();
    // 	}
    // 	let wesaiIdCallBack = function(id:string){
    // 		uid = id;
    // 		request();
    // 	}
    // 	Utils.getInstance().doQueryWesaiUid(wesaiIdCallBack);
    // 	Utils.getInstance().doQueryGameId(gameIdCallBack);
    // }
    MainUi.prototype.onBtnClickAddAchivement = function () {
        console.log("onBtnClickAddAchivement");
        var uid = "";
        var gid = "";
        var platform = Utils.getInstance().getPlatform();
        if (platform == 1) {
            uid = Utils.getInstance().doQueryWesaiUid();
            gid = Utils.getInstance().doQueryGameId();
            var param = "user_id=" + uid + "&game_id=" + gid + "&medal_value=1";
            var hr = new laya.net.HttpRequest();
            hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete);
            hr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
            hr.send(this.curUrl, param, 'post', 'json');
            console.log("onBtnClickAddAchivement curUrl: " + this.curUrl + " uid = " + uid + " gameId = " + gid);
        }
        else {
            Utils.getInstance().addAchivement(this.curUrl);
        }
    };
    MainUi.prototype.onBtnClickShare = function () {
        console.log("onBtnClickShare");
        Utils.getInstance().doShare("laya分享测试", "这是一条测试信息", "https://static.wesai.com/ticketv2-product_static/pc/img/v2/logov2.png?v=819c55576907f5d888b19dce8b33326d", "https://www.wesai.com/");
    };
    MainUi.prototype.onBtnClickPush = function () {
        console.log("onBtnClickPush");
        var msg = Utils.getInstance().getMessagePush();
        this.lab_HallResult.text = "推送信息：" + msg;
    };
    MainUi.prototype.onBtnClickLocation = function () {
        console.log("onBtnClickLocation");
        var location = Utils.getInstance().getLocation();
        this.updateLocationInfo("位置 ：" + location);
    };
    MainUi.prototype.onBtnClickQuit = function () {
        console.log("onBtnClickQuit");
        Utils.getInstance().doQuit();
    };
    MainUi.prototype.updateText = function (data) {
        this.lab_HallResult.text = data;
    };
    MainUi.prototype.updateLocationInfo = function (data) {
        this.lab_location.text = data;
    };
    return MainUi;
}(ui.TestViewUI));
//Todo:之后取消该接口，统一走Utils里的接口
var mainUi;
function onHallEvent(event, data) {
    console.log("onHallEvent event = " + event + " data = " + data);
    if (event == "LocationChanged") {
        mainUi.updateLocationInfo(data);
    }
    else {
        var data1 = data;
        //  if(event == "HallPushUserInfo"){
        // 	var data2 = Laya.Browser.window.BASE64.decoder(data);
        // 	var str = '';  
        // 	for(var i = 0 , len =  data2.length ; i < len ;++i){  
        // 		str += String.fromCharCode(data2[i]);  
        // 	}
        // 	data1 = str;
        // 	console.log("decode base64: " + data1);
        //  }
        mainUi.updateText(event + " " + data1);
    }
}
// 程序入口
Laya.init(1920, 1080, Laya.WebGL);
//设置适配模式
Laya.stage.scaleMode = "showAll";
//设置剧中对齐
Laya.stage.alignH = "center";
Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
//设置横竖屏
Laya.stage.screenMode = "horizontal";
Laya.loader.load([{ url: "res/atlas/comp.json", type: Loader.ATLAS }], Handler.create(this, this.onLoaded));
function onLoaded() {
    //实例UI界面
    var test1 = new MainUi();
    Laya.stage.addChild(test1);
    mainUi = test1;
}
function pad(num, n) {
    var y = '00000000000000000000000000000' + num; //爱几个0就几个，自己够用就行
    return y.substr(y.length - n);
}
console.log(pad(3, 6)); //000003
var timestamp = new Date().getTime();
console.log(timestamp);
// var PrefixInteger = function (num, n) {
//         return (Array(n).join("0") + num).slice(-n);
//     }
// let orderCount:number = 1;
// for (var i: number = 0; i < 100; i++) {
// 	var total = 1000000;
// 	var timestamp=new Date().getTime();
// 	var count = (orderCount++)%total;
// 	var delta = total.toString().length-count.toString().length;
// 	var valueZ = "";
// 	for (var i:number = 0; i < delta; i++){
// 		valueZ = valueZ+"0";
// 	}
// 	var rand = valueZ+count;
// 	var t=timestamp+rand;
// 	console.log("timestamp: "+t);			
// }
// var timestamp1=new Date().getTime();
// console.log("timestamp: "+timestamp);
// console.log("timestamp: "+timestamp1); 
//# sourceMappingURL=LayaUISample.js.map