/**
 * Created by alex on 21.11.14.
 */

window.havka = window.havka || {};

(function (namespace) {
    "use strict";

    function Ingredient(name, count, active) {
        name = name || "";
        count = count || 0;
        active = active || false;
        this.name = name;
        this.count = count;
        this.active = active;
    }

    namespace.Ingredient = Ingredient;

})(window.havka);