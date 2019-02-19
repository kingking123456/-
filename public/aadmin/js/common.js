/* 发送ajax请求改为同步 */
$.ajax({
    url:"/employee/checkRootLogin",
    async: false ,
    type:"get",
    success:function(res){
       // console.log(res);
        if(res.error&&res.error==400){
            location.href="login.html";
        }
    },     
});
$(function(){
    /* 退出 */
    $("#loginOut").on("click",function(){
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            success:function(res){
                console.log(res);
                if(res.success){
                    location.href="login.html";
                }else{
                    alert("退出失败");
                }
            }
        });
    });
    	//菜单
        /*导航菜单*/
    $('.navbar-brand').on('click',function(){
        $('.left').toggle();
        $('.right').toggleClass('menu');
    });


        var navLi = $('.navs li')

        navLi.on('click',function(){

            $(this).find('ul').slideToggle();

         });

});
        
          