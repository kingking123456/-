$(function(){
    $("#modify-btn").on("tap",function(){
        alert(111);
       var originPass=$.trim($('[name="originPass"]').val());
       var newPass=$.trim($('[name="newPass"]').val());
       var confirmNewPass=$.trim($('[name="confirmNewPass"]').val());
       var vCode=$.trim($('[name=vCode]').val());
       if(!originPass){
            mui.toast("请输入原密码");
            return;
       }
       
		if(newPass != confirmNewPass){

			mui.toast('两次输入的密码不一致');

			return;

		}
     
       $.ajax({
        url:"/user/updatePassword",
        type:"post",
        data:{
            oldPassword:originPass,
            newPassword:newPass,
            vCode:vCode
        },
        success:function(res){
            if(res.success){
                mui.toast("修改密码成功");
                setTimeout(function(){
                    location.href="local.html";
                },2000)
            }
        }
       });
    });
    $("#getCode").on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res){
                console.log(res.vCode);
            }
        })
    })
});