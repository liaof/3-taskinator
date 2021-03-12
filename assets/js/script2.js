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
    
    //add name and type directly to listItemEl
    listItemEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3> <span class='task-type'>" + taskTypeInput + "</span>";

    //put the container containing name and type info into our

    tasksToDoEl.appendChild(listItemEl);

}   

formEl.addEventListener("submit", createTaskHandler);
