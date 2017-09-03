//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // console.log('aaa');


    // fetch('/json/rank.json')
    fetch('https://qq-music-api.now.sh/top')
    .then(res => res.json())
    .then(json => json.data.topList)
    .then(rendersec)

    function rendersec(Ranklists) {
        renderRanklist(Ranklists);
        lazyload();
    }

    function renderRanklist(Ranklists){
        $ranklist = document.querySelector('.rank-list');
        $ranklist.innerHTML = Ranklists.map(Ranklist => `
        <li class="topic_item">
        <div class="topic_main">
        <a href="#" class="topic_media">
        <img src="${Ranklist.picUrl}">
        <span class="listen_count"><i class="icon icon_listen"></i>1920.0万</span>
        </a>
        <div class="topic_info">
        <div class="topic_cont">
        <h3 class="topic_tit">${Ranklist.topTitle}</h3>
        <p>1<span class="text_name">${Ranklist.songList[0].songname}</span>${Ranklist.songList[0].singername}</p>
        <p>2<span class="text_name">${Ranklist.songList[1].songname}</span>${Ranklist.songList[1].singername}</p>
        <p>3<span class="text_name">${Ranklist.songList[2].songname}</span>${Ranklist.songList[2].singername}</p>
        </div>
        <i class="topic_arrow"></i>
        </div>
        </div>
        </li>
        `).join('')

    }



});