$(function() {
    // 页面一加载，获取用户详细信息
    $.get({
        url: pathObj.user_detail,
        success: function(res) {
            if(res.code === 200) {
                for(var k in res.data) {
                    if(k == 'userPic') {
                        $('img.user_pic').attr('src',res.data[k]);
                    }else {
                        $('input.'+ k).val(res.data[k]);
                    }
                }
            }
        }
    });

    // 默认隐藏文件域，用美观的图片指向 文件域
    $('#exampleInputFile').hide();
    //文件选择 触发change事件
    $('#exampleInputFile').on('change', function() {
        // console.dir(this.files[0]);
        let fileImg = this.files[0];
        // 上传图片的时候，文件对象 转为 图片url
        let urlImg = window.URL.createObjectURL(fileImg);
        $('img.user_pic').attr('src', urlImg);
        
    });

    // 点击 修改 时，提交数据至后台
    $('.btn-edit').on('click', function(e) {
        // 阻止默认行为
        e.preventDefault();

        //获取表单数据（有name属性的）
        let form = $('#form')[0];
        let fd = new FormData(form);

        // 提交到编辑用户信息接口
        $.ajax({
            url: window.pathObj.user_edit,
            type: 'post',
            // 阻止处理数据
            processData: false,
            // 不设置请求头（类型）
            contentType: false,
            data: fd,
            success: function(res) {
                if(res.code === 200) {
                    // 用户信息编辑成功，刷新当前页面
                    // window.location.reload();

                    // 刷新index页面的用户信息 法一
                    // parent.window.location.reload();
                    // 或者 法二
                    // 发起index页面数据请求
                    // 没生效 ？？？？？
                    $.ajax({
                        url: window.pathObj.user_info,
                        type: 'get', 
                        success: function(res) {
                            console.log(res)
                            if(res.code === 200) {
                                
                                parent.$('.user_info img, .user_center_link img').attr('src', res.data.userPic);
                                parent.$('.user_info span').html('欢迎&nbsp;&nbsp;'+ res.data.nickname);
                            }
                        }
                        
                    });

                    
                }
            }
        });


    });


})