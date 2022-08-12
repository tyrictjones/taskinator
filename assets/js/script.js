var formEl = document.querySelector('#task-form'); //select entire top form as an object
var tasksToDoEl = document.querySelector('#tasks-to-do'); //select empty ul as an object to add to later


var createTaskHandler = function() {

    event.preventDefault(); //prevent default behaviour of page automatically refreshind and erasing the new list item

    var taskNameInput = document.querySelector('input[name="task-name"]').value; //would also work without selecting the name since this is currently the only input element
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;

    //create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement('div');
    //give the new div a class name
    taskInfoEl.className = 'task-info';
    //add HTML content to div
    taskInfoEl.innerHTML = '<h3 class = "task-name">' + taskNameInput + '</h3><span class = "task-type">' + taskTypeInput + '</span>';

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}; //end of function to create add new item list on enter or submit button click

formEl.addEventListener('submit', createTaskHandler);
