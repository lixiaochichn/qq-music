document.addEventListener('click', function (event) {
    let target = event.target;

    switch (true) {
        case target.matches('.download'):
            {
                console.log('download');
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
                document.querySelector('.start-botton').classList.remove('start');
                document.querySelector('.start-botton').classList.add('pause');
            }
            break
        case target.matches('.pause'):
            {
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

class Musicplayer {
    constructor(el) {
        this.$el = el;
        this.$el.addEventListener('click',this);
        this.$audio = this.createAudio();
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-body'), this.$audio);
        this.progress = new ProgressBar(this.$el.querySelector(('.progress-bar')));
        this.fetching = false;
    }

    createAudio() {
        let audio = document.createElement('audio');
        audio.id = `player-${Math.floor(Math.random()*100)}-${+new Date()}`;
        audio.addEventListener('ended', () => {
            this.$audio.play();
            this.lyrics.restart();
            this.progress.restart();
        })
        document.body.appendChild(audio);
        return audio;
    }


}

