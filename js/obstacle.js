class obstacle{
constructor(ctx, canvasW, canvasH, spaceObstacle){


 this.ctx = ctx
		

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW * 0.3    

		this.y0 = canvasH * 0.8
		this.y = this.y0

		this.vy = 0.7

		this.img = new Image()
		this.img.src = 'assets/floor.png'

		this.img.frameCount = 3
		this.frameIndex = 0

		this.width = 110
		this.height = 60
   
this.spaceObstacle=spaceObstacle
        this.dx= -10  - (this.width + spaceObstacle)

      




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
            this.x += this.dx
            
        }




}



export default obstacle