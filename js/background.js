class Background {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx
        this.x = 0
        this.canvasW = canvasW
        this.canvasH = canvasH
        this.img = new Image()
        this.img.src = 'assets/backgroung.jpg'
        // this.dx = worldVelocity
this.stopped = false
    
    }

   
    draw() {
        this.ctx.drawImage(this.img,this.x,0, this.canvasW, this.canvasH)
        this.ctx.drawImage(
            this.img,
            this.x + this.canvasW,
            0,
            this.canvasW,
            this.canvasH
        )
    }
    move(worldVelocity) {
if(!this.stopped){
    this.x += worldVelocity;
    if (this.x <= -this.canvasW) this.x =0
}


    //     this.x += worldVelocity
    //     if (this.x <= -this.canvasW) this.x = 0
    }
}
export default Background

