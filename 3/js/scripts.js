$(function () {
    "use strict";

    var viewModel = {
        title: 'sasai',
        people: ko.observableArray([]),
        personAdd: personVM(),
        add: add,
        remove: remove
    };

    function add() {
        var obj = personVM(viewModel.personAdd.firstName(), viewModel.personAdd.lastName());
        viewModel.people.push(obj);
        viewModel.personAdd.firstName('');
        viewModel.personAdd.lastName('');
    }

    function remove(person) {
        viewModel.people.remove(person);
    }

    function personVM(fn, ln) {
        return {
            firstName: ko.observable(fn),
            lastName: ko.observable(ln)
        };
    }

    viewModel.people.push(personVM('lol', 'sdmlsdf'));
    viewModel.people.push(personVM('barack', 'obama'));

    ko.applyBindings(viewModel);
});