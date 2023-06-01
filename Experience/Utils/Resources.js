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
        this.loaders.dracoLoader.setDecoderPath('/draco')
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    }

    startLoading()
    {
        
    }
}