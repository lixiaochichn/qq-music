document.addEventListener('DOMContentLoaded', function () {
    // console.log('aaa');

    



// 标题栏-3栏
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