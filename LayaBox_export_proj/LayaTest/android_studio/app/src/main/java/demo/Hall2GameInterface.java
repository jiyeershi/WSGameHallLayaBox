package demo;

/**
 * Created by wesai on 2017/10/16.
 */

import android.app.Activity;
import android.util.Log;
import android.view.View;

import com.wesai.games.joint.sdk.IWSApiGameHallToGamesAdapter;
import com.wesai.games.joint.sdk.IWSApiGamesToGameHall;

import layaair.game.IMarket.IPlugin;
import layaair.game.IMarket.IPluginRuntimeProxy;
import layaair.game.Market.GameEngine;
import layaair.game.browser.ConchJNI;

public class Hall2GameInterface extends IWSApiGameHallToGamesAdapter {

    static Activity instance;
    static IWSApiGamesToGameHall boImpl;

    private IPlugin mPlugin = null;
    private IPluginRuntimeProxy mProxy = null;
    boolean isLoad = false;

    public static String pushStr;
    public static String locationStr;

    @Override
    public boolean isCloseActivity(Activity arg0) {
        // TODO Auto-generated method stub
        int pid = android.os.Process.myPid();
        android.os.Process.killProcess(pid);
        return true;
    }

    public static IWSApiGamesToGameHall getBo() {
        return boImpl;
    }

    public void onCreateStartGame(Activity activity, IWSApiGamesToGameHall bo)
            throws Exception {
        // TODO Auto-generated method stub
        instance = activity;
        boImpl = bo;
//        Log.e("myDebug", "layaBox_start; instance="+instance +"  var1.getResources()="+instance.getResources());

        mProxy = new RuntimeProxy(instance);

        mPlugin = new GameEngine(instance);
        mPlugin.game_plugin_set_runtime_proxy(mProxy);
        mPlugin.game_plugin_set_option("localize", "false");
        mPlugin.game_plugin_set_option("gameUrl", "http://10.2.21.2/wesai/");
                mPlugin.game_plugin_init();
        View gameView = mPlugin.game_plugin_get_view();
        instance.setContentView(gameView);
        isLoad = true;
        Log.e("myDebug", "gameId=" + bo.doQueryGameId() + ";userId=" + bo.doQueryWesaiUid());

    }

    @Override
    public void onPushMsg(String jsonData) {
        super.onPushMsg(jsonData);
        pushStr = jsonData;
    }


    @Override
    public boolean sendMsgToGame(int type, int resultType, String msg,
                                 String dataJson) {
        // TODO Auto-generated method stub
        String data = "Event:" + type + ",result:" + resultType + ",msg:" + msg
                + ",jsonData:" + dataJson;
        String event = "";
        if (type == 20103) {
            event = "HallPushUserInfo";
        } else if (type == 20107) {
            event = "HallPushPayResult";
        }
        ConchJNI.callConchJSFunction("onHallEvent", event, data);
        return false;
    }

    @Override
    public void onGameDestroy(Activity arg0) throws Exception {
        // TODO Auto-generated method stub
    }

    @Override
    public void onGamePause(Activity arg0) throws Exception {
        // TODO Auto-generated method stub
        if (isLoad) mPlugin.game_plugin_onPause();
    }

    @Override
    public void onGameResume(Activity arg0) throws Exception {
        // TODO Auto-generated method stub
        if (isLoad) mPlugin.game_plugin_onResume();
    }

    @Override
    public void onGameStart(Activity arg0) throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public void onGameStop(Activity arg0) throws Exception {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean isOpenLocation(Activity mActivity) {
        return true;
    }

    @Override
    public void onLocationChanged(String jsonData) {
        locationStr = jsonData;
//        ConchJNI.callConchJSFunction("onHallEvent", "LocationChanged", jsonData);
    }

    @Override
    public boolean quitGame(Activity arg0) {
        // TODO Auto-generated method stub
        if (isLoad) mPlugin.game_plugin_onDestory();
        return true;
    }

}
