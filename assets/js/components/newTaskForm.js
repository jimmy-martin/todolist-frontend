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

    const todoCategory = formElement.querySelector('.task__category  select').value;

    const todoCategoryName = formElement.querySelector('.task__category  select option').textContent;

    const data = {
      title: todoName,
      categoryId: todoCategory
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
        console.log(apiTask);
        const result = task.createNewTask(apiTask.id, todoName, todoCategoryName);
        if (result) {
          // je vide mon input
          formElement.querySelector('.task__title-field').value = '';
        }
        formElement.querySelector('.task__title-field').focus();
      });



  }

};