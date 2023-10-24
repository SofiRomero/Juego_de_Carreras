class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Ingresa tu nombre");
    this.playButton = createButton("Jugar");
    this.titleImg = createImg("assets/title.png", "game title");
    this.greeting = createElement("h2");
  }

  setElementsPosition(){
this.input.position(width/2-110,height/2-80)
this.playButton.position(width/2-90,height/2-20)
this.titleImg.position(120,160)
this.greeting.position(width/2-300,height/2-100)

  }

  setElementsStyle(){
this.input.class("customInput")
this.playButton.class("customButton")
this.titleImg.class("gameTitle")
this.greeting.class("greeting")

  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  handleMousePressed(){
    this.playButton.mousePressed(()=>{
      this.input.hide()
      this.playButton.hide()
      var mensaje=`hola ${this.input.value()} </br> espere que otro jugador se una`
      this.greeting.html(mensaje)
      playerCount=playerCount+1
      player.name=this.input.value()
      player.index=playerCount
      player.addPlayer()
      player.updateCount(playerCount)
      player.getDistance()
    })
  }
  
  display(){
    this.setElementsPosition()
    this.setElementsStyle()
    this.handleMousePressed()
    }
    

}
