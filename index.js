import React from 'react';
import ReactDOM from 'react-dom';

class FeedItem extends React.Component {
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

class FeedItemsList extends React.Component {
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

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchText: '', isLoaded: false, feeds: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatedFeeds = this.updatedFeeds.bind(this);
    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleSubmit(event) {
        this.updatedFeeds(this.state.searchText)
        event.preventDefault();
    }

    updatedFeeds(searchText){
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=f1b551c882a94678b861771a8240f215&q=${searchText}`)
            .then(response => response.json())
            .then(feeds => {
                this.setState(
                    {
                        isLoaded: true,
                        feeds: feeds.articles
                    })
            });

    }

    componentDidMount(){
         this.updatedFeeds("");
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.searchText} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
               <FeedItemsList feeds={this.state.feeds}/>
            </div>
        );
    }
}


ReactDOM.render(<MainComponent/>
    , document.getElementById('container'));

