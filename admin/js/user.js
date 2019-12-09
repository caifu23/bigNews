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
    $('#exampleInputFile').hide
    //文件选择 触发change事件
    $('#exampleInputFile').on('change', function() {
        console.dir(this.files[0]);
        let fileImg = this.files[0];
        // 上传图片的时候，文件对象 转为 图片url
        let urlImg = window.URL.createObjectURL(fileImg);
        $('img.user_pic').attr('src', urlImg);
        
    });


})