let lyrictext;
let starttime = 0;
let endtime = 100;

let progress = 0;
let intervalID;
let audiodefined = false;
let touchautoplay = false;
let lyricstime = [];
let $musicplayer = document.querySelector('.music-player');

document.addEventListener('click', function (event) {
    let target = event.target;

    switch (true) {
        case target.matches('.download'):
            {
                // console.log('download');

                // creatAudio();
                document.querySelector('.music-player').classList.add('show');
                setTimeout(function () {
                    document.querySelector('.all-music-lists').classList.add('hide');
                }, 300);
            }
            break
        case target.matches('.back-to-nav'):
            {
                // console.log('download');
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
                // console.log(window.location.href);
                // giturldata('songid');

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
                document.querySelector('.start-botton').classList.remove('start');
                document.querySelector('.start-botton').classList.add('pause');
                // console.log('search-result');
                renderAlbum();
                setTimeout(function () {
                    fetchlyric(giturldata('songid'));
                }, 0);
                document.querySelector('.music-player').classList.add('show');
                setTimeout(function () {
                    document.querySelector('.all-music-lists').classList.add('hide');
                }, 400);
            }
            break

    }

})






function giturldata(name) {
    // setTimeout(function () {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', '');
    let r = window.location.href.split('?')[1].match(reg)[2];
    if (r !== null) return r;
    return null;
    // }, 20);
};


function renderAlbum() {
    setTimeout(function () {
        document.querySelector('.music-name').innerHTML = giturldata('songname');
        document.querySelector('.music-singer').innerHTML = giturldata('artist');
        let imgurl = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${giturldata('albummid')}.jpg`;
        document.querySelector('.album-cover').src = imgurl;
        document.querySelector('.music-background').style.backgroundImage = `url(${imgurl})`;
        document.querySelector(".player-lyrics").innerHTML = '<div class="player-lyrics-line">玩命加载中...</div>'
        if(audiodefined) pause();
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
    // else {
    //     document.querySelector(".active").classList.remove('active');  
    //     document.querySelector(".player-lyrics").children[1].classList.add('active');
    //     document.querySelector('.player-lyrics').style.transform = `translateY(84px)`;
    // }
    setTimeout(function () {
        document.querySelector('audio').src = `http://ws.stream.qqmusic.qq.com/${giturldata('songid')}.m4a?fromtag=46`;
    }, 0);
    setTimeout(function() {
        start();        
    }, 0);

};

function fetchlyric(id) {
    fetch(`https://qq-music-api.now.sh/lyrics?id=${id}`)
        .then(res => res.json())
        .then(json => json.lyric)
        .then(text => {
            lyrictext = text;
            renderlyrics();
            creatAudio();

        })
}





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
    intervalID = setInterval(update, 500);
};



function pause() {
    $audio.pause();
    clearInterval(intervalID);
};

function update() {
    starttime = Math.floor($audio.currentTime);
    // console.log($audio.duration);
    // console.log($audio.currentTime);
    // console.log(starttime);
    if (starttime > 0) renderendtime();

    progress = starttime / endtime;

    if (starttime <= endtime) {
        document.querySelector('.start-time').innerHTML = formatTime(starttime);
        document.querySelector('.now-bar').style.transform = `translateX(${progress *100 - 100}%)`;

    };

    // lyricstime[i] >= starttime && (lyricstime[i + 1] || (lyricstime[i] + 1)) > lyricstime[i]

    for (let i = 0; i <= lyrics.length; i++) {
        if (lyricstime[i] <= starttime && (lyricstime[i + 1] || (lyricstime[i] + 100)) > starttime) {
            // console.log('i=' + i);
            // console.log(starttime);
            // console.log(lyricstime[i])

            if ($musicplayer.querySelector(".active")) $musicplayer.querySelector(".active").classList.remove('active');
            document.querySelector(".player-lyrics").children[i].classList.add('active');
            document.querySelector('.player-lyrics').style.transform = `translateY(${-i * 42 + 84}px)`;
            break;
        };
    };

    // console.log(lyricstime);

};

function formatText(ly) {
    let div = document.createElement('div');
    div.innerHTML = ly;
    // console.log(div.innerText);
    return div.innerText.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm);
}



function renderlyrics() {
    lyrics = formatText(lyrictext);
    let lyricshtml = lyrics.map(item => `
    <div class="player-lyrics-line">${item.slice(10)}</div>
    `).join('');
    document.querySelector(".player-lyrics").innerHTML = lyricshtml;
    if ($musicplayer.querySelector(".active")) $musicplayer.querySelector(".active").classList.remove('active');
    for (let i = 0; i < lyrics.length; i++) {
        lyricstime[i] = +(lyrics[i].replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => (+p1) * 60 + (+p2)));
    }
    // console.log(lyricstime);
}

// let touchautoplay = false;

// if (touchautoplay)

document.querySelector('html').addEventListener('touchstart', function(){
    console.log('touch');
    if (!touchautoplay && audiodefined) start();
    touchautoplay = true;
});

// $('html').one('touchstart',function(){
//     start();
// });


//


//[02:00.38]时间太漫长 我的情郎