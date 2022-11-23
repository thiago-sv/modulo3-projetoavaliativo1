

const listElement = document.querySelector('ul')
const inputElement = document.querySelector('input')
const buttonElement = document.querySelector('button')

const produtos = JSON.parse(localStorage.getItem('list_produtos')) || []

function mostraProdutos() {

    listElement.innerHTML = ''

    for (item of produtos) {

        const itemList = document.createElement('li')
        const itemText = document.createTextNode(item)

        itemList.setAttribute('class', 'mdl-list__item')

        const linkElement = document.createElement('a')
        linkElement.setAttribute('class', 'material-icons')

        const linkText = document.createTextNode('delete')
        linkElement.appendChild(linkText)

        const pos = produtos.indexOf(item)
        linkElement.setAttribute('onclick', `removeProduto(${pos})`)

        itemList.appendChild(itemText)
        itemList.appendChild(linkElement)

        listElement.appendChild(itemList)
    }
}

mostraProdutos()

function insereProduto() {
    const produto = inputElement.value

    if (produto == '' || produto.length < 8 || produto.length > 64) {
        return alert("o campo não pode estar vazio e deve conter entre 8 e 64 caracteres")

    }
    produtos.push(produto)
    carregaAnimacao();
    inputElement.value = ''
    mostraProdutos()
    salvarNoLocalStorage()
}

buttonElement.setAttribute('onclick', 'insereProduto()')


function removeProduto(pos) {
    produtos.splice(pos, 1)
    mostraProdutos()
    salvarNoLocalStorage()
}

function salvarNoLocalStorage() {
    localStorage.setItem('list_produtos', JSON.stringify(produtos))
}


function carregaAnimacao() {
    let estilo = document.getElementsByClassName('load');
    estilo[0].style.visibility = "visible";
    setTimeout(function () {
        estilo[0].style.visibility = "hidden";
    }
        , 3000);
}



