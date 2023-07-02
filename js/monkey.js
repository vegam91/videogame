class Monkey {
	constructor(ctx, canvasW, canvasH) {
		this.ctx = ctx
	

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW * 0.7      

		this.y0 = canvasH * 0.6 
		this.y = this.y0

		this.vy = 0.3

		this.img = new Image()
        this.img.src = 'assets/monkey.png'
        this.img.frameCount = 11
        this.img.frameIndex = 10

		this.width = 366.6
		this.height = 183.3


        this.actions = {
            shoot: true
        }
    }





          draw(frameCounter) {
            // Pintamos un cada frame del sprite en función del frameIndex
            

            
            this.ctx.drawImage(
                this.img,
    
                (this.img.width /this.img.frameCount) * this.img.frameIndex ,
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
                    this.img.frameIndex--
                }
        
                if (this.img.frameIndex <= 0) this.img.frameIndex = this.img.frameCount - 1
            }
        
            
        
            move() {
             
            }

            
        }
        

export default Monkey