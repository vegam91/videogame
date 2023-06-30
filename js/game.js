import Background from "./background.js"
import Player from "./player.js"
import Monkey from './monkey.js'
import obstacle from './obstacle.js'
const Game = {
    fps: 60,
    ctx: undefined,
    canvasW: innerWidth,
    canvasH: innerHeight,
    counter: undefined,
    worldVelocity:0,
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
        this.monkey = new Monkey (this.ctx, this.canvasW, this.canvasH, this.keys)
        this.obstacle= new obstacle (this.ctx, this.canvasW, this.canvasH, this.keys)
    //    this.obstacles=[]
        // this.counter = 0
        this.frameCounter = 0
     
        // this.bso = new Audio('../assets/soundtrackgame.mp3')
        // this.bso.volume = 1
        // this.bso.play()
        // this.gameoverAudio = new Audio('../assets/sounds/gameover.mp3')
        // this.gameoverAudio.volume = 1
    },
    // Arranca el loop de animación
    start: function () {
        this.reset()
        this.intervalId = setInterval(() => {
            // 60(this.fps) veces por segundo borro y pinto el canvas
            this.clearCanvas()
            this.frameCounter++
            this.score += 0.01

            if(this.frameCounter > 300) {
             
                this.worldVelocity = 0
                this.player.vx = 4
            }
            //this.worldVelocity -= 0.001
            // this.bso.playbackRate += 0.0001
            this.drawAll()
            this.moveAll()
            // if (this.frameCounter % 50 === 0) this.generateObstacle()
            if (this.isCollision()){
               
                if(this.worldVelocity) {

                    this.worldVelocity = -4

                    setTimeout(() => {
                        this.worldVelocity = -9
                    }, 500)
                    this.player.stuned(this.worldVelocity)
                } else {
                    this.player.stuned(this.worldVelocity)

                }
               
            } else {
                this.player.isCollision = false
            }

           if( this.isCollisionBanana()) {
            this.gameover()
           }

        }, 1000 / this.fps)
    },
    drawAll() {
        this.background.draw()
        this.player.draw(this.frameCounter)
        this.obstacle.draw(this.frameCounter)
    //  this.obstacles.forEach((Floortrap) => Floortrap.draw())
    //  this.counter.update(this.counter)
    this.monkey.draw(this.frameCounter)
    },
    moveAll() {
        this.background.move(this.worldVelocity)
        this.player.move()
        this.obstacle.move(this.worldVelocity)
     
        // this.obstacles.forEach((Floortrap) => Floortrap.move(this.worldVelocity))
    },
    stop: function () {
        this.reset()
        clearInterval(this.intervalId)
    },
    // generateObstacle() {
    //  this.obstacles.push(
    //      new obstacle(
    //      )
    //  )
     
    // },
    gameover() {

        setTimeout(() => {
            clearInterval(this.intervalId)
            //  this.bso.pause()
            //  this.gameoverAudio.play()
             if (confirm('Quieres jugar de nuevo')) {
                 this.start()
             }

        }, 300)
   
    },
    isCollision() {
     return this.player.x + this.player.width > this.obstacle.x &&
     this.player.x < this.obstacle.x + this.obstacle.width &&
     this.player.y + this.player.height > this.obstacle.y + this.obstacle.height 
    },
     
    isCollisionBanana() {

        if(!this.monkey.actions.shoot) return
       
     

        if(this.monkey.img.frameIndex < 3) {
           
            if(this.player.x + this.player.width > this.monkey.x &&
            this.player.x < this.monkey.x + this.monkey.width / 6 &&
            this.player.y + this.player.height > this.monkey.y + this.monkey.width / 3) {
                return true
            } 


        } else if (this.monkey.img.frameIndex < 5) {

            if(this.player.x + this.player.width >  this.monkey.x + this.monkey.width/ 6  &&
                this.player.x < this.monkey.x + this.monkey.width / 3 &&
                this.player.y + this.player.height > this.monkey.y + 60) {
                    return true
                } 
        }

        return false
    },

    
    
    // clearObstacles() {
    //  this.obstacle = this.obstacle.filter(
    //      (obstacle) => obstacle.x + obstacle.width > 0
    //  )
    // },
    clearCanvas() {
        this.ctx.clearRect(0, 0,this.canvasW, this.canvasH)
    },
}


export default Game