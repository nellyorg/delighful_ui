import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { runLinearTiming } from '../utils/animationHelpers';

const { Clock, block, concat, interpolate, Value } = Animated;

class PlayPauseButton extends React.PureComponent {
  clock = new Clock();
  
  playingState = new Value(this.props.isPlaying ? 1 : 0);

  pauseOpacity = block([
    runLinearTiming({ clock: this.clock, toValue: this.playingState }),
  ]);

  playOpacity = interpolate(this.pauseOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  rotation = interpolate(this.pauseOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 180],
  });
  
  componentDidUpdate(prevProps) {
    const { isPlaying } = this.props
    if (isPlaying !== prevProps.isPlaying) {
      this.playingState.setValue(isPlaying ? 1 : 0)
    } 
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <Animated.View
            style={{
              transform: [
                {
                  rotateY: concat(this.rotation, 'deg'),
                },
              ],
            }}
          >
            <Animated.View
              style={[styles.control, { opacity: this.pauseOpacity }]}
            >
              <Ionicons name="md-pause" size={26} color={'#131313'} />
            </Animated.View>

            <Animated.View
              style={[
                styles.control,
                styles.playIcon,
                { opacity: this.playOpacity },
              ]}
            >
              <Ionicons name="md-play" size={26} color={'#131313'} />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PlayPauseButton;

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 23,
  },
  control: {
    position: 'absolute',
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginLeft: 2,
  },
});
