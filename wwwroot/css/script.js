// UI vars 

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();

// call event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);
    taskList.addEventListener('click',ustunuciz);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

// get items from Local Storage
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);   
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}


function createItem(text) {
    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    const a2 = document.createElement('a');
    a2.className = 'okey-item float-right mr-3';
    a2.setAttribute('href', '#');
    a2.innerHTML = '<i class="fas fa-check unactive"></i>';
    // add a to li
    li.appendChild(a);
    li.appendChild(a2);
    if( text.charAt(0) == '+' )
        {
            li.style.textDecoration="line-through";
            li.style.backgroundColor="#48a219";
            a2.style.display="none";
        }


    // add li to ul
    taskList.appendChild(li);

}

// add new item
function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }

    // create item
    createItem(input.value);

    // save to LS
    setItemToLS(input.value);

    // clear input
    input.value = '';

    e.preventDefault();

}

// delete an item
function deleteItem(e) {   
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure ?')) {
           e.target.parentElement.parentElement.remove();
           
            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function ustunuciz(e){  
    
    if (e.target.className == 'fas fa-check unactive') {
        if (confirm('Are you done?')) {
           e.target.parentElement.parentElement.style.textDecoration="line-through";  
           e.target.parentElement.parentElement.style.backgroundColor="#48a219";  
           e.target.style.display="none";
           e.target.className = 'fas fa-check active';
           
            text = e.target.parentElement.parentElement.textContent;
           items = getItemsFromLS();
             items.forEach(function(item,index){
                if(item === text){
                    text = "+" + text;
                    e.target.parentElement.parentElement.textContent=text;
                    items.splice(index,1,text);   
                 }
                });
    localStorage.setItem('items',JSON.stringify(items));
                            
        }
    }
    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {

    if (confirm('are you sure ?')) {
        // taskList.innerHTML='';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}