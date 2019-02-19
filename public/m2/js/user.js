var userInfo=null;
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    /* 同步 */
    async: false,
    success:function(res){
      
        if(res.error==400){
            location.href="local.html";
            
        }
        userInfo=res;
        
    }
})


$(function(){
    $("#logout").on("tap",function(){
        $.ajax({
            url:"/user/logout",
            type:"get",
            success:function(res){
                console.log(res);
                if(res.success){
                    mui.toast("退出登录成功");
                    setTimeout(function(){
                        location.href="local.html";
                    },2000)
                }

            }   
        });
    });
   var html= template("userLogout",userInfo);
   console.log(html);
   $("#userInfoBox").html(html);
});   
        
