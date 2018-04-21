import * as React from 'react';
import Particles from '../widgets/particles/Particles';
import Clock from '../widgets/clock/Clock';
import WeatherChart from '../widgets/weather-chart/WeatherChart';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import SystemInfo from '../widgets/system-info/SystemInfo';
import App from '../components/App';
import css from "./styles";

interface Props {
  app: App
}

export default class MikesProfile extends React.Component<Props, any> {
  render() {
    return <div className={css.profile}>
      <Particles />

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicture url="mike_4.png" />
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