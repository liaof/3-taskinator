/*the .document object allows us to access everything on the webpage including metadata*/
/*it represents the index.html of the current page*/
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var createTaskHandler = function() { 

    event.preventDefault();
    //square brackets narrows search down to specific attribute, like the id
    var taskNameInput = document.querySelector("input[name='task-name']").value; 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    if (!taskTypeInput){
        taskTypeInput = "None";
    }
    //create list item
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item";
    //create div to hold name and type info and add to list item above
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3> <span class='task-type'>" + taskTypeInput + "</span>";

    //put the container containing name and type info into our
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);

}   

formEl.addEventListener("submit", createTaskHandler);

