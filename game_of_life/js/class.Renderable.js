/**
 * Created by alex on 17.10.14.
 */

window.game = window.game || {};

(function (namespace) {
    "use strict";

    function Renderable(options) {
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

        this.prepareRender();
    }

    Renderable.prototype.prepareRender = function() {
        if (this.settings.renderTo === null) {
            this.settings.renderTo = "render";
            this.renderBlock = document.createElement('div');
            this.renderBlock.setAttribute('id', this.settings.renderTo);
            document.body.appendChild(this.renderBlock);
        } else {
            this.renderBlock = document.getElementById(this.settings.renderTo);
        }

        // Init Render
        this.renderCanv = document.createElement('canvas');
        this.renderCanv.setAttribute('width', this.settings.width.toString());
        this.renderCanv.setAttribute('height', this.settings.height.toString());
        this.renderBlock.appendChild(this.renderCanv);
        this.renderCtx = this.renderCanv.getContext('2d');

        // Init Buffer
        this.bufferCanv = document.createElement('canvas');
        this.bufferCanv.setAttribute('width', this.settings.width.toString());
        this.bufferCanv.setAttribute('height', this.settings.height.toString());
        this.bufferCtx = this.bufferCanv.getContext('2d');
    };

    namespace.Renderable = function (opt) {
        var renderable = new Renderable(opt);
    };

})(window.game);