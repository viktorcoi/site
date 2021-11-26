$( document ).ready(function() {

const btn_copy_email = $(".btn-copy-email")
const copy_email = $(".copy-email")
const header = $(".header-background")
let prevScroll = $(window).scrollTop()
let currentScroll 
const headerHidden = () => header.hasClass("hidden")
const select = $('.select')
const select_head = $('.select-head')
const select_list = $('.select-list')
const select_item = $(".select-item")
let price_arr = ["$89", "$119", "$169", "$219"]
const price = $(".price")
const checkbox = $("input:checkbox[name=choose]")
let price_arr_add = ["20", "10", "30"]

// убиает выбранные чекбоксы
checkbox.prop('checked', false); 

// убрать хедер по скроллу
$(window).scroll(() => { 
    currentScroll = $(window).scrollTop()
    if (currentScroll > prevScroll && !headerHidden()) { 
        header.addClass("hidden")
        copy_email.removeClass("copied");
    }
    if (currentScroll < prevScroll && headerHidden()) {
        header.removeClass("hidden") 
    }
    prevScroll = currentScroll 
})

// копирование почты по кнопке
btn_copy_email.click(function() {
    var clipBoardElem = document.createElement("input");
    document.body.appendChild(clipBoardElem);
    clipBoardElem.value = "phattplumm@gmail.com";
    clipBoardElem.select();
    document.execCommand("copy");
    document.body.removeChild(clipBoardElem)
    copy_email.addClass("copied");
    setTimeout(function() {
        copy_email.removeClass("copied");
    }, 850); 
});

// Кастомизированый селектор
select.on('click', '.select-head', function () {
    for(var i=0; i<select_item.length; ++i){
        if($(select_item[i]).text() == $(this).text()) {
            select_item[i].style.display = "none";  
        } else {
            select_item[i].style.display = "block";  
        }
    }
    if ($(this).hasClass('open')) {
        $(this).next().removeClass('open');
        setTimeout(function() {
            $(select_head).removeClass('open');
        }, 300);  
    } else {
        select_head.removeClass('open');
        select_list.removeClass('open');
        $(this).next().addClass('open');
        $(this).addClass('open');
    }
});

select.on('click', '.select-item', function kek() {
    setTimeout(function() {
        $(select_head).removeClass('open');
    }, 300);  
    $(this).parent().removeClass('open');
    $(this).parent().prev().text($(this).text());
    for(var i=0; i<select_item.length; ++i){
        if($(select_item[i]).text() == $(this).text()) {
            price.html(price_arr[i]);
            for (var y=0; y<checkbox.length; ++y) {
                if($(checkbox[y]).is(':checked') == true) {
                    x = price.html().replace(/[^-\d\.]/g, '')
                    var b = parseInt(x) + parseInt(price_arr_add[y])
                    price.html("$" + b);
                }
            } 
        }
    }
});

// Закрытие модалок
$(document).click(function (e) {
    if (!$(e.target).closest('.select').length) {
        setTimeout(function() {
            $(select_head).removeClass('open');
        }, 300);  
        select_list.removeClass('open');
    }
});

// Чекбоксы доп услуг
checkbox.click(function() {
    for(var i=0; i<select_item.length; ++i){
        if($(select_item[i]).text() == $(select_head).text()) {
            a = price.html().replace(/[^-\d\.]/g, '')
        }
    }   
    y = this.id.replace(/[^\d\.]/g, '');   
    if($(this).is(':checked') == true) {      
        var b = parseInt(a) + parseInt(price_arr_add[y])
        price.html("$" + b);
    } else {
        var b = parseInt(a) - parseInt(price_arr_add[y])
        price.html("$" + b);
    }
});

})  