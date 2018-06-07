import { AppStore } from '../stores/AppStore';
import { FacialRecognitionStore } from '../widgets/facial-recognition/FacialRecognitionStore';


export class FacialProfileSwitchingService
{
    constructor(private appStore: AppStore, private facialStore: FacialRecognitionStore)
    {

    }
    
    init() {
        this.facialStore.subscribe(this.onFacialStoreUpdate);
    }

    private onFacialStoreUpdate = () => {
        const state = this.facialStore.state;
        const newProfile = state.detections.length == 0 ? "empty" : state.detections[0].name;
        const timeToChangeProfile = this.appStore.isTimeToChangeProfile();
        
        if (newProfile == "empty") {
            if (timeToChangeProfile)
                this.appStore.changeProfile("empty");
        } 
        else {
            if (newProfile != this.appStore.state.profile)
                this.appStore.changeProfile(newProfile);
        }
    }

    destroy() {
        this.facialStore.unsubscribe(this.onFacialStoreUpdate);
    }
}