import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import DishListItem from "../../components/DishListItem";
import {Ionicons} from "@expo/vector-icons";
import restaurants from  '../../../assets/data/restaurants.json';
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native"; 

const restaurant = restaurants[0];

const RestaurantDetailsPage = () => {

    const route = useRoute();
    const navigation = useNavigation(); 
    // this route information contains a lot of details about the state, the name of the rout, like
                              // where are you coming from and so on but what we are interested is in the id of a restaurant that
    const id = route.params.id;                          // is inside params.id...
    console.warn(id);
    return (
        <View style={styles.page}>

        <FlatList 
            ListHeaderComponent={() => <Header restaurant={restaurant}/>}
            data={restaurant.dishes}
            renderItem={({ item }) => <DishListItem dish={item} />}
            keyExtractor={(item) => item.name} // here we give this posibility to give it a key to extract our function that will specify that how 
                            // should i specify a key based on the item data
        />

        <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-circle"
            size={45} 
            color="white"
            style={styles.iconContainer} />

        </View> 
    );
};


export default RestaurantDetailsPage;
    