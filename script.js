function  makeProject(title, dueDate, toDos){
    let numToDosRemaining = toDos.length;

    return {title, dueDate, toDos, numToDosRemaining}
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

    const title = document.createElement('p');
    title.textContent = project.title;
    title.classList.add('title', 'project', projectClass);
    const dueDate = document.createElement('p');
    dueDate.textContent = project.dueDate;
    dueDate.classList.add('dueDate', 'project', projectClass);
    const toDos = document.createElement('div');
    toDos.classList.add('toDos', 'project', projectClass);
    const numToDosRemaining = document.createElement('p');
    numToDosRemaining.textContent = project.numToDosRemaining;
    numToDosRemaining.classList.add('numToDosRemaining', 'project', projectClass);
    const notes = document.createElement('p');
    notes.textContent = project.notes;
    notes.classList.add('notes', 'project', projectClass);

    const addToDoButton = document.createElement('button');
    addToDoButton.classList.add('addTodo', projectClass)
    addToDoButton.textContent = 'Add task';
    
    newProject.appendChild(title);
    newProject.appendChild(dueDate);
    newProject.appendChild(toDos);
    newProject.appendChild(notes);
    newProject.appendChild(addToDoButton);
    projectDiv.appendChild(newProject);

    for (let i = 0; i < project.toDos.length; i++){
        newToDoDOM(project.toDos[i]);
    }
}

function newToDoDOM(toDo){
    let toDoListClass = toDo.project + " toDos";
    const projectToDoList = document.getElementsByClassName(toDoListClass)[0];

    const numToDos = projectToDoList.childElementCount;
    const toDoClass = 'ToDo'+numToDos;
    const newToDo = document.createElement('div');
    newToDo.id = toDoClass;

    const title = document.createElement('p');
    title.textContent = toDo.title;
    title.classList.add('title', 'toDo', toDoClass);
    const dueDate = document.createElement('p');
    dueDate.textContent = toDo.dueDate;
    dueDate.classList.add('dueDate', 'toDo', toDoClass);
    const priority = document.createElement('p');
    priority.textContent = toDo.priority;
    priority.classList.add('priority', 'toDo', toDoClass);
    const notes = document.createElement('p');
    notes.textContent = toDo.notes;
    notes.classList.add('notes', 'toDo', toDoClass);
    const isFinished = document.createElement('p');
    isFinished.textContent = toDo.isFinished;
    isFinished.classList.add('isFinished', 'toDo', toDoClass);

    newToDo.appendChild(title);
    newToDo.appendChild(dueDate);
    newToDo.appendChild(priority);
    newToDo.appendChild(notes);
    newToDo.appendChild(isFinished);
    projectToDoList.appendChild(newToDo);
}

myToDos = [];
myToDos.push(makeToDo('Clean', 'tomorrow', 'high', 'NA', 'project0'))
project1 = makeProject('Best Project', 'May', myToDos);
newProjectDOM(project1);