document.addEventListener('click', function(event){
    let target = event.target;
    if (target === document.querySelector('.download')){
        console.log('download');
        document.querySelector('.music-player').classList.add('show');
    }

    if (target === document.querySelector('.back-to-nav')){
        console.log('download');
        document.querySelector('.music-player').classList.remove('show');
    }
})