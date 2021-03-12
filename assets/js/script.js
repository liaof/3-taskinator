/*the .document object allows us to access everything on the webpage including metadata*/
/*it represents the index.html of the current page*/
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var taskFormHandler = function(event) { 

    event.preventDefault();
    //square brackets narrows search down to specific attribute, like the id
    var taskNameInput = document.querySelector("input[name='task-name']").value; 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if there is any input, if not run an alert and stop the function
    if (!taskTypeInput || !taskTypeInput){
        alert ("You need to fill out the task form");
        return false;
    }
    //resets the text form after pressing the button
    //.reset ONLY works on form objects
    formEl.reset();
   

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }

    createTaskEl(taskDataObj);
    

}   

var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item";
    //create div to hold name and type info and add to list item above
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";

    //put the container containing name and type info into our
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);

