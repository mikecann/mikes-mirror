import * as React from 'react';
import './mikes-profile.css';
import Particles from '../widgets/particles/Particles';
import Clock from '../widgets/clock/Clock';
import App from '../App';
import WeatherChart from '../widgets/weather-chart/WeatherChart';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';

interface Props {
  app: App
}

export default class MikesProfile extends React.Component<Props, any> {
  render() {
    return <div className="mikes-profile">
      <WeatherChart />
      <Particles />
      <Clock />    
      
      {/* <WelcomeMessage message="Hi Mike" /> */}
      <ProfilePicture url="mike_4.png" />
      {/* <FaceDetect />   */}
      
    </div>
  }
}