//node server.js ou npm start ou npm run dev para funcionar
//npm i express
//npm i nodemon
// trocar no package : "start": "node server.js", "dev": "nodemon server.js"
//usei o express para criar e configurar meu servidor
const express= require('express')
const server = express()

// pegando o bd que foi exportado no db.js
const db = require("./db")

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habiliar uso do req.body
server.use(express.urlencoded({ extended:true }))

//configuração do nunjucks - serve para que seja possível utilizar variaveis no html
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // não fazer um cache (utilizar com sistema finzalizado)
})


// query = comandos que, ao serem executados, retornam com informações já armazenadas, que podem ser acessadas em qualquer momento se o usuário fizer a pergunta (comando) correta.
// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse() // serve para não pegar sempre o ideas, mas atribuir à variável
        //let faz com que seja possível mudar o valor de uma variável, diferentemente de uma constante
        let lastIdeas = []
        for(idea of reversedIdeas) {
            if (lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
            
        }
    
        return res.render("index.html", {ideas: lastIdeas})     
    })





   
})

server.get("/ideias", function(req, res) {

    

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas:reversedIdeas })
    })         
})

//liguei meu servidor na porta 3000
server.listen(3000)

server.post("/",function(req,res){
    //Inserir dado na tabela
    const query =`
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);
    ` 
    //pegar os valores do formulário com req.body
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link

    ]
    //comentar várias linhas ctrl + /
    //calback: função que passa dentro de uma função
    //chama a função caso faça alguma coisa
    db.run(query,values,function(err){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        //redirecionar as informações obtidas para a página de ideias
        return res.redirect("/ideias")
    })    
})
