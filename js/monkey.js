class Monkey {
	constructor(ctx, canvasW, canvasH, playerY0, playerH) {
		this.ctx = ctx
	

		this.canvasW = canvasW
		this.canvasH = canvasH

		this.x = canvasW     

		
		

		

		this.imgWalk = new Image()
        this.imgWalk.src = 'assets/walkingMonkeyLeft.png'
        this.imgWalk.frameCount = 9
        this.imgWalk.frameIndex = 0

        this.imgShoot = new Image()
        this.imgShoot.src = 'assets/monkey.png'
        this.imgShoot.frameCount = 11
        this.imgShoot.frameIndex = 10
        
    
        this.width = 166.3
		this.height = 183.3 

        this.y = playerY0 - (this.height - playerH) 

        this.actions = {
            walk: true,
            shoot:false
        }
    }

    draw(frameCounter) {

        if(this.actions.shoot) {
            this.img =  this.imgShoot
        } else if(this.actions.walk) {
            this.img = this.imgWalk
        }
        
        this.ctx.drawImage(
            this.img,
            (this.img.width /this.img.frameCount) * this.img.frameIndex,
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
        if(this.actions.shoot) {
            if (frameCounter % 6 === 0) {
                this.img.frameIndex--
            }
            if(this.img.frameIndex <= 0) {   
                this.img.frameIndex = 0
            } 
        } else {
            if (frameCounter % 6 === 0) {
                this.img.frameIndex++
            }
            if(this.img.frameIndex >= this.img.frameCount - 1) {   
                this.img.frameIndex = 0
            } 
        }
    }

    shoot() {
        this.actions.walk = false
        this.actions.shoot = true

        this.width = 366.6

        this.x -= 200
    }
        
    move(playerPos) {
        

        const distance = this.x - playerPos

        if(!this.actions.shoot && distance < 400) {
           this.shoot()
        }

        if(this.actions.walk) {
            this.vx = -2
        } else {
            this.vx = 0
        }

        this.x += this.vx

    }
            
}



export default Monkey