// Selectors
const inpTask = document.querySelector("input#inpTask");
const taskList = document.querySelector("ul.taskList");
const taskForm = document.querySelector("form.taskForm");

// Vars And Const
let items;
if (localStorage.getItem("items") === null){
    items = [];
} else {
    items = JSON.parse(localStorage.getItem("items"));
}


// Event Listeners
taskForm.addEventListener("submit", addItem)
taskList.addEventListener("click", taskEvent);
document.addEventListener("DOMContentLoaded", loadItems);

// functions

function addItem(e){
    e.preventDefault()
    if (inpTask.value == "") {
        return
    }
    
    // Create the DIV
    var taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv")

    // Create the LI
    var taskLi = document.createElement("li");
    taskLi.classList.add("taskLi");
    taskLi.innerText = inpTask.value;
    taskDiv.appendChild(taskLi);

    // Create the Check Button
    var checkBtn = document.createElement("button");
    checkBtn.classList.add("checkBtn");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    taskDiv.appendChild(checkBtn);
    
    // Create the Erase Button
    var eraseBtn = document.createElement("button");
    eraseBtn.classList.add("eraseBtn");
    eraseBtn.innerHTML = '<i class="fas fa-trash"></i>';
    taskDiv.appendChild(eraseBtn);

    // save item
    items.push(taskLi.innerText);
    localStorage.setItem("items", JSON.stringify(items))

    taskList.appendChild(taskDiv);
    inpTask.value = "";
}

function loadItems(){
    items.forEach(function(item){
        // Create the DIV
        var taskDiv = document.createElement("div");
        taskDiv.classList.add("taskDiv")

        // Create the LI
        var taskLi = document.createElement("li");
        taskLi.classList.add("taskLi");
        taskLi.innerText = item;
        taskDiv.appendChild(taskLi);

        // Create the Check Button
        var checkBtn = document.createElement("button");
        checkBtn.classList.add("checkBtn");
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        taskDiv.appendChild(checkBtn);
        
        // Create the Erase Button
        var eraseBtn = document.createElement("button");
        eraseBtn.classList.add("eraseBtn");
        eraseBtn.innerHTML = '<i class="fas fa-trash"></i>';
        taskDiv.appendChild(eraseBtn);

        taskList.appendChild(taskDiv);
    });
}

function taskEvent(e){
    const item = e.target;
    const itemDiv = item.parentElement;

    if (item.classList[0] == "eraseBtn") {
        itemDiv.style.opacity = "0";
        itemDiv.addEventListener("transitionend", function(){
            let itemIndex = items.indexOf(itemDiv.children[0].innerText);

            console.log(items, itemIndex);
            items.splice(itemIndex, 1);
            console.log(items);
            localStorage.setItem("items", JSON.stringify(items));
            itemDiv.remove();
        })
    } else if (item.classList[0] == "checkBtn") {
        
        itemDiv.classList.toggle("checked");


        if (itemDiv.classList[1] == "checked") {
            item.innerHTML = '<i class="fas fa-redo"></i>';
        } else {
            item.innerHTML = '<i class="fas fa-check"></i>';
        }
    }

}
