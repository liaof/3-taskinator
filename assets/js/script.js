/*the .document object allows us to access everything on the webpage including metadata*/
/*it represents the index.html of the current page*/
var buttonEl = document.querySelector("#save-task"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var createTaskHandler = function() { 
  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 
  listItemEl.textContent = "This is a new task."; 
  tasksToDoEl.appendChild(listItemEl); 
  }; 

buttonEl.addEventListener("click", createTaskHandler);

/*var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);*/