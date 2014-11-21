/**
 * Created by alex on 21.11.14.
 */

window.havka = window.havka || {};

(function (namespace) {
    "use strict";

    function Meal(config) {
        config = config || {};

        this.name = config.name;
        this.src = config.src;
        this.category = config.category;
        this.ingredients = config.ingredients;
        this.kcal = config.kcal;
        this.proteins = config.proteins;
        this.fats = config.fats;
        this.carbohydrates = config.carbohydrates;
        this.weight = config.weight;
    }

    namespace.Meal = Meal;

})(window.havka);