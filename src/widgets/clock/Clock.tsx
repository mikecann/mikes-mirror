import * as React from 'react';
import * as moment from 'moment';
import css from "./styles";
import { common } from '../../styles';
import { classes } from 'typestyle/lib';

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

        return <div className={css.clock}>
            <div>
                <span className={classes(css.hoursMins, common.bright)}>{time.format('hh:mm')}</span>
                <span className={classes(css.seconds, common.dimmed)}>{time.format('ss')}</span>                
            </div>  
            <div className={css.date}>
                <i className={classes(css.dateIcon, "far", "fa-calendar-alt", common.dimmed)} />
                {dateStr}
            </div>
        </div>
    }
}