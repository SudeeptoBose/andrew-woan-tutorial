import * as THREE from 'three'
import Experience from '../Experience'
import Room from './Room'
import Environment from './Environment'
import Controls from './Controls'
import Floor from './Floor'

export default class World{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.theme = this.experience.theme

        this.resources.on('ready', ()=>{
            this.room = new Room()
            this.environment = new Environment()
            console.log('created room')
            this.floor = new Floor()
            this.controls = new Controls()
        })

        this.theme.on("switch", (theme)=>{
            this.switchTheme(theme)
        })
    }

    switchTheme(theme)
    {
        if(this.environment)
        {
            this.environment.switchTheme(theme)
        }
    }

    resize()
    {

    }

    update()
    {
        if(this.room)
        {
            this.room.update()
        }
        if(this.controls)
        {
            this.controls.update()
        }
    }
}