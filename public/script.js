/*
    Back-end
        Responsabilidades:
            -Receber pedidos do cliente
            -Devolver resposta para o cliente
            -Regras do negócio
            -Dados
        Tecnologias utilizadas:
            -Node.js
            -Banco de dados
*/ 


function onOff(){
    document
    /* esconde a página novas ideias quando aperta o botão */
        .querySelector("#modal")
        .classList
        .toggle("hide")
    /* esconde o scroll das classes de body quando preciso */
    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")
    /* adiciona um scroll as classes de modal quando preciso */
    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}
function checkFields(event){
    /*
        event contem as informações, target já diminui para form(title,category,url...), title já diminui para uma informação específica e o value mostra o seu valor
    */
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
        
    ]


    const isEmpty = valuesToCheck.find(function(value){
        // responder se é ou não uma string
        const checkIfIsString = typeof event.target[value].value === "string"
        // trim retorna quando esta vazio a string, ou seja: nenhum caracter
        const checkIfIsEmpty = !event.target[value].value.trim()
        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })
    // for(let value of valuesToCheck){
    //     event.target[value].value
    // }

    if(isEmpty){
        //não deixa fazer o evento natural
        event.preventDefault()
        //função que alerta o usuário
        alert("Por favor, preencha todos os campos")
    }
}





