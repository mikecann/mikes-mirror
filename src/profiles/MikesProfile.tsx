import * as React from 'react';
import Particles from '../plugins/particles/Particles';
import Clock from '../plugins/clock/Clock';
import WeatherChart from '../plugins/weather-chart/WeatherChart';
import SystemInfo from '../plugins/system-info/SystemInfo';
import css from "./styles";
import FacialRecogntionStats from '../plugins/facial-recognition/FacialRecogntionStats';
import { Profile } from '../plugins/profiles/Profile';
import { ProfilePicWithChangeBar } from '../components/ProfilePicWithChangeBar';

export default class MikesProfile extends Profile<any, any> {

  // componentDidMount() {
  //   // Play a sound when showing the profile
  //   new Howl({ src: ["./bell.wav"] }).play();
  // }

  render() {
    return <div className={css.profile}>

      {/* <Particles /> */}

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicWithChangeBar url="../facial_recognition/faces/mike.jpg" />
        </div>

        <div className={css.flex} />

        <div className={css.hozContainer}>


          <div className={css.vertContainer}>
            <div className={css.flex} />
            <FacialRecogntionStats />
            <SystemInfo />
          </div>
          <div className={css.flex} />
          <WeatherChart />

        </div>

      </div>

    </div>
  }
}