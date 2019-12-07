;(function(w) {
    let baseUrl = 'http://localhost:8080/api/v1';
    let pathObj = {
        baseUrl: baseUrl,
        'user_login': baseUrl + '/admin/user/login',
        'user_info': baseUrl + '/admin/user/info',
        'user_detail': baseUrl + '/admin/user/detail',
        'user_edit': baseUrl + '/admin/user/edit',
        'category_list': baseUrl + '/admin/category/list',
        'category_add': baseUrl + '/admin/category/add',
        'category_search': baseUrl + '/admin/category/search',
        'category_edit': baseUrl + '/admin/category/edit',
        'category_delete': baseUrl + '/admin/category/delete',
        'article_query': baseUrl + '/admin/article/query',
        'article_publish': baseUrl + '/admin/article/publish',
        'article_search': baseUrl + '/admin/article/search',
        'article_edit': baseUrl + '/admin/article/edit',
        'article_delete': baseUrl + '/admin/article/delete',
        'data_info': baseUrl + '/admin/data/info',
        'data_article': baseUrl + '/admin/data/article',
        'data_category': baseUrl + '/admin/data/category',
        'data_visit': baseUrl + '/admin/data/visit',
        'comment_search': baseUrl + '/admin/comment/search',
        'comment_pass': baseUrl + '/admin/comment/pass',
        'comment_reject': baseUrl + '/admin/comment/reject',
        'comment_delete': baseUrl + '/admin/comment/delete'
        
    }
    // 暴露接口
    w.pathObj = pathObj;

   
})(window)
;(function() {
    $.ajaxSetup({
        beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        error(xhr,status,error) {
            if(error == 'Forbidden') {
                alert('请先登录');
                // 跳转login
                location.href = './login.html';
            }
        }

    });
})()