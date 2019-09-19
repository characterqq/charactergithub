$(function(){
        var currentPage = 1;
        var pageSize = 5;
        var currentId;
        var isDelete;

//    1. 一进入页面,发送ajax请求,获取用户列表数据,通过模板引擎渲染
    render();
   function render() {
       $.ajax({
           type: "get",
           url: "/user/queryUser",
           data: {
               page: currentPage,
               pageSize: pageSize
           },
           dataType: "json",
           success: function ( info ) {
               console.log( info );
               var htmlStr = template( 'tpl', info);
               $('tbody').html( htmlStr );

               //分页初始化
               $('#paginator').bootstrapPaginator({
                   //    配置  bootstra 版本
                   bootstrapMajorVersion: 3,
                   //    指定总页数
                   totalPages: Math.ceil( info.total / info.size ),
                   //    当前页
                   currentPage: info.page,
               //    当页码被点击是调用的回调函数
                   onPageClicked: function(a,b,c,page){
                   //    通过 page 获取点击的页码

                   //    更新当前页
                       currentPage = page;
                   //    重新渲染
                       render();
                   }
               });
           }

       })
   }

//    分页初始化



//    2.点击启用禁用按钮,显示模态框,通过事件委托绑定事件
    $('tbody').on("click",".btn",function(){
        //console.log(2222);
        $('#userModal').modal('show');

    //    获取用户 id , jquery 中提供了获取自定义属性的方法,data()
        currentId = $(this).parent().data("id");
        //console.log(currentId);
    //如果是禁用按钮说明需要将该用户设置成禁用状态,
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        console.log(isDelete);
    })

//    3.点击确认按钮,发送ajax请求, 修改对应用户状态,需要两个参数
    $('#submitBtn').click(function(){
            //console.log( currentId );
            console.log(isDelete);

        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: "json",
            success: function( info ){
            //    1.关闭页面

                if( info.success){
                    //1.关闭页面
                    $('#userModal').modal('hide');
                //    2.页面重新渲染
                    render();
                }
            }
        })

    })
})