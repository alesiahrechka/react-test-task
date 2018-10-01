import React from 'react';

import FeedItemList from '../FeedItemList';
import Header from '../Header';
import Footer from '../Footer';

export default class MainComponent extends React.Component {
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

                <Header/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.searchText} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <FeedItemList feeds={this.state.feeds}/>
                <Footer/>
            </div>
        );
    }
}
