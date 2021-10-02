// Module permettant la gestion de notre TodoList

const app = {

    // Propriétés
    apiRootUrl: "http://localhost:8080",

    // Méthodes
    init: function () {
        // initialisation des composants
        tasksList.init();
        newTaskForm.init();
        categoriesList.init();
        filters.init();
    }
};


// On ne démarre le module App seulement après
// que la page html ne soit complètement chargée
document.addEventListener('DOMContentLoaded', app.init);