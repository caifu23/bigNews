$(function() {
    // 获取id
    let artId =location.href.split('=')[1];
    // console.log(artId)
    
    // 获取文章详细内容
    $.get({
        url: 'http://localhost:8080/api/v1/index/article',
        data: {
            id: artId 
        },
        success: function(res) {
            // console.log(res)
            if(res.code == 200) {
                $('.article_title').text(res.data.title);
                $('.article_info').html(`${res.data.author} 发布于 ${res.data.date}   分类: ${res.data.category}   阅读:
                (${res.data.read})   评论: (${res.data.comments})`);
                $('.article_con').html('<p>'+ res.data.content + '</p>');
                $('.article_links a:eq(0)').text(res.data.next.title).attr('href', './article.html?id='+res.data.next.id);
                $('.article_links a:eq(1)').text(res.data.prev.title).attr('href', './article.html?id='+res.data.prev.id);
                $('.comment_count').text(res.data.comments + '条评论');
                $('#commentId').val(res.data.id);
            }
        }
    });

    //发表评论
    $('.comment_sub').on('click', function(e) {
        e.preventDefault();
        // 非空判断
        if($('.comment_name').val().trim() == '' || $('.comment_input').val().trim() == '') {
            alert('用户名或者评论 不能为空!');
            return;
        }
        // 获取表单数据
        let form = $('.comment_form');
        let dataStr = form.serialize();
        console.log(dataStr)
        $.post({
            url: 'http://localhost:8080/api/v1/index/post_comment',
            data: dataStr,
            success: function(res) {
                if(res.code == 201) {
                    console.log(res.msg);
                }
            }

        });
    });
    

    // 获取当前文章评论
    $.get({
        url: 'http://localhost:8080/api/v1/index/get_comment',
        data: {
            articleId: artId
        },
        success: function(res) {
            let html = template('commentList', res);
            $('.comment_list_con').html(html);
        }
    });

    //获取周评论排行
    $.get({
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function(res) {
            // console.log(res)
            if(res.code == 200 ) {
                let html = template('weekRank', res);
                $('.common_wrap:eq(0) .content_list').html(html);

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
                $('.common_wrap:eq(1) .comment_list').html(html);
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