import React, { Component } from 'react';
import { AppRegistry, ScrollView, Text, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { Results } from './app/components/Results';
import { SearchMusic } from './app/components/SearchMusic';

class DownloadMusicApp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      search: '',
      visible: false,
      data: [],
      songs: []
    }; 
  }

  searchMusic () {
    if (this.state.search) {
      let search = this.state.search;

      this.setState({visible: true});
      this.setState({songs: []});
      
      fetch(`http://downloadmusic.nerone.me/api/search/${search}`)
        .then(response => response.json())
        .then(data => {
          this.setState({visible: false});
          this.setState({data});

          data.forEach(result => {
            console.log(result.snippet.title);
            this.setState({
              songs: this.state.songs.concat(<Results title={result.snippet.title} image={result.snippet.thumbnails.medium.url} videoId={result.id.videoId} />)
            }); 
          });
        })
        .catch(err => console.log(err));
    }
  }

  onUpdateSearch (search) {
    this.setState({search});
  }

  render () {
    let searchingMessage = "Searching...";

    return (
      <ScrollView>
        <Spinner visible={this.state.visible} textContent={searchingMessage} textStyle={{color: '#FFF'}} />

        <SearchMusic 
          onUpdateSearch={this.onUpdateSearch.bind(this)} 
          searchMusic={this.searchMusic.bind(this)}
          search={this.state.search}
        />

        {this.state.songs}
      </ScrollView>
    );
  }

}

AppRegistry.registerComponent('app', () => DownloadMusicApp);
