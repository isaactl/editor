import {EventEmitter} from "events"

export default class DataStore extends EventEmitter {
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

    removeChangeListener(callback) {
        console.log('unregister callback ' + callback.toString())
        this.removeListener('change', callback)
    }

    getServices() {
        let result = null
        setTimeout(function () {
            result = {
                'die': 'diek'
            };
            this.dispatchEvent(new Event('change'))
            console.log('get service' + JSON.stringify(result))
        }, 4000)

        console.log('get service outter' + JSON.stringify(result))
        return result
    }
}