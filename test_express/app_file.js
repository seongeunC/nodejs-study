var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'uploads/'})
var app = express();

app.set('views','./views_file');
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended:false}));


app.get('/topic/new', function(req,res){
  res.render('new');
})

app.get('/topic', function(req,res){
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('view',{topics:files});
  })
})

app.post('/topic', function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title,description,function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.send('Post is Succese!');
  });
})

app.get('/topic/:id',function(req,res){
  var id = req.params.id;
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    fs.readFile('data/'+id,'utf8',function(err,data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view',{topics:files, title:id, description:data});
    })
  })
})

app.get('/upload', function(req,res){
  res.render('upload');
})

app.post('/upload', upload.single('userfile'), function(req,res){
  console.log(req.file);
  res.send('Upload: '+req.file.filename);
})

app.listen(3000,function(){
  console.log('Connected, 3000 Port!');
})
