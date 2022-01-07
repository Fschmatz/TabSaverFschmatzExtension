const inputBtn = document.getElementById("input-btn")
const clearListBtn = document.getElementById("clearList-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const saveTabBtn = document.getElementById("tab-btn")
const deleteItemBtn = document.getElementById("deleteItem-btn")


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
            <button id="deleteItem-btn" class="btn"><i class="fa fa-trash fa-lg"></i></button>
        </div>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}

//DELETE SOMENTE COM DUPLO CLICK NO ICON
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

deleteItemBtn.addEventListener("click", function (){
    //myLeads.removeItem(id)
    localStorage.removeItem(id)
    render(myLeads)
})



/*inputBtn.addEventListener("click", function () {
    if(inputEl.value){
        myLeads.push(inputEl.value)
        //save
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        inputEl.value = ""
    }
})*/

//6h 46m