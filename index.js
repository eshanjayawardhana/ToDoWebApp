"use strict";

const addButton = document.querySelector(".add-button");
const taskCard = document.querySelector(".task-card");
const compCard = document.querySelector(".comp-card");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const del = document.querySelector(".delete-modal");

/////FOR-TASK-EDIT//////
let isEditing = false;
let currentEvent = null;


////////////ADD-TASK-FUNTION////////////////////////
function addTask() {
  const taskName = document.querySelector(".txt").value; // Replace the text placeholder
  const taskTime = document.querySelector(".time").value; // Replace the time placeholder

  //////FOR-AJAX pattern////////////////////////
  const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{1,30}$/;
  const isEmpty = pattern.test(taskName);
 


  if (!isEmpty) {
    alert("Please fill out correctly the task name field! 😀");
    return;
  }else if(isEditing){
currentEvent.querySelector('.task-name').textContent = taskName;
currentEvent.querySelector('.task-time').textContent = taskTime;
isEditing=false;
currentEvent=null;
addButton.value='ADD';
document.querySelector('.txt').value='';
document.querySelector('.time').value='';




  }else {
    /* CREATE-THE-TASK-ELEMENTS */
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // <img src="t1.png" class="complete-button"> add img for complete place
    taskDiv.innerHTML = `
        
          <img src="icon/t1.png" class="complete-button buttons" title="Make as complete">
          <h3 class="task-name">${taskName}</h3>
          <h3 class="task-time">${taskTime}</h3>   
          
          <img src="icon/star.png" class="star-button buttons" title="Make as important">
          <img src="icon/pen.png" class="edit-button buttons" title="Edit task">
          <img src="icon/delete.png" class="delete-button buttons" title="Delete task">
          <br><br>
        `;

    taskCard.appendChild(taskDiv);

    document.querySelector(".txt").value = "";
    document.querySelector(".time").value = "";

    taskDiv
      .querySelector(".complete-button")
      .addEventListener("click", completeTask);
    taskDiv.querySelector(".star-button").addEventListener("click", starTask);
    taskDiv.querySelector(".edit-button").addEventListener("click", editTask);
    taskDiv
      .querySelector(".delete-button")
      .addEventListener("click", deleteTask);
  }
}
////////////////COMPLETE-TASK-FUNTION////////////////////<for Task goes to the Completed catogory>
function completeTask(e) {
  const taskEv = e.target.parentElement; ////select the parent element of the element that triggered the event
  const taskName = taskEv.querySelector(".task-name").textContent; // selecting the current Div name
  const taskTime = taskEv.querySelector(".task-time").textContent; // selecting the current Div time
  /* CREATE-THE-COMPLETION-ELEMENTS */
  const compDiv = document.createElement("div");
  compDiv.classList.add("completed-task"); //add completed-task class

  compDiv.innerHTML = `
        <h3 class="comp-name"><strike>${taskName}</strike></h3>
        <h3 class="comp-time"><strike>${taskTime}</strike></h3>
        
        <img src="icon/back.png" class="back-button buttons" title="Back to task">
        <img src="icon/delete.png" class="delete-button buttons" title="Delete completed task">
      `;

  compCard.appendChild(compDiv); //Added to the completed task into completed catogory!
  taskEv.remove(); //after add the task Remove the Current Div element

  compDiv.querySelector(".back-button").addEventListener("click", backToTask); //select & call the back to task
  compDiv
    .querySelector(".delete-button")
    .addEventListener("click", deleteCompTask); //select & call the delete comp task
}

/////////BACK-TO-TASK-FUNTION///////////////////////
function backToTask(e) {
  const taskEv = e.target.parentElement; //select the parent element of the element that triggered the event
  const compName = taskEv.querySelector(".comp-name").textContent;
  const compTime = taskEv.querySelector(".comp-time").textContent;

  /* When you move a task back to the task list, 
      you need to recreate the task element and reattach the event listeners */
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  taskDiv.innerHTML = `
        <img src="icon/t1.png" class="complete-button buttons">
         <h3 class="task-name">${compName}</h3>
         <h3 class="task-time">${compTime}</h3> 

         <img src="icon/star.png" class="star-button buttons">
          <img src="icon/pen.png" class="edit-button buttons">
          <img src="icon/delete.png" class="delete-button buttons">
         <br><br>
       `;

  taskCard.appendChild(taskDiv);
  taskEv.remove();
  taskDiv
    .querySelector(".complete-button")
    .addEventListener("click", completeTask);
  taskDiv.querySelector(".star-button").addEventListener("click", starTask);
  taskDiv.querySelector(".edit-button").addEventListener("click", editTask);
  taskDiv.querySelector(".delete-button").addEventListener("click", deleteTask);
}

///////////////DELETE-COMP-TASK-FUNTION//////////////////
function deleteCompTask(e) {
  const taskEv = e.target.parentElement;
  taskEv.remove();
}

///////////////STAR-TASK-FUNTION/////////////////////////
function starTask(e) {
  const taskEv = e.target.parentElement.classList.toggle("star");
}

///////////////EDIT-TASK-FUNTION/////////////////////////
function editTask(e) {
  const taskEv = e.target.parentElement;
  document.querySelector('.txt').value=taskEv.querySelector('.task-name').textContent;
  document.querySelector('.time').value=taskEv.querySelector('.task-time').textContent;
    currentEvent = taskEv;
    isEditing=true;
    addButton.value='UPDATE';

}

/////////DELETE-TASK-FUNTION/////////////////////
function deleteTask(e) {
  modal.classList.remove("hidden"); //Remove the hidden class of modal
  overlay.classList.remove("hidden"); //Remove the hidden class of overlay
  del.addEventListener("click", function () {
    e.target.parentElement.remove(); //when delete-modal button pressed current dev Element Removed!
  });
}

////////CLOSE-MODEL////////////////////<Remove the modal>
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
btnCloseModal.addEventListener("click", closeModal); //if pressed ❌ remove the modal!
overlay.addEventListener("click", closeModal); //if pressed BLUR-BACKGOUND remove the modal!
del.addEventListener("click", closeModal); //if pressed modals delete then remove the modal!

addButton.addEventListener("click", addTask); // Call the add task funtion when add button clicked!

///////// THME-TOGGLE-FUNTION /////////////////////

const icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "icon/sun.png";
  } else {
    icon.src = "icon/moon.png";
  }
};
