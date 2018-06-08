import * as React from 'react';
//import css from "./styles";

interface Props {
}

interface State {
  animals: string[]
}

export default class RandomCute extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            animals: ["nF79jOW"]
        }
    }

    async componentDidMount() {
        var resp = await fetch("https://raw.githubusercontent.com/heyitsolivia/secretpuppies/master/puppies.json");
        var puppies: string[] = await resp.json();
        this.setState({ animals: puppies });
    
        resp = await fetch("https://raw.githubusercontent.com/heyitsolivia/secretpuppies/master/kittens.json");
        var kittens: string[] = await resp.json();
        this.setState({ animals: puppies.concat(kittens) });
      }

    render() {

        const puppyId = this.state.animals[Math.floor(Math.random()*this.state.animals.length)];
        const puppy = `https://i.imgur.com/${puppyId}.mp4`;

        return <div>
            <video src={puppy} autoPlay loop />
        </div>
    }
}