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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var TestPageUI = (function (_super) {
            __extends(TestPageUI, _super);
            function TestPageUI() {
                return _super.call(this) || this;
            }
            TestPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.TestPageUI.uiView);
            };
            return TestPageUI;
        }(View));
        TestPageUI.uiView = { "type": "View", "child": [{ "props": { "x": 0, "y": 0, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "width": 600, "height": 400 }, "type": "Image" }, { "props": { "x": 41, "y": 56, "skin": "comp/button.png", "label": "点我赋值", "width": 150, "height": 37, "sizeGrid": "4,4,4,4", "var": "btn" }, "type": "Button" }, { "props": { "x": 401, "y": 56, "skin": "comp/clip_num.png", "clipX": 10, "var": "clip" }, "type": "Clip" }, { "props": { "x": 220, "y": 143, "skin": "comp/combobox.png", "labels": "select1,select2,selecte3", "selectedIndex": 1, "sizeGrid": "4,20,4,4", "width": 200, "height": 23, "var": "combobox" }, "type": "ComboBox" }, { "props": { "x": 220, "y": 96, "skin": "comp/tab.png", "labels": "tab1,tab2,tab3", "var": "tab" }, "type": "Tab" }, { "props": { "x": 259, "y": 223, "skin": "comp/vscroll.png", "height": 150 }, "type": "VScrollBar" }, { "props": { "x": 224, "y": 223, "skin": "comp/vslider.png", "height": 150 }, "type": "VSlider" }, { "type": "List", "child": [{ "type": "Box", "child": [{ "props": { "skin": "comp/label.png", "text": "this is a list", "x": 26, "y": 5, "width": 78, "height": 20, "fontSize": 14, "name": "label" }, "type": "Label" }, { "props": { "x": 0, "y": 2, "skin": "comp/clip_num.png", "clipX": 10, "name": "clip" }, "type": "Clip" }], "props": { "name": "render", "x": 0, "y": 0, "width": 112, "height": 30 } }], "props": { "x": 452, "y": 68, "width": 128, "height": 299, "vScrollBarSkin": "comp/vscroll.png", "repeatX": 1, "var": "list" } }, { "props": { "x": 563, "y": 4, "skin": "comp/btn_close.png", "name": "close" }, "type": "Button" }, { "props": { "x": 41, "y": 112, "skin": "comp/button.png", "label": "点我赋值", "width": 150, "height": 66, "sizeGrid": "4,4,4,4", "labelSize": 30, "labelBold": true, "var": "btn2" }, "type": "Button" }, { "props": { "x": 220, "y": 188, "skin": "comp/checkbox.png", "label": "checkBox1", "var": "check" }, "type": "CheckBox" }, { "props": { "x": 220, "y": 61, "skin": "comp/radiogroup.png", "labels": "radio1,radio2,radio3", "var": "radio" }, "type": "RadioGroup" }, { "type": "Panel", "child": [{ "props": { "skin": "comp/image.png" }, "type": "Image" }], "props": { "x": 299, "y": 223, "width": 127, "height": 150, "vScrollBarSkin": "comp/vscroll.png" } }, { "props": { "x": 326, "y": 188, "skin": "comp/checkbox.png", "label": "checkBox2", "labelColors": "#ff0000" }, "type": "CheckBox" }, { "type": "Box", "child": [{ "props": { "y": 70, "skin": "comp/progress.png", "width": 150, "height": 14, "sizeGrid": "4,4,4,4", "name": "progress" }, "type": "ProgressBar" }, { "props": { "y": 103, "skin": "comp/label.png", "text": "This is a Label", "width": 137, "height": 26, "fontSize": 20, "name": "label" }, "type": "Label" }, { "props": { "y": 148, "skin": "comp/textinput.png", "text": "textinput", "width": 150, "name": "input" }, "type": "TextInput" }, { "props": { "skin": "comp/hslider.png", "width": 150, "name": "slider" }, "type": "HSlider" }, { "props": { "y": 34, "skin": "comp/hscroll.png", "width": 150, "name": "scroll" }, "type": "HScrollBar" }], "props": { "x": 41, "y": 197, "var": "box" } }], "props": { "width": 600, "height": 400 } };
        test.TestPageUI = TestPageUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
(function (ui) {
    var TestViewUI = (function (_super) {
        __extends(TestViewUI, _super);
        function TestViewUI() {
            return _super.call(this) || this;
        }
        TestViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.TestViewUI.uiView);
        };
        return TestViewUI;
    }(View));
    TestViewUI.uiView = { "type": "View", "props": { "width": 1920, "height": 1080 }, "child": [{ "type": "Button", "props": { "y": 176, "x": 220, "width": 237, "var": "btn_pay", "skin": "comp/button.png", "labelSize": 48, "label": "支付", "height": 75 } }, { "type": "Button", "props": { "y": 284, "x": 221, "width": 237, "var": "btn_quaryUserInfo", "skin": "comp/button.png", "labelSize": 48, "label": "查询用户", "height": 75 } }, { "type": "Button", "props": { "y": 393, "x": 221, "width": 237, "var": "btn_add", "skin": "comp/button.png", "labelSize": 48, "label": "添加成就", "height": 75 } }, { "type": "Button", "props": { "y": 827, "x": 223, "width": 237, "var": "btn_quit", "skin": "comp/button.png", "labelSize": 48, "label": "退出", "height": 75 } }, { "type": "Button", "props": { "y": 67, "x": 220, "width": 237, "var": "btn_changeApi", "skin": "comp/button.png", "labelSize": 48, "labelFont": "SimHei", "label": "切换api", "height": 75 } }, { "type": "Label", "props": { "y": 75, "x": 476, "width": 169, "text": "当前api:", "height": 72, "fontSize": 45, "color": "#ecd6d6" } }, { "type": "Label", "props": { "y": 77, "x": 662, "width": 1229, "var": "lab_api", "text": "http://", "height": 72, "fontSize": 45, "color": "#ecd6d6" } }, { "type": "Label", "props": { "y": 182, "x": 492, "wordWrap": true, "width": 1373, "var": "lab_HallResult", "height": 698, "fontSize": 45, "color": "#ecd6d6" } }, { "type": "Button", "props": { "y": 501, "x": 222, "width": 237, "var": "btn_share", "skin": "comp/button.png", "labelSize": 48, "label": "分享", "height": 75 } }, { "type": "Label", "props": { "y": 943, "x": 236, "width": 1641, "var": "lab_location", "height": 64, "fontSize": 45, "color": "#ecd6d6" } }, { "type": "Button", "props": { "y": 610, "x": 222, "width": 237, "var": "btn_getLocation", "skin": "comp/button.png", "labelSize": 48, "label": "获取位置", "height": 75 } }, { "type": "Button", "props": { "y": 718, "x": 223, "width": 237, "var": "btn_push", "skin": "comp/button.png", "labelSize": 48, "label": "推送", "height": 75 } }] };
    ui.TestViewUI = TestViewUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map