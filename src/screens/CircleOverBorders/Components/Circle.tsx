import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Animated, PanResponder} from 'react-native';
import {borders} from '../../../assets/constants';
import {useTheme} from '../../../assets/hooks';

const SIZE = 50;
const INITIAL_POINTS = {x: 0, y: 0};
const OUTER_RADIUS = borders / 2;
const GRANT_ANIMATION = {
  toValue: 0.5,
  duration: 300,
  useNativeDriver: true,
};
const RELEASE_ANIMATION = {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
};
const OVER_BORDERS_ANIMATIONS = {
  toValue: 2,
  duration: 300,
  useNativeDriver: true,
};

export const Circle = () => {
  const {colors} = useTheme();
  const [isOverBorders, setOverBorders] = useState(false);
  const [wasTouched, setWasTouched] = useState(false);

  // Handle gestures
  const touch = useRef(new Animated.ValueXY(INITIAL_POINTS)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const panResponderHandler = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!wasTouched) {
          setWasTouched(true);
        }

        Animated.timing(opacity, GRANT_ANIMATION).start();
        Animated.timing(scale, GRANT_ANIMATION).start();
      },
      onPanResponderMove: (_, gestures) => {
        const overflowByXAxis = Math.abs(gestures.dx) > OUTER_RADIUS;
        const overflowByYAxis = Math.abs(gestures.dy) > OUTER_RADIUS;
        const overflowByCuts =
          Math.abs(gestures.dx) + Math.abs(gestures.dy) > OUTER_RADIUS + SIZE;

        setOverBorders(overflowByXAxis || overflowByYAxis || overflowByCuts);

        touch.setValue({x: gestures.dx, y: gestures.dy});
      },
      onPanResponderRelease: () => {
        Animated.timing(opacity, RELEASE_ANIMATION).start();
        Animated.timing(scale, RELEASE_ANIMATION).start();
        Animated.spring(touch, {
          toValue: INITIAL_POINTS,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  useEffect(() => {
    if (wasTouched) {
      if (isOverBorders) {
        Animated.timing(opacity, GRANT_ANIMATION).start();
        Animated.timing(scale, OVER_BORDERS_ANIMATIONS).start();
      } else {
        Animated.timing(opacity, GRANT_ANIMATION).start();
        Animated.timing(scale, GRANT_ANIMATION).start();
      }
    }
  }, [isOverBorders, wasTouched]);

  const theme = StyleSheet.create({
    circle: {
      backgroundColor: colors.infoMain,
    },
  });

  return (
    <Animated.View
      style={[
        styles.circle,
        theme.circle,
        {
          transform: [
            {translateX: touch.x},
            {translateY: touch.y},
            {scale: scale},
          ],
          opacity: opacity,
        },
      ]}
      {...panResponderHandler.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});