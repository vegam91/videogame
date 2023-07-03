import Background from "./background.js"
import Player from "./player.js"
import Monkey from './monkey.js'
import Obstacle from './obstacle.js'
const Game = {
    fps: 60,
    ctx: undefined,
    canvasW: innerWidth,
    canvasH: innerHeight,
    counter: undefined,
    worldVelocity:-8,
    keys: {
        JUMP: 'Space',
    
    },
    init: function () {
        const canvas = document.createElement('canvas')
        this.ctx = canvas.getContext('2d')
        canvas.width = this.canvasW
        canvas.height = this.canvasH
    //    counter.init(this.ctx)
        document.body.append(canvas)
   
        this.start()
    },
    // Inicializa todos los objetos y variables que usa el juego
    reset: function () {
        this.player = new Player(this.ctx, this.canvasW, this.canvasH, this.keys)
        this.background = new Background(this.ctx, this.canvasW, this.canvasH)
        this.monkey = new Monkey (this.ctx, this.canvasW, this.canvasH, this.player.y0, this.player.height)
        this.worldVelocity = -8
        this.frameCounter = 0
        this.obstacles = []     
        this.bso = new Audio('../assets/soundtrackgame.mp3')
        this.bso.volume = 1
        this.bso.play()    
    },
     
        // this.gameoverAudio = new Audio('../assets/sounds/gameover.mp3')
        // this.gameoverAudio.volume = 1
    
    // Arranca el loop de animación
    start: function () {
        this.reset();
        this.intervalId = setInterval(() => {

            this.clearCanvas()
            this.frameCounter++
            this.score += 0.01

            if (this.frameCounter < 300 && this.frameCounter % 50 === 0) this.generateObstacle()

            if(this.frameCounter > 150 && this.obstacles.length === 0)  {
                this.worldVelocity = 0
                this.player.vx = 5
            }
           
            this.drawAll()
            this.moveAll()
            
            if (this.isCollision()){
                this.worldVelocity = -4

                setTimeout(() => {
                    this.worldVelocity = -7
                }, 500)

                this.player.stuned(this.worldVelocity)
              
              
            } else {
                this.player.isCollision = false
            }

           if( this.isCollisionBanana())  {
            
            this.gameover();
           }

          if(this.isCollisionMonkey()) {
            this.win();
           }
           
          
           
            this.clearObstacles()
        }, 1000 / this.fps)
    },
    drawAll(){
        this.background.draw();
        
        this.obstacles.forEach(obstacleInstance => obstacleInstance.draw(this.frameCounter));
        
        if (!this.worldVelocity) {
          this.monkey.draw(this.frameCounter);
        }

        this.player.draw(this.frameCounter);
    },
          
    moveAll() {
        // if (!this.player.passedObstacle) {
    
        //   }
        this.background.move(this.worldVelocity);
        this.player.move(this.worldVelocity);
        this.obstacles.forEach(obstacleInstance => obstacleInstance.move(this.worldVelocity));

        if (!this.worldVelocity) {
            this.monkey.move(this.player.x + this.player.width)

        }
       
},
    
    gameover() {
        clearInterval(this.intervalId)    

this.bso.pause()
        if (confirm('GAMEOVER¿Quieres jugar de nuevo')) {
            this.start(); 
        }

        
    },

    win () {
        clearInterval(this.intervalId)    
this.bso.pause()
        if (confirm('WIN ¿Quieres jugar de nuevo?')) {
            this.start(); 
        }
    },
    isCollision()  { for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        if (
          this.player.x + this.player.width > obstacle.x &&
          this.player.x < obstacle.x + obstacle.width &&
          this.player.y + this.player.height > obstacle.y + obstacle.height
        ) {
          return true;
        }
      }
      return false;
    },
     
    isCollisionBanana() {

        if(!this.monkey.actions.shoot) return false
       
    

        if(this.monkey.img.frameIndex < 2) {
            if(this.player.x + this.player.width > this.monkey.x + 30 &&
            this.player.x < this.monkey.x + 30 &&
            this.player.y + this.player.height > this.monkey.y + 150) {
                return true
            } 
    
        } 
        return false
    },

    isCollisionMonkey() {
        if(!this.monkey.actions.shoot) return false
       
    
        if(this.player.x + this.player.width > this.monkey.x + this.monkey.width - 166 &&
        this.player.x < this.monkey.x + this.monkey.width) {
            return true
        
        } 
        
        return false
    },



    generateObstacle() {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasW, this.canvasH))
        
    },
   
    clearObstacles() {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0) 
    },

    clearCanvas() {
        this.ctx.clearRect(0, 0,this.canvasW, this.canvasH)
    },
}


export default Game