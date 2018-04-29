import * as React from 'react';
import Particles from '../widgets/particles/Particles';
import Clock from '../widgets/clock/Clock';
import WeatherChart from '../widgets/weather-chart/WeatherChart';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import SystemInfo from '../widgets/system-info/SystemInfo';
import css from "./styles";

export default class MikesProfile extends React.Component<any, any> {

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
            <SystemInfo />
          </div>

        </div>

      </div>

    </div>
  }
}