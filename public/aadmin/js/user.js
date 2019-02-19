

$(function () {
    var page = 1;
    var pageSize = 3;
    var totalPage = 0;
    isData();
    /* 禁用启用注册事件 */
    $(".body").on("click", "#deleteBtn", function () {

        var id = $(this).attr("data-id");
        console.log(id);
        var isDelete = Number($(this).attr("data-isDelete")) ? 0 : 1

        console.log(isDelete);
        // $.ajax({
        //     url:"/user/updateUser",
        //     type:"post",
        //     data:{
        //         id:id,
        //         isDelete:isDelete
        //     },
        //     success:function(res){
        //        console.log(res);
        //         if(res.success){
        //             location.reload();
        //         }else{
        //             if(res.error){
        //                 alert(res.message);
        //             }
        //         }

        //     }
        // });
        var data={
            id:id,
            isDelete:isDelete
        }

       fetch("/user/updateUser",{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
             },
            method:"post",
            body:JSON.stringify(data),
        }).then(res=>res.json()).then(res=>{
            console.log(res);
            if(res.success){
                location.reload();
            }else{
                if(res.error){
                    alert(res.message);
                }
            }
        })
    });
      
          
    /* 给点击下一页注册事件 */

    $("#next").on("click", function () {

        page++;
        if (page > totalPage) {
            page = totalPage;
            alert("已经是最后一页啦")
        }
        isData();


    });
    /* 给点击上一页注册事件 */
    $("#prev").on("click", function () {

        page--;
        if (page < 1) {
            page = 1;
            alert("已经是当前第一页啦");

        }
        isData();
  

    });
    function isData() {
        // $.ajax({
        //     url:"/user/queryUser",
        //     type:"get",
        //     data:{
        //         page:page,
        //         pageSize:pageSize
        //     },
        //     success:function(res){
        //         console.log(res);
        //         totalPage=(Math.ceil(res.total/pageSize));
        //         //console.log(totalPage,9999);  
        //        var html= template("userTpl",res);
        //        $("#userBox").html(html);
        //     }
        // });
        /* Fetch发送请求 */
        fetch(`/user/queryUser?page=${page}&pageSize=${pageSize}`, {

            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },

        }).then(res => res.json()).then(res => {
            console.log(res);
            totalPage=(Math.ceil(res.total/pageSize));
            var html = template("userTpl", res);
            console.log(html);
            $("#userBox").html(html);
        }).catch(err => {
            console.log(err);
        })
    }




});






