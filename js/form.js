

const listElement = document.querySelector('ul')
const inputElement = document.querySelector('input')
const buttonElement = document.querySelector('button')

const produtos = JSON.parse(localStorage.getItem('list_produtos')) || []

function mostraProdutos() {

    listElement.innerHTML = ''

    for (item of produtos) {

        const itemList = document.createElement('li');
        const inputItem = document.createElement('input');
        const pos = produtos.indexOf(item);
        inputItem.setAttribute('type', 'checkbox');
        inputItem.setAttribute('name', 'checkbox');
        inputItem.setAttribute('class', 'check');
        inputItem.setAttribute('onclick', `addPreco(${pos})`);
        inputItem.setAttribute('id', `check${pos}`);
        const labelItem = document.createElement('label');
        labelItem.setAttribute('for', 'check');
        labelItem.setAttribute('class', 'label');
        labelItem.innerHTML = item;

        const itemText = document.createTextNode(item);
        itemList.setAttribute('class', 'item');
        const linkElement = document.createElement('a');
        linkElement.setAttribute('class', 'material-icons');
        const linkText = document.createTextNode('delete');
        linkElement.appendChild(linkText);
        linkElement.setAttribute('onclick', `removeProduto(${pos})`);
        itemList.appendChild(inputItem);
        itemList.appendChild(labelItem);
        itemList.appendChild(linkElement);
        listElement.appendChild(itemList);

    }
}

function addPreco(pos) {
    let checkbox = document.querySelector(`#check${pos}`);

    if (checkbox.checked) {
        const resposta = window.prompt("Digite o preço do produto");
        if (resposta == null || resposta == '') {
            alert("O campo não pode estar vazio");
            checkbox.checked = false;
        }

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



