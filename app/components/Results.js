import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import RNFetchBlob from 'react-native-fetch-blob';

export class Results extends Component {
  downloadSong () {
    let videoId = this.props.videoId;
    const downloadDest = `${RNFetchBlob.fs.dirs.MusicDir}/${this.props.title}.mp3`;

    RNFetchBlob
      .config({
        addAndroidDownloads: {
          useDownloadManager : true,
          notification : true,
          mime : 'audio/mpeg3',
          mediaScannable : true,
          description : 'Downloading song...'
        }
      })
      .fetch('GET', `http://downloadmusic.nerone.me/api/download/mp3/${videoId}`)
      .then((res) => {

        RNFetchBlob.fs.scanFile([ { path : downloadDest, mime: 'audio/mpeg3' } ])
          .then(() => {
            console.log("scan file success")
          })
          .catch((err) => {
            console.log("scan file error")
          });

        console.log('The file saved to ', res.path())
      })
      .catch((errorMessage, statusCode) => {
        console.log('Error: ' + errorMessage);
        console.log('Status code: ' + statusCode);
      }); 
  }

  render () {
    let img = {
      uri: this.props.image
    };

    return (
      <View>
        <Card>
          <Card.Media image={<Image source={img} />} />
          <Card.Body>
            <Text>{this.props.title}</Text>
          </Card.Body>
          <Card.Actions position="right">
            <Button value="Download" text="Download" onPress={() => this.downloadSong()} />
          </Card.Actions>
        </Card>
      </View>
    );
  } 
}
