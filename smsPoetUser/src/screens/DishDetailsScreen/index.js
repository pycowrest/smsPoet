import { View, Text, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";


const DishDetailsScreen = () => {
    const [dish, setDish] = useState(null);
    const [quantity, setQuantity]= useState(1); // useState Hook will give us back and array of two values.

    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id; // it might be null so we add ?


    useEffect(() => {
        if (id) {
        DataStore.query(Dish, id).then(setDish);
        }
    }, [id]);

    const onMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        };
    };

    const onPlus = () => {
        setQuantity(quantity + 1)
    };

    const getTotal = () => {
        return (dish.price * quantity).toFixed(2);
    };
    // const value = state[0];    // the first item in that array is value
    // const setter = state[1]   // this is basically a function that helps us update the value in satate
        // we can just change the value of the state with the setter function not by value.

        // now we comment both above cause we can define these when just we creat useState.

    if (!dish) {
        return <ActivityIndicator color="gray" size="large" />
    };
    return (
        <View style={styles.page}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <View style={styles.separator}/>

            <View style={styles.row}>
                <AntDesign 
                  name="minuscircleo" 
                  size={60} color={"black"} 
                  onPress={onMinus} 
                />
                <Text style={styles.quantity}>{quantity}</Text> 
                <AntDesign 
                  name="pluscircleo" 
                  size={60} 
                  color={"black"} 
                  onPress={onPlus}
                />  
            </View>

            <Pressable 
                onPress={() => navigation.navigate("Basket")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Add {quantity} to basket &#8226; ${getTotal()}
                </Text>
            </Pressable>
        </View>


    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1, 
        width: '100%',
        paddingVertical: 40,
        padding: 10,
    },
    name:{
        fontSize: 30,
        fontWeight: "600",
        marginVertical: 10,
    },
    separator: {
        height: 1,
        backgroundColor: "lightgrey",
        marginVertical: 10,
    },
    description: {
        description: "grey",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    quantity: {
        fontSize: 25,
        fontWeight: "bold",
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: "black",
        marginTop: "auto",
        padding: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight:"600",
        fontSize: 18,
    }
});

export default DishDetailsScreen;