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

        // Init settings

        if (options === undefined) options = {};
        this.settings = {
            maxSteps: 10,
            threeLive: 3,
            bushLive: 2,
            maxThreesBushes: 5,
            bunnyHideInBush: true,
            wolfStep: 1,
            bunnyStep: 1,
            cellCount: 10,
            updatePhysicEvery: 1
        };
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.settings[i] = options[i];
            }
        }
        this.settings.cellCount = parseInt(this.settings.cellCount);

        var WOLF_COLOR = "#0000FF";
        var BUNNY_COLOR = "#CCCCCC";
        var THREE_COLOR = "#006C8D";
        var BUSH_COLOR = "#00FF2A";
        var TIME2UPDATE = this.settings.updatePhysicEvery * 1000;
        this.grid = [];
        this.wolf = {};
        this.bunny = {};
        this.threes = [];

        // Constructor

        var lastAnimationTime = 0;
        var gamePeriod = 0;

        for (var i = 0; i < this.settings.cellCount; ++i) {
            this.grid[i] = [];
            for (var j = 0; j < this.settings.cellCount; ++j) {
                this.grid[i][j] = null;
            }
        }

        this.ready = false;
        _initRender();
        _initGameState();
        this.ready = true;
        _tick(0);

        // Private Section

        var _renderable;

        function _initRender() {
            _renderable = new namespace.Renderable({
                renderTo: "render-area",
                cellCount: me.settings.cellCount,
                width: me.settings.width,
                height: me.settings.height
            });
        }

        function _initGameState() {
            _generateThrees();
            me.wolf = new namespace.Wolf({
                step: me.settings.wolfStep,
                color: WOLF_COLOR
            });
            me.bunny = new namespace.Bunny({
                step: me.settings.bunnyStep,
                color: BUNNY_COLOR
            });
            var wolfPos = _getAvailablePos();
            console.log('wolfPos', wolfPos);
            me.wolf.setPosition(wolfPos.x, wolfPos.y);
            var bunnyPos = _getAvailablePos(1);
            console.log('bunnyPos', bunnyPos);
            me.bunny.setPosition(bunnyPos.x, bunnyPos.y);
        }

        function _getAvailablePos(checkLvl) {
            if (checkLvl === undefined) checkLvl = 0;
            var x = 0;
            var y = 0;
            var posFree;
            do {
                posFree = true;
                x = namespace.randMinMax(0, me.settings.cellCount-1);
                y = namespace.randMinMax(0, me.settings.cellCount-1);
                for (var i = 0; i < me.threes.length; ++i) {
                    if (me.threes[i].getX() == x && me.threes[i].getY() == y) {
                        posFree = false;
                        break;
                    }
                }
                if (checkLvl > 0 && me.wolf.getX() == x && me.wolf.getY() == y) posFree = false;
                if (checkLvl > 1 && me.bunny.getX() == x && me.bunny.getY() == y) posFree = false;
            } while (!posFree);
            return {x: x, y: y};
        }

        function _generateThrees(regenerate) {
            if (regenerate === undefined) regenerate = false;
            if (regenerate) {
                for (var i = 0; i < me.threes.length; ++i) {
                    var lifeLong = me.threes[i].settings.type ? me.settings.threeLive : me.settings.bushLive;
                    if (me.threes[i].settings.life + lifeLong < gamePeriod) {
                        me.threes.splice(i, 1);
                        i--;
                    }
                }
                console.log('After delete', me.threes.length);
            }
            var len = me.threes.length;
            var objCanGen = me.settings.maxThreesBushes - len;
            var obj2Gen = namespace.randMinMax(0, objCanGen) + len;
            for (var i = len; i < obj2Gen; ++i) {
                var type = (namespace.randMinMax(0, 1) == 0);
                var pos = regenerate ? _getAvailablePos(2) : _getAvailablePos();
                me.threes[i] = new namespace.Three({
                    color: (type ? THREE_COLOR : BUSH_COLOR),
                    life: gamePeriod,
                    type: type,
                    pos: new namespace.Vector(pos.x, pos.y)
                });
            }
            console.log('After generate', me.threes.length);
        }

        function _tick(time) {
            _renderable.getCtx().clearRect(0, 0, me.settings.width, me.settings.height);
            _physicProcess(time);
            _drawProcess();
            _renderable.swapBuffers();
            if (gamePeriod <= me.settings.maxSteps)
                requestAnimationFrame(_tick, _renderable.renderCanv);
        }

        function _physicProcess(time) {
            if (time - lastAnimationTime > TIME2UPDATE) {
                gamePeriod++;
                _generateThrees(true);
                lastAnimationTime = time;
            }
        }

        function _drawProcess() {
            _drawThrees();
            _drawBunny();
            _drawWolf();
            _renderable.drawGrid();
        }

        function _drawThrees() {
            for (var i = 0; i < me.threes.length; ++i) {
                _renderable.drawItem(me.threes[i].getX(), me.threes[i].getY(), me.threes[i].settings.color);
            }
        }

        function _drawBunny() {
            _renderable.drawItem(me.bunny.getX(), me.bunny.getY(), BUNNY_COLOR);
        }

        function _drawWolf() {
            _renderable.drawItem(me.wolf.getX(), me.wolf.getY(), WOLF_COLOR);
        }
    }

    namespace.GameOfLife = GameOfLife;

})(window.game);