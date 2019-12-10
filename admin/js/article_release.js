$(function() {

    // 文章分类渲染
    getCategory();
    function getCategory() {
        $.get({
            url: window.pathObj.category_list,
            success: function(res) {
                if(res.code === 200) {
                    let html = template('artRelease', res)
                    $('select.category').html(html);
                }
            }
        });
    }

    // 文件上传后，图片的预览
    $('#inputCover').on('change', function() {
        console.dir(this.files[0]);
        let fileImg = this.files[0];
        // 转url
        let urlImg = window.URL.createObjectURL(fileImg);
        // 预览图片地址
        $('.article_cover').attr('src', urlImg);
    });

    // 注册点击  发布按钮
    $('.btn-release').on('click', function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 设置文章发布状态
        $('#state').val('已发布');
        // 获取表单数据
        let title = $('#inputTitle').val().trim();
    
        // 非空判断
        if(title == '') {
            alert('不能为空！');
            return;
        }
        let form = $('#form')[0];
        let fd = new FormData(form);
        // console.log(tinyMCE.activeEditor.getContent())
        //追加文章内容
        // 插件加载不对
        // fd.append('content', tinyMCE.activeEditor.getContent());
        fd.append('content', 'nicai');

        // 发送ajax
        $.post({
            url: window.pathObj.article_publish,
            processData: false,
            contentType: false,
            data: fd,
            success: function(res) {
                console.log(res);
            }

        });

    });


});