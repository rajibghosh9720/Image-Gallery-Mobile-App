import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=79e4794ff0b80cfad9b6998aac1095cf&format=json&nojsoncallback=1&extras=url_s"
      );
      if (response.data && response.data.photos && response.data.photos.photo) {
        setPhotos(response.data.photos.photo);
        await AsyncStorage.setItem(
          "cachedPhotos",
          JSON.stringify(response.data.photos.photo)
        );
      } else {
        console.error("Invalid API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const getCachedPhotos = async () => {
    try {
      const cachedPhotos = await AsyncStorage.getItem("cachedPhotos");
      if (cachedPhotos) {
        setPhotos(JSON.parse(cachedPhotos));
      }
    } catch (error) {
      console.error("Error getting cached photos:", error);
    }
  };

  useEffect(() => {
    getCachedPhotos();
    fetchPhotos();
  }, []);

  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PhotoDetail", { photo: item })}
      style={styles.imageContainer}
    >
      <Image source={{ uri: item.url_s }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPhoto}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  image: {
    width: windowWidth / 3,
    height: windowWidth / 3,
    margin: 1,
  },
});

export default HomeScreen;
