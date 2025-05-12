function  makeProject(title, dueDate, toDoList, notes){
    let numToDosRemaining = toDoList.length;

    return {title, dueDate, toDoList, numToDosRemaining, notes}
}

function makeToDo(title, dueDate, priority, notes, project){
    let isFinished = false;

    return{title, dueDate, priority, notes, project, isFinished}
}

function newProjectDOM(project){
    const projectDiv = document.getElementById('projects');
    const numProjects = projectDiv.childElementCount;
    const projectClass = 'project'+numProjects;

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
    numToDosRemaining.textContent = project.numToDosRemaining;
    numToDosRemaining.classList.add('numToDosRemaining', 'project', projectClass);
    const notes = document.createElement('p');
    notes.textContent = project.notes;
    notes.classList.add('notes', 'project', projectClass);

    const addToDoButton = document.createElement('button');
    addToDoButton.classList.add('addToDo', projectClass)
    addToDoButton.textContent = 'Add task';
    
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
    let toDoListClass = toDo.project + " toDoList";
    const projectToDoList = document.getElementsByClassName(toDoListClass)[0];

    const numToDos = projectToDoList.childElementCount;
    const toDoClass = 'toDo'+numToDos;
    const newToDo = document.createElement('div');
    newToDo.classList.add('toDoEntry');
    newToDo.id = toDoClass;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox', 'toDo', toDoClass);
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

    newToDo.append(checkbox)
    newToDo.appendChild(title);
    newToDo.appendChild(dueDate);
    newToDo.appendChild(priority);
    newToDo.appendChild(notes);
    projectToDoList.appendChild(newToDo);
}

myToDos = [];
myToDos.push(makeToDo('Clean', 'tomorrow', 'high', 'NA', 'project0'))
myToDos.push(makeToDo('Clean', 'tomorrow', 'high', 'NA', 'project0'))
myToDos.push(makeToDo('Clean', 'tomorrow', 'high', 'NA', 'project0'))
myToDos.push(makeToDo('Clean', 'tomorrow', 'high', 'NA', 'project0'))

project1 = makeProject('Best Project', 'May', myToDos, 'This is the best project ever.');
newProjectDOM(project1);