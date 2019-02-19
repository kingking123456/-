$(function(){
    /* 
    1.给注册按钮注册点击事件
    2.获取用户输入的数据
    3.发送ajax请求给后台，得到后台数据
    4.模拟手机获取验证码
    */
    $("#register-btn").on("tap",function(){
        var username=$.trim($('[name="username"]').val());
        var mobile=$.trim($('[name="mobile"]').val());
        var password=$.trim($('[name="password"]').val());
        var againPass=$.trim($('[name="againPass"]').val());
        var vCode=$('[name="vCode"]').val();
        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        if(mobile<11){
            mui.toast("请输入合法的手机号");
            return;
        }
        if(password!=againPass){
            mui.toast("两次输入密码不一样");
            return;
        }
        $.ajax({
            url:"/user/register",
            type:"post",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success:function(res){
               console.log(res);
               if(res.success){
                    setTimeout(function(){
                        location.href="local.html";
                    },2000)
               }
               else if(res.error==401){
                    miu.toast("验证码输入有错误,请重新输入")
               }
            }
        });
       
    });
     $("#getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCode",
            type:"get",
            success:function(res){
                console.log(res.vCode);
            }
        });
    });
});           
     
       
    
   
    

