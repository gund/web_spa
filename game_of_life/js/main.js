/**
 * Created by alex on 17.10.14.
 */

window.game = window.game || {};

(function (namespace) {
    "use strict";

    function main() {
        var game = new namespace.GoL();
    }

    window.onload = main;

})(window.game);