const filters = {

    showArchivedTask: false,

    init: function () {
        // TODO : coder les ecouteurs d'evenements

        const archivedLinkElement = document.querySelector('.filters__task--archived .filters__choice');
        archivedLinkElement.addEventListener('click', filters.handleClickOnArchivedLink);
    },

    handleClickOnArchivedLink: function (evt) {
        const buttonElement = evt.currentTarget;
        console.log(buttonElement);

        
        if (!filters.showArchivedTask) {
            tasksList.showArchivedTasks();
        } else {
            tasksList.hideArchivedTasks();
        }

        // je change le texte de mon lien en fonction
        // de si j'ai déja cliqué sur mon lien ou pas
        if(filters.showArchivedTask === false){
            buttonElement.textContent = 'Voir les archives';
        } else {
            buttonElement.textContent = 'Ne plus voir les archives';
        }
    }
}