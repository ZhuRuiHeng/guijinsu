//下拉刷新
	var ws;
	document.addEventListener('plusready',function(){
		// 刷新
		PullToRefresh(ws);
		//选项卡切换
		(function($) {
			$('#scroll').scroll({
				indicators: true //是否显示滚动条
			});
			var segmentedControl = document.getElementById('segmentedControl');
			$('.mui-input-group').on('change', 'input', function() {
				if (this.checked) {
					var styleEl = document.querySelector('input[name="style"]:checked');
					var colorEl = document.querySelector('input[name="color"]:checked');
					if (styleEl && colorEl) {
						var style = styleEl.value;
						var color = colorEl.value;
						segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
					}
				}
			});
		})(mui);
	})