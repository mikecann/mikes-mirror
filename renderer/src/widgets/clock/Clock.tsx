import * as React from 'react';
import './clock.css';
import * as moment from 'moment';

interface State {
    time: moment.Moment;
}

export default class Clock extends React.Component<any, State> {

    timer: NodeJS.Timer;

    state = {
        time: moment()
    };

    componentDidMount() {
        this.timer = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateTime = () => this.setState({ time: moment() });

    render() {
        const {time} = this.state;
        const dateStr = time.format(`dddd MMMM Do`);

        return <div className="clock">
            <div className="the-time">
                <span className="hours-minutes bright">{time.format('hh:mm')}</span>
                <span className="seconds dimmed">{time.format('ss')}</span>                
            </div>  
            <div className="the-date">
                <i className="date-icon far fa-calendar-alt dimmed" />
                {dateStr}
            </div>
        </div>
    }
}