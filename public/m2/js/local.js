/* 
1.为登录按钮添加点击事件
2.获取用户输入的值
3.向后台发ajax请求
4.点击跳转页面

*/
$(function(){
    $("#login-btn").on("tap",function(){
        var username=$('[name="username"]').val();
        var password=$('[name="password"]').val();
        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        if(!password){
            mui.toast("请输入正确的密码");
            return;
        }
        

        $.ajax({
            url:"/user/login",
            type:"post",
            data:{
                username: username,
                password:password
            },
            beforeSend:function(){
                $("#login-btn").html("正在登录中...");
            },
            success:function(res){
                if(res.success){
                    mui.toast("登录成功");
                    $("#login-btn").html("登录");
                    setTimeout(function(){
                       location.href="user.html";
                    },2000)
                }
            }
        });

    });
});
        