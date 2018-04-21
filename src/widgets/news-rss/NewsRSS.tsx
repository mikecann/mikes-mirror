import * as React from 'react';
import * as RSSParser from "rss-parser";
// import './rss-news.css';
// import * as Spinner from "react-spinkit";
import * as moment from "moment";
import css from "./styles";

interface Props {
    feedUrl: string;
    title: string;
    style?: React.CSSProperties;
}

interface State {
    state: "loading" | "loaded";
    feed?: Feed;
}

type FeedItem = {
    date: string, 
    title: string,
    pubDate: string
}

type Feed = {
    items: FeedItem[]
}

export default class NewsRSS extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            state: "loading"
        }
    }

    async componentDidMount() {
        const parser = new RSSParser();
        let feed: Feed = await parser.parseURL(this.props.feedUrl);
        console.log("rss feed loaded", feed);
        this.setState({ feed });
    }

    render() {
        const { feed } = this.state;
        return <div style={this.props.style}>
            <h1 className={css.title}>{this.props.title}</h1>
            {feed ? this.renderFeed(feed) : this.renderLoading()}
        </div>
    }

    renderFeed(feed: Feed) {
        const items = feed.items.slice(0, 10);
        return <ul>
            {items.map((item, i) => <FeedItem key={i} item={item} />)}
        </ul>;
    }

    renderLoading() {
        return <div className="spinner-container">
            {/* <Spinner name='ball-clip-rotate-multiple' /> */}
        </div>
    }
}

const FeedItem = (props: {item: FeedItem}) => 
    <li>        
        <span>{props.item.title.replace("&nbsp;", "")}</span>
        <span className="normal">{moment(props.item.pubDate).fromNow()}</span>
    </li>