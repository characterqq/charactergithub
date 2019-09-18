/**
 * Created by Jepson on 2018/4/6.
 */

// 防止全局变量污染, 等待dom渲染再执行
$(function() {

    // 1. 进行表单校验
    //    校验要求: (1) 用户名不能为空
    //              (2) 密码不能为空, 且必须是 6-12 位
    $("#form").bootstrapValidator({

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 对字段进行校验
        fields: {
            username: {
                // 校验的规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        // 为空时显示的提示信息
                        message: "用户名不能为空"
                    },
                    // 长度要求 2-6 位
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是 2-6 位"
                    },
                    callback: {
                        message: "用户名不存在"

                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"
                    },
                    // 专门用于配置回调提示信息的校验规则
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });

    $("#form").on("success.form.bv", function( e ) {
        e.preventDefault();
        //console.log("校验成功后的 表单提交 被阻止了");
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('#form').serialize(),
            dataType: "json",
            success: function( info ){
                console.log( info );
                if( info.success ){
                    location.href = "index.html";
                }
                if( info.error === 1000 ){

                    //alert("当前用户名不存在");
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if( info.error === 1001){

                    //alert("密码错误");
               $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }

            }
        })
    })
    });
