(function () {
    //------banner-----
    var bannerMain = document.getElementById("banner_main");
    var bannerUl = bannerMain.getElementsByTagName("ul");
    var bannerBigLi = bannerUl[0].getElementsByTagName("li");
    var bannerSmallLi = bannerUl[1].getElementsByTagName("li");
    var bannerIndex = 0;
    //-----强烈推荐----
    var recommend = document.getElementById("recommend");
    var hotShowing = document.getElementById("hotShowing");

    //1.请求数据，生成banner
    ajax({
        "url":"https://easy-mock.com/mock/5d4a80b868206377092029ab/example/ban",
        "type":"get",
        "success":function (res) {
            var bigStr = "";
            var smallStr = "";
            for(var i = 0;i<res.data.length;i++){
                bigStr += '<li><a href="'+res.data[i].href+'"><img src="'+res.data[i].bigImg+'" alt=""></a></li>';
                smallStr += '<li><a href="'+res.data[i].href+'"><img src="'+res.data[i].smallImg+'" alt=""></a></li>';
            }

            bannerUl[0].innerHTML = bigStr;
            bannerUl[1].innerHTML = smallStr;

            //2.初始化
            bannerBigLi[0].className = "active";
            bannerSmallLi[0].className = "active";


            //3.自动播放
            setInterval(bannerAuto,2000);
            function bannerAuto() {
                bannerIndex++;
                if(bannerIndex === bannerSmallLi.length){bannerIndex=0;}
                for(var i = 0;i<bannerBigLi.length;i++){
                    bufferMove(bannerBigLi[i],{"opacity":0});
                    bannerBigLi[i].style.display = "none";
                    bannerSmallLi[i].className = "";
                }
                bufferMove(bannerBigLi[bannerIndex],{"opacity":100});
                bannerBigLi[bannerIndex].style.display = "block";
                bannerSmallLi[bannerIndex].className = "active";
            }

        }
    })


    //2------强烈推荐-----
    ajax({
        "url":"https://easy-mock.com/mock/5d4a80b868206377092029ab/example/re",
        "type":"get",
        "success":function(res){
            recommend.innerHTML = showStr(res.recommend);
            hotShowing.innerHTML = showStr(res.hot_showing);
        }
    });







})();



