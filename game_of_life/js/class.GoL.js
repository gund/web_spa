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
            bunnySmart: false,
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
        var BUNNY_COLOR = "#919191";
        var THREE_COLOR = "#096800";
        var BUSH_COLOR = "#00FF2A";
        var TIME2UPDATE = this.settings.updatePhysicEvery * 1000;
        this.grid = [];
        this.wolf = {};
        this.bunny = {};
        this.threes = [];
        this.wolfWin = false;

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
            me.wolf.setPosition(wolfPos.x, wolfPos.y);
            var bunnyPos = _getAvailablePos(1);
            me.bunny.setPosition(bunnyPos.x, bunnyPos.y);
        }

        function _getAvailablePos(checkLvl) {
            if (checkLvl === undefined) checkLvl = 0;
            var x = 0;
            var y = 0;
            var posFree;
            do {
                x = namespace.randMinMax(0, me.settings.cellCount - 1);
                y = namespace.randMinMax(0, me.settings.cellCount - 1);
                posFree = _isXYFree(x, y, checkLvl);
            } while (!posFree);
            return {x: x, y: y};
        }

        function _isXYFree(x, y, checkLvl) {
            var posFree = true;
            for (var i = 0; i < me.threes.length; ++i) {
                if (me.threes[i].getX() == x && me.threes[i].getY() == y) {
                    posFree = false;
                    break;
                }
            }
            if (checkLvl > 0 && me.wolf.getX() == x && me.wolf.getY() == y) posFree = false;
            if (checkLvl > 1 && me.bunny.getX() == x && me.bunny.getY() == y) posFree = false;
            return posFree;
        }

        function _generateThrees(regenerate) {
            if (regenerate === undefined) regenerate = false;
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
            if (regenerate) {
                for (var i = 0; i < me.threes.length; ++i) {
                    var lifeLong = parseInt(me.threes[i].settings.type ? me.settings.threeLive : me.settings.bushLive);
                    if (me.threes[i].settings.life + lifeLong <= gamePeriod) {
                        me.threes.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        function _tick(time) {
            _renderable.getCtx().clearRect(0, 0, me.settings.width, me.settings.height);
            _physicProcess(time);
            _drawProcess();
            _renderable.swapBuffers();
            if (gamePeriod <= me.settings.maxSteps)
                requestAnimationFrame(_tick, _renderable.renderCanv);
            else setTimeout(function () {
                alert("Game Over!\n" + (me.wolfWin ? 'Wolf' : 'Bunny') + " win!")
            }, 100);
        }

        function _physicProcess(time) {
            if (time - lastAnimationTime > TIME2UPDATE) {
                gamePeriod++;
                _generateThrees(true);
                _moveWolf();
                _moveBunny();
                _checkGameState();
                lastAnimationTime = time;
            }
        }

        function _checkGameState() {
            var bunnyPos = me.bunny.getPosition();
            var wolfPos = me.wolf.getPosition();
            var vec = bunnyPos.sub(wolfPos);
            var module = Math.floor(Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2)));
            if (module == 1) {
                gamePeriod = me.settings.maxSteps + 1;
                me.wolfWin = true;
            }
        }

        function _getRandomVector() {
            return new namespace.Vector(namespace.randMinMax(-1, 1), namespace.randMinMax(-1, 1));
        }

        function _getVectorToBunny() {
            var bunnyPos = me.bunny.getPosition();
            var wolfPos = me.wolf.getPosition();
            var vec = bunnyPos.sub(wolfPos);
            var module = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
            return vec.div(new namespace.Vector(module, module));
        }

        function _getVectorFromWolf() {
            var bunnyPos = me.bunny.getPosition();
            var wolfPos = me.wolf.getPosition();
            var vec = wolfPos.sub(bunnyPos);
            var module = Math.floor(Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2)));
            vec = vec.div(new namespace.Vector(module, module));
            if (me.settings.bunnySmart) {
                var safeVec = true, rndVec;
                do {
                    rndVec = _getRandomVector();
                    var rndModule = Math.floor(Math.sqrt(Math.pow(rndVec.x, 2) + Math.pow(rndVec.y, 2)));
                    var rndScalar = rndVec.mul(vec);
                    rndScalar = rndScalar.x + rndScalar.y;
                    var cos = rndScalar / (rndModule * module);
                    if (cos >= 0.25) safeVec = false;
                } while (!safeVec);
                return rndVec;
            } else return _getRandomVector();
        }

        function _moveBunny() {
            var vec, x, y, posFree = true;
            do {
                vec = _getVectorFromWolf();
                x = me.bunny.getX() + vec.x * namespace.randMinMax(1, parseInt(me.settings.bunnyStep));
                y = me.bunny.getY() + vec.y * namespace.randMinMax(1, parseInt(me.settings.bunnyStep));
                x = Math.max(x, 0);
                x = Math.min(x, me.settings.cellCount - 1);
                y = Math.max(y, 0);
                y = Math.min(y, me.settings.cellCount - 1);
                posFree = _isXYFree(x, y, 2);
                // Make offset if not free
                if (!posFree) {
                    for (var i = -1; i <= 1; ++i) {
                        for (var j = -1; j <= 1; ++j) {
                            x = me.bunny.getX() + i * namespace.randMinMax(1, parseInt(me.settings.bunnyStep));
                            y = me.bunny.getY() + j * namespace.randMinMax(1, parseInt(me.settings.bunnyStep));
                            x = Math.max(x, 0);
                            x = Math.min(x, me.settings.cellCount - 1);
                            y = Math.max(y, 0);
                            y = Math.min(y, me.settings.cellCount - 1);
                            if ((posFree = _isXYFree(x, y, 1))) break;
                        }
                    }
                }
            } while (!posFree);
            me.bunny.setPosition(x, y);
        }

        function _moveWolf() {
            var vec, x, y, posFree = true;
            do {
                vec = _getVectorToBunny();
                x = me.wolf.getX() + vec.x * namespace.randMinMax(1, parseInt(me.settings.wolfStep));
                y = me.wolf.getY() + vec.y * namespace.randMinMax(1, parseInt(me.settings.wolfStep));
                x = Math.max(x, 0);
                x = Math.min(x, me.settings.cellCount - 1);
                y = Math.max(y, 0);
                y = Math.min(y, me.settings.cellCount - 1);
                posFree = _isXYFree(x, y, 1);
                // Make offset if not free
                if (!posFree) {
                    for (var i = -1; i <= 1; ++i) {
                        for (var j = -1; j <= 1; ++j) {
                            x = me.wolf.getX() + i * namespace.randMinMax(1, parseInt(me.settings.wolfStep));
                            y = me.wolf.getY() + j * namespace.randMinMax(1, parseInt(me.settings.wolfStep));
                            x = Math.max(x, 0);
                            x = Math.min(x, me.settings.cellCount - 1);
                            y = Math.max(y, 0);
                            y = Math.min(y, me.settings.cellCount - 1);
                            if ((posFree = _isXYFree(x, y, 1))) break;
                        }
                    }
                }
            } while (!posFree);
            me.wolf.setPosition(x, y);
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