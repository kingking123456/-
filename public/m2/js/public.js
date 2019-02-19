$(function(){
	// 恢复A元素的跳转
	$('body').on('tap', 'a', function(){
		mui.openWindow({
			url: $(this).attr('href')
		});
	});
});

  /* 截取地址栏中字符串 */    
  function cutFun(url,name){
	var cuts=  url.substr(url.indexOf("?")+1);
	var cut= cuts.split("&");
   
	/*得到数组循环遍历 */
	for(var i=0;i<cut.length;i++){
	  var cutOf= cuts.split("=");
	  if(cutOf[0]==name){
		  return cutOf[1];
	  }
	  else{
		  return null;
	  }
	}
   
  }