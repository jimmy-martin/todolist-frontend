const filters = {

    showArchivedTask: false,

    init: function () {
        // TODO : coder les ecouteurs d'evenements

        const archivedLinkElement = document.querySelector('.filters__task--archived .filters__choice');
        archivedLinkElement.addEventListener('click', filters.handleClickOnArchivedLink);

        const filtersChoiceButtonsElement = document.querySelectorAll('.filters__task--completion .button');
        for (const button of filtersChoiceButtonsElement) {
            button.addEventListener('click', filters.handleClickOnFiltersButton);
        }
    },

    handleClickOnArchivedLink: function (evt) {
        const buttonElement = evt.currentTarget;
        // console.log(buttonElement);

        if (!filters.showArchivedTask) {
            tasksList.showArchivedTasks();
        } else {
            tasksList.hideArchivedTasks();
        }

        // je change le texte de mon lien en fonction
        // de si j'ai déja cliqué sur mon lien ou pas
        if (filters.showArchivedTask === false) {
            buttonElement.textContent = 'Voir les archives';
        } else {
            buttonElement.textContent = 'Ne plus voir les archives';
        }
    },

    handleClickOnFiltersButton: function (evt) {
        const buttonElement = evt.currentTarget;

        filters.isActive(buttonElement);

        switch (buttonElement.textContent) {
            case 'Complètes':
                console.log('Affiche les tâches complètes');
                tasksList.showCompleteTasks();
                break;
            case 'Incomplètes':
                console.log('Affiche les tâches incomplètes');
                tasksList.showIncompleteTasks();
                break;
            case 'Toutes':
                console.log('Affiche toutes les tâches');
                tasksList.showAllTasks();
                break;
        }
    },

    isActive: function (buttonElement) {

        const filtersButtons = document.querySelectorAll('.filters__choice');
        for (const button of filtersButtons) {
            button.classList.remove('is-info', 'is-selected');
        }
        buttonElement.classList.add('is-info', 'is-selected');
    }
}