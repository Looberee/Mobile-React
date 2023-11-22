import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Text, ImageBackground, ScrollView, TouchableOpacity, Platform} from "react-native";
import Database from "../Database";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const ObsDetailsScreen = ({navigation, route}) => {
const { Obs } = route.params;
const [ObservationName, setObservationName] = useState(Obs.ObsName);
const [updatedObsDateTime, setUpdatedObsDateTime] = useState(Obs.ObsTime);
const [ObservationComment, setObservationComment] = useState(Obs.ObsComment);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


const showDatePicker = () => {
    setDatePickerVisibility(true);
};

const hideDatePicker = () => {
    setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
    const dateArray = date.toString().split(" ");
    const displayDate = `${dateArray[4].substring(0,5)} ${dateArray[2]}-${dateArray[1]}-${dateArray[3]}`
    console.log("Observation datetime has been picked: "  + displayDate) 
    setUpdatedObsDateTime(displayDate);
    hideDatePicker();
};

const updateData = () => {
    Alert.alert("Successful updation!", "An observation has been updated!")
    Database.updateObservation(ObservationName,updatedObsDateTime,ObservationComment,Obs.ObsHikeId,Obs.id);
    navigation.goBack();

}

const deleteData = () => {
    Alert.alert("Successful deletion!", "An observation has been deleted!")
    Database.deleteObservation(Obs.id);
    navigation.goBack();

}



return (
    <ScrollView>
    <View style={styles.container}>
        <ImageBackground source={require("../assets/images/Eagle.jpg")} resizeMode="cover" imageStyle = {{opacity : 0.4}} style={styles.image}>
            <Text style= {styles.heading}>Update your observation</Text>

            <Text style= {styles.label}>Name of the observation</Text>
            <TextInput style = {styles.input} 
                placeholder="Enter your observation name" 
                placeholderTextColor={"rgba(0,0,0,0.5)"}
                onChangeText={(ObservationName) => setObservationName(ObservationName)}
                value={ObservationName}
            >

            </TextInput>
            
            <View style = {styles.SmallContainer}>
            <Text style= {styles.label} >Time of the observation</Text>

            <TouchableOpacity style={styles.DateOpen} onPress={showDatePicker}>
                <Text style={styles.DateTextOpen}>{updatedObsDateTime}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            </View>
            
            <Text style= {styles.label}>Comment on this observation</Text>
            <TextInput style = {styles.textarea}  
                multiline={true}
                numberOfLines={4} 
                placeholder="Write some comments about what you saw..." 
                placeholderTextColor={"rgba(0,0,0,0.5)"}
                onChangeText={(ObservationComment) => setObservationComment(ObservationComment)}
                value={ObservationComment}>

            </TextInput>



            <TouchableOpacity style={styles.updateBtn} onPress={updateData}>
                <Text style={styles.btnText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={deleteData}>
                <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
    
        </ImageBackground>
    </View>
    </ScrollView>
);};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },

    heading : {
        fontSize : 30,
        fontWeight : "bold",
        color : "green",
        opacity : 0.6,
        textAlign : "center",
        marginTop : 20,
    },

    label : {
        fontSize : 15,
        fontWeight : "bold",
        color : "black",
        opacity : 0.75,
        marginTop : 15,
        marginHorizontal : 10,
    },

    input : {
        fontSize : 15,
        color : "black",
        borderBottomWidth : 1,
        borderColor : "rgba(0,0,0,0.7)",
        marginHorizontal : 10,
        textDecorationStyle : "dashed",
        marginTop : 15,
    },

    textarea : {
        borderWidth : 1,
        marginHorizontal : 10,
        marginTop : 15,
        fontSize : 15,
        color : "black", 
        textAlignVertical : "top",
        padding : 15,
        backgroundColor : "rgba(255,255,255,0.5)",
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        marginBottom : 40,
    },

    SmallContainer : {
        flexDirection: 'column'  

    },

    updateBtn : {
        backgroundColor : "rgba(31, 81, 255, 0.9)",
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        margin : 15,
        padding : 7,
    },

    deleteBtn : {
        backgroundColor : "rgb(215, 0, 64)",
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        marginHorizontal : 15,
        marginVertical : 10,
        padding : 7,
    },

    btnText: {
        fontSize: 15,
        color: "#fff",
        alignSelf: "center",
    },

    DateOpen : {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop : 15,
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.2)",
        marginHorizontal : 10,
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        color : "black",
        width : "90%",

    },

    DateTextOpen : {
        color : "black",
        textAlign : "center",
        fontSize : 15,
        padding : 7,
    },

    Date : {
        transform : "rotate180"
    },

    image : {
        width : "100%",
        height  : "100%",
        
    }

});

export default ObsDetailsScreen;