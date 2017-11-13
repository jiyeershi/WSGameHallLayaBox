import test = ui.test.TestPageUI;
import Label = laya.ui.Label;
import Handler = laya.utils.Handler;
import Loader = laya.net.Loader;

class TestUI extends ui.test.TestPageUI {
	constructor() {
		super();
		//btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
		this.btn.on(laya.events.Event.CLICK, this, this.onBtnClick);
		this.btn2.on(laya.events.Event.CLICK, this, this.onBtn2Click);
	}

	private onBtnClick(): void {
		//手动控制组件属性
		this.radio.selectedIndex = 1;
		this.clip.index = 8;
		this.tab.selectedIndex = 2;
		this.combobox.selectedIndex = 0;
		this.check.selected = true;
	}

	private onBtn2Click(): void {
		//通过赋值可以简单快速修改组件属性
		//赋值有两种方式：
		//简单赋值，比如：progress:0.2，就是更改progress组件的value为2
		//复杂复制，可以通知某个属性，比如：label:{color:"#ff0000",text:"Hello LayaAir"}
		this.box.dataSource = { slider: 50, scroll: 80, progress: 0.2, input: "This is a input", label: { color: "#ff0000", text: "Hello LayaAir" } };

		//list赋值，先获得一个数据源数组
		var arr: Array<any> = [];
		for (var i: number = 0; i < 100; i++) {
			arr.push({ label: "item " + i, clip: i % 9 });
		}

		//给list赋值更改list的显示
		this.list.array = arr;

		//还可以自定义list渲染方式，可以打开下面注释看一下效果
		//list.renderHandler = new Handler(this, onListRender);
	}

	private onListRender(item: laya.ui.Box, index: number): void {
		//自定义list的渲染方式
		var label: Label = item.getChildByName("label") as Label;
		if (index % 2) {
			label.color = "#ff0000";
		} else {
			label.color = "#000000";
		}
	}
}

Utils.getInstance();
class MainUi extends ui.TestViewUI{

	private urlArr:string[] = [
		"http://game.test.api.wesai.com/intra/virtualMedal",
		"http://game-pre.api.wesai.com/intra/virtualMedal",
		"http://game.api.wesai.com/intra/virtualMedal",
	];
	private curUrl = this.urlArr[0];
	constructor() {
		super();
		//btn是编辑器界面设定的，代码里面能直接使用，并且有代码提示
		this.btn_pay.on(laya.events.Event.CLICK, this, this.onBtnClickPay);
		this.btn_quaryUserInfo.on(laya.events.Event.CLICK, this, this.onBtnClickQuary);
		this.btn_add.on(laya.events.Event.CLICK, this, this.onBtnClickAddAchivement);
		this.btn_quit.on(laya.events.Event.CLICK, this, this.onBtnClickQuit);
		this.btn_changeApi.on(laya.events.Event.CLICK, this, this.onBtnClickChange);
		this.btn_share.on(laya.events.Event.CLICK, this, this.onBtnClickShare);
		this.btn_push.on(laya.events.Event.CLICK, this, this.onBtnClickPush);
		this.btn_getLocation.on(laya.events.Event.CLICK, this, this.onBtnClickLocation);
		this.lab_api.text = this.urlArr[0];
		Utils.getInstance().registEventHandler(this, this.onIosHallEvent);
	}

	//api动态切换
	private count = 0;
	private onBtnClickChange(): void {
		let index = (++this.count)%3
		this.curUrl = this.urlArr[index];
		this.lab_api.text = this.curUrl;
	}

	// static iosPushInfoListener(data):void{
	// 	console.log("iosPushInfoListener = "+data);
	// 	let jsonObj = JSON.parse(data);
	// 	console.log("jsonObj ");
	// 	console.log("jsonObj.localCity = "+jsonObj.localCity);
	// 	console.log("jsonObj.longitude = "+jsonObj.longitude);
	// 	console.log("jsonObj.latitude = "+jsonObj.latitude);
	// }

