//开启进度条

$(document).ajaxStart(function(){
    NProgress.start();
});
$(document).ajaxStop(function(){
   setInterval(function () {
       NProgress.done();

   },5000);
});

//登陆拦截
//前后分离了,前端是不知道该用户是否登陆了,但是后台知道,
//发送ajax请求,查询用户状态即可
//(1)用户已登录,啥都不用做,让用户继续访问
//(2)用户未登录,拦截到登陆页

if( location.href.indexOf("login.html") === -1) {
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        dataType: "json",
        success: function (info) {
            console.log(info);
            if (info.success) {
                //    已登录,让用户继续访问
            }
            if (info.error === 400) {
                //    未登录,拦截到登陆页
                location.href = "login.html";
            }
        }
    })
}




$(function(){
//      1.分类管理的切换功能
        $('.nav .category').click(function(){
            $('.nav .child').stop().slideToggle();
        })
//    2.左侧侧边栏切换功能
    $('.icon_menu').click(function(){
        $('.lt_aside').toggleClass("hidemenu");
        $('.lt_topbar').toggleClass("hidemenu");
        $('.lt_main').toggleClass("hidemenu");
    })
// 3.点击退出功能，弹出提示
 $('.icon_logout').click(function(){
 //    显示模态框

     $('#logoutModal').modal("show");
 })

//    4.点击模态框的退出按钮,实现推出功能
    $('#logoutBtn').click(function(){
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function( info ){
                console.log(info);
                if( info.success ){
                //    退出成功,
                    location.href = "login.html";
                }
            }
        })
    })
});




