$(function(){
    var page=1;
    var pageSize=5;
    var totalPage=0;
    dataFun();
    /* 图片预览 */
    $('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
            console.log(data,888);
            brandData.brandLogo =data.result.picAddr;
            var imgUrl=data.result.picAddr
            $("#showBrand").attr("src",imgUrl);

	    	
	    }
    });

    /* 获取一级分类数据 */
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(res){
            console.log(res.total)
            $.ajax({
                url:"/category/queryTopCategoryPaging",
                type:"get",
                data:{
                    page:1,
                    pageSize:res.total
                }, 
                success:function(res){
                    console.log(res,5555)
                  
                  var html= template("categoryFirst",res);
                 
                   $("#firstCategory").html(html);
                 
                } 
            });
        }
       
    });
    /* 页面进来就发送ajax请求 */
    function dataFun(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
              totalPage= Math.ceil(res.total/pageSize);
               

               var html= template("categoryTpl",res);
              
               $("#categoryBox").html(html);
            }
        });
    }
    /* 下一页 */
    $("#next").on("click",function(){
        page++;
        if(page>totalPage){
            page=totalPage;
            alert("已经是最后一页啦");
        }
        dataFun();
    })
    /* 上一页 */
    $("#prev").on("click",function(){
        page--;
        if(page<1){
            page=1;
            alert("已经是第一页啦");
        }
        dataFun();
    })
    
    var brandData={
        brandName:"",
        categoryId:"",
        brandLogo:"",
        hot:0
        
    }
   /* 给保存按钮注册事件 */
   $("#addCategory").on("click",function(){
       
        brandData.categoryId =$("#categoryId").val();
        brandData.brandName=$("#brandName").val();
        if(brandData.categoryId=="-1"){
            alert("请输入品牌所属分类");
            return;
        }
        if(!brandData.brandName){
            alert("请输入品牌名称");
            return;
        }
        if(!brandData.brandLogo){
            alert("请上传商品图片");
            return;
        }
     
        /* 发送ajax请求 */
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            data:brandData,
            success:function(res){
                //console.log(res);
                if(res.success){
                    location.reload();
                }else{
                    alert('品牌添加失败');
					console.log(result);
                }
            }
        });
   });

});
            
          