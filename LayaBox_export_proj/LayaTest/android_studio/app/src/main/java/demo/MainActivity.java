package demo;
import java.util.Timer;
import java.util.TimerTask;

import layaair.game.IMarket.IPlugin;
import layaair.game.IMarket.IPluginRuntimeProxy;
import layaair.game.Market.GameEngine;

import com.layabox.game.R;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.Toast;


public class MainActivity extends Activity{
    
    private IPlugin mPlugin = null;
    private IPluginRuntimeProxy mProxy = null;
    boolean isLoad=false;
    boolean isExit=false;

    public static  MainActivity instance;
    @Override    
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        instance= this;
        mProxy = new RuntimeProxy(this);
        mPlugin = new GameEngine(this);
        mPlugin.game_plugin_set_runtime_proxy(mProxy);
        mPlugin.game_plugin_set_option("localize","false");
        mPlugin.game_plugin_set_option("gameUrl", "http://10.2.21.2/wesai/");
        mPlugin.game_plugin_init();
        View gameView = mPlugin.game_plugin_get_view();
        this.setContentView(gameView);
        isLoad=true;
    }
    
    protected void onPause()
    {
        super.onPause();
        if(isLoad)mPlugin.game_plugin_onPause();
    }
    //------------------------------------------------------------------------------
    protected void onResume()
    {
        super.onResume();
        if(isLoad)mPlugin.game_plugin_onResume();
        
    }
    
    protected void onDestroy()
    {
        super.onDestroy();
        if(isLoad)mPlugin.game_plugin_onDestory();
    }
    
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event)
    {

        if (keyCode == KeyEvent.KEYCODE_BACK)
        {
            Hook();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    
 // 对于好多应用，会在程序中杀死 进程，这样会导致我们统计不到此时Activity结束的信息，
    // 对于这种情况需要调用 'MobclickAgent.onKillProcess( Context )'
    // 方法，保存一些页面调用的数据。正常的应用是不需要调用此方法的。
    private void Hook()
    {
        if(!isExit)
        {
            isExit = true;
            Toast.makeText(this, "在按一次退出程序", Toast.LENGTH_SHORT).show();
            new Timer().schedule(new TimerTask() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					isExit = false;
				}
			},2000);
        }
        else
        {
         //   MobclickAgent.onKillProcess(MainActivity.this);
            int pid = android.os.Process.myPid();
            android.os.Process.killProcess(pid);
        }
    }
}
