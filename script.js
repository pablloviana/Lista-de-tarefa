let tasksContainer = document.querySelector('.tasksContainer');
let taskContainer = document.querySelector('.inputContainer .forms .taskContainer');
let taskInput = document.querySelector('.inputContainer .forms .taskContainer #taskInput');
let searchContainer = document.querySelector('.inputContainer .forms .searchContainer');
let searchInput = document.querySelector('.inputContainer .forms .searchContainer #searchInput');
let filterContainer = document.querySelector('.inputContainer .forms .filterContainer');
let cont = 0;
let taskList = Array();


function CreateTask(taskInputValue){
    cont++;

    const task = document.createElement("div");
    task.classList.add("task");
    task.id = cont;
    
    const pTask = document.createElement("p")
    pTask.innerText = taskInputValue;

    const buttonOptions = document.createElement("div");
    buttonOptions.classList.add("buttonOptions");

    const checkButton = document.createElement("button");
    checkButton.classList.add("checkButton");

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");

    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");

    tasksContainer.appendChild(task);
    task.appendChild(pTask);
    task.appendChild(buttonOptions);
    buttonOptions.appendChild(checkButton);
    buttonOptions.appendChild(editButton);
    buttonOptions.appendChild(removeButton);
    taskList.push(task);
}

//método de check ou uncheck em tarefa
function Check(pButton){
    if(pButton.classList.contains("check")){
        pButton.classList.remove("check");
    } else{
        pButton.classList.add("check");
    }
}

//editar pButton

function Edit(task){
    let p = task.querySelector("p");
    p.contentEditable = true;
}

//método de remover
function Romove(pButton){
    pButton.remove();
}

function Search(searchInput){
    let textSearch = searchInput.value;
    for(let i = 0; i < cont; i++){
        taskP = taskList[i].querySelector('p');
        if(taskP.innerText.includes(textSearch) == false){
            taskList[i].classList.add("filtrado");
        }
    };
}

function UnSearch(){
    for(let i = 0; i < cont; i++){
        if(taskList[i].classList.contains("filtrado")){
            taskList[i].classList.remove("filtrado");
        }
    };
}



taskContainer.addEventListener("submit", (event)=>{
    event.preventDefault();
    if(taskInput){
        CreateTask(taskInput.value);
        taskInput.value = "";
    }
});

tasksContainer.addEventListener("click", (event)=>{
    if(!event.target.closest(".buttonOptions")){
        return true;
    }
    let buttonOptions = event.target.closest(".buttonOptions"); 
    let pButton = buttonOptions.closest(".task");
    if(event.target.classList.contains("checkButton")){
        Check(pButton);
    } else if(event.target.classList.contains("editButton")){
        Edit(pButton);
    } else if(event.target.classList.contains("removeButton")){
        Romove(pButton);
    }
})




searchContainer.addEventListener("submit", (event)=>{
    event.preventDefault();
    let button = searchContainer.querySelector("button");

    if(searchInput != ""){
        Search(searchInput);
        button.style.backgroundImage = "url(imgs/addition.svg)";
        button.style.transform = "rotate(45deg)";
    }
});

searchContainer.addEventListener("click", ()=>{
    let button = searchContainer.querySelector("button");
    button.style.backgroundImage = "url(imgs/search.svg)";
    button.style.transform = "rotate(0deg)";
    UnSearch();
});

searchContainer.querySelector("button").addEventListener("click", ()=>{
    let button = searchContainer.querySelector("button");
    let img = searchContainer.querySelector("button").style.backgroundImage;
    if(img == 'url("imgs/addition.svg")'){
        button.style.backgroundImage = "url(imgs/search.svg)";
        console.log(searchContainer.querySelector("button").style.backgroundImage);
        button.style.transform = "rotate(0deg)";
        searchInput.value = "";
    }
});

filterContainer.querySelector("#filterSelect").addEventListener("change", (event)=>{
    
    let filterValue =  filterContainer.querySelector("#filterSelect").value;

    for(let i = 0; i < cont; i++){
        taskList[i].style.display = "flex";
    }

    for(let i = 0; i < cont; i++){
        if (filterValue == "all"){
            taskList[i].style.display = "flex";
        } else if(taskList[i].classList.contains("check") && filterValue == "toDo"){
            taskList[i].style.display = "none";
        } else if(taskList[i].classList.contains("check") == false && filterValue == "check"){
            taskList[i].style.display = "none";
        }
    }
})