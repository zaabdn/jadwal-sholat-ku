import { COLORS } from "../../utils/colors";
import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  BackHandler,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  children: React.ReactNode;
  maxHeight?: number;
  minHeight?: number;
  isVisible: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  maxHeight = SCREEN_HEIGHT,
  minHeight = SCREEN_HEIGHT - 20,
  isVisible,
  onClose,
}) => {
  const panY = useRef(new Animated.Value(maxHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Add back button listener when the sheet becomes visible
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        onClose();
        return true; // Prevent default behavior (app exit)
      });

      // Clean up the listener when the sheet is hidden or component unmounts
      return () => backHandler.remove();
    } else {
      Animated.parallel([
        Animated.spring(panY, {
          toValue: maxHeight,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, maxHeight, panY, backdropOpacity]);

  const resetBottomSheet = Animated.spring(panY, {
    toValue: 0,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.parallel([
    Animated.spring(panY, {
      toValue: maxHeight,
      useNativeDriver: true,
    }),
    Animated.timing(backdropOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          panY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > maxHeight / 3) {
          closeBottomSheet.start(() => onClose());
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  const translateY = panY.interpolate({
    inputRange: [0, maxHeight],
    outputRange: [0, maxHeight],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
            display: isVisible ? "flex" : "none",
          },
        ]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }],
            maxHeight: maxHeight,
            minHeight: minHeight,
          },
        ]}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  backdropTouchable: {
    flex: 1,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.BACKGROUND,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
});

export default BottomSheet;
