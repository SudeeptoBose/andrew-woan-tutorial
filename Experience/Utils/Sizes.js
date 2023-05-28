export default class Sizes{
    constructor()
    {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspectRatio = window.innerWidth / window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.aspectRatio = window.innerWidth / window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2) 
        })
    }
}