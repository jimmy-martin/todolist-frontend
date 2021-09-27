const newTaskForm = {
  init: function () {
    // je recupere mon formulaire
    const formElement = document.querySelector('.task form');
    formElement.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
  },

  handleNewTaskFormSubmit: function (evt) {
    evt.preventDefault();

    const formElement = evt.currentTarget.closest('form');
    
    const todoName = formElement.querySelector('.task__title-field').value;

    if(todoName === ''){
      window.alert('Votre champ est vide !');      
    } else {
      const taskTemplateElement = document.getElementById('taskTemplate');
  
      const taskElement = taskTemplateElement.content.cloneNode(true);
  
      taskElement.querySelector('.task__title-label').textContent = todoName;
      taskElement.querySelector('.task__title-field').value = todoName;
  
      document.querySelector('.tasks').appendChild(taskElement);
  
      // Pour que ma tache puisse bénéficer des ecouteurs d'evenements nécessaires
      // je fait appel à la fonction bindAllTasksEvents pour qu'il puisse bénéficier des ecouteurs d'evenements des taches
      tasksList.bindAllTasksEvents();
  
      // je vide mon input
      formElement.querySelector('.task__title-field').value = '';
    }
    
    formElement.querySelector('.task__title-field').focus();
    
  }

};