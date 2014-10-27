/**
 * Created by alex on 27.10.14.
 */

window.game = window.game || {};

(function (namespace) {
    "use strict";

    function CellItem(options) {
        // Init settings

        if (options === undefined) options = {};
        this.settings = {
            pos: new Vector(0, 0),
            color: "#000000"
        };
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.settings[i] = options[i];
            }
        }
    }
    // CellItem API

    /**
     * Set item position
     * @param {number}x
     * @param {number}y
     */
    CellItem.prototype.setPosition = function (x, y) {
        this.settings.pos = new Vector(x, y);
    };

    /**
     * Get item position
     * @returns {{x: number, y: number}}
     */
    CellItem.prototype.getPosition = function() {
        return this.settings.pos;
    };

    /**
     * Get item X position
     * @returns {number}
     */
    CellItem.prototype.getX = function() {
        return this.settings.pos.x;
    };

    /**
     * Get item Y position
     * @returns {number}
     */
    CellItem.prototype.getY = function() {
        return this.settings.pos.y;
    };

    function Bunny(options) {
        return Object.create(new CellItem(options));
    }

    function Wolf(options) {
        return Object.create(new CellItem(options));
    }

    function Three(options) {
        return Object.create(new CellItem(options));
    }

    function randMinMax(min, max) {
        return Math.floor(min + Math.random()*(max+1-min));
    }

    function Vector(x, y) {
        var me = this;
        this.x = x;
        this.y = y;
        this.add = function(vec) {
            return new Vector(me.x + vec.x, me.y + vec.y);
        };
        this.sub = function(vec) {
            return new Vector(me.x - vec.x, me.y - vec.y);
        };
        this.mul = function(vec) {
            return new Vector(me.x * vec.x, me.y * vec.y);
        };
        this.div = function(vec) {
            return new Vector(Math.round(me.x / vec.x), Math.round(me.y / vec.y));
        };
    }

    namespace.Bunny = Bunny;
    namespace.Wolf = Wolf;
    namespace.Three = Three;
    namespace.Vector = Vector;
    namespace.randMinMax = randMinMax;

})(window.game);