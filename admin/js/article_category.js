$(function() {
    // 页面 文章分类 数据渲染
    getCategory();
    function getCategory() {
        $.get({
            url: window.pathObj.category_list,
            success: function(res) {
                if(res.code === 200) {
                    console.log(res);
                    let html = template('tp', res)
                    $('tbody').html(html);
                }
            }
        });
    }


    //点击编辑 
    //点击 新增 
    // 模态框显示
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget)
        // e.relatedTarget 是触发该模态框 显示的事件对象
        if( e.relatedTarget == $('#xinzengfenlei')[0] ) {
            // 当前是：新增按钮
            // 显示对应提示模态框
            $('#articleName').text('新增文章名称');
            $('#cateName').text('新增文章类别');
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            // 模态框打开，清空数据
            $('form')[0].reset();

        }else {
            // 当前是： 编辑按钮
            $('#articleName').text('编辑文章名称');
            $('#cateName').text('编辑文章类别');
            $('#btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success');
            //获取该条目信息在模态框
            // 获取当前的 id
            let cateId = $(e.relatedTarget).attr('data-id');
            console.log(cateId)
            $.get({
                url: window.pathObj.category_search,
                data: {
                    id: cateId
                },
                success: function(res) {
                    console.log(res);
                    if(res.code === 200) {
                        $('#recipient-name').val(res.data[0].name);
                        $('#message-text').val(res.data[0].slug);
                        $('#cateId').val(res.data[0].id);
                    }
                }
            });

        }
      });


    // 点击新增或者编辑按钮时  -- 用类名来区分
    $('#btn-confirm').on('click', function() {
        
        if( $(this).hasClass('btn-primary') ) {
            // 判断当前按钮是作为 编辑按钮
            // 获取表单数据
            let id = $('#cateId').val();
            let name = $('#recipient-name').val().trim();
            let slug = $('#message-text').val().trim();
            if(name == '' || slug == '') {
                alert('不能为空');
                return;
            }
            console.log(123)
            $.post({
                url: window.pathObj.category_edit,
                data: {
                    id: id,
                    name: name,
                    slug: slug
                },
                success: function(res) {
                    if(res.code === 200 ) {
                        // 编辑成功, 刷新页面数据
                        getCategory();
                        // 隐藏模态框
                        $('#myModal').modal('hide');
                    }
                }
            });

        }else if( $(this).hasClass('btn-success') ) {
            // 判断当前按钮是作为 新增按钮
            // 获取输入值
            let name = $('#recipient-name').val().trim();
            let slug = $('#message-text').val().trim();
            // 非空判断
            if(name == '' || slug == '') {
                alert('不能为空');
                return;
            }
            // 发起新增请求
            $.post({
                url: window.pathObj.category_add,
                data: {
                    name: name,
                    slug: slug
                },
                success: function(res) {
                    if(res.code === 201) {
                        //新增成功
                        //刷新页面数据
                        getCategory();
                        // 隐藏模态框
                        $('#myModal').modal('hide');
                    }
                }

            });
            
        }
        
    });

    // 删除
    // 由于是动态生成，用事件委托
    $('tbody').on('click', '#btn-delete', function() {
        
        let delId = $(this).attr('data-id');
        // 删除危险操作，提醒用户
        let delVal = confirm('你真的确定删除吗？');
        if(delVal) {
            $.post({
                url: window.pathObj.category_delete,
                data: {
                    id: delId
                },
                success: function(res) {
                    if(res.code === 204) {
                        // 删除成功
                        // 更新页面数据
                        getCategory();
                    }
                }
            });
        }

    });

});