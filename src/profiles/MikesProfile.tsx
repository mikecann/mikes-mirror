import * as React from 'react';
import Particles from '../plugins/particles/Particles';
import Clock from '../plugins/clock/Clock';
import WeatherChart from '../plugins/weather-chart/WeatherChart';
import ProfilePicture from '../plugins/profile-picture/ProfilePicture';
import SystemInfo from '../plugins/system-info/SystemInfo';
import css from "./styles";
import FacialRecogntionStats from '../plugins/facial-recognition/FacialRecogntionStats';
import { Profile } from '../plugins/profiles/Profile';

export default class MikesProfile extends Profile<any, any> {

  // componentDidMount() {
  //   // Play a sound when showing the profile
  //   new Howl({ src: ["./bell.wav"] }).play();
  // }

  render() {
    return <div className={css.profile}>

      <Particles />

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicture url="../facial_recognition/faces/mike.jpg" />
        </div>

        <div className={css.flex} />

        <div className={css.hozContainer}>
          <WeatherChart />
          <div className={css.flex} />
          <div className={css.vertContainer}>
            <div className={css.flex} />
            <FacialRecogntionStats />
            <SystemInfo />
          </div>

        </div>

      </div>

    </div>
  }
}