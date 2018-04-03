import * as React from 'react';
import './kelsies-profile.css';
import Clock from '../widgets/clock/Clock';
import App from '../App';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import NewsRSS from '../widgets/news-rss/NewsRSS';

interface Props {
  app: App
}

export default class MikesProfile extends React.Component<Props, any> {
  render() {

    return <div className="kelsies-profile">
      <Clock />          
      <WelcomeMessage message="Hey there beautiful" />
      <ProfilePicture url="kelsie_6.png" />
      <div style={{ height: 20 }} /> 
      <NewsRSS 
        style={{ marginLeft: 20, maxWidth: "40em" }}
        title="Latest Health and Wellness News"
        feedUrl="http://www.health.com/mind-body/feed" 
      />
      {/* <FaceDetect />   */}
    </div>
  }
}