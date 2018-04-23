import * as React from 'react';

interface Props {
    onChangeProfile: (profile: string) => void
    onNextProfile: () => void
    onPrevProfile: () => void
}

interface State {
}

export default class ManualProfileSwitcher extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
    }

    onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft")
            this.props.onPrevProfile();
        else if (e.key === "ArrowRight")
            this.props.onNextProfile();
    }

    render() {
        return <div>
            {/* <button onClick={this.props.onPrevProfile}>
                prev profile
            </button>
            <button onClick={this.props.onNextProfile}>
                next profile
            </button> */}
        </div>
    }
}