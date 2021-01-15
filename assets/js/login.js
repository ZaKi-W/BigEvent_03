$(function () {
    $('#link_reg').on('click', function () {
        $(".login_box").hide()
        $(".reg_box").show()
    })
    $('#link_login').on('click', function () {
        $(".login_box").show()
        $(".reg_box").hide()
    })


    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须在6-12位，且不能有空格'],
        repwd: function (value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    $('#reg_box').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link_login').click()
                $('#reg_box')[0].reset()
            }
        })
    })

    $('#login_box').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href= '/index.html'
            }
        })
    })

})