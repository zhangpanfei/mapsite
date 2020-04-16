$('.navi-link').hover(function(){
    $('.navi-link').removeClass('navi-link-active')
    $(this).addClass('navi-link-active')
    if ($('.navi-link').index(this)===1) {
        $('.hover-link').slideDown("fast")
    } else {
        $('.hover-link').slideUp("fast");
    }
})

$('.navi').mouseleave(function(){
    $('.navi-link').removeClass('navi-link-active')
    $('.navi-link[curretn-link]').addClass('navi-link-active')
    $('.hover-link').hide();
})

$('[about-links],.about-links').hover(function(){
    $('.about-links').slideDown("fast")
},function(){
    $('.about-links').slideUp("fast");
})

function resetFontSize() {
    var fontSize = Math.floor(document.body.clientWidth * 0.0375)
    $('.banner-text-1 div').css('font-size',fontSize+'px')
}

function isIE9() {
    if (navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<10){
        // alert("您的浏览器版本过低，请使用IE10及以上版本");
        return true;
    } else {
        return false;
    }
}

function isMobile() {
    return document.body.clientWidth < 768;
}

$().ready(function(){
    $('.navi-link[curretn-link]').addClass('navi-link-active')
    // 菜单
    $('.menu-toogle,.menu-close').click(function(){
        if (!$('.m-menu').is(':hidden')) {
            $('.menu-toogle').removeClass('glyphicon-remove');
            $('.menu-toogle').addClass('glyphicon-align-justify');
        } else {
            $('.menu-toogle').addClass('glyphicon-remove');
            $('.menu-toogle').removeClass('glyphicon-align-justify');
        }
        $('.m-menu').slideToggle("slow")
    })
})