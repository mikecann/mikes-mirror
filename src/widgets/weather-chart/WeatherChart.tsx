import * as React from 'react';
import css from "./styles";

interface Props {
}

interface State {
    image: HTMLImageElement | null
}

export default class WeatherChart extends React.Component<Props, State> {

    timer: NodeJS.Timer;
    canvas?: HTMLCanvasElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            image: null
        }
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 3600000);
        this.tick();
    }

    tick = () => {
        const image = document.createElement("img");
        image.src = `https://www.yr.no/place/Australia/Western_Australia/Perth/meteogram.png?r=${Math.random()}`;
        image.onload = () => {

            console.log("WeatherChart image loaded", {canvas: this.canvas});

            if (!this.canvas)
                return;

            const context = this.canvas.getContext("2d");
            if (!context)
                return;

            context.drawImage(image, -5, -25);

            this.setState({ image });
        };
    }

    onCanvasLoaded = (cnv: HTMLCanvasElement) => {
        this.canvas = cnv;
        this.tick();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { image } = this.state;
        return <div>
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
        return <div>
            Loading..
        </div>
    }
}