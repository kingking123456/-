$(function(){
    /* 定义一个空数组 */
    var arrkey=[];
    /* 给搜索按钮添加点击事件 */
    $("#search-btn").on("click",function(){
       // 用户输入的搜索关键字
       
        var keyword = $(this).siblings('input').val();
        //判断用户输入关键字
        if(keyword){
            arrkey.push(keyword);
            /* 将关键字储存到本地 */
            localStorage.setItem("key",JSON.stringify(arrkey));
            /* 实现链接跳转 */
            location.href= "category-search.html?keyword="+keyword;
        }else{
            alert("请输入关键字");
        }
    })
    /*拿到数据 */
    if(localStorage.getItem("key")){
        arrkey=JSON.parse(localStorage.getItem("key"));
        console.log(arrkey);
        var html=template("historyTpl",{res:arrkey});
        console.log(html);
        $("#history-box").html(html);
       
    }
    /* 清空历史 */
    $("#clearBtn").on("click",function(){
        $("#history-box").html("");
        localStorage.removeItem("key");
    });
});