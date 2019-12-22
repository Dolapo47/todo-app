let trBody = document.getElementById("trbody");
let error = document.getElementById("error");
function resetError() {
  setTimeout(() => {
    error.innerHTML = "";
  }, 2000);
}
function addTodo(event) {
  event.preventDefault();
  let input = document.getElementById("input").value;
  let errorMessage = "Kindly fill in the field";
  if (input === "") {
    error.innerHTML = errorMessage;
    return resetError();
  }
  const list = JSON.parse(localStorage.getItem('todos')) || []
    
    const time = new Date();
    const todo = {}
    todo["time"] = time
    todo["text"] = input
    list.push(todo)
    localStorage.setItem("todos", JSON.stringify(list)); 
    location.reload();
}

function getTodo() {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    todos.forEach((todo, i) => {
    trBody.innerHTML += `
    <tr>
        <td scope="row">${i + 1}</td>
        <td>${todo.text}</td>
        <td>${todo.time}</td>
        <td>
          <button class="ml-3 btn btn-primary" onClick =editItem(event) id="${todo.time}">Edit</button>
          <button class="ml-3 btn btn-danger" onClick =deleteItem(event) id="${todo.time}">Delete</button>
        </td>
      </tr>`
  })
}
getTodo();

function deleteItem(event) {
  let prompt = confirm("Are you sure you want to delete this todo item");
  if (prompt) {
    const newTodos = JSON.parse(localStorage.getItem('todos')) || []
    const index = newTodos.findIndex(todo => todo.time == event.target.id)
    newTodos.splice(index,1)
    localStorage.setItem("todos", JSON.stringify(newTodos)); 
  }
  location.reload();
}

function editItem(e) {
  e.preventDefault();
  document.getElementById("button").innerText = "Save";
  const newTodos = JSON.parse(localStorage.getItem('todos')) || []
  const index = newTodos.findIndex(todo => todo.time == event.target.id)
  document.getElementById('input').value = newTodos[index].text
  newTodos.splice(index,1)
  localStorage.setItem("todos", JSON.stringify(newTodos)); 
}

function search(e){
    // let term = document.getElementById('search').value.toLowerCase();
    const todos = JSON.parse(localStorage.getItem('todos')) || []

    const todoList = todos.filter(todo => {
      return todo.text.toLowerCase().startsWith(e.target.value.toLowerCase())
    })

    //localStorage.setItem("items", JSON.stringify(todoList)); 
console.log(todoList);
trBody.innerHTML = ''

todoList.forEach((todo, i) => {
    trBody.innerHTML += `
    <tr>
        <td scope="row">${i + 1}</td>
        <td>${todo.text}</td>
        <td>${todo.time}</td>
        <td>
          <button class="ml-3 btn btn-primary" onClick =editItem(event) id="${todo.time}">Edit</button>
          <button class="ml-3 btn btn-danger" onClick =deleteItem(event) id="${todo.time}">Delete</button>
        </td>
      </tr>`
        
    });
}
