class MixinBuilder {
    _superClass: any;
    constructor(superClass) {
        this._superClass = superClass;
    }
    
    with(...mixins): any {
        return mixins.reduce((makedClass, mixin) => mixin(makedClass), this._superClass);
    }
}
const mix = (superClass) => new MixinBuilder(superClass);

const Savable = (superClass) => class extends superClass {
    latestSaveTime: Date;
    save() {
        this.latestSaveTime = new Date();
        console.log('saved');
    }
}

const Activatable = (superClass) => class extends superClass {
    latestActiveTime: Date;
    activate() {
        this.latestActiveTime = new Date();
        console.log('activated');
    }
}

class Manager {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

class ConfigurationManager extends mix(Manager).with(Savable, Activatable) {
    timerId: NodeJS.Timeout;
    constructor(id: number) {
        super(id);
        this.timerId = setInterval(() => {
            console.log(`ConfigurationManager's id: ${this.id}, saveTime: ${this.latestSaveTime}, activateTime: ${this.latestActiveTime}`);
        }, 500)
    }
    saveAndActivate() {
        this.save();
        this.activate();
        setTimeout(() => {
            clearInterval(this.timerId);
            console.log('정지됨');
        }, 2000);
    }
}

export default {
    test: () => {
        let cm = new ConfigurationManager(123);
        setTimeout(() => {
            cm.saveAndActivate();
        }, 1200);

        // mixed function call.
        cm.save();
        cm.activate();
    }
}