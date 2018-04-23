import * as React from 'react';
// import './weather-chart.css';
// import * as Spinner from "react-spinkit";
import css from "./styles";

interface Props {
}

interface State {
    cacheBuster: number,
    image: HTMLImageElement | null
}

export default class WeatherChart extends React.Component<Props, State> {

    timer: NodeJS.Timer;
    canvas?: HTMLCanvasElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            cacheBuster: 0,
            image: null
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.bustCache, 3600 * 1000);
        this.bustCache();
    }

    bustCache = () => {
        const bust = this.state.cacheBuster + 1;
        const image = document.createElement("img");
        image.src = `https://www.yr.no/place/Australia/Western_Australia/Perth/meteogram.png?r=${bust}`;
        image.onload = () => {

            console.log("WeatherChart image loaded", {canvas: this.canvas});

            if (!this.canvas)
                return;

            const context = this.canvas.getContext("2d");
            if (!context)
                return;

            context.drawImage(image, -5, -25);

            this.setState({ cacheBuster: bust, image });
        };
    }

    onCanvasLoaded = (cnv: HTMLCanvasElement) => {
        this.canvas = cnv;
        this.bustCache();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { image } = this.state;
        return <div className="weather-chart">
            <canvas 
                className={css.canvas}
                ref={this.onCanvasLoaded} 
                width={image ? image.width - 20 : 0} 
                height={image ? image.height - 40 : 0} 
            />
            {!image ? this.renderLoading() : null}
        </div>
    }

    renderLoading() {
        return <div className="spinner-container">
            {/* <Spinner name='ball-clip-rotate-multiple' /> */}
        </div>
    }
}