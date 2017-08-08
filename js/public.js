
var webRoot = "http://192.168.1.123:8084";
var apiRoot = webRoot + "/index.php";
var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/;//手机号码格式验证




	/**
	 * 尝试关闭页面
	 * @param {webview} _web
	 */	
	function closeWeb (_web) {
		var _this;
		if(typeof(_web) !=='object'){
			_this = plus.webview.getWebviewById(_web);
			if(_this!=null){
				_this.close();
			}			
		}else{
			for(var i in _web){
				_this = plus.webview.getWebviewById(_web[i]);
				if(_this!=null){
					_this.close();
				}
			}
		}
	}
	
	/**
	 * 尝试刷新页面
	 * @param {webview} _web
	 */		
	function reloadWeb (_web) {
		var _this;
		if(typeof(_web) !=='object'){
			_this = plus.webview.getWebviewById(_web);
			if(_this!=null){
				_this.reload();
			}			
		}else{
			for(var i in _web){
				_this = plus.webview.getWebviewById(_web[i]);
				if(_this!=null){
					_this.reload();
				}
			}
		}
	}
	
	
    //下拉刷新
	function PullToRefresh(ws){
		ws=plus.webview.currentWebview();
		ws.setPullToRefresh({support:true,
			height:"50px",
			range:"200px",
			contentdown:{  
				caption:"下拉可以刷新"
			},
			contentover:{
				caption:"释放立即刷新"
			},
			contentrefresh:{
				caption:"正在刷新..."
			} 
		},function(){
			setTimeout(function(){
				ws.reload();
				ws.endPullToRefresh();
			},1500);
		});
	}    



//	var first = null;
//	mui.back = function() {
//	    //首次按键，提示‘再按一次退出应用’
//	    if (!first) {
//	        first = new Date().getTime();
//	        mui.toast('再按一次退出应用');
//	        setTimeout(function() {
//	            first = null;
//	        }, 1000);
//	    } else {
//	        if (new Date().getTime() - first < 1000) {
//	            plus.runtime.quit();
//	        }
//	    }
//	};