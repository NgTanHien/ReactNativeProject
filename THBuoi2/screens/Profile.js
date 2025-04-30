import React, { useEffect } from "react";
import { fetchRandomContact } from "../utility/api";
import ContactThumbnail from "../components/ContactThumbnail";
import DetailListItem from "../components/DetailListItem";
import colors from "../utility/colors";
import { StyleSheet, View } from "react-native";

const Profile = ({route}) =>{
    const {contact} = route.params;
    
    useEffect (()=>
        {
           fetchRandomContact().then(
            contact => setContact(contact)
           ) 
        }
    ,[]);

    const {avatar, name, email, phone, cell} = contact;
    return( 
        <View style={style.container}>
            <View style={style.avatarSection}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone}/>
            </View>
            <View style={style.detailsSection}>
                <DetailListItem icon="mail" title="Email" subtitle={email}/>
                <DetailListItem icon="phone" title="Phone" subtitle={phone}/>
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell}/>
            </View>
        </View>
        
    );
        
    
}
export default Profile;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    avatarSection:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },

    detailsSection:{
        flex: 1,
        backgroundColor: 'white',
    },


});
