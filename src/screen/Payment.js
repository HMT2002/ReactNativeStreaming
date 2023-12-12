import { React, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet,Button } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ip } from '@env'
const PaymentSceen = () => {
    const navigation = useNavigation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showModal, setShowPaymentModal] = useState(false);
   
    handlePaymentMethodPress = (method) => {
        setShowPaymentModal(true);
        console.log(`Selected payment method: ${method}`);
        // You can perform further actions based on the selected method here
    };
    const moveToHome = () => {
        // Perform login logic here
    
        // Navigate to the home screen
        navigation.navigate('Home');
    
      };
    handleResponse = data => {
     
        if (data.url.includes("success")) {
            // Hide the WebView
            setShowPaymentModal(false);
            setShowSuccessModal(true);
        }


    };
    const closeModal = () => {
        setShowSuccessModal(false);
        moveToHome();
      };
   
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showSuccessModal}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Payment Successful!</Text>
                            <Button title="Close" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={showModal}
                    // onRequestClose={ ()=> {setShowPaymentModal(false)}}
                >
                    <WebView

                        source={{ uri: `http://${ip}:9000/pay` }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Stripe')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/stipe.png')}
                            style={styles.methodImage}
                        />
                        <Text>Pay with Stripe</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('PayPal')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/paypal.png')}
                            style={styles.methodImage}
                        />
                        <Text>Pay with PayPal</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Apple Pay')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/applepay.png')}
                            style={styles.methodImage}
                        />
                        <Text>Pay with Apple Pay</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Google Pay')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/googlepay.png')}
                            style={styles.methodImage}
                        />
                        <Text>Pay with Google Pay</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    paymentMethod: {
        width: '80%',
        height: '23%',

        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodContent: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodImage: {
        width: 200,
        height: '80%',
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
export default PaymentSceen;
