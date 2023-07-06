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
        this.sunLight.position.set(-10, 1, 3)
        this.scene.add(this.sunLight)

        // const shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(shadowHelper)

        this.ambientLight = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(this.ambientLight)
    }

    setLampLight()
    {
        // const width = 0.15;
        // const height = 0.15;
        // const intensity = 15;
        // const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        // rectLight.position.set( 0.22, 1, -0.13 );
        // rectLight.lookAt( -0.31366467475891113, 0.9642038941383362, 0.3891630470752716 );
        // this.table.add( rectLight )

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        // const spotLight = new THREE.SpotLight( 0xffffff );
        // spotLight.position.set( 0.22, 1.2, -0.13 );
        // spotLight.lookAt(-0.31366467475891113, 0.9642038941383362, 0.3891630470752716 )
        // this.table.add( spotLight );

        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( spotLightHelper );

        // const light = new THREE.PointLight( 0xffffff, 0.3, 100 );
        // light.position.set( -0.05, 1.2, 0.1 );
        // light.distance = 1
        // this.table.add( light );

        // const sphereSize = 1;
        // const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
        // this.scene.add( pointLightHelper );
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