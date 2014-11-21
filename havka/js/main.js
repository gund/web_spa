/**
 * Created by alex on 21.11.14.
 */

window.havka = window.havka || {};

(function (namespace) {
    "use strict";

    var viewModel = {
        meals: ko.observableArray([]),
        mealsBreakfast: ko.observableArray([]),
        mealsLunch: ko.observableArray([]),
        mealsDinner: ko.observableArray([]),
        categories: ko.observableArray([]),
        ingredients: ko.observableArray([]),
        showCategories: ko.observable(true),
        switchCategories: function (show) {
            viewModel.showCategories(show);
        },
        toggleActiveItem: function (item) {
            item.active(!item.active());
        },
        addMealFor: function(dayTime) {
            switch (dayTime) {
                case 0:
                    viewModel.mealsBreakfast.push(this);
                    break;
                case 1:
                    viewModel.mealsLunch.push(this);
                    break;
                case 2:
                    viewModel.mealsDinner.push(this);
                    break;
            }
        },
        removeMealFrom: function(dayTime) {
            switch (dayTime) {
                case 0:
                    viewModel.mealsBreakfast.remove(this);
                    break;
                case 1:
                    viewModel.mealsLunch.remove(this);
                    break;
                case 2:
                    viewModel.mealsDinner.remove(this);
                    break;
            }
        }
    };

    viewModel.filteredMeals = ko.computed(function () {
        var meals = [];
        var activeCategories = [], activeIngredients = [];

        viewModel.categories().forEach(function (category) {
            if (category.active()) activeCategories.push(category.name);
        });
        viewModel.ingredients().forEach(function (ingredient) {
            if (ingredient.active()) activeIngredients.push(ingredient.name);
        });

        if (activeCategories.length === 0 && activeIngredients.length === 0) return viewModel.meals();

        viewModel.meals().forEach(function (meal) {
            var ingFound = false;
            for (var i in activeIngredients) {
                if (meal.ingredients.toLowerCase().indexOf(activeIngredients[i].toLowerCase()) != -1) {
                    ingFound = true;
                    break;
                }
            }
            if (!ingFound && activeCategories.indexOf(meal.category) == -1) return;
            meals.push(meal);
        });

        return meals;
    });

    viewModel.getAllProteins = ko.computed(function() {
        var proteins = 0;
        viewModel.mealsBreakfast().forEach(function(meal) {
            proteins += parseFloat(meal.proteins);
        });
        viewModel.mealsLunch().forEach(function(meal) {
            proteins += parseFloat(meal.proteins);
        });
        viewModel.mealsDinner().forEach(function(meal) {
            proteins += parseFloat(meal.proteins);
        });
        return proteins.toPrecision(3);
    });
    viewModel.getAllFats = ko.computed(function() {
        var fats = 0;
        viewModel.mealsBreakfast().forEach(function(meal) {
            fats += parseFloat(meal.fats);
        });
        viewModel.mealsLunch().forEach(function(meal) {
            fats += parseFloat(meal.fats);
        });
        viewModel.mealsDinner().forEach(function(meal) {
            fats += parseFloat(meal.fats);
        });
        return fats.toPrecision(3);
    });
    viewModel.getAllCarbohydrates = ko.computed(function() {
        var carbohydrates = 0;
        viewModel.mealsBreakfast().forEach(function(meal) {
            carbohydrates += parseFloat(meal.carbohydrates);
        });
        viewModel.mealsLunch().forEach(function(meal) {
            carbohydrates += parseFloat(meal.carbohydrates);
        });
        viewModel.mealsDinner().forEach(function(meal) {
            carbohydrates += parseFloat(meal.carbohydrates);
        });
        return carbohydrates.toPrecision(3);
    });
    viewModel.getAllKCal = ko.computed(function() {
        var kcal = 0;
        viewModel.mealsBreakfast().forEach(function(meal) {
            kcal += parseFloat(meal.kcal);
        });
        viewModel.mealsLunch().forEach(function(meal) {
            kcal += parseFloat(meal.kcal);
        });
        viewModel.mealsDinner().forEach(function(meal) {
            kcal += parseFloat(meal.kcal);
        });
        return kcal.toPrecision(3);
    });

    function loadDbData() {
        "use strict";
        var dfd = $.Deferred();
        if (viewModel.meals.length === 0 || viewModel.categories.length === 0) {
            $.getJSON("js/data.json", function (meal) {
                "use strict";
                for (var i in meal) {
                    if (meal.hasOwnProperty(i)) {
                        // Add Meals
                        viewModel.meals.push(new namespace.Meal(meal[i]));
                        // Add Categories
                        var foundCat = false;
                        for (var catI in viewModel.categories())
                            if (viewModel.categories()[catI].name == meal[i].category) {
                                viewModel.categories()[catI].count(viewModel.categories()[catI].count() + 1);
                                foundCat = true;
                                break;
                            }
                        if (!foundCat) viewModel.categories.push(new namespace.Category(
                            meal[i].category,
                            ko.observable(1),
                            ko.observable(false)
                        ));
                        // Add Ingredients
                        var ingArr = meal[i].ingredients.toLowerCase().split(/,\s*/);
                        for (var j in ingArr) {
                            var foundIng = false, name = ingArr[j].firstUpper();
                            for (var ingI in viewModel.ingredients())
                                if (viewModel.ingredients()[ingI].name == name) {
                                    viewModel.ingredients()[ingI].count(viewModel.ingredients()[ingI].count() + 1);
                                    foundIng = true;
                                    break;
                                }
                            if (!foundIng) viewModel.ingredients.push(new namespace.Ingredient(
                                name,
                                ko.observable(1),
                                ko.observable(false)
                            ));
                        }
                    }
                }
                viewModel.categories.sort(function (a, b) {
                    return alphabetical(a.name, b.name);
                });
                viewModel.ingredients.sort(function (a, b) {
                    return alphabetical(a.name, b.name);
                });
                dfd.resolve();
            });
        } else dfd.resolve();
        return dfd.promise();
    }

    function alphabetical(a, b) {
        var A = a.toLowerCase();
        var B = b.toLowerCase();
        if (A < B){
            return -1;
        }else if (A > B){
            return  1;
        }else{
            return 0;
        }
    }

    loadDbData();

    ko.applyBindings(viewModel);
})(window.havka);

String.prototype.firstUpper = function () {
    "use strict";
    return this.charAt(0).toUpperCase() + this.slice(1);
};