//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // console.log('aaa');


    $inputseek = document.querySelector('#input-seek'); //input
    $cleararea = document.querySelector('.cleararea'); //取消
    $hotsearch = document.querySelector('.hot-search'); //热门搜索
    $historylists = document.querySelector('.history-lists'); //搜索历史
    $icondel = document.querySelector('.icon-del'); //圆形叉号
    $searchresultlist = document.querySelector('.search-result-list'); //searchresultlist
    $searchfooter = document.querySelector('.search-footer'); //加载文字
    $iconloading = document.querySelector('.icon-loading'); //加载动画
    $searchfooterfinish = document.querySelector('.search-footer-finish'); //加载完成

    $clearhistorya = document.querySelector('.clear-history-a'); //清除全部历史按钮
    $iconclose = document.querySelector('.icon-close'); //清除一条历史按钮
    let keyword = '';
    let page;
    let fetchresult = 1;
    let historyarray = [];


    // fetch('/json/history.json')
    fetch('https://qq-music-api.now.sh/hotkey')
        .then(res => res.json())
        .then(json => json.data)
        .then(renderthird)


    function renderthird(data) {
        renderseek(data);
        // console.log(data);

        // lazyload();
    };

    function renderseek(data) {
        $hotsearchtips = document.querySelector('.hot-search-tips');
        // console.log(data);
        $hotsearchtips.innerHTML = `<a href="#" class="hot-tip">${data.special_key}</a>`;
        $hotsearchtips.innerHTML += data.hotkey.map(hotkeyitem => `
        <a href="#" class="hot-tip">${hotkeyitem.k}</a>        
        `).join('');
    };

    document.addEventListener("click", function (event) {
        event.preventDefault();
        let target = event.target;
        //input
        if (target === $inputseek && $inputseek.value.length === 0) {
            $historylists.classList.remove('hide'); //搜索历史-显示
            $cleararea.classList.remove('hide'); //取消按钮-显示
            $hotsearch.classList.add('hide'); //热门搜索-隐藏
            gethistory();
        } else if (target === $cleararea) {
            $historylists.classList.add('hide');
            $cleararea.classList.add('hide');
            $hotsearch.classList.remove('hide');
            $inputseek.value = '';
            $icondel.classList.add('hide');
            $searchresultlist.innerHTML = '';
            $searchfooter.classList.add('hide'); //加载动画-隐藏
            $searchfooterfinish.classList.add('hide'); //隐藏已加载全部
        } //点击取消
        else if (target === $icondel) {
            $inputseek.value = '';
            $icondel.classList.add('hide');
            $historylists.classList.remove('hide'); //搜索历史-显示
            $searchfooter.classList.add('hide'); //加载动画-隐藏            
            $searchresultlist.innerHTML = '';
            $searchfooterfinish.classList.add('hide'); //隐藏已加载全部
            gethistory();
        } //圆形叉号
        else if (target === $iconclose) {
            console.log('clear');
        }
        else if (target === $clearhistorya) {
            console.log('clearall');
            localStorage.setItem('yqq_search_history',[]);
            // $historylists.classList.add('hide'); //搜索历史-隐藏
            gethistory();
        }; //清除所有历史记录
    });
    $inputseek.addEventListener("keyup", function () {
        let which = event.which;
        if ($inputseek.value.length > 0) {
            $icondel.classList.remove('hide'); //显示圆形删除符号
        } else {
            $icondel.classList.add('hide'); //隐藏圆形删除符号
        };
        if ($inputseek.value.length > 0 && which === 13) {
            console.log("which");
            $historylists.classList.add('hide');
            $searchresultlist.innerHTML = '';
            $searchfooterfinish.classList.add('hide'); //隐藏已加载全部            
            $searchfooter.classList.remove('hide'); //出现加载动画
            sethistory(); //记录进历史
            keyword = $inputseek.value;
            page = 1;
            fetchresult = 1;
            if (fetchresult === 1) {
                fetchresult = 0;
                console.log('enter' + fetchresult + 'page' + page);
                search(keyword);
            };
        };
    });

    function sethistory() {
        historyarray.unshift($inputseek.value); //记录进历史
        historyarray = Array.from(new Set(historyarray));
        localStorage.setItem('yqq_search_history', historyarray);

    };

    function gethistory() {
        if(localStorage.getItem('yqq_search_history')){
            historyarray = localStorage.getItem('yqq_search_history').split(',');
            // historyarray = Array.from(new Set(historyarray));
            // localStorage.setItem('yqq_search_history', historyarray);
            $historylists.innerHTML = historyarray.map(event => `
            <li class="his-list">
            <span class="icon icon-history"></span>
            <span class="title-history">${event}</span>
            <span class="icon icon-close"></span>
            </li>
            `).join('') + `<div class="clear-history"><a href="#" class="clear-history-a">清除搜索记录</a></div>`;
        }else{
            $historylists.innerHTML = '';
            historyarray = [];
            console.log('已全部清除');
        };

        $clearhistorya = document.querySelector('.clear-history-a'); //清除全部历史按钮
        $iconclose = document.querySelector('.icon-close'); //清除一条历史按钮
    };

    function search(keywordvalue) {
        if (keywordvalue !== '') {
            fetch(`https://qq-music-api.now.sh/search?keyword=${keywordvalue}&page=${page}`)
                .then(res => {
                    fetchresult = 1;
                    console.log('finish' + fetchresult + 'page' + page);
                    page++;
                    return res.json();
                })
                .then(endresults)
                .then(json => json.data)
                .then(renderforth)
        }
    }

    function endresults(json) {
        if (json.message === 'no results') {
            $searchfooter.classList.add('hide'); //隐藏加载动画
            $searchfooterfinish.classList.remove('hide'); //显示已加载全部
            fetchresult = 0;
            console.log('noresult')
        }
        return json;
    };

    function renderforth(data) {
        rendersearch(data.song.list);
    };

    function rendersearch(lists) {
        $searchresultlist.innerHTML += lists.map(list => `
        <li class="search-result">
        <i class="icon music-icon"></i>
        <h6 class="result-title">${list.songname}</h6>
        <p class="result-singer">${list.singer[0].name}</p>
        </li>
        `).join('');
        // page++;
    };

    window.addEventListener('scroll', function () {
        // console.log(pageYOffset);
        if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50 && keyword !== '') {
            if (fetchresult === 1) {
                fetchresult = 0;
                console.log('scroll' + fetchresult + 'page' + page);
                search(keyword);
            };
        }
    });


});