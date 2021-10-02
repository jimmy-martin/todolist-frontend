const filters = {

    showArchivedTask: false,

    init: function () {
        // TODO : coder les ecouteurs d'evenements

        const archivedLinkElement = document.querySelector('.filters__task--archived .filters__choice');
        archivedLinkElement.addEventListener('click', filters.handleClickOnArchivedLink);
    },

    handleClickOnArchivedLink: function (evt) {

        if (!filters.showArchivedTask) {
            tasksList.showArchivedTasks();
        } else {
            tasksList.hideArchivedTasks();
        }
    }
}