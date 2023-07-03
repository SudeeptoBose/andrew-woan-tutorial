import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'

export default class Floor{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources

        this.setFloor()

    }

    setFloor()
    {
        this.geometry = new THREE.PlaneGeometry(100,100)
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane)
        this.plane.rotation.x = - Math.PI / 2
        // this.plane.position.y = -1
        this.plane.receiveShadow = true
    }

    resize()
    {

    }

    update()
    {

    }
}