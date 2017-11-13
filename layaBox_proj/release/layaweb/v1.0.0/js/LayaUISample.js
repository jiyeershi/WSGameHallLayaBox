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
var MainUi = (function (_super) {
    __extends(MainUi, _super);
    function MainUi() {
        var _this = _super.call(this) || this;
        //btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
        _this.btn_pay.on(laya.events.Event.CLICK, _this, _this.onBtnClickPay);
        _this.btn_quaryUserInfo.on(laya.events.Event.CLICK, _this, _this.onBtnClickQuary);
        _this.btn_add.on(laya.events.Event.CLICK, _this, _this.onBtnClickAddAchivement);
        _this.btn_quit.on(laya.events.Event.CLICK, _this, _this.onBtnClickQuit);
        return _this;
    }
    MainUi.prototype.onBtnClickPay = function () {
        Utils.doPay();
        console.log("onBtnClickPay");
    };
    MainUi.prototype.onBtnClickQuary = function () {
        Utils.doQueryUserInfo();
        console.log("onBtnClickQuary");
    };
    MainUi.prototype.onBtnClickAddAchivement = function () {
        console.log("onBtnClickAddAchivement");
    };
    MainUi.prototype.onBtnClickQuit = function () {
        console.log("onBtnClickQuit");
        Utils.doQuit();
    };
    return MainUi;
}(ui.TestViewUI));
function onHallEvent(event, data) {
    console.log("onHallEvent event = " + event + " data = " + data);
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
}
//# sourceMappingURL=LayaUISample.js.map