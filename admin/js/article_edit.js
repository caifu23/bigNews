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

    // 获取当前 编辑的文章id
    let curId = window.location.search.substring(4);
    console.log(curId)
    $.get({
        url: window.pathObj.article_search,
        data: {
            id: curId
        },
        success: function(res) {
            console.log(res)
            if(res.code === 200) {
                //数据获取成功，渲染编辑页面数据
                $('#inputTitle').val(res.data.title);
                $('.article_cover').attr('src', res.data.cover);
                $('.category').val(res.data.categoryId);
                $('#testico').val(res.data.date);
                $('#mytextarea').val(res.data.content);
                $('#id').val(res.data.id);
            }
        }

    });

    // 点击修改
    $('.btn-edit').on('click', function(e) {
        //阻止默认行为
        e.preventDefault();
        $('#state').val('已发布');
        releaseData();
    });
    // 点击存草稿
    $('.btn-draft').on('click', function(e) {
        //阻止默认行为
        e.preventDefault();
        $('#state').val('草稿');
        releaseData();
    });

    function releaseData() {
        // 获取表单数据
        let form = $('#form')[0];
        // 数据转流
        let fd = new FormData(form);
        fd.append('content', tinyMCE.activeEditor.getContent());
        console.log('记录')
        $.post({
            url: window.pathObj.article_edit,
            processData: false,
            contentType: false,
            data: fd,
            success: function(res) {
                if(res.code === 200) {
                    // 跳转到文章列表页
                    location.href = './article_list.html';
                }
            }
        });
    }



});