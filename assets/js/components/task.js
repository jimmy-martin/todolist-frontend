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

    const taskElement = taskElementInput.closest('.task');
    const taskId = taskElement.dataset.id;


    // on recupere la nouvelle valeur de la tache
    const newTaskTitle = taskElementInput.value;

    const data = {
      title: newTaskTitle
    }

    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(data)
    };

    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function (response) {
          if (response.status == 200) {
            // je recupere le paragraphe qui se trouve juste au dessus de mon input dans mon HTML
            // previousElementSibling me retourne l'element du DOM precedent mon element courant
            const taskTitleElement = taskElementInput.previousElementSibling;
            taskTitleElement.textContent = newTaskTitle;

            // enfin je retire la classe task--edit
            const taskElement = taskElementInput.closest('.task');
            taskElement.classList.remove('task--edit');
            console.log('Nom de la tâche modifié !');
          } else {
            alert('Une erreur est survenue !');
          }
        }
      );
  },

  handleValideNewTaskTitleOnEnterKey: function (evt) {
    if (evt.key === 'Enter') {
      task.handleValidateNewTaskTitle(evt);
    }
  },

  handleCompleteTask: function (evt) {

    const taskCompleteButton = evt.currentTarget;
    const taskElement = taskCompleteButton.closest('.task');
    const taskId = taskElement.dataset.id;

    const data = {
      completion: 100
    }
    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body: JSON.stringify(data)
    };

    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function (response) {
          if (response.status == 200) {
            return response.json();
          } else {
            alert('Une erreur est survenue !');
          }
        })
      .then(function (apiTask) {
        // console.log(apiTask);
        taskElement.classList.remove('task--todo');
        taskElement.classList.add('task--complete');
        taskElement.querySelector('.progress-bar__level').style.width = apiTask.completion + '%';
        console.log('Tâche complète !');
      });
  },

  handleIncompleteTask: function (evt) {

    const taskIncompleteButton = evt.currentTarget;
    const taskElement = taskIncompleteButton.closest('.task');
    const taskId = taskElement.dataset.id;

    const data = {
      completion: 0
    }
    // On prépare les entêtes HTTP (headers) de la requête
    // afin de spécifier que les données sont en JSON
    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      // On ajoute les headers dans les options
      headers: httpHeaders,
      // On ajoute les données, encodées en JSON, dans le corps de la requête
      body: JSON.stringify(data)
    };

    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function (response) {
          if (response.status == 200) {
            return response.json();
          } else {
            alert('Une erreur est survenue !');
          }
        }
      )
      .then(function (apiTask) {
        taskElement.classList.remove('task--complete');
        taskElement.classList.add('task--todo');
        taskElement.querySelector('.progress-bar__level').style.width = apiTask.completion + '%';
        console.log('Tache incomplète !');
      });
  },

  handleArchiveTask: function (evt) {
    if (window.confirm('Voulez-vous vraiment archiver cette tâche ?')) {

      const taskArchiveButton = evt.currentTarget;
      const taskElement = taskArchiveButton.closest('.task');
      const taskId = taskElement.dataset.id;

      const data = {
        status: 2
      }

      const httpHeaders = new Headers();
      httpHeaders.append("Content-Type", "application/json");

      const fetchOptions = {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        headers: httpHeaders,
        body: JSON.stringify(data)
      };

      fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
        .then(
          function (response) {
            if (response.status == 200) {
              taskElement.classList.remove('task--todo', 'task--complete');
              taskElement.classList.add('task--archive');
              tasksList.hideArchivedTasks();
              console.log('La tâche est archivée !');
            } else {
              alert('Une erreur est survenue !');
            }
          }
        );
    }
  },

  handleDesarchiveTask: function (evt) {

    const taskDesarchiveButton = evt.currentTarget;
    const taskElement = taskDesarchiveButton.closest('.task');
    const taskId = taskElement.dataset.id;

    const data = {
      status: 1
    }

    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
      body: JSON.stringify(data)
    };

    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function (response) {
          if (response.status == 200) {
            taskElement.classList.remove('task--archive');
            taskElement.classList.add('task--todo');
            tasksList.showArchivedTasks();
            console.log('La tâche est désarchivée !');
          } else {
            alert('Une erreur est survenue !');
          }
        }
      );
  },

  handleDeleteTask: function (evt) {

    const taskDeleteButton = evt.currentTarget;
    const taskElement = taskDeleteButton.closest('.task');
    const taskId = taskElement.dataset.id;

    const httpHeaders = new Headers();
    httpHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: httpHeaders,
    };

    fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
      .then(
        function (response) {
          if (response.status == 204) {
            const allTasksElement = document.querySelector('.tasks');
            allTasksElement.removeChild(taskElement);
            console.log('La tâche est supprimée !');
          } else {
            alert('Une erreur est survenue !');
          }
        }
      );
  },

  /**
   * Création d'une tâche
   * 
   * @param {Int} newTaskId Id de la catégorie
   * @param {String} newTaskName Nom de la tâche
   * @param {String} newTaskCategory Nom de la catégorie
   * @param {Int} newTaskStatus 1 = Tâche active | 2 = Tâche archivée
   * @param {Int} newTaskCompletion Niveau d'achèvement de la tâche
   * @returns {Boolean}
   */
  createNewTask: function (newTaskId, newTaskName, newTaskCategory, newTaskStatus = 1, newTaskCompletion = 0) {

    const taskTemplateElement = document.getElementById('taskTemplate').content.cloneNode(true);

    const taskElement = taskTemplateElement.querySelector('.task');
    taskElement.dataset.id = newTaskId;

    taskElement.querySelector('.task__title-label').textContent = newTaskName;
    taskElement.querySelector('.task__title-field').value = newTaskName;
    taskElement.querySelector('.task__category p').textContent = newTaskCategory;
    taskElement.dataset.category = newTaskCategory;
    taskElement.querySelector('.progress-bar__level').style.width = newTaskCompletion + '%';

    if (newTaskStatus == 2) {
      taskElement.classList.add('task--archive');
    } else if (newTaskCompletion == 100) {
      taskElement.classList.add('task--complete');
    }

    // Pour que ma tache puisse bénéficer des ecouteurs d'evenements nécessaires
    // je fais appel à la fonction bindSingleTaskEvents pour qu'il puisse bénéficier des ecouteurs d'evenements des taches
    //! JavaScript nous impose de le faire avant d'ajouter notre noeud au DOM, sinon il ne reconnait plus l'element auquel on souhaite ajouter des eventListener
    task.bindSingleTaskEvents(taskElement);

    // plus tard on utilisera une methode de taskList pour ajouter la nouvelle tache
    // tasksList.addNewTask(taskElement)
    document.querySelector('.tasks').prepend(taskElement);
  }

};