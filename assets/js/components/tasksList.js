const tasksList = {

  /**
   * Méthode permettant de gérer l'évènement click sur toutes les taches de notre todolist
   */
  bindAllTasksEvents: function () {
    // On recupere la listes de toutes les taches
    const allTasksElement = document.querySelectorAll('.tasks .task');

    // Et pour chaque tache, j'appelle la methode bindSingleTaskEvents
    // pour ecouter l'evenement click sur chaque element
    for(const taskElement of allTasksElement){
      task.bindSingleTaskEvents(taskElement);
    }

  }
};