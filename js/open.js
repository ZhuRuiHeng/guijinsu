
//页面跳转
function openNewPage(id){
	mui.openWindow({
		id: id,
		url: id,
		show:{
//			aniShow: 'fade-in-left',
			duration: '300'			
		},
		waiting:{
			autoShow:false
		}
	});
}