import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'


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
        this.parentTable = this.resources.items.table
        this.table = this.resources.items.table.scene
        this.woodenTexture = this.resources.items.wood

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }

        // this.setModel()
        // this.setAnimation()
        this.onMouseMove()
        this.setTable()
        this.setTableAnimation()
    }

    setTable()
    {
        this.scene.add(this.table)
        console.log(this.woodenTexture)
        this.table.scale.set(2,2,2)
        this.table.children.forEach((child)=>{
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
            if( child.name === "Show")
            {
                if( child instanceof THREE.Object3D)
                {
                    child.children.forEach((showPiece)=>{
                        showPiece.children.forEach((piece)=>{
                            piece.castShadow = true
                            piece.receiveShadow = true
                        })
                    })
                }
            }

            if( child.name === "Table")
            {
                console.log(child.children[0].material.map = this.woodenTexture)
            }
        })

    }
    setTableAnimation()
    {
        this.mixer = new THREE.AnimationMixer(this.table)
        this.swing = this.mixer.clipAction(this.parentTable.animations[0])
        this.swing.play()
    }

    setModel()
    {
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.002, 0.002, 0.002)
        // this.actualRoom.rotation.y = Math.PI / 4
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
        this.table.rotation.y = this.lerp.current
    }
}