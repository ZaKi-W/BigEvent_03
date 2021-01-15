// 在发送 ajax post get之前会触发
$.ajaxPrefilter(function(options){
    options.url='http://api-breakingnews-web.itheima.net' + options.url
})