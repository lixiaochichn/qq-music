let text = "[ti&#58;我要你&#32;&#40;《驴得水》电影主题曲&#41;]&#10;[ar&#58;任素汐]&#10;[al&#58;我要你]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;00&#46;21]我要你&#32;&#40;《驴得水》电影主题曲&#41;&#32;&#45;&#32;任素汐&#10;[00&#58;01&#46;42]词：樊冲&#10;[00&#58;01&#46;56]曲：樊冲&#10;[00&#58;01&#46;71]我要&#32;你在我身旁&#10;[00&#58;06&#46;71]&#10;[00&#58;08&#46;55]我要&#32;你为我梳妆&#10;[00&#58;14&#46;16]&#10;[00&#58;15&#46;26]这夜的风儿吹&#10;[00&#58;17&#46;73]&#10;[00&#58;18&#46;62]吹得心痒痒&#32;我的情郎&#10;[00&#58;22&#46;46]我在他乡&#32;望着月亮&#10;[00&#58;28&#46;60]&#10;[00&#58;29&#46;80]都怪这月色&#32;撩人的风光&#10;[00&#58;35&#46;95]&#10;[00&#58;37&#46;01]都怪这&#32;guitar&#32;弹得太凄凉&#10;[00&#58;43&#46;20]&#10;[00&#58;44&#46;31]欧&#32;我要唱着歌&#10;[00&#58;46&#46;81]&#10;[00&#58;47&#46;59]默默把你想&#32;我的情郎&#10;[00&#58;51&#46;56]你在何方&#32;眼看天亮&#10;[00&#58;57&#46;73]&#10;[01&#58;13&#46;24]都怪这夜色&#32;撩人的风光&#10;[01&#58;19&#46;43]&#10;[01&#58;20&#46;64]都怪这guitar&#32;弹得太凄凉&#10;[01&#58;26&#46;97]&#10;[01&#58;27&#46;95]欧&#32;我要唱着歌&#10;[01&#58;30&#46;52]&#10;[01&#58;31&#46;37]默默把你想&#32;我的情郎&#10;[01&#58;34&#46;70]&#10;[01&#58;35&#46;21]你在何方&#32;眼看天亮&#10;[01&#58;41&#46;47]&#10;[01&#58;42&#46;81]我要&#32;美丽的衣裳&#10;[01&#58;48&#46;30]&#10;[01&#58;50&#46;38]为你&#32;对镜贴花黄&#10;[01&#58;55&#46;81]&#10;[01&#58;57&#46;04]这夜色太紧张&#10;[01&#58;59&#46;74]&#10;[02&#58;00&#46;38]时间太漫长&#32;我的情郎&#10;[02&#58;04&#46;36]我在他乡&#32;望着月亮";


let starttime = 0;
let endtime = 100;

let progress = 0;
let intervalID;
let audiodefined = false;

document.addEventListener('click', function (event) {
    let target = event.target;

    switch (true) {
        case target.matches('.download'):
            {
                console.log('download');

                // creatAudio();
                document.querySelector('.music-player').classList.add('show');
                setTimeout(function () {
                    document.querySelector('.all-music-lists').classList.add('hide');
                }, 300);
            }
            break
        case target.matches('.back-to-nav'):
            {
                console.log('download');
                document.querySelector('.music-player').classList.remove('show');
                document.querySelector('.all-music-lists').classList.remove('hide');
            }
            break

        case target.matches('.start'):
            {
                start();
                document.querySelector('.end-time').innerHTML = formatTime(endtime);
                document.querySelector('.start-botton').classList.remove('start');
                document.querySelector('.start-botton').classList.add('pause');
                console.log(window.location.href);
                giturldata('songid');

                // console.log(window.location.href.split('?')[1].toString().split('&'));
            }
            break
        case target.matches('.pause'):
            {
                pause();
                document.querySelector('.start-botton').classList.remove('pause');
                document.querySelector('.start-botton').classList.add('start');
            }
            break
        case target.matches('.blank-heart'):
            {
                document.querySelector('.collect-heart').classList.remove('blank-heart');
                document.querySelector('.collect-heart').classList.add('red-heart');
            }
            break

        case target.matches('.red-heart'):
            {
                document.querySelector('.collect-heart').classList.remove('red-heart');
                document.querySelector('.collect-heart').classList.add('blank-heart');
            }
            break
        case target.matches('.search-result'):
        case target.matches('.music-icon'):
        case target.matches('.result-title'):
        case target.matches('.result-singer'):
            {
                console.log('search-result');
                creatAudio();
                renderAlbum();
                document.querySelector('.music-player').classList.add('show');
                setTimeout(function () {
                    document.querySelector('.all-music-lists').classList.add('hide');
                }, 400);
            }
            break

    }

})






function giturldata(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', '');
    let r = window.location.href.split('?')[1].match(reg)[2];
    if (r !== null) return r;
    return null;
};


function renderAlbum() {
    setTimeout(function() {
        document.querySelector('.music-name').innerHTML = giturldata('songname');
        document.querySelector('.music-singer').innerHTML = giturldata('artist');
        let imgurl = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${giturldata('albummid')}.jpg`;
        document.querySelector('.album-cover').src = imgurl;
        document.querySelector('.music-background').style.backgroundImage = `url(${imgurl})`;
        renderlyrics();
    }, 20);

};



function creatAudio() {
    if (!audiodefined) {
        $audio = document.createElement('audio');
        $audio.loop = true;
        $audio.autoplay = true;
        // $audio.controls = true;
        document.body.appendChild($audio);
        audiodefined = true;
    }
    setTimeout(function () {
        document.querySelector('audio').src = `http://ws.stream.qqmusic.qq.com/${giturldata('songid')}.m4a?fromtag=46`;
        start();
    }, 20);
};

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    // console.log(`${min}:${sec}`);
    return `${min}:${sec}`;

};

function renderendtime() {
    endtime = $audio.duration;
    // console.log(endtime);
    document.querySelector(".end-time").innerHTML = formatTime(endtime);
    // end-time;
    // $audio.playbackRate = 2;
};

function start() {
    $audio.play();
    intervalID = setInterval(update, 1000);

};

function pause() {
    $audio.pause();
    clearInterval(intervalID);
};

function update() {
    starttime = $audio.currentTime;
    // console.log($audio.duration);
    // console.log($audio.currentTime);
    // console.log(starttime);
    if (starttime > 0) renderendtime();
    progress = starttime / endtime;
    if (starttime <= endtime) {
        document.querySelector('.start-time').innerHTML = formatTime(starttime);
        document.querySelector('.now-bar').style.transform = `translateX(${progress *100 - 100}%)`;
    };
};

function formatText(ly) {
    let div = document.createElement('div');
    div.innerHTML = ly;
    // console.log(div.innerText);
    return div.innerText.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm);
}

function renderlyrics(){
    let lyricshtml = formatText(text).map(item => `
    <div class="player-lyrics-line">${item.slice(10)}</div>
    `).join('');
    document.querySelector(".player-lyrics").innerHTML = lyricshtml;
}


//formatText(text)[1].replace(/^\[(\d{2}):(\d{2}).*/, (match,p1,p2) => console.log(p1*60+p2))


//[02:00.38]时间太漫长 我的情郎


