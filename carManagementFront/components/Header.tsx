import React, {useState} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AddCarModal from './AddCarModal';

const Header = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.letter}>T</Text>
            <Text style={styles.textStyle}>heCarManager</Text>
            <View style={styles.iconContainer}>
                <Pressable onPress={openModal} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
                    <FontAwesome name="plus" size={24} color="#333" />
                </Pressable>
            </View>
            <AddCarModal visible={isModalVisible} onClose={closeModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 35,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    letter: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    textStyle: {
        fontSize: 24,
        color: '#333',
    },
    iconContainer: {
        marginLeft: 'auto',
    },
});

export default Header;