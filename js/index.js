$(function() {

    // 热点图
    $.get({
        url: 'http://localhost:8080/api/v1/index/hotpic',
        success: function(res) {
            console.log(res)
            let htmlPic = template('hotPic',res);
            $('.focus_list').html(htmlPic);
        }
    });

    // 最新资讯
    $.get({
        url: 'http://localhost:8080/api/v1/index/latest',
        success: function(res) {
            let htmlNews = template('newsList', res);
            $('.common_news').html(htmlNews);
        }
    });
})