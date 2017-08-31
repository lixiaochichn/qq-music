document.addEventListener('DOMContentLoaded', function () {

    class Slider {
        constructor(options = {}) {
            this.$el = options.$el
            this.sliders = options.sliders
            this.interval = options.interval || 2000
            this.duration = options.duration || 300
            // this.restart = 0
            this.index = 0
            this.render()
            this.start()
        }

        render() {
            this.$el.innerHTML = '<div class="qq-slider-wrap"></div>'
            this.$wrap = this.$el.firstElementChild
            this.$wrap.style.transitionDuration = `${this.duration}ms`
            this.$wrap.style.width = `${this.sliders.length * 100 +100}%`
            this.$wrap.innerHTML = this.sliders.map(slider =>
                `<div class="qq-slider-item"><a href=${slider.url}><img src="${slider.img}"></a></div>`
            ).join('') + `<div class="qq-slider-item"><a href=${this.sliders[0].url}><img src="${this.sliders[0].img}"></a></div>`
        }

        start() {
            setInterval(this.next.bind(this), this.interval)
        }

        next() {
            this.index += 1;
            if (this.index === this.sliders.length) {
                this.$wrap.style.transform = `translate(-${this.index/(this.sliders.length+1)*100}%)`;
                setTimeout(this.restart.bind(this), this.duration);
                this.index = 0
                return
            };
            this.$wrap.style.transitionDuration = `${this.duration}ms`
            this.$wrap.style.transform = `translate(-${this.index/(this.sliders.length+1)*100}%)`;
        }

        restart() {
            this.$wrap.style.transitionDuration = `0ms`
            this.$wrap.style.transform = `translate(0)`
        }

    };


    fetch('/json/rec.json')
        .then(res => res.json())
        .then(renderjson)

    function renderjson(json) {
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
        // renderPlaylist(json.data.songList)
        // lazyload()
    }

    function renderRadios(radioLists) {
        $playradio = document.querySelector('.play-radio');
        $playradio.innerHTML = radioLists.map(radioList => `
        <li class="radio-item"><a class="radio-link" href="#">
        <img class="radio-img" src="${radioList.picUrl}">
        <span class="icon icon-play"></span>
        <h3 class="radio-title">${radioList.Ftitle}</h3>
        </a></li>
        `).join('')
    }



    // json=>Slider
    function renderSlider(slider) {
        sliders = slider.map(slide => ({
            url: slide.linkUrl,
            img: slide.picUrl
        }));
        new Slider({
            $el: document.querySelector('#qq-slider'),
            sliders
        });
    }




    // let slider = new Slider({
    //     $el: document.querySelector('#qq-slider'),
    //     sliders: [{
    //             url: "#",
    //             img: "images/joey.jpg"
    //         },
    //         {
    //             url: "#",
    //             img: "images/ljj.jpg"
    //         },
    //         {
    //             url: "#",
    //             img: "images/xgs.jpg"
    //         },
    //         {
    //             url: "#",
    //             img: "images/xiha.jpg"
    //         },
    //         {
    //             url: "#",
    //             img: "images/xl.jpg"
    //         }
    //     ]
    // });

});