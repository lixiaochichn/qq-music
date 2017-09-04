//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // console.log('aaa');

    $inputseek = document.querySelector('#input-seek'); //input
    $cleararea = document.querySelector('.cleararea'); //取消
    $hotsearch = document.querySelector('.hot-search'); //热门搜索
    $historylists = document.querySelector('.history-lists'); //搜索历史
    $icondel = document.querySelector('.icon-del'); //圆形叉号
    $searchresultlist = document.querySelector('.search-result-list'); //searchresultlist
    let keyword;
    let page;

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
        let target = event.target;
        if (target === $inputseek) {
            $historylists.classList.remove('hide');
            $cleararea.classList.remove('hide');
            $hotsearch.classList.add('hide');
        };
        if (target === $cleararea) {
            $historylists.classList.add('hide');
            $cleararea.classList.add('hide');
            $hotsearch.classList.remove('hide');
            $inputseek.value = '';
            $icondel.classList.add('hide');
        };
        if (target === $icondel) {
            $inputseek.value = '';
            $icondel.classList.add('hide');
        }
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
            keyword = $inputseek.value;
            page = 1;
            search(keyword);
        };
    });

    function search(keywordvalue) {
        fetch(`https://qq-music-api.now.sh/search?keyword=${keywordvalue}?page=${page}`)
            .then(res => res.json())
            .then(json => json.data)
            .then(renderforth)
    }

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
        page++;
    };

    window.addEventListener('scroll', function () {
        console.log(pageYOffset);
        if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50) {
            search(keyword);
        }
    });


});