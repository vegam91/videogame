import Background from "./background.js"
import Player from "./player.js"
import Cat from './cat.js'
// import ScoreBoard from './ScoreBoard.js'
const Game = {
    fps: 60,
    ctx: undefined,
    canvasW: innerWidth,
    canvasH: innerHeight,
    // scoreBoard: undefined,
    worldVelocity: -10,
    keys: {
        JUMP: 'Space',
    //     SHOOT: 'KeyS',
    },
    init: function () {
        const canvas = document.createElement('canvas')
        this.ctx = canvas.getContext('2d')
        canvas.width = this.canvasW
        canvas.height = this.canvasH
        // ScoreBoard.init(this.ctx)
        document.body.append(canvas)
        this.start()
    },
    // Inicializa todos los objetos y variables que usa el juego
    reset: function () {
        this.player = new Player(this.ctx, this.canvasW, this.canvasH, this.keys)
        this.background = new Background(this.ctx, this.canvasW, this.canvasH)
        this.cat = new Cat (this.ctx, this.canvasW, this.canvasH, this.keys)
        // this.scoreBoard = ScoreBoard
        // this.score = 0
        this.frameCounter = 0
        // this.bso = new Audio('../assets/sounds/bso.mp3')
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
            this.worldVelocity -= 0.001
            // this.bso.playbackRate += 0.0001
            this.drawAll()
            this.moveAll()
            // if (this.frameCounter % 50 === 0) this.generateObstacle()
            // if (this.isCollision()) this.gameover()
            // this.clearObstacles()
        }, 1000 / this.fps)
    },
    drawAll() {
        this.background.draw()
        this.player.draw(this.frameCounter)
    //  this.obstacles.forEach((obstacle) => obstacle.draw())
    //  this.scoreBoard.update(this.score)
    this.cat.draw(this.frameCounter)
    },
    moveAll() {
        this.background.move(this.worldVelocity)
        this.player.move()
        this.cat.move()
        // this.obstacles.forEach((obstacle) => obstacle.move(this.worldVelocity))
    },
    stop: function () {
        this.reset()
        clearInterval(this.intervalId)
    },
    // generateObstacle() {
    //  this.obstacles.push(
    //      new Obstacle(
    //          this.ctx,
    //          this.player.height,
    //          this.player.y0,
    //          this.canvasW,
    //          this.canvasH
    //      )
    //  )
    // },
    // gameover() {
    //  clearInterval(this.intervalId)
    //  this.bso.pause()
    //  this.gameoverAudio.play()
    //  if (confirm('Quieres jugar de nuevo')) {
    //      this.start()
    //  }
    // },
    // isCollision() {
    //  return this.obstacles.some(
    //      (obstacle) =>
    //          obstacle.x < this.player.x + this.player.width - 20 &&
    //          obstacle.x + obstacle.width > this.player.x &&
    //          obstacle.y + obstacle.height > this.player.y &&
    //          obstacle.y < this.player.y + this.player.height - 20
    //  )
    // },
    // clearObstacles() {
    //  this.obstacles = this.obstacles.filter(
    //      (obstacle) => obstacle.x + obstacle.width > 0
    //  )
    // },
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
    },
}


export default Game