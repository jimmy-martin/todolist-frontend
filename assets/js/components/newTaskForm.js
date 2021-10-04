const newTaskForm = {
  init: function () {
    // je recupere mon formulaire
    const formElement = document.querySelector('.task form');
    formElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
  },

  handleNewTaskFormSubmit: function (evt) {
    evt.preventDefault();

    const formElement = evt.currentTarget;

    const todoName = formElement.querySelector('.task__title-field').value;

    const selectElement = formElement.querySelector('.task__category select');

    const todoCategoryId = selectElement.value;

    // Pour recuperer le texte meme de l'option selectionnée et non plus la valeur de l'option qui se trouve dans l'attribut "value" du select
    const todoCategoryName = selectElement.options[todoCategoryId].textContent;

    const data = {
      title: todoName,
      categoryId: todoCategoryId
    }

    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(data)
    };

    fetch(app.apiRootUrl + '/tasks', fetchOptions)
      .then(
        function (response) {
          if (response.status == 201) {
            console.log('Tâche bien ajouté !')
            return response.json();
          } else {
            alert('Une erreur est survenue !');
          }
        })
      .then(function (apiTask) {
        // console.log(apiTask);
        const result = task.createNewTask(apiTask.id, apiTask.title, todoCategoryName);

        if (result) {
          // je vide mon input
          formElement.querySelector('.task__title-field').value = '';
        }
        formElement.querySelector('.task__title-field').focus();
      });

  }

};