	private onIosHallEvent(event:HallEvent, result:any){
		console.log("onIosHallEvent eventName = "+event + " result = "+result);
		if(event == HallEvent.LocationChanged){
			this.updateLocationInfo(result);
		}else if(event == HallEvent.AddAchivement){
			let data = "添加成就返回：" + "code = "+ result.code + " message: "+result.message;
			this.updateText(data);
		}
		else{
			this.updateText(result);
		}
	}

	private onBtnClickPay(): void {
		Utils.getInstance().doPay();
		console.log("onBtnClickPay");
	}

	private onBtnClickQuary(): void {
		Utils.getInstance().doQueryUserInfo();
		console.log("onBtnClickQuary");
	}

	private HttpRequestComplete(data):void {
		this.lab_HallResult.text ="添加成就返回：" + "code = "+ data.code + " message: "+data.message;
		console.log(data);
		// this.lab_HallResult.text =data;
	}

	private onHttpRequestError():void {
		console.log("onHttpRequestError");
	}

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

	private onBtnClickAddAchivement(): void {
		console.log("onBtnClickAddAchivement");
		let uid = "";
		let gid = "";
		let platform = Utils.getInstance().getPlatform();
		if(platform == 1){
			uid = Utils.getInstance().doQueryWesaiUid();
			gid = Utils.getInstance().doQueryGameId();
			let param = "user_id="+uid+"&game_id="+gid+"&medal_value=1";
			var hr = new laya.net.HttpRequest();
			hr.once(Laya.Event.COMPLETE, this, this.HttpRequestComplete);
			hr.once(Laya.Event.ERROR, this, this.onHttpRequestError);
			hr.send(this.curUrl, param, 'post', 'json');
			console.log("onBtnClickAddAchivement curUrl: " + this.curUrl + " uid = "+uid+" gameId = "+ gid);
		}else{
			Utils.getInstance().addAchivement(this.curUrl);
		}
		
	}

	private onBtnClickShare():void {
		console.log("onBtnClickShare");
		Utils.getInstance().doShare("laya分享测试", "这是一条测试信息", "https://static.wesai.com/ticketv2-product_static/pc/img/v2/logov2.png?v=819c55576907f5d888b19dce8b33326d", "https://www.wesai.com/");
	}

	private onBtnClickPush():void {
		console.log("onBtnClickPush");
		let msg = Utils.getInstance().getMessagePush();
		this.lab_HallResult.text = "推送信息：" + msg;
	}

	private onBtnClickLocation():void{
		console.log("onBtnClickLocation");
		let location = Utils.getInstance().getLocation();
		this.updateLocationInfo("位置 ：" +location)
	}

	private onBtnClickQuit(): void {
		console.log("onBtnClickQuit");
		Utils.getInstance().doQuit();
	}

	public updateText(data:string):void{
		this.lab_HallResult.text =data;
	}

	public updateLocationInfo(data:string):void{
		this.lab_location.text = data;
	}

}

//Todo:之后取消该接口，统一走Utils里的接口
let mainUi;
function onHallEvent(event:string, data:string){
	console.log("onHallEvent event = " + event + " data = " + data);
	if(event == "LocationChanged"){
		mainUi.updateLocationInfo(data);
	}else{
		let data1 = data;
		//  if(event == "HallPushUserInfo"){
		// 	var data2 = Laya.Browser.window.BASE64.decoder(data);
		// 	var str = '';  
		// 	for(var i = 0 , len =  data2.length ; i < len ;++i){  
		// 		str += String.fromCharCode(data2[i]);  
		// 	}
		// 	data1 = str;
		// 	console.log("decode base64: " + data1);
		//  }
		 mainUi.updateText(event+ " " +data1);
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

function onLoaded(): void {
	//实例UI界面
	let test1 = new MainUi();
	Laya.stage.addChild(test1);
	mainUi = test1;
}

function pad(num, n) {
  	var y='00000000000000000000000000000'+num; //爱几个0就几个，自己够用就行
   return y.substr(y.length-n);
}
console.log(pad(3,6)); //000003
var timestamp=new Date().getTime();
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