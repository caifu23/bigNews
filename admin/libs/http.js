;(function(w) {
    let baseUrl = 'http://localhost:8080/api/v1';
    let pathObj = {
        baseUrl: baseUrl,
        'user-login': baseUrl + '/admin/user/login',
        'user-info': baseUrl + '/admin/user/info',
        'user-detail': baseUrl + '/admin/user/detail',
        'user-edit': baseUrl + '/admin/user/edit',
        'category-list': baseUrl + '/admin/category/list',
        'category-add': baseUrl + '/admin/category/add',
        'category-search': baseUrl + '/admin/category/search',
        'category-edit': baseUrl + '/admin/category/edit',
        'category-delete': baseUrl + '/admin/category/delete',
        'article-query': baseUrl + '/admin/article/query',
        'article-publish': baseUrl + '/admin/article/publish',
        'article-search': baseUrl + '/admin/article/search',
        'article-edit': baseUrl + '/admin/article/edit',
        'article-delete': baseUrl + '/admin/article/delete',
        'data-info': baseUrl + '/admin/data/info',
        'data-article': baseUrl + '/admin/data/article',
        'data-category': baseUrl + '/admin/data/category',
        'data-visit': baseUrl + '/admin/data/visit',
        'comment-search': baseUrl + '/admin/comment/search',
        'comment-pass': baseUrl + '/admin/comment/pass',
        'comment-reject': baseUrl + '/admin/comment/reject',
        'comment-delete': baseUrl + '/admin/comment/delete'
        
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