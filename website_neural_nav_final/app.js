const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const spawner=require("child_process").spawn;

app.use('/static', express.static('static'))
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    res.status(200).render('home.pug');
})
app.get('/chat', (req, res)=>{
    
    res.status(200).render('index.pug');
})
app.post('/', function (req, res) {
    console.log(req.body);

    const data_to_pass_in = req.body.prompt;
    fs.writeFileSync('static/output.json', '{"value":"work"}')
    fs.writeFileSync('static/bool.json', '{"message":"f"}')

    const python_process=spawner("python",["python.py",(data_to_pass_in)]);
python_process.stdout.on("data",(data) =>{
    fs.writeFileSync('static/bool.json', '{"message":"f"}')
    console.log(data.toString());
    fs.writeFileSync('static/output.json', '{"value":""}')
    var obj= {
        value : data.toString()

    }
    fs.writeFileSync("static/output.json", JSON.stringify(obj))

    fs.writeFileSync('static/bool.json', '{"message":"t"}')
    setTimeout(() => {
        fs.writeFileSync('static/bool.json', '{"message":"f"}')

        
    }, 700);
    

});
    


});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
    
    
});

