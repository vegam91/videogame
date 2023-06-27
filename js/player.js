class Player {
	constructor(ctx, canvasW, canvasH, keys) {
		this.ctx = ctx
		this.keys = keys

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW * 0.00

		this.y0 = canvasH * 0.7 
		this.y = this.y0

		this.vy = 0.7

		this.img = new Image()
		this.img.src = 'assets/dog.png'

		this.img.frameCount = 3
		this.frameIndex = 0

		this.width = 130
		this.height = 120

		// this.bullets = []

		// this.jumpAudio = new Audio('../assets/sounds/jump.wav')
		// this.jumpAudio.volume = 1

		// this.bulletAudio = new Audio('../assets/sounds/bullet.wav')
		// this.bulletAudio.volume = 1

		this.setControls()
	}

	setControls() {
		addEventListener('keydown', (event) => {
			switch (event.code) {
				case this.keys.JUMP:
					if (this.y === this.y0) {
						this.jumpAudio.play()
						this.vy = -15
					}
					break
				case this.keys.SHOOT:
					this.shoot()
					this.bulletAudio.play()
					break
			}
		})
	}

	draw(frameCounter) {
		// Pintamos un cada frame del sprite en función del frameIndex
		this.ctx.drawImage(
			this.img,

			(this.img.width / this.img.frameCount) * this.frameIndex,
			0,
			this.img.width / this.img.frameCount,
			this.img.height,

			this.x,
			this.y,
			this.width,
			this.height
		)

		// this.bullets.forEach((bullet) => {
		// 	bullet.draw()
		// 	bullet.move()
		// })

		// this.bullets = this.bullets.filter(
		// 	(bullet) => bullet.x - bullet.radius < this.canvasW
		// )
		// // console.log(this.bullets)
		this.animateSprite(frameCounter)
	}

	// Cambiamos cada 6 frames del juego el frameIndex del sprite para que dibuje el personaje con otra pose
	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.frameIndex++
		}

		if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0
	}

	// shoot() {
	// 	this.bullets.push(
	// 		new Bullet(
	// 			this.ctx,
	// 			this.width,
	// 			this.height,
	// 			this.x,
	// 			this.y,
	// 			this.y0,
	// 			this.canvasW,
	// 			this.canvasH
	// 		)
	// 	)
	// }

	move() {
		this.gravity = 0.95
		this.vy += this.gravity
		this.y += this.vy

		if (this.y >= this.y0) {
			this.vy = 0
			this.y = this.y0
		}
	}
}

export default Player