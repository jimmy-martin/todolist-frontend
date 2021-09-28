const tasksList = {

  init: function (evt){
    tasksList.bindAllTasksEvents();
  },

  /**
   * Méthode permettant d'appliquer les évènements sur chaque tache de notre liste
   */
  bindAllTasksEvents: function () {
    // On recupere la listes de toutes les taches
    const allTasksElement = document.querySelectorAll('.tasks .task');

    // Et pour chaque tache, j'appelle la methode bindSingleTaskEvents
    // pour ecouter l'evenement click sur chaque element
    // on utilise la boucle for...of 
    // qui est l'équivalent de notre foreach en PHP
    for(const taskElement of allTasksElement){
      task.bindSingleTaskEvents(taskElement);
    }

  }
};