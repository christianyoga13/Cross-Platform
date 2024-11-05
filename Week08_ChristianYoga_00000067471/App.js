import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostCard from "./components/Post";
import Forms from "./components/Forms";
import { getUsers } from "./services/axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setPosts(data.data);
      } catch (error) {
        console.error("Error loading posts", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.updatedPost) {
      const updatedPost = route.params.updatedPost;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    }
  }, [route.params?.updatedPost]);

  const handlePress = (post) => {
    navigation.navigate('Forms', { post });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={handlePress} />
        )}
      />
    </View>
  );
}


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Posts" }}
          />
          <Stack.Screen
            name="Forms"
            component={Forms}
            options={{ title: "Edit Post" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
});
