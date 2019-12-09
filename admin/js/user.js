$(function() {
    // 页面一加载，获取用户详细信息
    $.get({
        url: pathObj.user_detail,
        success: function(res) {
            if(res.code === 200) {
                for(var k in res.data) {
                    if(k == 'userPic') {
                        $('img.user_pic').attr('src',res.data[k]);
                    }else {
                        $('input.'+ k).val(res.data[k]);
                    }
                    
                    console.log(k+'-----------'+res.data[k])
                }
            }
        }
    });


})