$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    /* 获取一级分类数据 */
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(res){
         var html= template("category-first",{first:res.rows});
         $(".links").html(html);
         $(".links").find("a").eq(0).addClass("active");
         console.log(res);
         /* 获取第一个分类页面的id */
         var id =res.rows[0].id;
        secondFun(id);
        }
    });   
     /* 给一级分类添加点击事件 */
    $(".links").on("click","a",function(){
         var id=$(this).data("id");
         console.log(id);
        $(this).addClass("active").siblings().removeClass("active");
        secondFun(id);
        
    })
       
    /*二级分类数据 */
    function  secondFun(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:id
            },
            success:function(res){
                console.log(res);
              var html=  template("category-second",res);
              $(".brand-list").html(html);
               
    
            }
        })
    }
    

});
    
      
      
    
   