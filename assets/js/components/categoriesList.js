const categoriesList = {
    init: function () {
        categoriesList.loadCategoriesFromAPI();
    },

    /**
     * Récupérer les catégories depuis une API pour dynamiser
     * l'affichage de la liste des catégories
     */
    loadCategoriesFromAPI: function () {
        // console.log('Je peux passer à la suite');

        // je configure ma requête
        const fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // j'execute ma requete 
        fetch(app.apiRootUrl + '/categories', fetchOptions)
            // puis je convertis la reponse renvoyée (renvoyée au format JSON) par mon API en objet JavaScript
            .then(function (response) {
                return response.json();
            })
            // on recupere le resultat et on le met en parametre d'une autre fonction
            .then(function (categoriesFromApi) {
                // console.log(data);                

                const selectFilter = categoriesList.createSelect(categoriesFromApi, 'Toutes les catégories', 'filters__choice');
                document.querySelector('.filters__task--category').append(selectFilter);

                const selectForm = categoriesList.createSelect(categoriesFromApi, 'Choisir une catégorie');
                document.querySelector('.task__category .select').append(selectForm);

            });

    },

    /**
     * Méthode permettant de créer un select
     * 
     * @param {Array} data categories from api
     * @param {String} optionLabel name of the default option
     * @param {String} selectClass class of the select
     * @returns {HTMLElement} selectElement
     */
    createSelect: function (categoriesFromApi, optionLabel, selectClass = '') {

        const selectElement = document.createElement('select');

        if (selectClass !== '') {
            selectElement.classList.add(selectClass);
        }

        const optionDefault = document.createElement('option');
        optionDefault.textContent = optionLabel;
        optionDefault.value = 0;

        // On rajoute l'option par défaut à l'élement select
        selectElement.append(optionDefault);

        // pour chaque catégorie, créer un élément <option> et l'ajouter comme enfant du <select>
        for (let category of categoriesFromApi) {
            const optionChild = document.createElement('option');
            optionChild.textContent = category.name;
            optionChild.value = category.id;
            selectElement.append(optionChild);
        }

        return selectElement;
    }
}