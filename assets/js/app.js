// Module permettant la gestion de notre TodoList

const app = {

    // Propriétés

    // Méthodes
    init: function () {
        console.log('Coucou');
    }
};


// On ne démarre le module App seulement après
// que la page html ne soit complètement chargée
document.addEventListener('DOMContentLoaded', app.init);