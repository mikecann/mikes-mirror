import * as React from 'react';
import Clock from '../widgets/clock/Clock';
import WelcomeMessage from '../widgets/welcome-message/WelcomeMessage';
import ProfilePicture from '../widgets/profile-picture/ProfilePicture';
import NewsRSS from '../widgets/news-rss/NewsRSS';
import App from '../components/App';
import css from "./styles";

interface Props {
  app: App
}

export default class MikesProfile extends React.Component<Props, any> {
  render() {

    return <div className={css.profile}>

      <div className={css.rootContainer}>

        <div className={css.hozContainer}>
          <Clock />
          <div className={css.flex} />
          <ProfilePicture url="kelsie_6.png" />
        </div>

        <NewsRSS
          style={{ marginLeft: 20, maxWidth: "40em" }}
          title="Latest Health and Wellness News"
          feedUrl="http://www.health.com/mind-body/feed"
        />


        <div className={css.flex} />

        <div className={css.hozContainer}>
          <div className={css.flex} />
          <WelcomeMessage message="Hey there beautiful" />
          <div className={css.flex} />
        </div>

      </div>

    </div>

  }
}