$('.sex_box>div').click(function () {
    $(this).children('input[type="radio"]').prop('checked',true);
    $(this).children(".is_checkbox").addClass('active')
    $(this).siblings().children(".is_checkbox").removeClass('active');
    $(this).siblings().children('input[type="radio"]').prop('checked',false);
    //var status = $(this).children('input[type="radio"]').is(':checked')
    //alert(status)
})

$('.is_apply').click(function () {
    var status = $(this).hasClass('active');
    //alert(status)
    if(status){
        $(this).removeClass('active')
        $(this).next('input[type="checkbox"]').prop('checked',false)
    }else{
        $(this).addClass('active')
        $(this).next('input[type="checkbox"]').prop('checked',true)
    }
});
$('.gift').click(function () {
    var is_apply = $('.is_apply');
    var status = is_apply.hasClass('active');
    if(status){
        is_apply.removeClass('active')
        is_apply.next('input[type="checkbox"]').prop('checked',false)
    }else{
        is_apply.addClass('active')
        is_apply.next('input[type="checkbox"]').prop('checked',true)
    }
});
$('.is_agree').click(function () {
    var status = $(this).hasClass('active');
    //alert(status)
    if(status){
        $(this).removeClass('active')
        $(this).next('input[type="checkbox"]').prop('checked',true)
    }else{
        $(this).addClass('active')
        $(this).next('input[type="checkbox"]').removeAttrs('checked')
    }
});

mobiscroll.date('#birthday',{
    theme: 'android-holo',
    display: 'center',
    lang:'zh',
    min: new Date(1947, 1, 1),
    max: new Date(2000, 12, 31),
    dateFormat:'yy-mm-dd',
    headerText:'出生日期',
    monthNamesShort:['1','2','3','4','5','6','7','8','9','10','11','12']
});
$('.idcard').keyup(function () {
    var l =$(this).val().length;
    if(l>0){
        $(this).css('padding-right','21px');
        $('.down_idcard ').fadeIn(800);
    }else{
        $(this).css('padding-right','0');
        $('.down_idcard ').hide();
    }
});

$('.down_idcard').click(function () {
    $('.idcard').css('padding-right','0')
    $('.idcard').val('').focus();
    $('.down_idcard ').hide();
});
//select框
$('.money').click(function () {
    var h = $(document).height();
    $('.mask').css('height',h).show();
    $('.money_box').slideDown('fast');
    document.activeElement.blur();
});

$('.job').click(function () {
    var h = $(document).height();
    $('.mask').css('height',h).show();
    $('.job_box').slideDown('fast')
    document.activeElement.blur();
});

$('.money_box ul li').click(function () {
    var str = $(this).html();
    $('.money').val(str);
    $('.money_box').slideUp('fast');
    $('.mask').hide();
});

$('.job_box ul li').click(function () {
    var str = $(this).html();
    $('.job').val(str);
    $('.job_box').slideUp('fast');
    $('.mask').hide();
});

$('.cencal_money').click(function () {
    $('.money_box').slideUp('fast');
    $('.mask').hide();
});

$('.cencal_job').click(function () {
    $('.job_box').slideUp('fast');
    $('.mask').hide();
});
//end select框

function show_n(sel,namestr) {
    $('.'+sel).parent().parent().parent().next('li').slideDown('fast');
    var rsdio = $('.'+sel).parent().parent().parent().next('li').children().find('input[type="radio"]');
    var status = typeof(rsdio.attr("name"))=="undefined";
    if(status){
        rsdio.attr('name',namestr)
    }
}
function hide_n(sel) {
    $('.'+sel).parent().parent().parent().next('li').slideUp('fast');
    var rsdio = $('.'+sel).parent().parent().parent().next('li').children().find('input[type="radio"]');
    rsdio.removeAttr('name');
    rsdio.prop('checked',false);
}


function isvaldate(el,isreg,emptymsg,errormsg) {
    var str = $('.'+el).val();
    var reg = isreg;
    if(str.length == 0){
        layer.open({
            content:emptymsg,
            anim:false,
            skin:'msg',
            time:2
        });
        return false
    }else{
        res = reg.test(str);
        if(!res){
            layer.open({
                content:errormsg,
                anim:false,
                skin:'msg',
                time:2
            });
            return false
        }else{
            return true
        }
    }
}

function ischecked() {
    var is_c = new Array();
    var res = false;
    var str = $('.sex').each(function(index){
        is_c.push( $(this).is(':checked'));
        res =  is_c.some(function(item){
            return(item==true)
        })
    })
    if(res){
        //console.log(res)
        return true
    }else{
        layer.open({
            content:"请选择性别",
            anim:false,
            skin:'msg',
            time:2
        });
        return false
    }
}
//console.log(ischecked())

function isempty(el,emptymsg){
    var str = $('.'+el).val();
    if(str.length == 0){
        layer.open({
            content:emptymsg,
            anim:false,
            skin:'msg',
            time:2
        });
        $('.'+el).focus();
        return false
    }else{
        return true
    }
}
//console.log(ischecked())
//获取验证码
$('.getcode').click(function () {
    //var res_arr = new Array();
    var status_sex = false,status_birth = false,status_phone = false
    var status_name = isvaldate('name',/^[\u4e00-\u9fa5]{2,6}$/,'请输入姓名','请输入正确姓名！');
    if(status_name){
        status_sex = ischecked();
    }
    if(status_sex){
        status_birth = isempty('birth','请填写出生日期')
    }
    if(status_birth){
        status_phone = isvaldate('phone',/^(13[0-9]|14[5|7]|15[0-9]|17[0-9]|18[0-9])\d{8}$/,'手机号码不能为空','手机号码错误');
    }
    var num = 60;
    var _this = $(this);
    if(status_name&&status_sex&&status_birth&&status_phone){
        var time = setInterval(function () {
            num --;
            _this.html(num + 's');
            _this.attr('disabled','disabled');
            if(num === 0 ){
                clearInterval(time);
                _this.html("获取验证码");
                _this.removeAttr('disabled');
            }
        },1000)
    }
});

//city
$('#city').click(function () {
    $('.step_2').hide();
    $('.city_box').show()
    $("body").scrollTop(0);
    document.activeElement.blur();
});
$('.x-close').click(function () {
    $('.city_box').hide();
    $('.step_2').show()
    $("body").scrollTop(0);
});
$('.letters_list ul li,.hot_list ul li').click(function () {
    var city_str = $(this).children('a').html();
    var city_code = $(this).children('a').attr('data-val');
    $('#city').val(city_str);
    $('#city').attr('data-val',city_code);
    $('.city_box').hide();
    $('.step_2').show()
    $("body").scrollTop(0);
});

var arr = new Array();
$('.letters_list ul li').each(function (index) {
    var citycode = $(this).children('a').attr('data-val');
    var strcityname = $(this).children('a').html();
    arr[index] = new Array(citycode,strcityname);

});

//根据ip定位城市并修改对应的城市是代码
var strname = returnCitySN.cname;
cityname = strname.replace('市','');
$('#gpsCity').html(cityname);
$('#city').val(cityname);
//console.log(arr);
for(var i = 0;i<arr.length;i++){
    if(arr[i][1] == cityname){
        $('#gpsCity').attr('data-val',arr[i][0]);
    }
}
var citycode = $('#gpsCity').attr('data-val');
//alert(citycode);
$('#city').attr('data-val',citycode);