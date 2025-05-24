function loadTasksfromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(element => {
        const li = document.createElement("li");
        li.innerText = element.text;
        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.setAttribute("class","deletebtn");
        deletebtn.addEventListener("click",function() {
        this.parentElement.remove();
        savetoLocalStorage();
    });
        const editbtn = document.createElement("button");
        editbtn.textContent = "Edit";
        editbtn.addEventListener("click",function() {
        let li = this.parentElement;
        let newTask = prompt("Edit Task:",li.firstChild.textContent.trim());
        if(newTask) {
            li.firstChild.textContent =newTask;
            savetoLocalStorage();
        }
    });

        const mark = document.createElement("input");
        mark.type = "checkbox";
        mark.addEventListener("change",function() {
        if(this.checked){
            this.parentElement.style.textDecoration = "line-through";
        }
        else {
            this.parentElement.style.textDecoration = "none";
        }
        savetoLocalStorage();
    });

    li.appendChild(mark);
    li.appendChild(deletebtn);
    li.appendChild(editbtn);

    document.getElementById("taskList").appendChild(li);
});
}
function savetoLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text:li.firstChild.textContent.trim(),
            completed:li.querySelector("input[type='checkbox']").checked
        });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function add() {
    const taskinput = document.getElementById("taskInput");
    const tasktext = taskinput.value.trim();
    if(!tasktext) return;

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.push({text:tasktext,completed:false});

    localStorage.setItem("tasks",JSON.stringify(tasks));

    taskinput.value = "";
    document.getElementById("taskList").innerHTML = " ";
    loadTasksfromLocalStorage();
}
window.onload = function() {
    loadTasksfromLocalStorage();
}