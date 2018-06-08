import { observable, action, computed } from "mobx";
import { Profiles } from './Profiles';
import { wrap } from '../../utils/utils';


export class ProfilesStore<T extends Profiles>
{
    @observable profile: keyof T;
    @observable profiles: T;
    @observable isProfileLocked = false;
    @observable timeProfileChanged = Date.now();
    @observable msBetweenProfileChanges = 1000;

    constructor(profiles: T, initialProfile: keyof T) {
        this.profiles = profiles;
        this.profile = initialProfile;
    }

    @action
    changeProfile(name: keyof T) {
        
        if (name == this.profile)
            return;

        console.log(`ProfilesStore changed profile to`, name);
        this.profile = name;
    }

    @action
    nextProfile() {
        var keys = Object.keys(this.profiles);
        let nextIndex = wrap(0, keys.length, keys.indexOf(this.profile + "") + 1);
        console.log(`ProfilesStore nextProfiled`, { nextIndex });
        this.changeProfile(keys[nextIndex]);
    }

    @action
    prevProfile() {
        var keys = Object.keys(this.profiles);
        let nextIndex = wrap(0, keys.length, keys.indexOf(this.profile + "") - 1);
        console.log(`ProfilesStore prevProfile`, { nextIndex });
        this.changeProfile(keys[nextIndex]);
    }

    @action
    lockProfile(profile: string) {
        console.log("ProfilesStore profile locked to", profile);
        this.changeProfile(profile);
        this.isProfileLocked = true;
    }

    @action
    unlockProfile() {
        console.log("ProfilesStore unlocking profile");
        this.isProfileLocked = false;
    }

    @computed
    get isTimeToChangeProfile() {
        return Date.now() - this.timeProfileChanged! >= this.msBetweenProfileChanges;
    }

    @computed
    get msRemainingBeforeChange() {
        return this.msBetweenProfileChanges - (Date.now() - this.timeProfileChanged);
    }
}