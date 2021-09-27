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
    const taskElementButtonValidate = taskElement.querySelector('.task__button--validate');
    taskElementButtonValidate.addEventListener('click', task.handleCompleteTask);

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

  handleCompleteTask: function (evt){
    console.log('YEEEEESSSSS');

    const taskValidateButton = evt.currentTarget;
    const taskElement = taskValidateButton.closest('.task');

    taskElement.classList.remove('task--todo');
    taskElement.classList.add('task--complete');
  }

};