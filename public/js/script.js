'use strict';

(function () {

    var ESC_CODE = 27;
    var pointsButton = document.querySelector('.points-button');
    var overlay = document.querySelector('.overlay');
    var popup = document.querySelector('.popup');
    var сlose = popup.querySelector('.popup__close');

    var showPopup = function() {
        popup.classList.add('popup--show');
        overlay.classList.add('overlay--show');
    };

    var closePopup = function() {
        if (popup.classList.contains('popup--show')) {
            popup.classList.remove('popup--show');
            overlay.classList.remove('overlay--show');
        }
    };
    
    pointsButton.addEventListener('click', showPopup);
    сlose.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_CODE) {
            closePopup();
        }
    });
})();