var pageContentEl = document.querySelector('#page-content');

var taskIdCounter = 0;

var formEl = document.querySelector('#task-form'); //select entire top form as an object
var tasksToDoEl = document.querySelector('#tasks-to-do'); //select empty ul as an object to add to later
var tasksInProgressEl = document.querySelector('#tasks-in-progress');
var tasksCompletedEl = document.querySelector('#tasks-completed');


var taskFormHandler = function() {

    event.preventDefault(); //prevent default behaviour of page automatically refreshind and erasing the new list item

    var taskNameInput = document.querySelector('input[name="task-name"]').value; //would also work without selecting the name since this is currently the only input element
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    //check to see if the form elements have been edited, i.e. do they have the data-task-id attribute
    var isEdit = formEl.hasAttribute('data-task-id');

    //has data-task-id attribute, so get task id and call function to complete edit
    if (isEdit) {
        var taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //otherwise create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
    };
    createTaskEl(taskDataObj);
    }
   

    formEl.reset();
    
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
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches('.edit-btn')) {
        var taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }

    //delete button was clicked
    else if (targetEl.matches('.delete-btn')) {
        //get the element's task ID if there is a match
        var taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    //get task list item element
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');

    //get content from task name and type
    var taskName = taskSelected.querySelector('h3.task-name').textContent;
    var taskType = taskSelected.querySelector('span.task-type').textContent;
    
    document.querySelector('input[name="task-name"]').value = taskName;
    document.querySelector('select[name="task-type"]').value = taskType;

    document.querySelector('#save-task').textContent = 'Save Task';

    formEl.setAttribute('data-task-id', taskId);
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]'); //not having a space between the two attributes ensure we choose the element that has both, not a .data-task-id inside a .task-item
    taskSelected.remove();
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task list item
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');

    //set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    window.alert('Task Updated');

    //reset the form by removing the task id and change the button back to normal
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = 'Add Task';
};

var taskStatusChangeHandler = function(event) {
    //get the task item id
    var taskId = event.target.getAttribute('data-task-id');

    //get the selected option's value
    var statusValue = event.target.value.toLowerCase();

    //find the parent element based on the id
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');

    if (statusValue === 'to do') {
        tasksToDoEl.appencChild(taskSelected);
    }
    else if (statusValue === 'in progress') {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === 'completed') {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);