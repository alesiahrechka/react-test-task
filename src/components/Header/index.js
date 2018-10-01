import React from 'react';

export default class Header extends React.Component {

    render(){
        return(
            <header>
                <h1>News App {new Date().toDateString()}
                </h1>
            </header>
        );
    }
}