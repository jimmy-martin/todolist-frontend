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

    // on va utiliser plutôt une méthode qui se trouve dans task au lieu de coder ici
    const result = task.createNewTask(todoName, todoCategory);

    if (result) {
      // je vide mon input
      formElement.querySelector('.task__title-field').value = '';
    }
    
    formElement.querySelector('.task__title-field').focus();

  }

};