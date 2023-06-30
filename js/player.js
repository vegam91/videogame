class Player {
	constructor(ctx, canvasW, canvasH, keys) {
		this.ctx = ctx
		this.keys = keys

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW * 0.09

		this.y0 = canvasH * 0.7 
		this.y = this.y0

		this.vx = 0
		this.vy = 0.7

		this.img = new Image()
		this.img.src = 'assets/dog.png'

		this.img.frameCount = 3
		this.frameIndex = 0

		this.width = 140
		this.height = 140
		this.isStuned = false
		this.isCollision = false
		this.worldVelocity = undefined
		// setTimeout(() => this.vx = -10, 10000)
		this.setControls()

		this.vx = 4
	}

	setControls() {
		addEventListener('keydown', (event) => {
			switch (event.code) {
				case this.keys.JUMP:
					if (this.y === this.y0) {
						// this.jumpAudio.play()
						this.vy = -20
					}
				
			}
		})
	}

	stuned(worldVelocity) {
		this.worldVelocity = worldVelocity

		if(!this.isCollision) {

			this.isCollision = true
			this.isStuned = true

			setTimeout(() => this.isStuned = false, 500)
		} 
	}

	draw(frameCounter) {
	
		
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

		this.animateSprite(frameCounter)
	}

	
	animateSprite(frameCounter) {

		

		if (frameCounter % 6 === 0) {
			this.frameIndex++
		}

		if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0
	}

	

	move() {

		if(this.isStuned && !this.worldVelocity) {
			this.vx = 2
		} else if(!this.isStuned && !this.worldVelocity) {
			this.vx = 4
		}


		this.gravity = 0.95
		this.vy += this.gravity
		this.y += this.vy
		this.x += this.vx
		if (this.y >= this.y0) {
			this.vy = 0
			this.y = this.y0
		}



		


	}






}



export default Player