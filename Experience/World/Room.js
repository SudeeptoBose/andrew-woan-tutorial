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
        this.actualRoom.position.x = 0   
    }
}