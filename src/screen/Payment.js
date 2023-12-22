import { React, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet, Button, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ip } from '@env'
import { TouchableRipple } from "react-native-paper";
const PaymentSceen = () => {
    const navigation = useNavigation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleTagClick = (plan) => {
        setSelectedPlan(plan);
    };

    const getCellColor = (plan) => {
        return selectedPlan === plan ? 'red' : 'white';
    };

    const data = {
        base: 10,
        premium: 20,
        standard: 69,
    };
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
        // <View style={styles.container}>
        //     <Modal
        //         animationType="slide"
        //         transparent={true}
        //         visible={showSuccessModal}
        //         onRequestClose={closeModal}
        //     >
        //         <View style={styles.modalContainer}>
        //             <View style={styles.modalContent}>
        //                 <Text style={styles.modalText}>Payment Successful!</Text>
        //                 <Button title="Close" onPress={closeModal} />
        //             </View>
        //         </View>
        //     </Modal>
        //     <Modal
        //         visible={showModal}
        //     // onRequestClose={ ()=> {setShowPaymentModal(false)}}
        //     >
        //         <WebView

        //             source={{ uri: `http://${ip}:9000/pay` }}
        //             onNavigationStateChange={data =>
        //                 this.handleResponse(data)
        //             }
        //             injectedJavaScript={`document.f1.submit()`}
        //         />
        //     </Modal>
        //     <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Stripe')}>
        //         <View style={styles.methodContent}>
        //             <Image
        //                 source={require('../assets/stipe.png')}
        //                 style={styles.methodImage}
        //             />
        //             <Text>Pay with Stripe</Text>
        //         </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('PayPal')}>
        //         <View style={styles.methodContent}>
        //             <Image
        //                 source={require('../assets/paypal.png')}
        //                 style={styles.methodImage}
        //             />
        //             <Text>Pay with PayPal</Text>
        //         </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Apple Pay')}>
        //         <View style={styles.methodContent}>
        //             <Image
        //                 source={require('../assets/applepay.png')}
        //                 style={styles.methodImage}
        //             />
        //             <Text>Pay with Apple Pay</Text>
        //         </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Google Pay')}>
        //         <View style={styles.methodContent}>
        //             <Image
        //                 source={require('../assets/googlepay.png')}
        //                 style={styles.methodImage}
        //             />
        //             <Text>Pay with Google Pay</Text>
        //         </View>
        //     </TouchableOpacity>
        // </View>

        <ScrollView style={styles.scrollView}>

            <View style={styles.table}>
                <View style={styles.tags}>
                    <TouchableOpacity style={styles.headd}>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headd} onPress={() => handleTagClick('base')}>
                        <Text style={[styles.tag, selectedPlan === 'base' && styles.selectedTag]}>Base</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headd} onPress={() => handleTagClick('premium')}>
                        <Text style={[styles.tag, selectedPlan === 'premium' && styles.selectedTag]}>Premium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headd} onPress={() => handleTagClick('standard')}>
                        <Text style={[styles.tag, selectedPlan === 'standard' && styles.selectedTag]}>Standard</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Plan</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Base</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Premium</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Standard</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Features</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('base') }]}>
                        <Text style={styles.cellText}>Unlimited</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('premium') }]}>
                        <Text style={styles.cellText}>Limited</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('standard') }]}>
                        <Text style={styles.cellText}>Limited</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Watch on</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('base') }]}>
                        <Text style={styles.cellText}>All devices</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('premium') }]}>
                        <Text style={styles.cellText}>Limited devices</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('standard') }]}>
                        <Text style={styles.cellText}>Limited devices</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Watch in</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('base') }]}>
                        <Text style={styles.cellText}>4K</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('premium') }]}>
                        <Text style={styles.cellText}>HD</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('standard') }]}>
                        <Text style={styles.cellText}>SD</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Download</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('base') }]}>
                        <Text style={styles.cellText}>Yes</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('premium') }]}>
                        <Text style={styles.cellText}>Yes</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('standard') }]}>
                        <Text style={styles.cellText}>No</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.cellText}>Price$</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('base') }]}>
                        <Text style={styles.cellText}>{data.base}$</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('premium') }]}>
                        <Text style={styles.cellText}>{data.premium}$</Text>
                    </View>
                    <View style={[styles.cell, { backgroundColor: getCellColor('standard') }]}>
                        <Text style={styles.cellText}>{data.standard}$</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{ height: 50, width: 200, borderRadius: 10, backgroundColor: 'lightblue', padding: 10, margin: 10 }} onPress={closeModal}>
                <Text style={{ fontSize: 13, fontWeight: '900', color: 'white', textTransform: 'uppercase' }}>continue with free trial</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, fontWeight: '900', color: 'black', textTransform: 'uppercase', margin: 10 }}> Chose your Payment Method </Text>
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
                onRequestClose={() => { setShowPaymentModal(false) }}
            >
                <WebView

                    source={{ uri: `http://${ip}:9000/pay` }}
                    onNavigationStateChange={data =>
                        this.handleResponse(data)
                    }
                    injectedJavaScript={`document.f1.submit()`}
                />
            </Modal>
            <TouchableOpacity style={styles.paymentMethod} >
                <View style={styles.methodContent}>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: 'black', textTransform: 'uppercase' }}>Pay with Stripe</Text>
                    <Image
                        source={require('../assets/stipe.png')}
                        style={styles.methodImage}
                    />

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('PayPal')}>
                <View style={styles.methodContent}>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: 'black', textTransform: 'uppercase' }}>Pay with PayPal</Text>
                    <Image
                        source={require('../assets/paypal.png')}
                        style={styles.methodImage}
                    />

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethod} >
                <View style={styles.methodContent}>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: 'black', textTransform: 'uppercase' }}>Pay with Apple Pay</Text>
                    <Image
                        source={require('../assets/applepay.png')}
                        style={styles.methodImage}
                    />

                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.paymentMethod} >
                <View style={styles.methodContent}>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: 'black', textTransform: 'uppercase' }}>Pay with Google Pay</Text>
                </View>
                <Image
                    source={require('../assets/googlepay.png')}
                    style={styles.methodImage}
                />

            </TouchableOpacity> */}
        </ScrollView>



    );

}


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        padding: 10
    },
    table: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'black',
    },
    tags: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tag: {
        padding: 10,
        backgroundColor: 'white',
    },
    selectedTag: {
        backgroundColor: 'red',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    headd: { flex: 1, },
    cellText: {
        textAlign: 'center',
        fontWeight: 'bold',
    }, container: {

    },
    paymentMethod: {
        width: '97%',
        height: 200,

        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    methodContent: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    methodImage: {
        width: '100%',
        height: 160,
        borderRadius: 10
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
    // ... (other styles remain the same)
});
export default PaymentSceen;
