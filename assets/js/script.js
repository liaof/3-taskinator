/*the .document object allows us to access everything on the webpage including metadata*/
/*it represents the index.html of the current page*/
var taskIdCounter = 0;

//element references
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector ("#tasks-in-progress");
var tasksCompletedEl = document.querySelector ("#tasks-completed");

var taskFormHandler = function(event) { 

    event.preventDefault();
    
    //look for element type input with matching names as specified
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
   
    //if the current form has a data-task-id, it means the content is being edited instead of created
    var isEdit = formEl.hasAttribute("data-task-id");

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }

    //we can also check if the button is named "add task" or "save tasK" to determine to create or edit
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        createTaskEl(taskDataObj);
    }
}   

var createTaskEl = function(taskDataObj) {
    //create list item
    //the li created is a child of the #tasks-to-do ul element
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item";

    //add task id as a custom attribute called data-task-id
    listItemEl.setAttribute ("data-task-id", taskIdCounter);

    //create div to to contain the name and type
    //the div created is a child of the li created above (listItemEl)
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add content to the div containter
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";
    
    //append div to li element
    listItemEl.appendChild(taskInfoEl);
    
    //returns a div containing the buttons and a selector
    var taskActionsEl = createTaskActions(taskIdCounter);
    //append div to li element
    listItemEl.appendChild(taskActionsEl);

    //append li to ul element
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++;
}

var createTaskActions = function (taskId) {
    //this div will contain the buttons
    var actionContainerEl= document.createElement ("div");
    actionContainerEl.className = "task-actions";
    
    var editButtonEl = document.createElement ("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement ("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute ("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    
    //create empty select
    var statusSelectEl = document.createElement ("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    //create array of options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i= 0; i <statusChoices.length; i++) {
        //create option element proper
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent= statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to the empty select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};

var taskButtonHandler = function (event){
    console.log(event.target);
    //event.target reports the element on with the event occurs
    if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    if (event.target.matches(".edit-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        
        editTask(taskId);
    }
};

var deleteTask = function (taskId) {
    //find an li (.task-item) element with a #data-task-id == taskId
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+ "']");
    taskSelected.remove();
};

var editTask = function (taskId){
    var functionSelected= document.querySelector ("select[data-task-id='"+taskId+"']");
    var taskSelected = document.querySelector (".task-item[data-task-id='"+taskId+"']");
    //changes text on buttong from 'add task' to 'save task' to indicate we are in edit mode
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
    console.log (functionSelected.value);
    console.log(taskSelected);
    
};

var completeEditTask = function (taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var changeStatus = function (event){
    
        // get the task item's id
        var taskId = event.target.getAttribute("data-task-id");
      
        // get the currently selected option's value and convert to lowercase
        var statusValue = event.target.value;
      
        // find the parent task item element based on the id
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "To Do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    if (statusValue==="In Progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue==="Completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
    
};


//event handlers
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);

//change event triggers any time a form element's value changes
pageContentEl.addEventListener("change", changeStatus);

