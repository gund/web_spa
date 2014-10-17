/**
 * Created by alex on 17.10.14.
 */

window.game = window.game || {};

(function (namespace) {
    "use strict";

    function GameOfLife(options) {
        /**
         * @type {GameOfLife}
         */
        var me = this;

        // Constructor

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

        _initRender();

        // Private Section

        function _initRender() {
            me.renderable = new namespace.Renderable({
                renderTo: "render-area"
            });
            me.renderable.getCtx().fillRect(0, 0, me.renderable.getW(), me.renderable.getH());
            me.renderable.swapBuffers();
        }
    }

    // GameOfLife API

    namespace.GameOfLife = GameOfLife;

})(window.game);