/**
 * Created by alex on 17.10.14.
 */

window.game = window.game || {};

(function (namespace) {
    "use strict";

    function Renderable(options) {
        /**
         * @type {Renderable}
         */
        var me = this;

        // Constructor

        if (options === undefined) options = {};

        this.settings = {
            renderTo: null,
            width: 500,
            height: 500,
            useBufferedOutput: true
        };

        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.settings[i] = options[i];
            }
        }

        _prepareRender();

        // Private Section

        function _prepareRender() {
            if (me.settings.renderTo === null) {
                me.settings.renderTo = "render";
                me.renderBlock = document.createElement('div');
                me.renderBlock.setAttribute('id', me.settings.renderTo);
                document.body.appendChild(me.renderBlock);
            } else {
                me.renderBlock = document.getElementById(me.settings.renderTo);
            }

            // Init Render
            me.renderCanv = document.createElement('canvas');
            me.renderCanv.setAttribute('width', me.settings.width.toString());
            me.renderCanv.setAttribute('height', me.settings.height.toString());
            me.renderBlock.appendChild(me.renderCanv);
            me.renderCtx = me.renderCanv.getContext('2d');

            // Init Buffer
            me.bufferCanv = document.createElement('canvas');
            me.bufferCanv.setAttribute('width', me.settings.width.toString());
            me.bufferCanv.setAttribute('height', me.settings.height.toString());
            me.bufferCtx = me.bufferCanv.getContext('2d');
        }
    }

    // Renderable API

    /**
     * Swap virtual buffer to a real
     */
    Renderable.prototype.swapBuffers = function () {
        this.renderCtx.clearRect(0, 0, this.settings.width, this.settings.height);
        if (this.settings.useBufferedOutput)
            this.renderCtx.drawImage(this.bufferCanv, 0, 0, this.settings.width, this.settings.height);
    };

    /**
     * Get actual rendering context
     * @returns {CanvasRenderingContext2D}
     */
    Renderable.prototype.getCtx = function () {
        return (this.settings.useBufferedOutput) ? this.bufferCtx : this.renderCtx;
    };

    /**
     * Get width of canvas
     * @returns {number}
     */
    Renderable.prototype.getW = function () {
        return this.settings.width;
    };

    /**
     * Get height of canvas
     * @returns {number}
     */
    Renderable.prototype.getH = function () {
        return this.settings.height;
    };

    namespace.Renderable = Renderable;

})(window.game);