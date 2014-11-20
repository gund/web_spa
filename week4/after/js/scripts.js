$(function () {

    var viewModel = {
        title: ko.observable(),
        tasks: ko.observableArray([]),
        hideCompleted: ko.observable(false),
        textFilter: ko.observable(''),
        addTask: function() {
            "use strict";
            viewModel.tasks.push({
                title: viewModel.title(),
                status: ko.observable(false)
            });
            viewModel.title('');
            $('input[name=title]').focus();
        },
        removeTask: function(task) {
            "use strict";
            viewModel.tasks.remove(task);
        }
    };

    viewModel.notCompletedTasks = ko.computed(function () {
        "use strict";
        var filter = viewModel.textFilter();

        var tasks = [];
        viewModel.tasks().forEach(function (task) {
            if (viewModel.hideCompleted() && task.status()) return;
            if (task.title.indexOf(filter) == -1) return;
            tasks.push(task);
        });
        return tasks;
    });

    ko.applyBindings(viewModel);
    
});