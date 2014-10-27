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

        // Init settings

        if (options === undefined) options = {};
        this.settings = {
            renderTo: null,
            width: 500,
            height: 500,
            cellCount: 10,
            useBufferedOutput: true,
            useFullSize: true
        };
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.settings[i] = options[i];
            }
        }

        this.renderBlock = {};
        this.renderCanv = {};
        this.renderCtx = {};
        this.bufferCanv = {};
        this.bufferCtx = {};
        this.texture = {};

        // Renderable API

        /**
         * Swap virtual buffer to a real
         */
        this.swapBuffers = function () {
            if (!this.settings.useBufferedOutput) return;
            this.renderCtx.clearRect(0, 0, this.settings.width, this.settings.height);
            this.renderCtx.drawImage(this.bufferCanv, 0, 0, this.settings.width, this.settings.height);
        };

        /**
         * Get actual rendering context
         * @returns {CanvasRenderingContext2D}
         */
        this.getCtx = function () {
            return (this.settings.useBufferedOutput) ? this.bufferCtx : this.renderCtx;
        };

        /**
         * Get width of canvas
         * @returns {number}
         */
        this.getW = function () {
            return this.settings.width;
        };

        /**
         * Get height of canvas
         * @returns {number}
         */
        this.getH = function () {
            return this.settings.height;
        };

        /**
         * Resize render canvas
         * @param {number}w
         * @param {number}h
         */
        this.resize = function (w, h) {
            w = Math.max(w, 0);
            h = Math.max(h, 0);
            if (this.settings.useFullSize) {
                w = h = Math.min(w, h);
            }

            if (this.settings.width == w && this.settings.height == h) return;
            this.settings.width = w;
            this.settings.height = h;

            this.cellSize = this.settings.width / this.settings.cellCount;

            this.renderCanv.width = this.settings.width;
            this.renderCanv.height = this.settings.height;

            if (this.settings.useBufferedOutput) {
                this.bufferCanv.width = this.settings.width;
                this.bufferCanv.height = this.settings.height;
            }
            console.log('Resize to ' + this.settings.width + 'x' + this.settings.height);
            _createGridTxt();
        };

        /**
         * Get empty canvas context for drawing
         * @param {number}w
         * @param {number}h
         * @returns {{canvas: HTMLElement, ctx: CanvasRenderingContext2D, width: number, height: number}}
         */
        this.getEmptyTexture = function (w, h) {
            var canv = document.createElement('canvas');
            var ctx = canv.getContext('2d');
            canv.width = w;
            canv.height = h;
            return {
                canvas: canv,
                ctx: ctx,
                width: w,
                height: h
            };
        };

        /**
         * Draw texture to XY coordinates
         * @param {{canvas: HTMLElement, ctx: CanvasRenderingContext2D, width: number, height: number}}texture
         * @param {number}x
         * @param {number}y
         */
        this.drawTextureTo = function (texture, x, y) {
            this.getCtx().drawImage(texture.canvas, x, y, texture.width, texture.height);
        };

        /**
         * Create and fill texture with custom function drawFn()
         * @param name Texture name
         * @param w Texture width
         * @param h Texture height
         * @param drawFn Function with this: {{canvas: HTMLElement, ctx: CanvasRenderingContext2D, width: number, height: number}}
         */
        this.createTexture = function (name, w, h, drawFn) {
            console.log('Creating texture ' + name);
            var txt = this.getEmptyTexture(w, h);
            drawFn.call(txt);
            this.texture[name] = txt;
            console.log('Texture ' + name + ' saved');
        };

        /**
         * Draw grid
         */
        this.drawGrid = function () {
            var me = this;
            if (!this.texture['grid']) {
                this.state = 'idle';
                _createGridTxt();
            }
            this.drawTextureTo(this.texture['grid'], 0, 0);
        };

        this.drawItem = function (i, j, color) {
            if (color === undefined) color = "#000000";
            var x = i * me.cellSize;
            var y = j * me.cellSize;
            me.getCtx().fillStyle = color;
            me.getCtx().fillRect(x, y, me.cellSize, me.cellSize);
        };

        // Constructor

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

            if (me.settings.useFullSize) {
                window.addEventListener('resize', function (e) {
                    me.resize(window.innerWidth, window.innerHeight);
                });
            }
            me.resize(me.settings.width, me.settings.height);
        }

        function _createGridTxt() {
            me.createTexture('grid', me.settings.width, me.settings.height, function () {
                this.ctx.strokeStyle = "#000000";
                this.ctx.lineWidth = 2;
                for (var i = 0; i < me.settings.cellCount + 1; ++i) {
                    // Horizontal lines
                    this.ctx.moveTo(0, i * me.cellSize);
                    this.ctx.lineTo(this.width, i * me.cellSize);
                    // Vertical lines
                    this.ctx.moveTo(i * me.cellSize, 0);
                    this.ctx.lineTo(i * me.cellSize, this.height);
                }
                this.ctx.stroke();
            });
        }
    }

    namespace.Renderable = Renderable;

})(window.game);