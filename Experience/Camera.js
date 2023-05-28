import Experience from "./Experience";
import * as THREE from 'three'
export default class Camera{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas

        this.createPerspectiveCamera()
        this.createOrthographicCamera()
    }

    createPerspectiveCamera()
    {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 0.1, 1000)
        this.scene.add(this.perspectiveCamera)
    }

    createOrthographicCamera()
    {
        this.frustrum = 5 
        this.orthographicCamera = new THREE.OrthographicCamera( 
            (-this.sizes.aspectRatio * this.sizes.frustrum) / 2,
            (this.sizes.aspectRatio * this.sizes.frustrum)/2,
            -this.sizes.frustrum / 2,
            this.sizes.frustrum /2,
            -100,
            100
         )
        this.scene.add(this.orthographicCamera)
    }

    resize()
    {
        this.perspectiveCamera.aspect = this.sizes.aspectRatio
        this.perspectiveCamera.updateProjectionMatrix()

        this.orthographicCamera.left = (-this.sizes.aspectRatio * this.sizes.frustrum) / 2
        this.orthographicCamera.right = (this.sizes.aspectRatio * this.sizes.frustrum)/2
        this.orthographicCamera.top = -this.sizes.frustrum / 2
        this.orthographicCamera.bottom = this.sizes.frustrum /2
        this.orthographicCamera.updateProjectionMatrix()
    }

    update()
    {

    }
}