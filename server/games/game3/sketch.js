function setup() {
  createCanvas(800, 800);
  registerArray = []
  changeArray = []
  clientAssetArray = ["Boy.png", "Girl.png", "Grandma.png"]
  fishAssetArray = ["Fish_blue.png", "Fish_green.png", "Fish_orange.png", "Fish_purple.png", "Fish_yellow.png"]
  levelArray = [
    [0.1, 1, 0.1, false],
    [0.1, 1, 0.05, false],
    [1, 100, 10, true],
    [1, 100, 5, true],
    [1, 100, 1, true]
  ]

  resetGame()

  //loading assets
  registerAsset = loadImage('assets/Register.png')

  priceTag = loadImage('assets/PriceTag.png')

  //loading register box
  //(id, x, y, width, height, cost, asset, assetHeight, offset, scale, textOffsetX, textOffsetY)
  registerArray.push(new Register(0, 104+75*0, 404, 71, 195, 50, "Note50.png", 195, 0, 0, 20, 105))
  registerArray.push(new Register(1, 103+75*1, 404, 71, 195, 20, "Note20.png", 195, 0, 0, 20, 105))
  registerArray.push(new Register(2, 102+75*2, 404, 71, 195, 10, "Note10.png", 195, 0, 0, 20, 105))
  registerArray.push(new Register(3, 100+75*3, 404, 71, 195, 5, "Note5.png", 195, 0, 0, 27, 105)), 
  
  registerArray.push(new Register(4, 104+75*0, 600, 75, 100, 1, "GoldCoin.png", 75, 10, 10, 28, 52))
  registerArray.push(new Register(5, 100+75*1, 600, 75, 100, 0.50, "SilverCoin.png", 75, 10, 10, 20, 52))
  registerArray.push(new Register(6, 100+75*2, 600, 75, 100, 0.20, "BrassCoin.png", 75, 10, 10, 20, 52))
  registerArray.push(new Register(7, 100+75*3, 600, 75, 100, 0.05, "BrassCoin.png", 75, 10, 10, 10, 52))
  
  //loading Change box
  //(x, y, width, height, cost, amount, asset, type)
  changeArray.push(new Change(260, 150, 60, 60, 50, 0, "Note50.png", 30, 45, "Note"))
  changeArray.push(new Change(320, 150, 60, 60, 20, 0, "Note20.png", 30, 45, "Note"))
  changeArray.push(new Change(260, 210, 60, 60, 10, 0, "Note10.png", 30, 45, "Note"))
  changeArray.push(new Change(320, 210, 60, 60, 5, 0, "Note5.png", 30, 45, "Note"))

  changeArray.push(new Change(260, 270, 30, 50, 1, 0, "GoldCoin.png", 20, 20, "Coin"))
  changeArray.push(new Change(290, 270, 30, 50, 0.50, 0, "SilverCoin.png", 20, 20, "Coin"))
  changeArray.push(new Change(320, 270, 30, 50, 0.20, 0, "BrassCoin.png", 20, 20, "Coin"))
  changeArray.push(new Change(350, 270, 30, 50, 0.05, 0, "BrassCoin.png", 20, 20, "Coin"))

  console.log(changeArray)

  backgoundImage = loadImage('assets/image0.jpg')
}

function resetGame(){
  fishArray = []
  fish = 0
  cost = 0
  change = 0 
  gameState = 0
  score = 0
  level = 4

  //registerArray.push()
  fishPrice(levelArray[level])
}

function draw() {
  background(220);
  
  if(gameState == 0){
    startPage()
  }else if (gameState == 1){
    gamePage()
  }else if (gameState == 2){
    endPage()
  }
}

function fishPrice(priceArray){
  startPrice = priceArray[0]
  endPrice = priceArray[1]
  increment = priceArray[2]
  rD = priceArray[3]
  
  for(i=0; i < 10; i++){
    cost = getRndInteger(startPrice, endPrice, rD)
    fishArray.push(new Fish(cost, findPaid(cost,endPrice, increment), clientAssetArray[getRndInteger(0,3,true)], fishAssetArray[getRndInteger(0,5,true)]))
  }  
}

