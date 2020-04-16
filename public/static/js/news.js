$().ready(function(){
    $('.item-area').hover(function(){
        $('.item-desc').slideUp("fast");
        $(this).find('.item-desc').slideDown("fast")
    },function(){
        $('.item-desc').slideUp("fast");
    })
})