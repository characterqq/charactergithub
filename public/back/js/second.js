$(function(){
    var  currentPage = 1; //当前页
    var  pageSize = 5; //每页条数
//    1.已进入页面发送ajax请求，获取数据，通过模板引擎渲染
    render();

    function  render(){
        $.ajax({
         type: "get",
         url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize

            },
            dataType: "json",
            success: function( info ){
                console.log( info );
                //结合模板引擎
                var htmlStr = template("secondTpl", info);
                $('tbody').html(htmlStr);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                //    总页数
                    totalPages: Math.ceil( info.total / info.size ),

                //    当前页
                    currentPage:  info.page,
                //    添加页码点击事件
                    onPageClicked: function( a, b , c, page){
                    //   更新当前页
                        currentPage = page;
                    //    重新渲染
                        render();
                    }

                })

            }
        })
    }

//    2.点击添加分类按钮，
    $('#addBtn').click(function(){
        //console.log(333);
            $('#addModal').modal("show");

    //    发送ajax请求，获取一级分类全部数据，通过模板引擎渲染
        $.ajax({
                type:"get",
                url: "/category/queryTopCategoryPaging",
                data: {
                page: 1,
                    pageSize: 100
            },
            dataType: "json",
                success: function ( info ){
                    console.log( info );
                    var htmlStr = template("dropdownTpl", info );
                    //console.log( htmlStr);
                    $('.dropdown-menu').html( htmlStr );
            }
        })
    })
//    3.通过事件委托，给dropdown-menu 下的所有 a 绑定点击事件
    $('.dropdown-menu').on("click", "a", function(){
    //    获取a 的文本
        var txt = $(this).text();
        console.log( txt );
        $('#dropdownText').text( txt );
        var id = $(this).data("id");

        $('[name="categoryId"]').val( id );

    })

//    4.进行文件上传初始化
    $('#fileupload').fileupload({
    //    配置返回的数据格式
        dataType: "json",
    //    图片上传完成后会调用
        done: function( e, data ) {
            console.log( data );
            var imgUrl =  data.result.picAddr;
        //
            console.log( imgUrl );
            $('#imgBox img').attr("src", imgUrl);
        //    将图片地址，设置给 input
            $('[name="brandLogo"]').val( imgUrl );
        }
    })
});