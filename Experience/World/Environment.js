import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
export default class Environment{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.table = this.experience.world.room.table

        // this.gui = new GUI()
        this.obj = {
            colorObj: { r : 0, g : 0, b : 0},
            intensity: 3
        }

        this.setSunlight()
        this.setLampLight()
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

        this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(this.ambientLight)
    }

    setLampLight()
    {
        const width = 0.25;
        const height = 0.25;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 0.2595083713531494, 0.9766793847084045, -0.1834097057580948 );
        rectLight.lookAt( 0, 0, -1 );
        this.table.add( rectLight )

        const rectLightHelper = new RectAreaLightHelper( rectLight );
        rectLight.add( rectLightHelper );
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
            GSAP.to(this.ambientLight.color, {
                r:0,
                g:0,
                b:0
            })
        }else {
            GSAP.to(this.sunLight.color, {
                r:1,
                g:1,
                b:0
            })
            GSAP.to(this.ambientLight.color, {
                r:1,
                g:1,
                b:1
            })
        }
    }
}