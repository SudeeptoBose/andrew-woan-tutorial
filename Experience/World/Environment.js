import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setSunlight()
    }

    setSunlight()
    {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 5)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.camera.near = 5
        this.sunLight.shadow.mapSize.set(2048, 2048)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(1.5, 10, 3)
        this.scene.add(this.sunLight)

        const shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        this.scene.add(shadowHelper)

        this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(this.ambientLight)
    }
}