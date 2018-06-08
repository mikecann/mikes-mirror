// import { FacialRecognitionStore } from '../plugins/facial-recognition/FacialRecognitionStore';
// import { AppProfiles } from '../profiles/AppProfiles';
// import { Profiles } from '../plugins/profiles/Profiles';

// export class FacialProfileSwitchingController
// {
//     constructor(private profiles: Profiles<AppProfiles>, private facialStore: FacialRecognitionStore)
//     {

//     }
    
    // init() {
    //     this.facialStore.subscribe(this.onFacialStoreUpdate);
    // }

    // private onFacialStoreUpdate = () => {
    //     const state = this.facialStore.state;
    //     const newProfile = state.detections.length == 0 ? "empty" : state.detections[0].name;
    //     const timeToChangeProfile = this.profiles.isTimeToChangeProfile();
        
    //     if (newProfile == "empty") {
    //         if (timeToChangeProfile)
    //             this.profiles.changeProfile("empty");
    //     } 
    //     else {
    //         if (newProfile != this.profiles.state.profile)
    //             this.profiles.changeProfile(newProfile);
    //     }
    // }

    // destroy() {
    //     this.facialStore.unsubscribe(this.onFacialStoreUpdate);
    // }
//}