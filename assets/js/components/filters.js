const filters = {

    showArchivedTask: false,
    showCompleteTasks: false,
    showIncompleteTasks: false,

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
            buttonElement.textContent = 'Ne plus voir les archives';
            tasksList.showArchivedTasks();

            // si je suis dans mes archives alors je dois cacher les boutons et le formulaire
            filters.toggleFiltersButtons();
            filters.toggleForm();

            // Pour éviter les bugs de DOM, je choisis de revenir à la page qui affiche tous les filtres
            const allTasksFilter = document.querySelector('.filters__task--completion').firstElementChild;
            filters.isActive(allTasksFilter);
        } else {
            buttonElement.textContent = 'Voir les archives';            
            tasksList.hideArchivedTasks();

            // si je ne suis plus dans mes archives alors je dois afficher les boutons et le formulaire
            filters.toggleFiltersButtons();
            filters.toggleForm();
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
    },

    toggleFiltersButtons: function () {
        const allFiltersButtons = document.querySelector('.filters__task--completion')
        // console.log(allFiltersButtons);
        if (filters.showArchivedTask) {
            allFiltersButtons.style.display = 'none';
        } else {
            allFiltersButtons.style.display = 'block';
        }
    },

    toggleForm: function () {
        const formElement = document.querySelector('.task form');

        if (filters.showArchivedTask) {
            formElement.style.display = 'none';
        } else {
            formElement.style.display = 'block';
        }
    }
}