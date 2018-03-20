// 表单验证 step_1
$("#myform").validate({
    onfocusout: false,
    onkeyup:false,

    rules:{
        name:{
            required:true,
            ischar:true,
        },
        sex:{
            required:true
        },
        birthday:{
            required:true
        },
        phone:{
            required:true,
            isphone:true
        },
        code:{
            required:true
        }
    },
    messages:{
        name:{
            required:'请输入姓名'
        },
        sex:{
            required:'请选择性别'
        },
        birthday:{
            required:"请输入出生日期"
        },
        phone:{
            required:"请输入手机号码",
        },
        code:{
            required:"请输入手机验证码"
        }
    },


    //重写showErrors
    showErrors: function (errorMap, errorList) {
        var msg = "";
        $.each(errorList, function (i, v) {
            layer.open({
                content:v.message,
                anim:false,
                skin:'msg',
                time:2,
            });
            return false;
        });
    },

    //验证成功回调函数
    submitHandler: function(form) {
        layer.open({
            type:2,
            time:1
        });
        setTimeout(function(){
            $('.step_1').hide();
            $('.step_2').show();
        },1000)
    }
});


$.validator.addMethod("iscarsh",function(value,element,params){
    var iscarsh = /^([1-9])|^([1-4])([0-9])$|^50$/
    return this.optional(element)||(iscarsh.test(value));

},"对不起，请填写合适的金额");

$.validator.addMethod("isphone",function(value,element,params){
    var isphone = /^1(3|4|5|7|8)\d{9}$/;
    return this.optional(element)||(isphone.test(value));
},"请输入正确格式手机号！");

$.validator.addMethod("ischar",function(value,element,params){
    var ischar= /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return this.optional(element)||(ischar.test(value));
},"请输入正确姓名！");


$.validator.addMethod("iscard",function(value,element,params){
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    var status = regIdCard.test(value);
    if(status){
        if(value.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
                idCardWiSum+=value.substring(i,i+1)*idCardWi[i];
            }

            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=value.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
                if(idCardLast=="X"||idCardLast=="x"){
                    //alert("恭喜通过验证啦！");
                    return true
                }else{
                    //alert("身份证号码错误！");
                    return false;
                }
            }else{
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if(idCardLast==idCardY[idCardMod]){
                    //alert("恭喜通过验证啦！");
                    return true
                }else{
                    //alert("身份证号码错误！");
                    return false;
                }
            }
        }
    }else{
        //alert("身份证格式不正确!");

        return false;
    }
},"身份证号码错误！");

$("#myform_2").validate({
    onfocusout: false,
    onkeyup:false,

    rules:{
        city:{
            required:true
        },
        live_time:{
            required:true
        },
        idcard:{
            required:true,
            iscard:true
        },
        money:{
            required:true
        },
        job:{
            required:true
        },
        home:{
            required:true
        },
        home_dai:{
            required:true
        },
        car:{
            required:true
        },
        car_dai:{
            required:true
        },
        gongjj:{
            required:true
        },
        credit:{
            required:true
        },
        baodan:{
            required:true
        },
        baofei:{
            required:true
        },
        shebao:{
            required:true
        }
    },
    messages:{
        city:{
            required:"请选择城市"
        },
        live_time:{
            required:"请选择居住时间"
        },
        idcard:{
            required:"请填写身份证号码"
        },
        money:{
            required:'请选择借款额度范围'
        },
        job:{
            required:"请选择工作职业"
        },
        home:{
            required:"请选择是否有房"
        },
        home_dai:{
            required:"请选择是否有房贷"
        },
        car:{
            required:"请选择是否有车"
        },
        car_dai:{
            required:"请选择是否有车贷"
        },
        gongjj:{
            required:"请选择是否有公积金"
        },
        credit:{
            required:"请选择是否有信用卡"
        },
        baodan:{
            required:"请选择是否有保单"
        },
        baofei:{
            required:"请选择保费范围"
        },
        shebao:{
            required:"请选择是否有社保"
        }
    },


    //重写showErrors
    showErrors: function (errorMap, errorList) {
        var msg = "";
        $.each(errorList, function (i, v) {
            layer.open({
                content:v.message,
                anim:false,
                skin:'msg',
                time:2,
            });
            return false;
        });
    },

    //验证成功回调函数
    submitHandler: function(form) {
        var h = $(document).height();
        $('.mask').css('height',h).show();
        $('.success').fadeIn(500);

        /*setTimeout(function(){
            window.location.href="index.html"
        },2000)*/
    }
});