$(function(){
    
    /* 页数 */
    var page=1;
    /* 每页条数 */
    var pageSize=5;
    /* 总页数 */
    var totalPage=0;
    dataProduct();

   function dataProduct(){
        /* 进入页面发送ajax请求 */
        $.ajax({
            url:"/product/queryProductDetailList",
            type:"get",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
               // console.log(res);
                totalPage=(Math.ceil(res.total/pageSize));
                var html= template("categoryProduct",res);
                $("#categoryBox").html(html);
            }
        });
   }
    /* 给点击下一页注册事件 */
    
    $("#next").on("click",function(){
       
        page++;
        if(page>totalPage){
            page=totalPage;
            alert("已经是最后一也啦");
        }
        dataProduct();
       

    });
    /* 给点击上一页注册事件 */
    $("#prev").on("click",function(){
       
        page--;
        if(page<1){
            page=1;
            alert("已经是第一页啦");
            
        }
        dataProduct();
       

    });
    /* 图片预览 */
    var pic=[];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
           console.log(data,8888);
        if(pic.length<3){
            pic.push( data.result);
            $("#imgBox").html(template("imgPro",{data:pic}));
        }else{
            alert("不好意思，已经超过三张图片哦")
        }

           
        }
    });

    /* 发送二级页面ajax请求 */
    $.ajax({
        url:"/category/querySecondCategoryPaging",
        type:"get",
        data:{
            page:page, 
            pageSize:pageSize
        },
        success:function(res){
            $.ajax({
                url:"/category/querySecondCategoryPaging",
                type:"get",
                data:{
                    page:page,
                    pageSize:res.total
                },
                success:function(res){
                    var html= template("formPro",res);
                    //console.log(res);
                    $("#brandBox").html(html);
                }
            })
         
          
          
        }
    });
       /* 点击添加按钮 */
    $("#addCategory").on("click",function(){
        
        var proName=$("#productName").val();
        var oldPrice=$("#oldPrice").val();
        var price=$("#price").val();
        var proDesc=$("#proDesc").val();
        var size=$("#size").val();
        
        var num=$("#num").val();
        var brandId=$("#brandId").val();
       
        $.ajax({
            url:"/product/addProduct",
            type:"post",
            data:{
                proName: proName,
                oldPrice:oldPrice,
                price:price,
                proDesc: proDesc,
                size: size,
                statu:0,
                num:num,
                brandId:brandId
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    location.reload();
                }else{
                    alert("否则添加商品失败");
                }
    
            }
        });
    })

         

         
  

    
   
});