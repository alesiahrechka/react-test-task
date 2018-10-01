import React from 'react';
import FeedItem from '../FeedItem'

export default class FeedItemsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                {this.props.feeds.map(feed => <FeedItem title={feed.title} byLine={feed.author}
                                                        description={feed.description}
                                                        imageURL={feed.urlToImage}
                                                        newsURL = {feed.url}
                />)}
            </div>
        )
    }
}
