const task = {

  /**
   * Methode de gérer les évènements d'une tâche donnée (taskElement)
   * @param {HtmlElement} taskElement 
   */
  bindSingleTaskEvents: function (taskElement) {

    // On récupère l'intitulé de la tache
    const taskElementTitle = taskElement.querySelector('.task__title-label');

    // On va ajouter un evenement au click sur l'element
    // et on appelle un handler
    taskElementTitle.addEventListener('click', task.handleEnableTaskTitleEditMode);

  },

  handleEnableTaskTitleEditMode: function () {
    console.log('Click sur un paragraphe');
  }
};