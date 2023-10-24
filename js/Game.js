class Game {
  constructor() {
   this.resetTitle=createElement("h2")
   this.resetButton=createButton("")
   this.tablaPos=createElement("h2")
   this.leader1=createElement("h2")
   this.leader2=createElement("h2")
   this.playerMoiving=false
   this.leftKeyActive=false
   this.blast=false
  }

  getState(){
    var gameStatered=database.ref("gameState")
    gameStatered.on("value",function(data){gameState=data.val()})
   }
  
   update(state){
  database.ref("/").update({gameState:state})
   }


  

  start() {
    player = new Player();
playerCount=player.getCount()
    form = new Form();
    form.display();
    car1=createSprite(width/2-50,height-100)
    car1.addImage("car1",car1Img)
    car1.scale=0.07
    car1.addImage("blast",choque)
    car2=createSprite(width/2+100,height-100)
    car2.addImage("car2",car2Img)
    car2.addImage("blast",choque)
    car2.scale=0.07
  cars=[car1,car2]
      fuels=new Group()
      coins=new Group()
      obstacles=new Group()
var obstaclesPositions = [ { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
 { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
  { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
   { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
    { x: width / 2, y: height - 2800, image: obstacle2Image }, 
    { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
     { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
       { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
         { x: width / 2, y: height - 5300, image: obstacle1Image },
          { x: width / 2 - 180, y: height - 5500, image: obstacle2Image } ];


    this.addSprites(coins,50,coinimage,0.08)
    this.addSprites(fuels,3,fuelimage,0.01)
    this.addSprites(obstacles,obstaclesPositions.length,obstacle1Image,0.04,obstaclesPositions)
  }

    addSprites(spriteGroup,numberOfSprites,spritesImage,scale,positions=[]){
      for(var i=0;i<numberOfSprites;i++){
        var x,y 
        if(positions.length>0){
          x=positions[i].x
          y=positions[i].y
          spritesImage=positions[i].image
        }
        else{ x=random(width/2+150, width/2-150)
        y=random(-height*4.5,height-400)}

        var sprite=createSprite(x,y) 
        sprite.addImage("sprite",spritesImage)
        sprite.scale=scale
        spriteGroup.add(sprite)
      }
}

handleElements(){
form.hide()
form.titleImg.position(40,50)
form.titleImg.class("gameTitleAfterEffect")
this.resetTitle.html("reinicio")
this.resetTitle.class("resetText")
this.resetTitle.position(width/2+200,40)
this.resetButton.class("resetButton")
this.resetButton.position(width/2+230,100)
this.tablaPos.html("Puntuación")
this.tablaPos.class("resetText")
this.tablaPos.position(width/3-60,40)
this.leader1.class("leadersText")
this.leader1.position(width/3-50,80)
this.leader2.class("leadersText")
this.leader2.position(width/3-50,130)
}

play(){
  this.handleElements();
  this.handleResetButton()
  Player.getPlayersInfo()
  player.getCarsAtEnd()
if(allPlayers!=undefined){
image(pista,0,-height*5,width,height*6)
var index=0
this.showtablaPos()
this.showFuel()
this.showLife()
for(var plr in allPlayers){
index=index+1
var x=allPlayers[plr].positionX
var y=height-allPlayers[plr].positionY;
var lifeLocal=allPlayers[plr].life
if(lifeLocal<=0){
cars[index-1].changeImage("blast")
cars[index-1].scale=0.3
}
cars[index-1].position.x=x
cars[index-1].position.y=y
if(index==player.index){
stroke(10)
fill("green")
ellipse(x,y,60,60)
this.handleCoins(index)
this.handleFuel(index)
this.handleCollisionWithCar(index)
this.handleCollisionOobstacles(index)
if(player.life<=0){
this.blast=true;
this.playerMoiving=false;
}
camera.position.x=cars[index-1].position.x
camera.position.y=cars[index-1].position.y
}
}
this.handlePlayerControls()

const finishLine=height*6-100
if(player.positionY>finishLine){
gameState=2
player.rank+=1
Player.UpdateCarAtEnd(player.rank)
player.update()
this.showRank()
}
drawSprites()
}
}

handleResetButton(){
  this.resetButton.mousePressed(()=>{
    database.ref("/").set({
      playerCount:0,
      gameState:0,
      players:{},carsAtEnd:0
    })
    window.location.reload()
  })
}

handleCollisionOobstacles(index){
  if(cars[index-1].collide(obstacles)){
    if(this.leftKeyActive){
player.positionX+=100
    }else{player.positionX-=100

    }
if(player.life>0){
player.life-=185/4
}
player.update()
  }
}

handleCollisionWithCar(index){
if(index==1){
  if(cars[index-1].collide(cars[1])){
    if(this.leftKeyActive){
player.positionX+=100
    }else{player.positionX-=100

    }
if(player.life>0){
player.life-=185/4
}
player.update()
  }
}
if(index==2){
  if(cars[index-1].collide(cars[0])){
    if(this.leftKeyActive){
player.positionX+=100
    }else{player.positionX-=100

    }
if(player.life>0){
player.life-=185/4
}
player.update()
  }
}

}


showtablaPos(){
  var leader1,leader2;
  var players=Object.values(allPlayers)
  if((players[0].rank==0&&players[1].rank==0)||players[0].rank==1){
leader1=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
leader2=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
  }
  if(players[1].rank==1){
    leader1=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
    leader2=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
  }
  this.leader1.html(leader1)
  this.leader2.html(leader2)
}


handlePlayerControls(){
  if(!this.blast){
    if(keyIsDown(UP_ARROW)){
      this.playerMoiving=true
      player.positionY=player.positionY+10
      player.update()
    }
    if(keyIsDown(LEFT_ARROW)&&player.positionX>width/3-50){
      this.leftKeyActive=true
  player.positionX=player.positionX-5
  player.update()
    }
    if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+300){
      this.leftKeyActive=false
      player.positionX=player.positionX+5
      player.update()
        }
  }
  if(keyIsDown(UP_ARROW)){
    this.playerMoiving=true
    player.positionY=player.positionY+10
    player.update()
  }
  if(keyIsDown(LEFT_ARROW)&&player.positionX>width/3-50){
    this.playerMoiving=true
    this.leftKeyActive=true
player.positionX=player.positionX-5
player.update()
  }
  if(keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+300){
    this.playerMoiving=true
    this.leftKeyActive=false
    player.positionX=player.positionX+5
    player.update()
      }
}

handleFuel(index){
cars[index-1].overlap(fuels,function(collector,collected){
  player.fuel=185
  collected.remove()
})
if(player.fuel>0&&this.playerMoiving){
player.fuel-=0.3
}
if(player.fuel<=0){
gameState=2
this.gameOver()
}
}

handleCoins(index){
  cars[index-1].overlap(coins,function(collector,collected){
    player.score=player.score+3
    player.update()
    collected.remove()
  })
  }

showLife(){
  push()
image(lifeimage,width/2-130,height-player.positionY-400,20,20)
fill("white")
rect(width/2-100,height-player.positionY-400,185,20)
fill("red")
rect(width/2-100,height-player.positionY-400,player.life,20)
  pop()
}

showFuel(){
  push()
image(fuelimage,width/2-130,height-player.positionY-350,20,20)
fill("white")
rect(width/2-100,height-player.positionY-350,185,20)
fill("red")
rect(width/2-100,height-player.positionY-350,player.fuel,20)
  pop()
}

  showRank(){
    swal({
      title:`Increíble${"\n"}position${"\n"}${player.rank}`,
      text:"Llegaste a la meta",
      imageUrl:"assets/trofeo.png",
      imageSize:"100x100",
      confirmButtonText:"Ok"
    })
  }

  gameOver(){
    swal({
      title:`Fin del Juego`,
      text:"Suerte para la Próxima",
      imageUrl:"assets/Game Over.png",
      imageSize:"100x100",
      confirmButtonText:"Gracias Por Jugar"
    })
  }

  end(){
    console.log("fin del juego")
  }
}
