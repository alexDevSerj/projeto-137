var Objects = [];
var video = "";
var valor = "";
var status = "";

var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance("objeto encontrado");

function setup(){
  canvas = createCanvas(450,350)
  canvas.center()

}

function  preload(){
  video = createCapture(VIDEO)
  video.hide()
}

function draw(){
  image(video, 0, 0, 450, 350)

  if(status != ""){
    objectDetector.detect(video,gotResult)
    for(var i=0; i<Objects.length; i++){
      document.getElementById("status").innerHTML = "status: objetos detectados"
      document.getElementById("numeroDeOjs").innerHTML = "quantidade de objetos detectados - "+Objects.length;

      fill("#ff0000")
      percent = floor(Objects[i].confidence*100)
      textSize(25)
      text(Objects[i].label+" "+percent+"%",Objects[i].x+15,Objects[i].y+15)
      noFill()
      stroke("#ff0000")
      rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height)

      if(Objects[i].label == valor){
        video.stop()
        objectDetector.detect(gotResult)
        document.getElementById("status").innerHTML = "objeto encontrado"
        synth.speak(utterThis);
      }else{
        document.getElementById("status").innerHTML = "objeto não detectado"
      }
    }
  }
}

function start(){
  objectDetector = ml5.objectDetector("cocossd", modelLoaded)
  document.getElementById("status").innerHTML = "status: detectando objetos"
  valor = document.getElementById("valor").value
}

function modelLoaded(){
  console.log("modelo foi carregado")
  status = true;
}

function gotResult(error, results){
  if(error){
  console.error(error)
}else{
  console.log(results)
  Objects = results
}
}