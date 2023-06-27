class Cat{
	constructor(ctx, canvasW, canvasH, keys) {
		this.ctx = ctx
		this.keys = keys

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW * 0.80

		this.y0 = canvasH * 0.7 
		this.y = this.y0

		this.vy = 0.7

		this.img = new Image()
		this.img.src = 'assets/cat.png'

		this.img.frameCount = 3
		this.frameIndex = 0

		this.width = 120
		this.height = 120
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
                this.height)
        this.animateSprite(frameCounter)
            }
            animateSprite(frameCounter) {
                if (frameCounter % 6 === 0) {
                    this.frameIndex++
                }
        
                if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0
            }
        
            
        
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
        

export default Cat 