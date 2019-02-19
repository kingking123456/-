/* 获取用户在地址林中输入关键字 */
var keyword=cutFun(location.href,"keyword");
/* 定义页面 */
var page=1;
/* 页面中的数据 */
var html="";
/* 价格排序规则，升序*/
var priceSort = 1;
var order={}
var num=1;
var This = null;

$(function(){
 
   /* 点击价格按钮 */
   $("#priceSort").on("tap",function(){
    /* 更改价格排序 */
    priceSort=priceSort==1 ? 2:1;
    order={price:priceSort}
    /* 对之前的数据初始化 */
    html="";
    page=1;
    mui('#refreshContainer').pullRefresh().refresh(true);
    getData();


  });
  $('#num').on('tap', function(){
		// 更改销量排序条件
		num = num == 1 ? 2 : 1;
		order={num:num}
		console.log(num);
	
		// 对之前的各种配置进行初始化
		html = "";
		page = 1;
		mui('#refreshContainer').pullRefresh().refresh(true);
		getData();
	});

  
});

mui.init({
  pullRefresh : {
    container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
  }
});
    
  
function getData() {
 
	if(!This){
    This = this;
    
	}
  $.ajax({
      url: '/product/queryProduct',
      type: 'get',
      // data: {
      //   page: page++,
      //   pageSize: 3,
      //   proName: keyword,
      //   price: priceSort,
      // },
		  data: $.extend({
			page: page++,
			pageSize: 3,
			proName: keyword,
			/* price: priceSort,
			num:num */
	 	},order),
		success: function(res){
     	if(res.data.length > 0){
        html += template('searchTpl', res);
        console.log(html);
				$('#search-box').html(html);
				// 告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(false);
			}else {
				// 告诉上拉加载组件当前数据加载完毕
				This.endPullupToRefresh(true);
			}
		}
	});

}
		
  
   
   
   
   
 	
	
	


  
 
