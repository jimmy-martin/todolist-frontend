const tasksList = {

  init: function () {
    tasksList.bindAllTasksEvents();
    tasksList.loadTasksFromAPI();
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
    for (const taskElement of allTasksElement) {
      task.bindSingleTaskEvents(taskElement);
    }

  },

  loadTasksFromAPI: function () {

    const fetchOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache'
    };

    fetch('https://benoclock.github.io/S07-todolist/tasks.json', fetchOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (tasks) {

        for (let apiTask of tasks) {

          task.createNewTask(apiTask.title, apiTask.category.name, apiTask.status , apiTask.completion);

        }

      });

  }

};