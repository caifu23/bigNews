$(function() {
    // 页面一加载，获取用户详细信息
    $.get({
        url: pathObj.user_detail,
        success: function(res) {
            console.log(res);
        }
    });


})