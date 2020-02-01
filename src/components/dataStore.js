import {EventEmitter} from "events"

export default class DataStore extends EventEmitter {
    constructor(props) {
        super();
        this.state = {
            serverList: null
        }

        this.handleChange=this.handleChange.bind(this)
        this.triggerChangeEvent=this.triggerChangeEvent.bind(this)
        this.getServices=this.getServices.bind(this)
    }

    static myInstance = null

    static getInstance() {
        if (DataStore.myInstance == null) {
            DataStore.myInstance = new DataStore()
            console.log("create data store")
            DataStore.myInstance.addChangeListener(DataStore.myInstance.handleChange)
        }

        return DataStore.myInstance
    }

    handleChange() {
        console.log('handle change in data store')
    }

    addChangeListener(callback) {
        console.log('register callback ' + callback.toString())
        this.addListener('change', callback)
    }

    triggerChangeEvent() {
        this.emit('change')
    }

    removeChangeListener(callback) {
        console.log('unregister callback ' + callback.toString())
        this.removeListener('change', callback)
    }

    fetchData() {
        setTimeout(function () {
            const result = {
                'die': 'diek'
            };
            DataStore.myInstance.state.serverList = result
            DataStore.myInstance.triggerChangeEvent()
        }, 4000)
    }

    getServices() {
        if (this.state.serverList === null) {
            this.fetchData()
            return null
        }
        console.log('get service outer ' + JSON.stringify(this.state.serverList))
        return this.state.serverList
    }
}