const express = require('express')
const cors=require('cors')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs');
const path=require('path')
var bodyParser = require('body-parser');  
const https=require('https')
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var directoryPath = path.join(__dirname, 'public')+'/images/'
let images=[];
//saving image to folder

function saveImageToDisk(url,path){
  var fullurl=url.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  fs.writeFileSync("./public/images/"+path, fullurl,  {encoding: 'base64'});
 images.push(path) 
}


//reading all images in the folder
fs.readdir(directoryPath, function (err, files) {
  console.log(directoryPath)
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
      images.push(file);
  });
});


//get method to send all retrieved images

app.get('/get',(req,res)=>{
  console.log(images)
  res.json({...images})
})

//post method to add image to folder
app.post('/getimage',(req,res)=>{
  response = {  
    users:req.body  
};

let url;
req.body.forEach(u=>{
  url=u;
})
saveImageToDisk(url,Date.now()+".png");
res.end(JSON.stringify(response));  
})

app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`)
})