package demo;

/**
 * Created by wesai on 2017/10/16.
 */

import android.util.*;

import com.wesai.games.joint.sdk.PayEntity;

import layaair.game.browser.ConchJNI;

public class Utils {

    public static void doQueryUserInfo() {
        Log.d("MyGame", "doQueryUserInfo ");
        Hall2GameInterface.getBo().doQueryUserInfo();
        Log.d("MyGame", "doQueryUserInfo 2");
    }

    public static void doPay(String orderId, int cost, String description, String extralContent) {
        Log.d("MyGame", "doPay");
        Log.d("MyGame", "orderId: "+orderId+" cost: "+cost+" description: "+description+" extralContent: "+extralContent);
        PayEntity pay = new PayEntity(orderId, cost);
        pay.setOrder_id(orderId);
        pay.setAmount(cost);
        pay.setDescription(description);
        pay.setExtra_content(extralContent);
        Hall2GameInterface.getBo().doPay(pay);
        Log.d("MyGame", "doPay 2");
    }

    public static String doQueryWesaiUid(){
        Log.d("MyGame", "doQueryWesaiUid");
        return Hall2GameInterface.getBo().doQueryWesaiUid();
//        return "doQueryWesaiUid ok";
    }

    public static String doQueryGameId(){
        Log.d("MyGame", "doQueryGameId");
        return Hall2GameInterface.getBo().doQueryGameId();
//        return "doQueryWesaiUid ok";
    }

    public  static void doShareRichText(String title, String content, String iconUrl, String h5Url){
        Log.d("MyGame", "doShareRichText" + "title = "+ title + "content = "+ content + "iconUrl = "+ iconUrl + "h5Url = " + h5Url);
        Hall2GameInterface.getBo().doShareRichText(title, content, iconUrl, h5Url);
    }

    public static String getLocationStr() {
        return Hall2GameInterface.locationStr;
    }

    public static String getPushStr() {
        return Hall2GameInterface.pushStr;
    }
    public static void doQuitGame(){
        Log.d("MyGame", "doQuitGame");
        android.os.Process.killProcess(android.os.Process.myPid());
    }
}
