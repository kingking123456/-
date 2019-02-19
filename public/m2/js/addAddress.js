$(function(){
    /* 截取参数分割拿到数据 */
    var edit=Number(cutFun(location.href,"isEdit"));
    console.log(edit);
     
    
    if(edit){
        if(localStorage.getItem("addressEdit")){
          var address=JSON.parse(localStorage.getItem("addressEdit"));

           var html= template("editTpl",address);
         
           $("#editForm").html(html);
            
        }
    }else{
        var html=template("editTpl",{});
        console.log(html);
        $("#editForm").html(html);
    }




    //创建picker选择器
    var picker = new mui.PopPicker({layer:3}); 
    //为picker选择器添加类
    picker.setData(cityData );
    $("#selectCity").on("tap",function(){

        picker.show(function (selectItems) {
            console.log(selectItems);
           $("#selectCity").val(selectItems[0].text+selectItems[1].text+selectItems[2].text);

            
          });
    });
 /* 
    1.给确认注册点击事件，
    2.获取用户输入的值
    3.进行初步判断
    4.发送ajax请求
    5.将数据渲染到模板引擎上
    */
   $("#addAddress").on("tap",function(){
      
    var username=$.trim($('[name="username"]').val());
    var postCode=$.trim($('[name="postCode"]').val());
    var city=$.trim($('[name="city"]').val());
    var detail=$.trim($('[name="detail"]').val());
    
		if(!username) {
			mui.toast("请输入收货人姓名");
			return;
		}

		if(!postCode) {
			mui.toast("请输入邮政编码");
			return;
        }
        var data={
            address:city,
            addressDetail:detail,
            recipients:username,
            postcode:postCode
        }
        if(edit){
            /* 编辑操作*/
            var url="/address/updateAddress";
            data.id=address.id;
        }else{
            var url="/address/addAddress";
        }

    $.ajax({
        url:url,
        type:"post",
        data:data,
        success:function(res){
            
           if(res.success){
               if(edit){
                mui.toast("地址修改成功");
               }else{
               
                mui.toast("地址添加成功");
              }
              setTimeout(function(){
                location.href="address.html";
                },2000)
            }
        }
    });
   });
    
});  







   
             
             
               
  

      
      