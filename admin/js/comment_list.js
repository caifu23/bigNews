$(function() {
    let curPage = 1;
    // 请求评论
    // $.get({
    //     url: window.pathObj.comment_search,
    //     data: {
    //         page: 1,
    //         perpage: 10
    //     },
    //     success: function(res) {
    //         console.log(res)
    //         if(res.code === 200) {
    //             let html = template('commentTp', res.data);
    //             $('tbody').html(html);
    //         }
    //     }
    // });

    getComment(curPage, function(res) {
        
        $('#pagination').twbsPagination({
            totalPages: res.data.totalPage,
            startPage: curPage,
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                //如果点击的页数与当前页数不一致，则发送ajax请求 ？？？？？
                // 更新当前页面
                
                // 此处可以省略当前页和点击页不一致的判断，
                // 因为分页插件的页码在当前页是不可以点击的
                // if (page != curPage) {
                    curPage = page;
                    getComment(curPage, null);
                // };
                
            }
        });
    });

    function getComment(curPage, callback) {
        $.get({
            url: window.pathObj.comment_search,
            dataType: 'json',
            data: {
                page: curPage,
                perpage: 11
            },
            success: function(res) {
                if(res.code === 200) {
                    // 模板引擎渲染数据
                    let html = template('commentTp', res.data);
                    $('tbody').html(html);
                    // 加载分页组件
                    
                    if(callback != null && res.data.data.length != 0) {
                        $('#pagination').show();
                        $('#tips').hide();
                        callback(res);
                        
                    }else if(res.data.data.length <= 0 && curPage >1 ) {
                        console.log('oh，页面数据获取等待。。。。。')
                        getComment(curPage-1, function(res) {
                            $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, curPage-1);
                        });

                    }else if(res.data.data.length <= 0){
                        $('#pagination').hide();
                        $('#tips').show();
                    }  
                    
                }
            }
        });
    }

    // 删除
    $('.common_con tbody').on('click', 'a.btn-danger', function() {
        // console.log('删除', $(this).attr('data-id'))
        if(confirm('你确认删除该评论吗？')) {
            $.post({
                url: window.pathObj.comment_delete,
                data: {
                    id: $(this).attr('data-id')
                },
                success: function(res) {
                    if(res.code === 200) {
                        // 刷新当前页数据
                        getComment(curPage, null);
                    }else {
                        alert(res.msg);
                    }
                }
            });
        }
    });

    //批准
    $('.common_con tbody').on('click', 'a.btn-info', function() {
        // console.log('批准')
        $.post({
            url: window.pathObj.comment_pass,
            data: {
                id: $(this).attr('data-id')
            },
            success: function(res) {
                if(res.code === 200) {
                    // console.log(res)
                    // 刷新当前页数据
                    getComment(curPage, null);
                }else {
                    alert(res.msg);
                }
            }
        });
    });

    //拒绝
    $('.common_con tbody').on('click', 'a.btn-warning', function() {
        // console.log('拒绝')
        $.post({
            url: window.pathObj.comment_reject,
            data: {
                id: $(this).attr('data-id')
            },
            success: function(res) {
                // console.log(res)
                if(res.code === 200) {
                    getComment(curPage, null);
                }else {
                    alert(res.msg);
                }
            }
        });
    });

});