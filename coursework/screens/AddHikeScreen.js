import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Text, ImageBackground, ScrollView, TouchableOpacity} from "react-native";
import { RadioButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Database from "../Database";


const AddHikeScreen = ({navigation}) => {
const [HikeName, setHikeName] = useState("");
const [HikeLocation, setHikeLocation] = useState("");
const [updatedHikeDate, setUpdatedHikeDate] = useState("Open Date");
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [selectedHikeStatus, setSelectedHikeStatus] = useState("Yes"); 
const lengthList = ["100", "200", "300"];
const [HikeLength, setLength] = useState("100");
const levelList = ["LOW","MEDIUM","HIGH"];
const [HikeLevel, setLevel] = useState("LOW");

const [HikeDescription, setHikeDescription] = useState("");

const showTrueDatePicker = () => {
    setDatePickerVisibility(true);
};

const hideDatePicker = () => {
    setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
    const dateArray = date.toDateString().split(" ");
    const displayDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[3]}`;
    console.log("Hike date: ", displayDate + " has been added.");
    setUpdatedHikeDate(displayDate);
    hideDatePicker();
};

const equalDefaultValue = (HikeName != "" && HikeLocation != "" && updatedHikeDate != "Open Date" && HikeDescription != "")


const confirmData = async () => {
    if (equalDefaultValue)
    {
        await Database.addHike(HikeName,HikeLocation,updatedHikeDate,selectedHikeStatus,HikeLength,HikeLevel,HikeDescription);
        Alert.alert("Data Confirm!", "Your hiked has been added to the database");
        console.log(equalDefaultValue);
        navigation.goBack();
    }
    else {
        Alert.alert("Error!", "Please fill all the information in the form above");
        console.log(equalDefaultValue);
    }
}



return (
    <ScrollView>
    <View style={styles.container}>
        <ImageBackground source={require("../assets/images/GreenMountain.jpg")} resizeMode="cover" imageStyle = {{opacity : 0.4}} style={styles.image}>
            <Text style= {styles.heading}>Add new hike</Text>

            <Text style= {styles.label}>Name of the hike</Text>
            <TextInput style = {styles.input} 
                placeholder="Enter your hike name" 
                placeholderTextColor={"rgba(0,0,0,0.5)"}
                onChangeText={(HikeName) => setHikeName(HikeName)}
            >

            </TextInput>

            <Text style= {styles.label}>Location</Text>
            <TextInput style = {styles.input} 
                placeholder="Enter your hike location" 
                placeholderTextColor={"rgba(0,0,0,0.5)"}
                onChangeText={(HikeLocation) => setHikeLocation(HikeLocation)}></TextInput>
            
            <View style = {styles.SmallContainer}>
            <Text style= {styles.label} >Date of the hike</Text>
            <TouchableOpacity style={styles.DateOpen} onPress={showTrueDatePicker}>
                <Text style={styles.DateTextOpen}>{updatedHikeDate}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            </View>
            
            <View style = {styles.SmallContainer}>
            <Text style= {styles.label}>Parking Available</Text>
            <View style={styles.radioGroup}> 
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="Yes"
                        status={selectedHikeStatus === "Yes" ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setSelectedHikeStatus("Yes")} 
                        color="black"
                    /> 
                    <Text style={styles.radioLabel}> 
                        Yes
                    </Text> 
                </View> 
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="No"
                        status={selectedHikeStatus === "No" ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setSelectedHikeStatus("No")} 
                        color="black"
                    /> 
                    <Text style={styles.radioLabel}> 
                        No 
                    </Text> 
                </View> 
            </View> 
            </View>
            
            <View style = {styles.SmallContainer}>
            <Text style= {styles.label}>Length of the hike</Text>
            <SelectDropdown buttonStyle = {styles.selectLengthDropdown}
                dropdownStyle = {styles.dropdownStyle}
                defaultButtonText= "100"
                data={lengthList}
                onSelect={(selectedItem, index) => {
                    setLength(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />
            </View>

            <View style={styles.SmallContainer}>
            <Text style= {styles.label}>Difficult level</Text>
            <SelectDropdown buttonStyle = {styles.selectLevelDropdown}
                dropdownStyle = {styles.dropdownStyle}
                defaultButtonText= "LOW"
                data={levelList}
                onSelect={(selectedItem, index) => {
                    setLevel(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />
            </View>
            

            <Text style= {styles.label}>Description about the hike</Text>
            <TextInput style = {styles.textarea}  
                multiline={true}
                numberOfLines={4} 
                placeholder="Description about your hike" 
                placeholderTextColor={"rgba(0,0,0,0.5)"}
                onChangeText={(HikeDescription) => setHikeDescription(HikeDescription)}>

            </TextInput>

            <TouchableOpacity style={styles.addBtn} onPress={confirmData}>
                <Text style={styles.appBtnText}>Add</Text>
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
        marginTop : 30,
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
        flexDirection: 'row', 
        alignItems: 'center',  

    },

    radioGroup: { 
        paddingTop : 15,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',  
        backgroundColor: 'transparent',
    }, 
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    radioLabel: { 
        marginLeft: 1, 
        fontSize: 16, 
        color: '#333', 
    }, 

    selectLengthDropdown : {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop : 15,
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.2)",
        marginHorizontal : 10,
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        color : "black",
        width : "40%",
    },

    selectLevelDropdown : {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop : 15,
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.2)",
        marginHorizontal : 53,
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        color : "black",
        width : "40%",
    },

    dropdownStyle : {
        backgroundColor : "rgba(255,255,255,1)",
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
    },

    addBtn : {
        backgroundColor : "rgba(31, 81, 255, 0.9)",
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        margin : 15,
        padding : 7,
    },

    appBtnText: {
        fontSize: 15,
        color: "#fff",
        alignSelf: "center",
    },

    DateOpen : {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop : 15,
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.2)",
        marginHorizontal : 31,
        borderRadius : 5,
        borderColor : "rgba(255,255,255,0.2)",
        color : "black",
        width : "40%",

    },

    DateTextOpen : {
        color : "black",
        textAlign : "center",
        fontSize : 15,
        padding : 7,
    },

    image : {
        width : "100%",
        height  : "100%",
        
    }

});

export default AddHikeScreen;