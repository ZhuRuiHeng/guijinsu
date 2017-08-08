	//登录
	document.addEventListener('plusready',function(){
		if(plus.storage.getItem('user')){
			 plus.webview.create('index.html','index.html').show('pop-in');return;   
		}
		$('#denglu').on('click',function(){
			console.log('接口地址为：'+apiRoot+'/Home/Index/zhuce');
			var phone = $('#phone').val();
			var password = $('#password').val();
		//	console.log(user+pass);
			if(!phone || !password){  
				plus.nativeUI.toast('账号和密码不能为空');				
				return; 
			}else if(!phone.match(p1)){
				plus.nativeUI.toast('手机号码格式不正确！');return;
			}
			plus.nativeUI.showWaiting('正在登录...');
			$.ajax({
				type:"get",
				url : apiRoot+'/Home/Index/zhuce,
	       	    data : {
	       		    phone : phone,
	       		    password : password
	         	},
	         	dataType : "json",
	         	success : function(data){
	         		plus.nativeUI.closeWaiting();
	         		
	         		console.log(JSON.stringify(data));
	         		
	         		if(data.result == 1){
						plus.nativeUI.showWaiting('登录中...');
						setTimeout(function(){
							plus.nativeUI.closeWaiting();
							relogin(plus.webview.currentWebview().id); 
						},100);
						setTimeout(function(){
	                    	plus.webview.currentWebview().close();
	                    },5000) 
					}else if(data.result == 0){
						plus.nativeUI.toast(data.result);						
					}
	         	},
	         	error : function(e){
	         		console.log('error');
	         	}
			});
			
		})
		
	//	var aaa = plus.storage.getItem('user'); 
	//	
	//	console.log(aaa);
		
	},false);
	
	function relogin(_self) {
		var all = plus.webview.all();
		for(var i in all) {
			if(all[i].id !== plus.runtime.appid && all[i].id !== _self) {
				all[i].close();
			}
			if(i == all.length - 1) {
				plus.webview.create('index.html','index.html').show('pop-in');
				//goUrl('index.html');
				plus.webview.currentWebview().close();
			}
		}
	}
	
	//function relogin(_self) {
	//var all = plus.webview.all();
	////	console.log(JSON.stringify(all));
	//for(var i in all) {
	////	 var aaa = plus.runtime.appid;  
	//if(all[i].id !== plus.runtime.appid && all[i].id !== _self) {
	//all[i].close();   
	//}
	//if(i == all.length - 1) {
	//var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
	//var webviewContent= plus.webview.create('./index.html','index.html');//后台创建webview并打开show.html
	//webviewContent.addEventListener("loaded", function() { //注册新webview的载入完成事件
	//      nwaiting.close(); //新webview的载入完毕后关闭等待框
	//      webviewContent.show("slide-in-right",20); //把新webview窗体显示出来，显示动画效果为速度200毫秒的右侧移入动画
	//      }, false);
	//////	 plus.webview.create('./index.html','index.html').show('slide-in-right');
	//}
	//}
	//}