var pageContentEl = document.querySelector('#page-content');

var taskIdCounter = 0;

var formEl = document.querySelector('#task-form'); //select entire top form as an object
var tasksToDoEl = document.querySelector('#tasks-to-do'); //select empty ul as an object to add to later


var taskFormHandler = function() {

    event.preventDefault(); //prevent default behaviour of page automatically refreshind and erasing the new list item

    var taskNameInput = document.querySelector('input[name="task-name"]').value; //would also work without selecting the name since this is currently the only input element
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;

    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}; //end of function to create add new item list on enter or submit button click


var createTaskEl = function(taskDataObj) {
    //create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    //add task id as a custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement('div');
    //give the new div a class name
    taskInfoEl.className = 'task-info';
    //add HTML content to div
    taskInfoEl.innerHTML = '<h3 class = "task-name">' + taskDataObj.name + '</h3><span class = "task-type">' + taskDataObj.type + '</span>';
    //add div (with new h3 and span elements) to li element
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    //create edit button
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //create status dropdown
    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);
    //create options in select element; could write it out three times but a loop works too
    var statusChoices = ['To Do', 'In Progress', 'Completed'];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement('option')
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formEl.addEventListener('submit', taskFormHandler);

var taskButtonHandler = function(event) {
    if (event.target.matches('.delete-btn')) {
        //get the element's task ID if there is a match
        var taskId = event.target.getAttribute('data-task-id');
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]'); //not having a space between the two attributes ensure we choose the element that has both, not a .data-task-id inside a .task-item
    taskSelected.remove();
};

pageContentEl.addEventListener('click', taskButtonHandler);