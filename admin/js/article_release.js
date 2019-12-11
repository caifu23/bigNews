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
        //发布
        artRelease();

    });

    // 注册点击  存为草稿按钮
    $('.btn-draft').on('click', function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 设置文章发布状态
        $('#state').val('草稿');
        //发布
        artRelease();

    });

    // ajax请求
    function artRelease() {
        // 获取表单数据
        let title = $('#inputTitle').val().trim();
        // 判断图片文件？
        // 判断 文件域表单的 files.length
        if($('#inputCover')[0].files.length === 0) {
            alert('没有选择图片文件');
            return;
        }
        // 标题、文章内容？？？
    
        // 非空判断
        if(title == '') {
            alert('不能为空！');
            return;
        }
        let form = $('#form')[0];
        let fd = new FormData(form);
        // console.log(tinyMCE.activeEditor.getContent())
        //追加文章内容
        // 插件初始化数据
        fd.append('content', tinyMCE.activeEditor.getContent());

        // 发送ajax
        $.post({
            url: window.pathObj.article_publish,
            processData: false,
            contentType: false,
            data: fd,
            success: function(res) {

                // 执行发布成功操作
                if(res.code === 200) {
                    //询问用户是否继续添加文章
                    if(!confirm(res.msg +',是否留在当前页面继续添加文章？')){
                        // 跳转到文章列表页
                        location.href = './article_list.html';
                    }else {
                        // 清空表单数据
                        form.reset();
                    }
                }
            }

        });
    }


});