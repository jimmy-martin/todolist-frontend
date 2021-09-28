const task = {

  /**
   * Methode permettant de gérer les évènements d'une tâche donnée (taskElement)
   * @param {HtmlElement} taskElement 
   */
  bindSingleTaskEvents: function (taskElement) {

    // On récupère l'intitulé de la tache
    const taskElementTitle = taskElement.querySelector('.task__title-label');
    // On va ajouter un evenement au click sur l'element
    // et on appelle un handler
    taskElementTitle.addEventListener('click', task.handleEnableTaskTitleEditMode);

    // Validation de l'input
    const taskElementInput = taskElement.querySelector('.task__title-field');
    taskElementInput.addEventListener('blur', task.handleValidateNewTaskTitle);
    taskElementInput.addEventListener('keydown', task.handleValideNewTaskTitleOnEnterKey);

    // Bouton d'édition
    const taskElementButtonModify = taskElement.querySelector('.task__button--modify');
    taskElementButtonModify.addEventListener('click', task.handleEnableTaskTitleEditMode);

    // Bouton tache complète
    const taskElementButtonComplete = taskElement.querySelector('.task__button--validate');
    taskElementButtonComplete.addEventListener('click', task.handleCompleteTask);

    // Bouton tache incomplète
    const taskElementButtonIncomplete = taskElement.querySelector('.task__button--incomplete');
    taskElementButtonIncomplete.addEventListener('click', task.handleIncompleteTask);

    // Bouton tache archive
    const taskElementButtonArchive = taskElement.querySelector('.task__button--archive');
    taskElementButtonArchive.addEventListener('click', task.handleArchiveTask);

    // Bouton tache desarchive
    const taskElementButtonDesarchive = taskElement.querySelector('.task__button--desarchive');
    taskElementButtonDesarchive.addEventListener('click', task.handleDesarchiveTask);

    // Bouton tache delete
    const taskElementButtonDelete = taskElement.querySelector('.task__button--delete');
    taskElementButtonDelete.addEventListener('click', task.handleDeleteTask);

  },

  handleEnableTaskTitleEditMode: function (evt) {

    // On recupere l'element a l'origine du click
    const taskElementLabel = evt.currentTarget;
    // console.log(taskElementLabel);

    // on recupere l'elemeent parent le plus proche contenantant la classe .task
    const taskElement = taskElementLabel.closest('.task');
    // console.log(taskElement);

    taskElement.classList.add('task--edit');

    // je mets le focus sur mon input lorsque je passe en mode edition
    taskElement.querySelector('.task__title-field').focus();

  },

  handleValidateNewTaskTitle: function (evt) {
    const taskElementInput = evt.currentTarget;

    // on recupere la nouvelle valeur de la tache
    const newTaskTitle = taskElementInput.value;

    // je recupere le paragraphe qui se trouve juste au dessus de mon input dans mon HTML
    // previousElementSibling me retourne l'element du DOM precedent mon element courant
    const taskTitleElement = taskElementInput.previousElementSibling;
    taskTitleElement.textContent = newTaskTitle;

    // enfin je retir la classe task--edit
    const taskElement = taskElementInput.closest('.task');
    taskElement.classList.remove('task--edit');
  },

  handleValideNewTaskTitleOnEnterKey: function (evt) {
    if (evt.key === 'Enter') {
      task.handleValidateNewTaskTitle(evt);
    }
  },

  handleCompleteTask: function (evt) {

    const taskCompleteButton = evt.currentTarget;
    const taskElement = taskCompleteButton.closest('.task');

    taskElement.classList.remove('task--todo');
    taskElement.classList.add('task--complete');
  },

  handleIncompleteTask: function (evt) {

    const taskIncompleteButton = evt.currentTarget;
    const taskElement = taskIncompleteButton.closest('.task');

    taskElement.classList.remove('task--complete');
    taskElement.classList.add('task--todo');
  },

  handleArchiveTask: function (evt) {
    if (window.confirm('Voulez-vous vraiment archiver cette tâche ?')) {

      const taskArchiveButton = evt.currentTarget;
      const taskElement = taskArchiveButton.closest('.task');

      taskElement.classList.remove('task--todo', 'task--complete');
      taskElement.classList.add('task--archive');
    }
  },

  handleDesarchiveTask: function (evt) {

    const taskDesarchiveButton = evt.currentTarget;
    const taskElement = taskDesarchiveButton.closest('.task');

    taskElement.classList.remove('task--archive');
    taskElement.classList.add('task--todo');
  },

  handleDeleteTask: function (evt) {

    const taskDeleteButton = evt.currentTarget;
    const taskElement = taskDeleteButton.closest('.task');

    const allTasksElement = document.querySelector('.tasks');
    allTasksElement.removeChild(taskElement);
  },

  createNewTask: function (newTaskName, newTaskCategory) {

    if (newTaskName === '' || newTaskCategory === 'Choisir une catégorie') {
      window.alert('Au moins un des champs n\'est pas valide. Pensez à renseigner un nom ET une catégorie.');
    } else {
      const taskTemplateElement = document.getElementById('taskTemplate').content.cloneNode(true);

      const taskElement = taskTemplateElement.querySelector('.task');

      taskElement.querySelector('.task__title-label').textContent = newTaskName;
      taskElement.querySelector('.task__title-field').value = newTaskName;
      taskElement.querySelector('.task__category p').textContent = newTaskCategory;
      taskElement.dataset.category = newTaskCategory;

      // plus tard on utilisera une methode de taskList pour ajouter la nouvelle tache
      // tasksList.addNewTask(taskElement)
      document.querySelector('.tasks').prepend(taskElement);

      // Pour que ma tache puisse bénéficer des ecouteurs d'evenements nécessaires
      // je fait appel à la fonction bindAllTasksEvents pour qu'il puisse bénéficier des ecouteurs d'evenements des taches
      tasksList.bindAllTasksEvents();
      return true;
    }
    return false;
  }

};