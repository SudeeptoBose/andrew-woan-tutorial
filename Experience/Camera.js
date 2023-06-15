import Experience from "./Experience";
import * as THREE from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
export default class Camera{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas

        this.createPerspectiveCamera()
        this.createOrthographicCamera()
        this.setOrbitControls()
        // this.setHelpers()
    }

    createPerspectiveCamera()
    {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 0.1, 1000)
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.z = 15
        this.perspectiveCamera.position.y = 15

        const size = 20;
        const divisions = 10;
        
        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper );
        
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
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

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
        this.controls.zoom = true
    }

    setHelpers()
    {
        this.helper = new THREE.CameraHelper( this.perspectiveCamera );
        this.scene.add( this.helper );
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
        this.controls.update()
    }
}