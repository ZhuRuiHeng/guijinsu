var ws;
document.addEventListener('plusready',function(){
	ws=plus.webview.currentWebview();
	var id   = plus.storage.getItem('id');
	var user = plus.storage.getItem('user');
	
	
	

	////////////////////////////////////////////////////////////////////
	    //  上传图片
		$('.tupian').on('click',function() {
		_this = $(this); 
		suoshu = _this.attr('data-id');
//		console.log(suoshu);return;
		plus.nativeUI.actionSheet({cancel:'取消',buttons:[{title:'相册添加'},{title:'拍照添加'}]},function(e){	
//			console.log('---');
		if(e.index == 1){    
			_this.html('<img src="" style="width:65px;height:65px" />');
//          console.log('====');
			 plus.gallery.pick( function(path){
			 	console.log(path);
			 	_this.find('img').attr('src',path);
			 	appendPic(path);
			 }, function(error){
			 	_this.html('&#xe61b;');
			 }, {} );
		}else if(e.index == 2){ 
			_this.html('<img src="" style="width:65px;height:65px" />');
			var cmr = plus.camera.getCamera(); 
			cmr.captureImage( function(path){
				path = "file://" + plus.io.convertLocalFileSystemURL(path);
				_this.find('img').attr('src',path);
				appendPic(path);
			}, function(err){
				_this.html('&#xe61b;');
			}, {index:1} );
		}
		})
	})
		
		
	var index = 1;
	var files = [];
	// 添加照片
	function appendPic(path) {
		var path_new = compressImg(path,'_w',30);//压缩图片
		   files[0] = {name:"uploadkey"+index,path:path_new};   //console.log(path_new);
		   setTimeout(upload,1000);
	}
	//创建对像
	function upload(){
		plus.nativeUI.showWaiting('照片获取中,请稍后...');
	    var  task = plus.uploader.createUpload(apiRoot + '?m=Home&c=Photo&a=uploadOnePhoto',{ method:"POST"},function ( t, status ) { 

			plus.nativeUI.closeWaiting();
			if (status == 200 ) {
//				toast( "头像上传中" );
				plus.storage.setItem(suoshu,t.responseText);  //  获取到的图片路径 
				console.log(t.responseText);
				plus.nativeUI.toast( "图片上传成功" );
			} else {
				plus.nativeUI.toast( "图片上传失败" );
			}  
		});
		//	 console.log(JSON.stringify(task));

		var f=files[0];
		task.addFile(f.path,{key:f.name});
		task.start(); 
	}
	
	$('#tijiao').on('tap',function(){
		var my_taobao_pic = plus.storage.getItem('my_taobao_pic');
		var person_pic    = plus.storage.getItem('person_pic');
		var huiyuan_pic   = plus.storage.getItem('huiyuan_pic');
		var xinyu_pic     = plus.storage.getItem('xinyu_pic');
		var pingjia_pic   = plus.storage.getItem('pingjia_pic');
		
		var zhangdan1_pic = plus.storage.getItem('zhangdan1_pic');
//		var zhangdan2_pic = plus.storage.getItem('zhangdan2_pic');
//		var zhangdan3_pic = plus.storage.getItem('zhangdan3_pic');
//		var zhangdan4_pic = plus.storage.getItem('zhangdan4_pic');
//		var zhangdan5_pic = plus.storage.getItem('zhangdan5_pic');
//		var zhangdan6_pic = plus.storage.getItem('zhangdan6_pic');
//		var zhangdan7_pic = plus.storage.getItem('zhangdan7_pic');
//		var zhangdan8_pic = plus.storage.getItem('zhangdan8_pic');
//		var zhangdan9_pic = plus.storage.getItem('zhangdan9_pic');
//		var zhangdan10_pic = plus.storage.getItem('zhangdan10_pic');
//		console.log(my_taobao_pic+'=='); 
//		console.log(person_pic+'uuu');
//		console.log(huiyuan_pic+'---');
//		console.log(xinyu_pic+'***');
		return;
		var taobao_zhangh  = $('#taobao_zhangh').val();
	    
	    var taobao_address = $('#cityResult3').val();
	    var taobao_nicheng = $('#taobao_nicheng').val();
	    var zhanghao_sex   = $('#userResult').val();
	    console.log('----1111'+taobao_nicheng+'---------------');
	    if (!taobao_zhangh) {
			plus.nativeUI.toast('淘宝账号不能为空！');
			return;
		} else if (!taobao_nicheng) {
			plus.nativeUI.toast('淘宝昵称不能为空！');
			return;
		} else if (!taobao_address) {
			plus.nativeUI.toast('地区不能为空！');
			return;
		} else if (!zhanghao_sex) {
			plus.nativeUI.toast('性别选项不能为空！');
			return;
		}else if (!my_taobao_pic) {
			plus.nativeUI.toast('请上传淘宝截图！');
			return;
		}else if (!person_pic) {
			plus.nativeUI.toast('请上传个人资料截图！');
			return;
		}else if (!huiyuan_pic) {
			plus.nativeUI.toast('请上传会员中心截图！');
			return;
		}else if (!xinyu_pic) {
			plus.nativeUI.toast('请上传信誉评级截图！');
			return;
		}else if (!pingjia_pic) {
			plus.nativeUI.toast('请上传评价截图！');
			return;
		}else if (!zhangdan1_pic) {
			plus.nativeUI.toast('请至少上传一张支付宝账单截图！');
			return;
		}
        plus.nativeUI.showWaiting('提交中...');
        
        $.ajax({
        	type:"get",
        	url : apiRoot + "?m=Home&c=Photo&a=bangding_taobao_zh",
        	data : {
        		           id : id,
        		         user : user,
        		taobao_zhangh : taobao_zhangh,
        	   taobao_nicheng : taobao_nicheng,
		 	   taobao_address : taobao_address,
		 	   	 zhanghao_sex : zhanghao_sex,
        		my_taobao_pic : my_taobao_pic,
        		   person_pic : person_pic,
        		  huiyuan_pic : huiyuan_pic,
        		    xinyu_pic : xinyu_pic,
        		  pingjia_pic : pingjia_pic,
        		zhangdan1_pic :zhangdan1_pic
        	},
        	dataType : 'json',
        	success : function(data){
        		plus.nativeUI.closeWaiting();
        	//	console.log(JSON.stringify(data)+'11111111111111');
        		if(data.rt==1){
        			plus.nativeUI.toast('已提交后台审核');
        	//		console.log(data.tshi);
        			ws.close();
        		}else{ 
        			plus.nativeUI.toast('提交失败');
        		}
        	},
        	error : function(e){
        		plus.nativeUI.closeWaiting();
        		plus.nativeUI.toast('提交失败');
        	//	console.log(JSON.stringify(e));
        	}
        });
	    
	})
	
	
},false);