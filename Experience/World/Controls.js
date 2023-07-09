import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class Controls{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.room = this.experience.world.room.table
        this.light = this.experience.world.environment

        GSAP.registerPlugin(ScrollTrigger)
        this.setScrollTrigger()
    }

    setScrollTrigger()
    {
        ScrollTrigger.matchMedia({
	
            // desktop
            "(min-width: 969px)": ()=> {
                console.log('desktop')

                // First timeline
                this.firstTimeline = GSAP.timeline({
                    scrollTrigger:{
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: '0.6',
                        invalidateOnRefresh: true
                    }
                })
                this.firstTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0014
                    }
                })

                // Second timeline
                this.secondTimeline = GSAP.timeline({
                    scrollTrigger:{
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: '0.6',
                        invalidateOnRefresh: true
                    }
                })
                this.secondTimeline.to(this.room.position, {
                    x: ()=>{
                        return -2
                    },
                    z: ()=>{
                        return this.sizes.height * 0.003
                    }
                },
                "together")
                this.secondTimeline.to(this.room.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                },
                "together")
                
                // Third move
                this.thirdTimeline = GSAP.timeline({
                    scrollTrigger:{
                        trigger:'.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh:true
                    }
                })

                // this.thirdTimeline.to(this.camera.orthographicCamera.position, {
                //     y:15,
                //     z:20,
                // },'together2')

                this.thirdTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0014
                    }
                },'together2')
                this.thirdTimeline.to(this.room.scale, {
                    x:4,
                    y:4,
                    z:4
                },'together2')
                this.thirdTimeline.to(this.light.sunLight.position, {
                    x:-10,
                    y:1,
                    z:-3
                },'together2')
            },


            // mobile
            "(max-width: 968px)": ()=> {
                console.log('mobile')
            },
              
            // all 
            "all": function() {

            }
              
          }); 
    }

    resize()
    {

    }

    update()
    {

    }
}