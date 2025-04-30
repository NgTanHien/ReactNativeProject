import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

const ContactThumbnail = ({ name, phone, avatar, textColor, onPress }) => {
    const colorStyle = {
        color: textColor,
    };

    const ImageComponent = onPress ? TouchableOpacity : View;

    return (
        <View style={styles.container}>
            <ImageComponent onPress={onPress} activeOpacity={0.7}>
                {avatar ? (
                    <Image
                        source={{ uri: avatar }}
                        style={styles.avatar}
                    />
                ) : (
                    <View style={[styles.avatar, styles.defaultAvatar]}>
                        <Icon name="person" size={40} color="white" />
                    </View>
                )}
            </ImageComponent>

            {name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}

            {phone !== '' && (
                <View style={styles.phoneSection}>
                    <Icon name="phone" size={16} style={{ color: textColor }} />
                    <Text style={[styles.phone, colorStyle]}>{phone}</Text>
                </View>
            )}
        </View>
    );
};

ContactThumbnail.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string,
    onPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
    name: '',
    phone: '',
    avatar: '',
    onPress: null,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
        overflow: 'hidden',
    },
    defaultAvatar: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    phoneSection: {
        flexDirection: 'row',
        marginTop: 4,
        alignContent: 'center',
        justifyContent: 'center',
    },
    phone: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ContactThumbnail;
