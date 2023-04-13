import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";


const RestaurantDetailsPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;
  
//   const fetchRestaurant = async () => {
//     if(id) {
//         const response = await DataStore.query(Restaurant, id);
//         setRestaurant(response);

//         const dishResponse = await DataStore.query(Dish, (dish) =>
//         dish.restaurantID("eq", id)
//         );
//         setDishes(dishResponse);
//     }
//   };

//   useEffect(() => {
//     fetchRestaurant();
//   }, [id]);
  useEffect(() => {
    // fetch the restaurant with the id
    DataStore.query(Restaurant, id).then(setRestaurant);

    DataStore.query(Dish, (dish) => dish.restaurantID.eq(id)).then(
      setDishes
    );
  }, [id]);


  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
};

export default RestaurantDetailsPage;
