//开启进度条

$(document).ajaxStart(function(){
    NProgress.start();
});
$(document).ajaxStop(function(){
   setInterval(function () {
       NProgress.done();

   },5000);
})

