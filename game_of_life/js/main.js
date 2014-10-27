/**
 * Created by alex on 17.10.14.
 */

window.game = window.game || {};

(function (namespace) {
    "use strict";

    var settings = {}, game;

    function main() {
        initCtrl();
        switchTo();
    }

    function switchTo(window) {
        if (window === undefined) window = 'settings';
        switch (window) {
            case 'game':
                document.getElementById('render-area').style.display = 'block';
                document.getElementById('ctrl-area').style.display = 'none';
                break;
            default:
                document.getElementById('render-area').style.display = 'none';
                document.getElementById('ctrl-area').style.display = 'block';
                break;
        }
    }

    function initCtrl() {
        var lables = document.querySelectorAll("#ctrl-area label");
        for (var i in lables) {
            if (lables[i].nodeType === 1) {
                var input = document.querySelector("#ctrl-area label#" + lables[i].id + " > input");
                input.addEventListenerMulti('mousemove click', function (e) {
                    settingChange(this);
                });
                settingChange(input);
            }
        }
        document.getElementById('startGame').addEventListener('click' ,startGame);
    }

    function settingChange(obj) {
        var id = obj.parentNode.id;
        var span = obj.previousSibling;
        do span = span.previousSibling;
        while (span.nodeType !== 1);
        var val = (obj.type == 'checkbox') ? obj.checked : obj.value;
        span.innerHTML = settings[id] = val;
    }

    function startGame() {
        settings.width = window.innerWidth;
        settings.height = window.innerHeight;
        console.log('Settings:', settings);
        game = new namespace.GameOfLife(settings);
        switchTo('game');
    }

    /**
     * Set multiple event listeners
     * @param {string} events Events type by space
     * @param {EventListener|Function} listener
     * @param {boolean} [useCapture]
     */
    Object.prototype.addEventListenerMulti = function(events, listener, useCapture) {
        if (useCapture === undefined) useCapture = false;
        var eArray = events.split(' ');
        for (var i in eArray) {
            this.addEventListener(eArray[i], listener, useCapture);
        }
    };

    window.onload = main;

})(window.game);