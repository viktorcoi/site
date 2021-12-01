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
let price_arr = ["($89)", "($119)", "($169)", "($219)"]
const price = $(".price")
const checkbox = $("input:checkbox[name=choose]")
let price_arr_add = ["20", "10", "30"]
const li_submenu = $('.li-for-submenu')
const submenu = $('.submenu')
const button_menu = $('.button-menu-mini')
const menu_mini = $('.background-mini-menu')
const body = $('body')
const open_popup = $('.order')
const popup = $('.background_popup')
const close_popup = $('.close')
const options = $('.options')


// убиает выбранные чекбоксы
checkbox.prop('checked', false); 

// убрать хедер по скроллу
$(window).scroll(() => { 
    currentScroll = $(window).scrollTop()
        if ($(window).width() > "1023") {
        if (currentScroll > prevScroll && !headerHidden()) { 
            header.addClass("hidden")
            copy_email.removeClass("copied");
        }
        if (currentScroll < prevScroll && headerHidden()) {
            header.removeClass("hidden") 
        }
        prevScroll = currentScroll 
    }   
})

// при определенном экране возращает шапку
$(function() {
    $(window).on('load resize', function() {
        if ($(window).width() < "1024") {
            header.removeClass("hidden")
            copy_email.removeClass("copied");
        }
    });
});

// отрытие меню
button_menu.click(function() {
    $(this).toggleClass('rot-90');
    menu_mini.toggleClass('open');
    body.toggleClass('no_scroll');
});

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

select.on('click', '.select-item', function() {
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
                    price.html("($" + b + ")");
                }
            } 
        }
    }
});

// открытие при клике submenu на экранах <= 1023px
li_submenu.click(function() {
    $(this).next().toggleClass("open");
    li_submenu.not(this).next().siblings().next().removeClass("open")
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
        price.html("($" + b + ")");
    } else {
        var b = parseInt(a) - parseInt(price_arr_add[y])
        price.html("($" + b + ")");
    }
});

// открытие заказа
open_popup.click(function() {
    body.addClass("no_scroll");
    popup.addClass("open");
    options.html("Options: Song " + select_head.text().toLowerCase() + ";")
        for (var y=0; y<checkbox.length; ++y) {
            z = options.html()
            if($(checkbox[y]).is(':checked') == true) {
                k = $(checkbox[y]).parent().next().text();
                options.html(z + " " + k + ";")   
            }   
        }
    new_order = options.html().replace(/.$/,".")
    options.html(new_order)
    setTimeout(function(){
        popup.addClass("scroll");   
    }, 300);
});

// закрытие заказа
close_popup.click(function() {
    popup.removeClass("open");
    body.removeClass("no_scroll");
    popup.removeClass("scroll");  
});

// Закрытие модалок
$(document).click(function (e) {
    const target = $(e.target)
    if (!target.closest('.select').length) {
        setTimeout(function() {
            $(select_head).removeClass('open');
        }, 300);  
        select_list.removeClass('open');
    }
    if (!target.closest('.button-menu-mini').length && !target.closest('.main-menu-background').length
    && !target.closest('.order').length && !target.closest('.popup').length) {
        button_menu.removeClass('rot-90');
        menu_mini.removeClass('open');
        body.removeClass('no_scroll');
    }
    if (!target.closest('.submenu').length && !target.closest('.li-for-submenu').length) {
        submenu.removeClass("open")
    }
    if (!target.closest('.popup').length && !target.closest('.order').length) {
        popup.removeClass("open");
        body.removeClass("no_scroll");
        popup.removeClass("scroll");  
    }
});

// Динамическое увелечение textarea
$('textarea').on('input', function(){
	this.style.height = 'auto';
	this.style.height = (this.scrollHeight + 6) + 'px'; 
});

})  