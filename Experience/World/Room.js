import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

export default class Room{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.room = this.resources.items.room
        this.actualRoom = this.room.scene

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        this.setModel()
        this.setAnimation()
        this.onMouseMove()
    }

    setModel()
    {
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.002, 0.002, 0.002)
        // this.actualRoom.rotation.y = Math.PI / 4
        this.actualRoom.position.y = -1

        // const width = 1;
        // const height = 1;
        // const intensity = 1;
        // const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        // rectLight.position.set( 0, 0, 0 );
        // rectLight.lookAt( 0, 0, 0 );
        // this.actualRoom.add( rectLight )

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.actualRoom.children.forEach((child)=>{
            // console.log(child)
            child.castShadow = true
            child.receiveShadow = true

            if( child instanceof THREE.Object3D )
            {
                child.children.forEach((objectChild)=>{
                    objectChild.castShadow = true
                    objectChild.receiveShadow = true
                    // if(child.children instanceof THREE.Group)
                    // {
                    //     child.children.children.forEach((groupChild)=>{
                    //         groupChild.castShadow = true
                    //         groupChild.receiveShadow = true
                    //     })
                    // }
                })
            }

            if( child.name === "aquaglass")
            {
                child.material = new THREE.MeshPhysicalMaterial()
                child.material.roughness = 0
                child.material.color.set(0x00ffff)
                child.material.ior = 2
                child.material.transmission = 1
                child.material.opacity = 1
            }

            if( child.name === "screen")
            {
                child.material = new THREE.MeshBasicMaterial(
                    {
                        map: this.resources.items.screen
                    }
                )
            }

    
            // const rectLightHelper = new RectAreaLightHelper( rectLight );
            // rectLight.add( rectLightHelper );
        })
    }

    setAnimation()
    {
        this.mixer = new THREE.AnimationMixer(this.actualRoom)
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play()
    }

    onMouseMove()
    {
        window.addEventListener('mousemove', (e)=>
        {
            this.rotation = (e.clientX - window.innerWidth / 2) * 2 / window.innerWidth
            this.lerp.target = this.rotation * 0.1
        })
    }
    resize()
    {

    }

    update()
    {
        this.mixer.update(this.time.delta * 0.001)

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )
        this.actualRoom.rotation.y = this.lerp.current
    }
}