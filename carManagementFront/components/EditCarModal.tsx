import React, { useEffect, useState } from 'react';
import { fetchItem, updateItem } from '@/api';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface EditCarModalProps {
    id: string | number;
    visible: boolean;
    onClose: () => void;
}

const EditCarModal: React.FC<EditCarModalProps> = ({ visible, onClose, id }) => {
    const [modelValue, setModelValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [mainColorValue, setMainColorValue] = useState('');
    const [Value, setValue] = useState('');
    const [productionCostValue, setProductionCostValue] = useState('');
    const [transportationCostValue, setTransportationCostValue] = useState('');

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const item = await fetchItem(id);
                setModelValue(item.Model);
                setBrandValue(item.Brand);
                setMainColorValue(item.MainColor);
                setValue(String(item.Value));
                setProductionCostValue(String(item.ProductionCost));
                setTransportationCostValue(String(item.TransportationCost));
                
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        if (visible && id) {
            fetchItemDetails();
        }
    },[visible, id])

    const clearFields = () => {
        setModelValue('');
        setBrandValue('');
        setMainColorValue('');
        setValue('');
        setProductionCostValue('');
        setTransportationCostValue('');
    }
    
    const handleSave = async () => {
        try {
            const newData = {
                Model: modelValue,
                Brand: brandValue,
                MainColor: mainColorValue,
                Value: parseFloat(Value),
                ProductionCost: parseFloat(productionCostValue),
                TransportationCost: parseFloat(transportationCostValue),
            };

            await updateItem(newData, id);
            clearFields();
            onClose();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleCancel = () => {
        clearFields();
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Edit Car</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.label}>Model</Text>
                            <TextInput
                                placeholder="Model"
                                value={modelValue}
                                onChangeText={setModelValue}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Brand</Text>
                            <TextInput
                                placeholder="Brand"
                                value={brandValue}
                                onChangeText={setBrandValue}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Main Color</Text>
                            <TextInput
                                placeholder="Main Color"
                                value={mainColorValue}
                                onChangeText={setMainColorValue}
                                style={styles.input}
                            />
                            <Text style={styles.label}>Value</Text>
                            <TextInput
                                placeholder="Value"
                                value={Value}
                                onChangeText={setValue}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <Text style={styles.label}>Production Cost</Text>
                            <TextInput
                                placeholder="Production Cost"
                                value={productionCostValue}
                                onChangeText={setProductionCostValue}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <Text style={styles.label}>Transportation Cost</Text>
                            <TextInput
                                placeholder="Transportation Cost"
                                value={transportationCostValue}
                                onChangeText={setTransportationCostValue}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button title="Cancel" onPress={handleCancel} color="#BA0C2F" />
                            <Button title="Save" onPress={handleSave} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 15,
    },    
    label: {
        fontSize: 10,
        paddingBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-start',
        width: '100%',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 70,
    },
    input: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
});

export default EditCarModal;