$(function(){
    /* 保存用户输入的数据 */
    // 存储收货地址
	var address = null;

	$.ajax({
		url: '/address/queryAddress',
		type: 'get',
		success: function(res) {
			console.log(res);

			address = res;

            var html = template("addressTpl",{result:res});
           

			$('#address-box').html(html);
			
		}
	})
    /* 删除地址 */
    $("#address-box").on("tap",".delete-btn" ,function(){
        var id=$(this).attr("data-id");
        // var li=$(this).parent("li");
        var li=this.parentNode.parentNode;
        
        mui.confirm("确定要删除吗？",function(mess){
            
            if(mess.index==1){ //确认删除
                $.ajax({
                    url:"/address/deleteAddress",
                    type:"post",
                    data:{
                        id:id
                    },
                    success:function(res){
                        console.log(res);
                    }
                });
            }else{
                //取消删除
                //关闭列表滑出效果
                mui.swipeoutClose(li);
            }
        });
    });
    /* 编辑操作 */
    $("#address-box").on("tap",".edit-btn",function(){
        var id=$(this).attr("data-id");
        for(var i=0; i<address.length;i++){
            if(address[i].id==id){
            localStorage.setItem("addressEdit",JSON.stringify(address[i]));
            /* 终止循环 */
            break;
            }
          }
        location.href="addAddress.html?isEdit=1";
   });
});  
       

    
      