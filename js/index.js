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

    //获取周评论排行
    $.get({
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function(res) {
            // console.log(res)
            if(res.code == 200 ) {
                let html = template('weekRank', res);
                $('.hotrank_list').html(html);

            }
        }

    });

    // 获取最新评论
    $.get({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success: function(res) {
            // console.log(res)
            if(res.code == 200) {
                let html = template('recentNew', res);
                $('.comment_list').html(html);
            }
        }
    });

    // 焦点关注
    $.get({
        url: 'http://localhost:8080/api/v1/index/attention ',
        success: function(res) {
            // console.log(res)
            if(res.code == 200) {
                $('.guanzhu_list').html(template('focusList', res))
            }
        }
    });

    
})