const tasksList = {

  init: function (evt) {
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
      .then(function (data) {        
        
        for (let apiTask of data) {

          const taskTemplateElement = document.getElementById('taskTemplate').content.cloneNode(true);

          const taskElement = taskTemplateElement.querySelector('.task');
          console.log(apiTask);
          
          taskElement.querySelector('.task__title-label').textContent = apiTask.title;
          taskElement.querySelector('.task__title-field').value = apiTask.title;
          taskElement.querySelector('.task__category p').textContent = apiTask.category.name;
          taskElement.dataset.category = apiTask.category.name;
          taskElement.querySelector('.progress-bar__level').style.width = apiTask.completion + '%';

          task.bindSingleTaskEvents(taskElement);

          document.querySelector('.tasks').appendChild(taskElement);

        }

      });

  }

};