/**
 * Created by alex on 17.10.14.
 */

window.game = window.game || {};

(function(namespace) {
    "use strict";

    function GameOfLife(options) {
        if (options === undefined) options = {};

        this.settings = {
            maxSteps: 10,
            threeLive: 3,
            bushLive: 2,
            bunnyHideInBush: true
        };

        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.settings[i] = options[i];
            }
        }

        this.initRender();
    }

    GameOfLife.prototype.initRender = function() {
        this.renderable = new namespace.Renderable({
            renderTo: "render-area"
        });
    };

    namespace.GoL = function(opt) {
        var gol = new GameOfLife(opt);
    };

})(window.game);