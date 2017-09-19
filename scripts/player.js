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
                if(!audiodefined) {
                    audiodefined = true;
                    creatAudio();
                    start();
                }


                document.querySelector('.music-player').classList.add('show');
                setTimeout(function(){
                    document.querySelector('.all-music-lists').classList.add('hide');            
                },300);
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
                document.querySelector('.music-player').classList.add('show');
                setTimeout(function(){
                    document.querySelector('.all-music-lists').classList.add('hide');            
                },400);
            }
            break

    }

})

// class Musicplayer {
//     constructor(el) {
//         this.$el = el;
//         this.$el.addEventListener('click',this);
//         this.$audio = this.createAudio();
//         this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-body'), this.$audio);
//         this.progress = new ProgressBar(this.$el.querySelector(('.progress-bar')));
//         this.fetching = false;
//     }

//     createAudio() {
//         let audio = document.createElement('audio');
//         audio.id = `player-${Math.floor(Math.random()*100)}-${+new Date()}`;
//         audio.addEventListener('ended', () => {
//             this.$audio.play();
//             this.lyrics.restart();
//             this.progress.restart();
//         })
//         document.body.appendChild(audio);
//         return audio;
//     }


// }

function creatAudio() {
    $audio = document.createElement('audio');
    $audio.loop = true;
    $audio.autoplay = true;
    // $audio.controls = true;
    
    $audio.src = "http://ws.stream.qqmusic.qq.com/203605063.m4a?fromtag=46";
    document.body.appendChild($audio);
    setTimeout(renderendtime, 20);
};

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if(min < 10) min = '0' + min;
    if(sec < 10) sec = '0' +sec;
    // console.log(`${min}:${sec}`);
    return `${min}:${sec}`;
    
};

function renderendtime(){
    endtime = $audio.duration;
    // console.log(endtime);
    document.querySelector(".end-time").innerHTML = formatTime(endtime);
    // end-time;
    // $audio.playbackRate = 2;
};

function start(){
    $audio.play();
    intervalID = setInterval(update, 1000);
    
};

function pause() {
    $audio.pause();
    clearInterval(intervalID);
};

function update(){
    starttime = $audio.currentTime;
    // console.log($audio.duration);
    // console.log($audio.currentTime);
    // console.log(starttime);
    progress = starttime / endtime;
    if(starttime <= endtime) {
        document.querySelector('.start-time').innerHTML = formatTime(starttime);    
        document.querySelector('.now-bar').style.transform = `translateX(${progress *100 - 100}%)`;        
    };
};

// let starttime = 0;
// let endtime = 220;
// let progress = 0;