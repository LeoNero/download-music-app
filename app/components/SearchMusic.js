import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-material-design';

export class SearchMusic extends Component {
  constructor (props) {
    super(props);
  }

  handleChange (search) {
    this.props.onUpdateSearch(search); 
  }

  render () {
    return (
      <View>
        <TextInput
          onChangeText={(search) => this.handleChange(search)}
          value={this.props.search}
        />
          
        <Button value="Search!" text="Search!" onPress={() => this.props.searchMusic()} overrides={{backgroundColor: 'paperGreen'}}/>
      </View>
    );
  }

}
