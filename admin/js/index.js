$(function() {
    console.log($('.level01'))
    // 一级列表点击
$('.level01').on('click', function() {
    //排他
    $(this).addClass('active').siblings().removeClass('active');
    //如果是文章管理
    if($(this).next().hasClass('level02')) {
        // 则下滑列表
        $(this).next().slideToggle();
        // 箭头旋转90度切换
        $(this).find('b').toggleClass('rotate0');
        // 默认触发第一个DOM元素的点击,相当于选中它
        // 为什么需要[0],click不是操作dom对象么
        $('.level02>li>a').first()[0].click();
    }else {
        // 如果选中的不是管理菜单的一级列表,则管理的二级去掉active
        $('.level02>li').removeClass('active');
    }
    // 管理的二级点击
    $('.level02>li').on('click', function() {
        // 排他
        $(this).addClass('active').siblings().removeClass('active');
    })
    
});
})