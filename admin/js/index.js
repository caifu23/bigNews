$(function() {
   
    // 一级列表点击
    $('.level01').on('click', function() {
        //排他
        $(this).addClass('active').siblings().removeClass('active');

        //判断文章管理 ，可以通过当前在兄弟间的索引
        // if($(this).index() === 1)
        //如果是文章管理
        if($(this).next().hasClass('level02')) {
            // 则下滑列表
            $(this).next().slideToggle();
            // 箭头旋转90度切换
            $(this).find('b').toggleClass('rotate0');
            // 默认触发第一个DOM元素的点击,相当于选中它
            // 为什么需要[0],click()方法操作dom对象么
            // $('.level02>li').first()[0].click();
            // 第一次点击样式没有切换过来 -------------？？？？
            $('.level02>li:eq(0) a')[0].click();
        }else {
            // 如果选中的不是管理菜单的一级列表,则管理的二级去掉active
            $('.level02>li').removeClass('active');
        }
        
    });

    // 管理的二级点击
    $('.level02>li').on('click', function() {
        // 排他
        $(this).addClass('active').siblings().removeClass('active');
    })

    //点击右上角 个人中心
    $('.user_center_link a:eq(0)').on('click', function() {
        // 触发user的点击事件
        // 法一：
        // $('#user').trigger('click');
        // 法二： 或者在html行内添加onclick
        // <a href="./user.html" target="main_frame" onclick="$('#user').click()">个人中心</a>
    });
    


})