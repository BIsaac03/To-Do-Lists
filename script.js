let projects = [];

function makeProject(general){
    let projectNum = projects.length;

    let title = "General";
    let dueDate = "Unspecified";
    let notes = "Tasks unrelated to any other project";
    
    if (!general){
        title = prompt("Project Name: ");
        dueDate = prompt("Due Date: ");
        notes = prompt("Additional Notes: ")
    }

    return {title, dueDate, toDoList: [], numToDosRemaining: 0, notes, projectNum}
}

function makeToDo(project){
    project.numToDosRemaining += 1;

    const title = prompt("Task Title: ");
    const dueDate = prompt("Due Date: ");
    const priority = prompt("Priority: ");
    const notes = prompt("Additional Notes:");
    
    const changeStatus = () => {
        isFinished = ! isFinished;
        if (isFinished){
            project.numToDosRemaining - 1;
        }
        else{project.numToDosRemaining + 1;}
    }
    return{title, dueDate, priority, notes, project, isFinished: false, changeStatus}
}

function removeToDo(toDo){
    const index = toDo.project.toDoList.indexOf(toDo)
    toDo.project.toDoList.splice(index, 1);
    if (!toDo.isFinished){
        toDo.project.numToDosRemaining -= 1;
    }
}

function newProjectDOM(project){
    const projectDiv = document.getElementById('projects');
    const projectClass = 'project'+project.projectNum;

    const newProject = document.createElement('div');
    newProject.id = projectClass;
    newProject.classList.add('projectEntry');

    const title = document.createElement('p');
    title.textContent = project.title;
    title.classList.add('title', 'project', projectClass);
    const dueDate = document.createElement('p');
    dueDate.textContent = project.dueDate;
    dueDate.classList.add('dueDate', 'project', projectClass);
    const toDoList = document.createElement('div');
    toDoList.classList.add('toDoList', 'project', projectClass);
    const numToDosRemaining = document.createElement('p');
    numToDosRemaining.textContent = 0;
    numToDosRemaining.classList.add('numToDosRemaining', 'project', projectClass);
    const notes = document.createElement('p');
    notes.textContent = project.notes;
    notes.classList.add('notes', 'project', projectClass);

    const addToDoButton = document.createElement('button');
    addToDoButton.classList.add('addToDo', projectClass);
    addToDoButton.textContent = 'Add task';
    addToDoButton.addEventListener("click", () => {
        let toDo = makeToDo(project);
        newToDoDOM(toDo);
    })
    
    newProject.appendChild(title);
    newProject.appendChild(dueDate);
    newProject.appendChild(toDoList);
    newProject.appendChild(numToDosRemaining);
    newProject.appendChild(notes);
    newProject.appendChild(addToDoButton);
    projectDiv.appendChild(newProject);

    for (let i = 0; i < project.toDoList.length; i++){
        newToDoDOM(project.toDoList[i]);
    }
}

function newToDoDOM(toDo){
    let toDoListClass = "project" + toDo.project.projectNum + " toDoList";
    const projectToDoList = document.getElementsByClassName(toDoListClass)[0];

    let numToDosRemainingClass = "project" + toDo.project.projectNum + " numToDosRemaining";
    const numToDosRemaining = document.getElementsByClassName(numToDosRemainingClass)[0];
    numToDosRemaining.textContent = parseInt(numToDosRemaining.textContent) + 1;

    const numToDos = projectToDoList.childElementCount;
    const toDoClass = 'toDo'+numToDos;
    const newToDo =  document.createElement('div');
    newToDo.classList.add('toDoEntry');
    newToDo.id = toDoClass;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox', 'toDo', toDoClass);
    checkbox.addEventListener('change', () =>{
        toDo.changeStatus()
        if (checkbox.checked){
            numToDosRemaining.textContent = parseInt(numToDosRemaining.textContent) - 1;
        }
        else{numToDosRemaining.textContent = parseInt(numToDosRemaining.textContent) + 1;}
    });

    const title = document.createElement('span');
    title.textContent = toDo.title;
    title.classList.add('title', 'toDo', toDoClass);
    const dueDate = document.createElement('span');
    dueDate.textContent = toDo.dueDate;
    dueDate.classList.add('dueDate', 'toDo', toDoClass);
    const priority = document.createElement('span');
    priority.textContent = toDo.priority;
    priority.classList.add('priority', 'toDo', toDoClass);
    const notes = document.createElement('span');
    notes.textContent = toDo.notes;
    notes.classList.add('notes', 'toDo', toDoClass);

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './icons/trash-can-outline.svg';
    deleteIcon.classList.add('delete', toDoClass);
    deleteIcon.addEventListener('click', () => {
        removeToDo(toDo);
        removeToDoDOM(newToDo, projectToDoList, checkbox, numToDosRemaining);
    })

    newToDo.append(checkbox)
    newToDo.appendChild(title);
    newToDo.appendChild(dueDate);
    newToDo.appendChild(priority);
    newToDo.appendChild(notes);
    newToDo.appendChild(deleteIcon);
    projectToDoList.appendChild(newToDo);
}

function removeToDoDOM(toDo, projectToDoList, checkbox, numToDosRemaining){
    projectToDoList.removeChild(toDo);
    if (!checkbox.checked){
        numToDosRemaining.textContent = parseInt(numToDosRemaining.textContent) - 1;
    }
}

const addProjectButton = document.getElementById('newProject');
addProjectButton.addEventListener("click", () => {
    const newProject = makeProject(false);
    projects.push(newProject);
    newProjectDOM(newProject);
});
    
const deleteCheckedButton = document.getElementById('deleteChecked');
deleteCheckedButton.addEventListener("click", () => {
    for (let i = 0; i < projects.length; i++){
        for (let j = 0; j < projects[i].toDoList.length; j++){
            if (projects[i].toDoList[j].isFinished){
                removeToDo(projects[i].toDoList[j]);
            };
        }
    }

    const allChecks = document.querySelectorAll('.checkbox');
    for (let i = 0; i < allChecks.length; i++){
        if (allChecks[i].checked){
            allChecks[i].parentElement.parentElement.removeChild(allChecks[i].parentElement)
        }
    }
});

let generalProject = makeProject(true);
projects.push(generalProject);
newProjectDOM(generalProject);