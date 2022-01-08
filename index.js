const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el") //usado pra anotar

const clearListBtn = document.getElementById("clearList-btn")
let myLeads = []
const ulEl = document.getElementById("ul-el")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const saveTabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//EXIBIR LISTA
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
        <div id="listItem">
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
           <button id="deleteItem-btn${[i]}" class="box" ><i class="fa fa-trash fa-lg"></i></button>        
        </div>
        </li>
        `
    }
    ulEl.innerHTML = listItems



    let buttons = document.querySelectorAll(".box");

    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", deleteItemFromLeads);
    }
}

//DELETE ALL SOMENTE COM DUPLO CLICK NO ICON
clearListBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//SALVAR TAB ATUAL
saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


//document.getElementById("deleteItem-btn").addEventListener("click", deleteItemFromLeads)


function deleteItemFromLeads(evt) {

    let itemToDelete = evt.currentTarget.valueOf().id
    let x = itemToDelete.replace('deleteItem-btn','');
    console.log(x)

    myLeads.splice(x,1)
    //leadsFromLocalStorage.remove(x)
    render(myLeads)
}


//onclick="deleteItemFromLeads(${leads[i]})"
/*inputBtn.addEventListener("click", function () {
    if(inputEl.value){
        myLeads.push(inputEl.value)
        //save
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        inputEl.value = ""
    }
})*/
