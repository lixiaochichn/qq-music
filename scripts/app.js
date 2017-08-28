document.addEventListener('DOMContentLoaded', function () {
    console.log('aaa');



    let slider = new Slider({
        $el: document.querySelector('#qq-slider'),
        sliders: [{
                url: "#",
                img: "images/joey.jpg"
            },
            {
                url: "#",
                img: "images/ljj.jpg"
            },
            {
                url: "#",
                img: "images/xgs.jpg"
            },
            {
                url: "#",
                img: "images/xiha.jpg"
            },
            {
                url: "#",
                img: "images/xl.jpg"
            },
        ]
    });

    window.slider = slider;

    class Slider {
        constructor(options = {}) {
            this.$el = options.$el
            this.sliders = options.sliders
            this.intercal = options.interval || 3000
            this.duration = iptions.duration || 300
            this.index = 0
            this.render()
            this.star()
        }

        render() {
            this.$el.innerHTML = '<div class="qq-slider-wrap"></div>'
            this.$wrap = this.$el.firstElementChild
            this.$wrap.style.transitionDuration = `${this.duration}ms`
            this.$wrap.style.width = `${this.slides.length * 100}%`
            this.$wrap.innerHTML = this.sliders.map(slider => {
                `<div class="qq-slider-item"><a href=${slider.url}><img src="${slider.img}"></a></div>`
            }).join('')
        }

        ster() {

        }

    };






    document.addEventListener("click", function (event) {
        let target = event.target;
        if (target.dataset.role !== "nav") return;
        [].forEach.call(target.parentElement.children, nav => {
            nav.classList.remove('active')
        });

        target.classList.add('active');

        let $viewitem = document.querySelector(target.dataset.view);
        [].forEach.call($viewitem.parentElement.children, viewitems => {
            viewitems.classList.add('hide');
        });
        $viewitem.classList.remove('hide');
    });





});