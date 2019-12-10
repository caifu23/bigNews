$(function() {

    // 获取文章类别列表
    $.get({
        url: window.pathObj.category_list,
        success: function(res) {
            if( res.code === 200 ){
                // 模板引擎渲染页面
                $('#selCategory').html(template('selList', res));
            }
        }
    });

    // 获取文章列表数据
    // 按钮注册点击事件
    $('#btnSearch').click(function(e) {
        // 阻止表单默认行为
        e.preventDefault();
        // ajax请求
        getArticleList(1);

    });
    // 页面一加载，需要加载数据，触发
    $('#btnSearch').trigger('click');

    function getArticleList(curPage) {
        $.get({
            url: window.pathObj.article_query,
            dataType: 'json',
            data: {
                page: curPage,
                perpage: 10,
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
            },
            success: function(res) {
                if(res.code === 200) {
                    // 模板引擎渲染数据
                    $('.table>tbody').html(template('artList', res.data));
                    // 加载分页组件
                    loadPagination(res.data.totalPage, curPage);
                }
            }
        });
    }

    // 加载分页组件
    /**
     * @description 加载分页组件
     * @param {type} totalPages  总页数
     * @param {*} startPage  当前页数
     */
    function loadPagination(totalPages, startPage) {
         //(1)先销毁上一次的分页数据
         $('#pagination').twbsPagination('destroy');
         //(2)加载分页插件
         $('#pagination').twbsPagination({
             totalPages: totalPages,
             startPage: startPage,
             visiblePages: 6,
             first: '首页',
             prev: '上一页',
             next: '下一页',
             last: '尾页',
             onPageClick: function (event, page) {
                 //如果点击的页数与当前页数不一致，则发送ajax请求
                 if (page != startPage) {
                     getArticleList(page);
                 };
             }
         });
    }

    // 删除文章
    // 删除按钮 动态生成，故 事件委托
    $('.table>tbody').on('click', 'a.delete', function() {
        let curPage = $('#pagination li.active a').text();
        // console.log(this)
        // 弹出提示
        let delValue = confirm('你确认删除该文章吗?');
        if(delValue) {
            $.post({
                url: window.pathObj.article_delete,
                data: {
                    id: $(this).attr('data-id')
                },
                success: function(res) {
                    console.log(res)
                    if(res.code === 204) {
                        alert('删除成功');
                        // 此处应该获取当前页数,再局部刷新数据
                        // window.location.reload();
                        // 获取当前页,重新发起ajax请求
                        getArticleList(curPage);
                        console.log(curPage)
                    }else {
                        alert(res.msg);
                    }
                }
            });
        }
    });

    // 文章编辑
    $('#release_btn').on('click', function() {
        $('.level02>li:eq(1)', window.parent.document).addClass('active').siblings().removeClass('active');
    });

    



    



});