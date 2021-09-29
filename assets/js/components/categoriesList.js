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
        fetch('https://benoclock.github.io/S07-todolist/categories.json', fetchOptions)
            // puis je convertis la reponse renvoyée (renvoyée au format JSON) par mon API en objet JavaScript
            .then(function (response) {
                return response.json();
            })
            // on recupere le resultat et on le met en parametre d'une autre fonction
            .then(function (data) {
                // console.log(data);                

                const selectFilter = categoriesList.createSelect(data, 'Toutes les catégories', 'filters__choice');
                document.querySelector('.filters__task--category').append(selectFilter);

                const selectForm = categoriesList.createSelect(data, 'Choisir une catégorie');
                document.querySelector('.task__category .select').append(selectForm);

            });

    },

    /**
     * Méthode permettant de créer un select
     * 
     * @param {Array} data datas from api
     * @param {String} optionLabel name of the default option
     * @param {String} selectClass class of the select
     * @returns {HTMLElement} selectElement
     */
    createSelect: function (data, optionLabel, selectClass = '') {

        const selectElement = document.createElement('select');

        if (selectClass !== '') {
            selectElement.classList.add(selectClass);
        }

        const optionDefault = document.createElement('option');
        optionDefault.textContent = optionLabel;

        // On rajoute l'option par défaut à l'élement select
        selectElement.append(optionDefault);

        // pour chaque catégorie, créer un élément <option> et l'ajouter comme enfant du <select>
        for (let category of data) {
            const optionChild = document.createElement('option');
            optionChild.textContent = category.name;
            selectElement.append(optionChild);
        }

        return selectElement;
    }
}