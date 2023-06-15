import * as THREE from 'three'
import Experience from '../Experience'

export default class Room{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.resources = this.experience.resources
        this.room = this.resources.items.room
        this.actualRoom = this.room.scene

        this.setModel()
    }

    setModel()
    {
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.01, 0.01, 0.01)
        this.actualRoom.rotation.y = Math.PI /4

        this.actualRoom.children.forEach((child)=>{
            console.log(child)
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
        })
    }
}