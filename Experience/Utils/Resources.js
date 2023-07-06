import * as THREE from 'three'
import { EventEmitter } from "events";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";

import Experience from "../Experience";

export default class Resources extends EventEmitter{
    constructor(assets)
    {
        super()
        this.experience = new Experience()
        this.renderer = this.experience.renderer

        this.assets = assets

        this.items = {}
        this.queue = this.assets.length
        this.loaded = 0
        
        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading()
    {
        for(const asset of this.assets)
        {
            if(asset.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(asset.path, (file) =>{
                    this.singleAssetLoaded(asset, file)
                })
            } else if(asset.type === 'videoTexture')
            {
                this.video = {}
                this.videoTexture = {}

                this.video[asset.name] = document.createElement('video')
                this.video[asset.name].src = asset.path
                this.video[asset.name].muted = true
                this.video[asset.name].loop = true
                this.video[asset.name].playsInline = true
                this.video[asset.name].play()

                this.video[asset.name].autoplay = true

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name])
                this.videoTexture[asset.name].flipY = false
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter
                this.videoTexture[asset.name].magFilter = THREE.NearestFilter
                this.videoTexture[asset.name].generateMipmaps = false
                this.videoTexture[asset.name].outputColorSpace = THREE.SRGBColorSpace
                
                this.singleAssetLoaded(asset, this.videoTexture[asset.name])
            }
            else if(asset.type === 'texture')
            {
                this.loaders.textureLoader.load(asset.path, (file) =>{
                    this.singleAssetLoaded(asset, file)
                })
            }
        }
    }

    singleAssetLoaded(asset, file)
    {
        this.items[asset.name] = file
        this.loaded++

        console.log("assest is loading")
        if(this.loaded === this.queue)
        {
            console.log("all loaded")
            this.emit('ready')
        }
    }
}