function startPage(){
  textSize(32)
  fill("black")
  text("Start", 370, 350)
  noFill()
  rect(300, 300, 200, 100)
}

function gamePage(){
  image(backgoundImage, 0, 0, 800, 800)

  image(registerAsset, 100, 400, 300, 300)

  fill(39, 30, 220)
  //fish box
  rect(400, 400, 300, 300)
  //cash box
  rect(100, 100, 300, 300)

  noFill()
  //register box
  rect(100, 400, 300, 300)   
  //Paid box
  rect(120, 120, 120, 200)
  //change box
  rect(260, 120, 120, 200)
  rect(260, 150, 120, 170)

  //give change box
  rect(150, 350, 200, 30)

  textSize(32)
  fill("black")
  text(score, 50, 50)
  //text("Fish", 400, 450)
  text("Paid", 100, 100)
  text("Change", 250, 100)
  text(change, 300, 150)
  text("Give Change", 150, 375)
  
  for(i=0; i < registerArray.length; i++){
    registerArray[i].draw()
  }  

  for(i=0; i < changeArray.length; i++){
    changeArray[i].draw()
  }
  
  fishArray[fish].draw()

  // text("50", 120+75*0, 510)
  // text("20", 120+75*1, 510)
  // text("10", 120+75*2, 510)
  // text("5", 125+75*3, 510)
  
  // text("1", 133+75*0, 650)
  // text(".50", 120+75*1, 650)
  // text(".25", 120+75*2, 650)
  // text(".10", 120+75*3, 650)
}

function endPage(){
  textSize(32)
  fill("black")
  text("End", 370, 350)
  text(score, 370, 300)
  noFill()
  rect(300, 300, 200, 100)
}

function mouseClicked(){
  if(gameState == 0){
    if((mouseX > 300 && mouseX < 500) && (mouseY > 300 && mouseY < 400)){
      gameState = 1
    }
  }else if (gameState == 1){
    //Register logic
    if(mouseX < 400 && mouseY > 400 ){
      for(i=0; i < registerArray.length; i++){
        registerClick = registerArray[i].clicked()
        if(registerClick != false){
          change += registerClick[1]
          changeArray[registerClick[0]].amount += 1
        }
      }
    //Give Change logic
    }else if((mouseX < 350 && mouseX > 150)&&(mouseY < 380 && mouseY > 350)){
      if(change == fishArray[fish].change){
        score += 1
      }else{
        console.log(fishArray[fish].change, change)
      }
      for(i=0; i<changeArray.length; i++){
        changeArray[i].amount = 0
      }
      change = 0
      fish += 1
      if(fish > fishArray.length -1){
        gameState = 2
      }
    //Remove Change logic
    260, 150, 120, 170
    }else if((mouseX > 260 && mouseX < 380) && (mouseY > 150 && mouseY < 320)){
      for(i=0; i < changeArray.length; i++){
        changeClicked = changeArray[i].clicked()
        change -= changeClicked
      }
    }
  }else if (gameState == 2){
    console.log("endGame1")
    if((mouseX > 300 && mouseX < 500) && (mouseY > 300 && mouseY < 400)){
      console.log("end")
      gameState = 0
      resetGame()
    }
  }
}

function getRndInteger(min, max, rD) {
  n = (Math.random() * (max - min)  + min)*100;
  n = Math.floor(n)/100
  if(rD == true){
    return Math.floor(n)
  }else if(rD == false){
    return n
  }
}

function removeDecimal(n){
  return Math.floor(n)
}

function findPaid(num, endPrice, increment) {
  m = endPrice - num
  mRemainder = Math.floor(m/increment)
  mRandom = getRndInteger(1, mRemainder, true)
  return num + increment*mRandom
}