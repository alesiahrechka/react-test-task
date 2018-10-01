import React from 'react';

export default class FeedItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLiked: false};
        this.markFeed = this.markFeed.bind(this);
    }

    markFeed() {
        this.setState({isLiked: !this.state.isLiked});
    };

    render() {
        return (
            <div className="feedItem">
                <img src={this.state.isLiked ? "images/liked.png" : "images/unliked.png"} width="30"
                     onClick={this.markFeed}/>
                <h2>{this.props.title}</h2>
                <h3>{this.props.byLine}</h3>
                <p>{this.props.description}</p>
                <img src={this.props.imageURL} width="400"/>
                <br/>
                <a href={this.props.newsURL}>read article</a>
            </div>
        )
    }
}
