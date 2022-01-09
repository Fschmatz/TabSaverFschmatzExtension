const clearListBtn = document.getElementById("clearList-btn")
let myLinks = []
const ulEl = document.getElementById("ul-el")
let linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))
const saveTabBtn = document.getElementById("tab-btn")

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

//EXIBIR LISTA
function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += `
        <li>
        <div id="listItem">
            <a target='_blank' href='${links[i].split(';')[0]}'>
                ${links[i].split(';')[1]}
            </a>
           <button id="deleteItem-btn${[i]}" class="box" ><i class="fa fa-trash fa-lg"></i></button>        
        </div>
        </li>
        `
    }
    ulEl.innerHTML = listItems

    let buttons = document.querySelectorAll(".box");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", deleteItemFromLinks);
    }
}

//DELETE ALL SOMENTE COM DUPLO CLICK NO ICON
clearListBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

//SALVAR TAB ATUAL
saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLinks.push(tabs[0].url + ";"+tabs[0].title)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

function deleteItemFromLinks(evt) {

    //TRAMBIQUE para q ocorra somente com o .box
    let itemToDelete = evt.currentTarget.valueOf().id
    let x = itemToDelete.replace('deleteItem-btn','');
    myLinks.splice(x,1)

    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
}
