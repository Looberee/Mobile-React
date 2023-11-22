import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Database from "../Database";
import { useFonts, Rubik_300Light, Rubik_400Regular} from '@expo-google-fonts/rubik';

const HomeScreen = ({ navigation }) => {
    const [hikes, setHikes] = useState([]);
    const isFocused = useIsFocused();
    const [fontsLoaded] = useFonts({Rubik_300Light,Rubik_400Regular})

useEffect(() => {
    const fetchHike = async () => {
        try {
            const data = await Database.getHikes();
            setHikes(data);
        } catch (error) {
            console.log("Error fetching hikes", error);
        }
    };

    fetchHike();
}, [isFocused]);


const renderHikeItem = ({ item }) => (
    <TouchableOpacity
    style={styles.hikeCard} onPress = {() => navigation.navigate("HikeDetails", { hike : item})}
    >
        <ImageBackground source={require("../assets/images/wallhaven-zm7mjj.jpg")} style = {styles.backgroundCard} imageStyle={{borderRadius : 6}} resizeMode="contain">
        </ImageBackground>
        <Text style = {styles.HikeNameStyle}>{item.HikeName}</Text>
        <Text style = {styles.HikeDescriptionStyle}>{item.HikeDescription}</Text>
    </TouchableOpacity>
);

return (
        <View style={styles.container}>
            <FlatList
                data={hikes}
                renderItem={renderHikeItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                style={styles.addButton} onPress={() => navigation.navigate("AddHike")}
            >
                <Text style={styles.addButtonText}>Add Hike</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
},
hikeCard : {
    backgroundColor: "white",
    width : "100%",
    height : 250,
    borderRadius: 6,
    margin : 12,
},

backgroundCard : {
    width : "98%",
    height : 160,
},

HikeNameStyle : {
    paddingTop : 12,
    fontSize : 20,
    paddingLeft : 10,
    fontFamily : 'Rubik_400Regular',
},

HikeDescriptionStyle : {
    fontSize : 15,
    paddingLeft : 10,
    fontFamily : 'Rubik_400Regular',
    color : "rgba(0,0,0,0.5)"
},

crudButton : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    width : "100%",
    paddingHorizontal : 10,
    marginVertical : 12
},

deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    width : "30%",
},
deleteButtonText: {
    color: "white",
},
addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
},
addButtonText: {
    color: "white",
    fontWeight: "bold",
},
});

export default HomeScreen;