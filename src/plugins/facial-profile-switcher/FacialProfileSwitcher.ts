import { FacialRecognitionStore } from '../facial-recognition/FacialRecognitionStore';
import { autorun, IReactionDisposer, observable, action } from 'mobx';
import { ProfilesStore } from '../profiles/ProfilesStore';

export class FacialProfileSwitcher
{
    @observable timeOfNextSwitch: number;

    private disposer?: IReactionDisposer;

    constructor(
        private profiles: ProfilesStore<any>, 
        private facialStore: FacialRecognitionStore,
        public minDelayBetweenSwitchesMs: number = 10000)
    {
        this.timeOfNextSwitch = Date.now();
    }
    
    start() {
        this.disposer = autorun(() => {

            const event = this.facialStore.event;

            if (!event)
                return this.changeIfTime("empty");

            if (!event.detections)
                return this.changeIfTime("empty");
            
            if (event.detections.length == 0)
                return this.changeIfTime("empty");

            this.changeIfTime(event.detections[0].name);    
        })
    }

    @action
    private changeIfTime(profile: string) {

        if (profile == this.profiles.profile) {
            this.timeOfNextSwitch = Date.now() + this.minDelayBetweenSwitchesMs;
            return;
        }
            
        if (this.profiles.profile == "empty")
            return this.change(profile);

        if (Date.now() < this.timeOfNextSwitch)
            return;

        this.change(profile);
    }

    @action
    private change(profile: string) {
        this.timeOfNextSwitch = Date.now() + this.minDelayBetweenSwitchesMs;
        this.profiles.changeProfile(profile);
    }

    destroy() {
        if (this.disposer)
            this.disposer();

        this.disposer = undefined;
    }
}