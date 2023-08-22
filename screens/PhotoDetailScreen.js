import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const PhotoDetailScreen = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo.url_s }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  image: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default PhotoDetailScreen;
