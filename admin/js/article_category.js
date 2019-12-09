$(function() {
    // 页面加载信息
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


});