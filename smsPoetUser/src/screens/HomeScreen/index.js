import { StyleSheet, FlatList, View } from 'react-native';
import RestaurantItem  from '../../components/RestaurantItem';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
      DataStore.query(Restaurant).then((results) => setRestaurants(results));
  }, []);
  return (
    <View style={styles.page}>
      <FlatList
      data={restaurants}
      renderItem={({ item }) => <RestaurantItem restaurant={item} />}
      showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    page: {
        padding: 10,
        flex: 1,
    },
});
