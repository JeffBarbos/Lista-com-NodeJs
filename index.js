const express = require('express');
const app = express();
const path = require('path');
var bodyparser = require('body-parser');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'))
app.use( bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))
var tasks = ['arrumar a casa', 'Comprar pão na padaria']

let currentRoute = '/';

app.post('/',(req,res)=>{
    tasks.push(req.body.tasksAdd);
    res.render('index',{tasksList:tasks});
    res.redirect(currentRoute);
});

app.get('/',(req,res)=>{
    currentRoute = '/';
    res.render('index',{tasksList:tasks})
});

app.get('/deletar/:id', (req,res) =>{
    tasks = tasks.filter(function(val,index){
     if(index != req.params.id){
         return val;
     }
     res.redirect(currentRoute);
    })
     res.render('index',{tasksList:tasks})
 })





app.listen(5000, () => {
    console.log('server rodando');
})
