document.addEventListener('click', function (event) {
    let target = event.target;
    if (target === document.querySelector('.download')) {
        console.log('download');
        document.querySelector('.music-player').classList.add('show');
        setTimeout(function(){
            document.querySelector('.all-music-lists').classList.add('hide');            
        },400);
        
        // return;
    }

    else if (target === document.querySelector('.back-to-nav')) {
        console.log('download');
        document.querySelector('.music-player').classList.remove('show');
        document.querySelector('.all-music-lists').classList.remove('hide');
        
        // return;
    } 

    else if (target === document.querySelector('.start')) {
        document.querySelector('.start-botton').classList.remove('start');
        document.querySelector('.start-botton').classList.add('pause');
        // return;
    }

    else if (target === document.querySelector('.pause')) {
        document.querySelector('.start-botton').classList.remove('pause');
        document.querySelector('.start-botton').classList.add('start');
        // return;
    }

    else if (target === document.querySelector('.blank-heart')) {
        document.querySelector('.collect-heart').classList.remove('blank-heart');
        document.querySelector('.collect-heart').classList.add('red-heart');
        // return;
    }

    else if (target === document.querySelector('.red-heart')) {
        document.querySelector('.collect-heart').classList.remove('red-heart');
        document.querySelector('.collect-heart').classList.add('blank-heart');
        // return;
    }

    else if(target.classList.contains('search-result') || 
            target.classList.contains('music-icon') ||
            target.classList.contains('result-title') ||
            target.classList.contains('result-singer')
        ){
        console.log('search-result');
        document.querySelector('.music-player').classList.add('show');
        setTimeout(function(){
            document.querySelector('.all-music-lists').classList.add('hide');            
        },400);
    }
})