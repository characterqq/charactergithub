$(function(){
        var currentPage = 1;   //当前页
        var pageSize = 4;   //每页条数
//

    render();
    function  render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function( info ){
                console.log(info);
                //    将数据和模板相结合，
                var htmlStr = template("tpl", info);
                $('tbody').html( htmlStr );


                //    进行分页初始化
                $('#paginator').bootstrapPaginator({
                    //    指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    //    总页数
                    totalPages: Math.ceil( info.total  / info.size ),
                    //当前第几页
                    currentPage: info.page,
                    //    注册按钮点击事件
                    onPageClicked:  function( a, b, c, page ){
                        //    更新当前页
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
        console.log(222);
        $('#addModal').modal("show");
    });

//    3.调用表单效验插件，实现表单插件
    $('#form').bootstrapValidator({
    //    配置图标
        feedbackIcons: {
            valid: 'glyphicon  glyphicon-heart',  //效验成功
            invalid: 'glyphicon glyphicon-remove' , //效验失败'
            validating: 'glyphicon glyphicon-refresh'   //效验中
        },

    //   配置字段

        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "一级分类不能为空"
                    }
                }
            }
        }
    })

//    4.注册表单效验成功事件，阻止默认的成功提交，通过ajax 进行提交
    $('#form').on("success.form.bv", function( e ){
        e.preventDefault();

    //    通过ajax进行提交
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            success: function( info ){
                if( info.success ){
                //    添加成功
                //    1.关闭模态框
                    $('#addModal').modal("hide");
                //    2.页面重新渲染
                    currentPage = 1;
                    render();
                //    3.重置模态框
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })
})