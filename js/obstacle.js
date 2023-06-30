class obstacle{
constructor(ctx, canvasW, canvasH, keys){


 this.ctx = ctx
		this.keys = keys

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW * 0.70

		this.y0 = canvasH * 0.8
		this.y = this.y0

		this.vy = 0.7

		this.img = new Image()
		this.img.src = 'assets/floor.png'

		this.img.frameCount = 3
		this.frameIndex = 0

		this.width = 110
		this.height = 60



      




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

        move(worldVelocity) {
            this.x += worldVelocity
        }




}



export default obstacle