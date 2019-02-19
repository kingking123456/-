$(function(){
   
    /* 拿到产品ID */
    var id= cutFun(location.href,"id");
    /* 定义库存量 */
    var kucunNum=0;
    /* 尺码 */
   var size;
   
	

    var productId = 0;
     /* 发送ajax请求拿到后台数据 */
    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        data:{
            id:id
        },
        success:function(res){

            
            // 库存数量
			kucunNum = res.num;
            // 产品ID 
            productId = res.id;
            
           var html= template("productTpl",res);
           
           $("#product-box").html(html);
             /* 获取库存量 */
            var subNum=$(".goods").html("剩余："+res.num+"件")
            //获得slider插件对象
			var gallery = mui('.mui-slider');
            gallery.slider();
          

        }
    })
         
           
        
    /* 尺码大小 */
    $("#product-box").on("tap",".size span",function(){
        $(this).addClass("active").siblings("span").removeClass("active");
         size =$(this).html(); // 用户选择的尺码
         console.log(size)

    });
    var nn=$("#inp");
    /* 点击减商品 */
    $('#reduce').on("tap",function(){
       var num= nn.val();
        num--;
        if(num<1){
            num=1;
        }
        nn.val(num);
    
    });
      
    /* 点击加商品 */
    $("#increase").on("tap",function(){
        var num=nn.val();
        num++;
        if(num>kucunNum){
            num=kucunNum;
        }
        nn.val(num);
        

    });
    /* 加入购物车 */
    $("#addCart").on("tap",function(){
            if(size!=null){
                 /* 发送ajax请求 */
                $.ajax({
                    url:"/cart/addCart",
                    type:"post",
                    data:{
                        productId: productId,
                        num:kucunNum,
                        size:size
                    },
                    // beforeSend:function(){
                    //     if(size!=null){
                    //         mui.toast("请输入尺码?");
                    //         return;
                    //     }
                    // },
                    success:function(res){
                        console.log(res);
                        if(res.success){
                            mui.confirm("加入购物车成功,跳转到购物车吗?",function(mess){
                                console.log(mess);
                                if(mess.index==1){
                                    location.href="cart.html";

                                }
                            })
                        }else if(mess.res==400){
                            mui.toast('请先登录');
					         location.href = "login.html";
                        }
                    }
                });
            }else{
                mui.toast("请选择尺码?");
            }
           
       
    });
});
    


    
   