import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PlayPauseButton from './PlayPauseButton';
import { PLAYER_HEIGHT } from '../utils/constants';


class Player extends React.PureComponent {
  static defaultProps = {
    currentSong: '',
    duration: 50,
  };

  state = {
    isPlaying: false
  }

  handlePlayToggle = () => {
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  };

  render() {
    const { isPlaying } = this.state
    const { currentSong: {track} } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {track.name}
            </Text>
            <Text style={styles.subTitle}>
              {track.album.name}
            </Text>
          </View>
          <View style={styles.controls}>
            <PlayPauseButton
              onPress={this.handlePlayToggle}
              isPlaying={isPlaying}
            />
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressIndicator} />
        </View>
      </View>
    );
  }
}

export default Player;

const styles = StyleSheet.create({
  container: {
    height: PLAYER_HEIGHT,
    alignItems: 'stretch',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#f5f9ff',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    alignItems: 'stretch',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  subTitle: {
    color: '#333',
    fontSize: 14,
  },
  title: {
    color: '#131313',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    alignSelf: 'stretch',
    height: 3,
    marginBottom: 15,
    backgroundColor: '#131313',
  },
  progressIndicator: {
    top: -4,
    height: 10,
    width: 10,
    left: 0,
    position: 'relative',
    borderRadius: 5,
    backgroundColor: '#3903fc',
  },
});
