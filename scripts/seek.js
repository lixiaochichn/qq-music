//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // console.log('aaa');

    $inputseek = document.querySelector('#input-seek'); //input
    $cleararea = document.querySelector('.cleararea'); //取消
    $hotsearch = document.querySelector('.hot-search'); //热门搜索
    $historylists = document.querySelector('.history-lists'); //搜索历史
    $icondel = document.querySelector('.icon-del'); //圆形叉号

    fetch('/json/history.json')
    .then(res => res.json)
    .then(renderthird)

    function renderthird(json){
        renderseek(json.hotkey);
        lazyload();
    };

    function renderseek(hotkeys){
        $hotsearchtips = document.querySelector('.hot-search-tips');
        $hotsearchtips.innerHTML = hotkeys.map(hotkey => `
        <a href="#" class="hot-tip">中国新歌声第二季</a>        
        `).join();
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
        if ($inputseek.value.length > 0) {
            $icondel.classList.remove('hide');
            return;
        };
        $icondel.classList.add('hide');
    });


});