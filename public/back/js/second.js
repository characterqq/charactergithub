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

        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
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

        //    手动重置隐藏域的效验状态
            $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    })

//    5. 实现表单效验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],


    //    配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    //    配置字段
        fields: {
            categoryId: {
                validators: {
                        notEmpty: {
                            message: "请选择一级分类"
                        }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类"
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: "请输入二级分类"
                    }
                }
            }

        }
    })

//    6.注册表单效验成功事件，阻止默认提交，通过ajax进行提交
    $('#form').on("success.form.bv", function( e ) {
        e.preventDefault();

        //    通过 ajax提交
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if( info.success ){
                //    关闭模态框
                    $('#addModal').modal("hide");
                //    重新渲染页面
                    currentPage = 1;
                    render();
                //    重置模态框的表单
                    $('#form').data("bootstrapValidator").resetForm(true);
                //    手动重置文本内容，和图片路径
                    $('#dropdownText').text("请选择一级分类");
                    $('#imgBox img').attr("src", "images/none.png");
                }
            }
        })
    })
});