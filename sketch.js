 var db, gs = 0;
 var pc = 0
var button,  i , reset , Cars , index , x , allPlayers,car1,car2,car3,car4, title, input,name

 function setup (){
   createCanvas(1200,600)
  db=firebase.database()
title=createElement("h1","car racing ")
title.position (500,50) 
input=createInput ("")
input.position(500,150)
 name = input.value()
  button = createButton("SUBMMIT")
button.position(500,200)  
  button.mousePressed(enterPlayer)

reset = createButton ("RESET")
reset.position (900,200)
reset.mousePressed(resetD)
  
db.ref("gameState").on("value",function(data){
gs=data.val()
}  )

db.ref("playerCount").on("value",function(data){
 pc=data.val()
  }  )   

car1= createSprite(200,200,30,30)
car1.shapeColor="red" 


car2= createSprite(200,200,30,30)
car2.shapeColor="blue" 



car3= createSprite(200,200,30,30)
car3.shapeColor="green" 



car4= createSprite(200,200,30,30)
car4.shapeColor="orange" 

Cars=[car1 , car2 , car3 , car4]




}

function draw (){
  if     (pc===4){
db.ref("/").update({
  gameState:1
})

if(allPlayers === undefined && gs === 1){
  db.ref("players").on("value",function(data){
      allPlayers  = data.val();
  })
}

if  (gs ===1){
index = 0
x = 250

for (var i in allPlayers ){
Cars[index].x  = x;
x  = x+250;
Cars[index].y = allplayers[i].y;
index++;

}
}
  }

}

function enterPlayer (){
var hello = createElement ("h1")
hello.position (200,500)
hello.html ("welcome"+name)
pc++
db.ref("/").update({ 
  playerCount:pc 
})

db.ref("players/player"+pc).set({ 
 i:pc
})

}


function resetD (){
  db.ref("/").update({
    gameState:0,
    playerCount:0
  })
db.ref("players").remove()



}





