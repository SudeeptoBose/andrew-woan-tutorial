import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import GUI from 'lil-gui'
export default class Environment{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // this.gui = new GUI()
        this.obj = {
            colorObj: { r : 0, g : 0, b : 0},
            intensity: 3
        }

        this.setSunlight()
        // this.setGUI()
    }

    setGUI()
    {
        this.gui.addColor(this.obj, "colorObj" )
    }

    setSunlight()
    {
        this.sunLight = new THREE.DirectionalLight("#ffff00", 5)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 20
        this.sunLight.shadow.camera.near = 5
        this.sunLight.shadow.mapSize.set(2048, 2048)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(10, 10, 3)
        this.scene.add(this.sunLight)

        // const shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(shadowHelper)

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.ambientLight)
    }

    switchTheme(theme)
    {
        if(theme === "dark")
        {
            console.log('switch')
            GSAP.to(this.sunLight.color, {
                r:1,
                g:0,
                b:1
            })
        }else {
            GSAP.to(this.sunLight.color, {
                r:1,
                g:1,
                b:1
            })
        }
    }
}