$(function(){
    var page=1;
    var pageSize=5;
    var totalPage=0;
    categoryFirst();

   function categoryFirst(){
        /* 进来页面之后发送ajax请求 */
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        data:{
            page:page,
            pageSize:pageSize
        },
        success:function(res){
            console.log(res);
          totalPage= Math.ceil(res.total/pageSize);
          console.log(totalPage);
           var html= template("categoryTpl",res);
           $("#categoryBox").html(html);
        }

    });
   }


    /* 
    1.给保存按钮注册点击
    2.获取用户输入值
    3.发送ajax请求给后台，拿到数据
    4.刷新页面内容
     */
    $("#addCategory").on("click",function(){
    
        var categoryName=$("#categoryName").val();
        console.log(categoryName);
        if(!categoryName){
            alert("请填写分类名称");
            return;
        }
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            data:{
                categoryName:categoryName
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    $(".modal").hide();
                    location.reload();
                }
            }
        });


    });
    /*点击下一页加载数据  */
    /* 
    1.给下一页面注册点击事件
    2.发送ajax请求
    3.判断数据
     */
    $("#next").on("click",function(){
        page++
        if(page>totalPage){
            page=totalPage;
            alert("已经最后一页啦");
        }
        categoryFirst();


    });
     /*点击上一页加载数据  */
    /* 
    1.给下一页面注册点击事件
    2.发送ajax请求
    3.判断数据
     */
    $("#prev").on("click",function(){
        page--
        if(page<1){
            page=1;
            alert("已经是第一页啦");
        }
        categoryFirst();


    });
});
    
   