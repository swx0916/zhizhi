

    /**
     * Created by Administrator on 2019/7/26.
     *
     *
     */
    function getStyle(elem,attr) { //标签：elem，样式名：attr
        if(elem.currentStyle){ //有值  ie
            var w = elem.currentStyle[attr];
        }else{
            var w = getComputedStyle(elem)[attr];
        }
        return w;
    }



//2.运动
    function move(elem,attr,step,target) {
        //4.确定步长值的正负
        step = parseInt(getStyle(elem,attr)) < target ? step : -step;
        clearInterval(elem.timer);
        elem.timer = setInterval(function () {
            //1.在当前值的基础上+10
            var speed = parseInt(getStyle(elem,attr))+step;

            //3.停止定时器
            if((speed>=target && step > 0) ||(speed<=target && step < 0) ){
                speed = target;
                clearInterval(elem.timer);
            }

            //2.设置到标签
            elem.style[attr] = speed +"px";
        },30)
    }


//3.事件绑定
    function bind(elem,type,fun) { //标签：elem   事件：type  处理函数：fun
        if(elem.addEventListener){ //标准 true 非0为真  0 false null undefined
            elem.addEventListener(type,fun);
        }else{
            elem.attachEvent("on"+type,fun);
        }
    }

//4.有缓冲的运动函数
    function bufferMove(elem,items,fun) {
        clearInterval(elem.timer);
        elem.timer = setInterval(function () {
            var tag = true; //假设全部到达目标点，但凡有一个没有到达，tag = false

            for(var attr in items) {// for(var key in 遍历的对象)  每一次循环的时候，都会将对象前面的名字存储在变量中
                //1.获取当前值 如果是透明度运动，取值的时候需要*100(放大100倍)
                if(attr == "opacity"){
                    var cur = parseInt(getStyle(elem,attr)*100);
                }else{
                    var cur = parseInt(getStyle(elem,attr));
                }

                //2.计算速度 速度=(目标值-当前值)/时间
                var speed = (items[attr]-cur)/5; //0.9

                //3.将速度取整，方便到达目标点
                speed = speed>0?Math.ceil(speed) : Math.floor(speed);//1  0

                //5.到达目标点，停止定时器
                if(cur != items[attr]){
                    tag = false;
                }
                //4.如果是透明度，设置属性的时候，需要/100
                if(attr == "opacity"){
                    elem.style[attr] = (cur + speed)/100;
                    elem.style.filter = 'alpha(opacity='+(cur+speed)+')'
                }else{
                    elem.style[attr] = cur + speed+ "px";
                }
            }

            if(tag == true){
                clearInterval(elem.timer);
                if(fun){
                    fun();
                }
                //fun&&fun(); //两真为真，如果第一个条件为真，判断第二条件，第一个条件为假，第二条件就不看了
            }

        },30);
    }


//1.存储
    function setCookie(key,value,day) {//key,value
        var oDate = new Date();
        //默认是7天，用户没用指定天数7天，指定天数，看传入的天数
        day = day ? day : 7;
        oDate.setDate(oDate.getDate()+day);
        document.cookie = key+"="+value+";expires="+oDate.toGMTString();
    }

//2.取
    function getCookie(key) { //key    返回value
        var obj = {};
        //获取cookie
        var cookies = document.cookie.split("; "); //["userName=124", "passWord=345"]
        for(var i = 0;i<cookies.length;i++){
            var c = cookies[i].split("=");
            obj[c[0]] = c[1];
        }
        return obj[key];
    }

//3.删除
    function removeCookie(key) {
        //key value
        setCookie(key,0,-1);
    }


//ajax
    function ajax(req) {
        //1.创建请求对象
        if (window.XMLHttpRequest) {
            var request = new XMLHttpRequest();
        } else {
            var request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //2.建立连接
        //get url?   post
        if (req.type.toLowerCase() === "get") {
            //get
            //处理url，如果有请求参数，就再url的后面拼接请求参数，没有就直接用
            req.url = req.data ? req.url + "?" + req.data : req.url;
            request.open("get", req.url, true);
            request.send();
        } else {
            request.open("post", req.url, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.data ? request.send(req.data) : request.send();
        }

        //4.监听结果
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    req.success(JSON.parse(request.responseText)); //“”
                }
            }
        }
    }

    //提供一段数据，返回拼接好的字符串
    function showStr(moveRes) {
        var str = "";
        for(var i = 0;i<moveRes.length;i++){
            str += '<li><a href="#"><img src="'+moveRes[i].image+'" alt=""></a> <div class="move_title"> <p><a href="#">'+moveRes[i].title+'</a></p> <em>'+moveRes[i].detail+'</em> </div>';
            switch (moveRes[i].type){
                case 1 :str += '<span class="move_type1 move_type"></span>';break;
                case 2 :str += '<span class="move_type2 move_type"></span>';break;
            }
            switch (moveRes[i].definition){
                case 1 :str += '<span class="move_bg"></span><span class="move_definition">标清</span>';break;
                case 2 :str += '<span class="move_bg"></span><span class="move_definition">超清</span>';break;
                case 3 :str += '<span class="move_bg"></span><span class="move_definition">高清</span>';break;
            }
            str += '<span class="move_grade">'+moveRes[i].grade.substr(0,1)+'<i>'+moveRes[i].grade.substr(1,2)+'</i></span></li>';
        }
        return str;
    }
