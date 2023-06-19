import * as THREE from 'three'
import Experience from '../Experience'

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

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.005, 0.005, 0.005)
        this.actualRoom.rotation.y = Math.PI /4
        this.actualRoom.position.y = -1

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
        })
    }

    setAnimation()
    {
        this.mixer = new THREE.AnimationMixer(this.actualRoom)
        this.swim = this.mixer.clipAction(this.room.animations[0])
        this.swim.play()
    }
    resize()
    {

    }

    update()
    {
        this.mixer.update(this.time.delta * 0.001)
    }
}