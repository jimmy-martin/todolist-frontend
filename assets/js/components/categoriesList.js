const categoriesList = {
    init: function () {
        categoriesList.loadCategoriesFromAPI();
    },

    loadCategoriesFromAPI: function () {
        // console.log('Je peux passer à la suite');

        // je configure ma requête
        const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // j'execute ma requete 
        fetch('https://benoclock.github.io/S07-todolist/categories.json', fetchOptions)
            // puis je convertis la reponse renvoyée (renvoyée au format JSON) par mon API en objet JavaScript
            .then(function (response) {
                return response.json();
            })
            // on recupere le resultat et on le met en parametre d'une autre fonction
            .then(function (data) {
                // console.log(data);

                // je parcours l'ensemble de mes categories retournées
                let categoryTpl = '';
                for (let category of data) {
                    // je les place 1 par 1 dans une balise option
                    categoryTpl += '<option>' + category.name + '</option>';
                }

                // j'ajoute ma liste d'options dans mes select
                document.querySelector('.filters__task--category .filters__choice').innerHTML = categoryTpl;
                document.querySelector('.task__category select').innerHTML = categoryTpl;
            });


    }
}