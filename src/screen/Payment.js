import { React, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet,Button, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ip } from '@env'
const PaymentSceen = () => {
    const navigation = useNavigation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showModal, setShowPaymentModal] = useState(false);
  
    const [selectedPackage, setSelectedPackage] = useState('basic');

    const handlePackageSelect = (packageType) => {
      setSelectedPackage(packageType);
    };
  
    const isPackageSelected = (packageType) => {
      return selectedPackage === packageType;
    };
  
    const getCellTextStyle = (packageType) => {
      return isPackageSelected(packageType) ? styles.selectedCellText : styles.cellText;
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
    const handleGoBack = () => {
        navigation.goBack();
      };
    const closeModal = () => {
        setShowSuccessModal(false);
        moveToHome();
      };
   
        return (
            <ScrollView style={styles.containerr}>
                
                <View style={styles.container}>

      <View style={styles.packageSelection}>
      <TouchableOpacity style={{width:90}}>
         
        </TouchableOpacity> 
       <TouchableOpacity onPress={() => handlePackageSelect('basic')} style={{width:'25%',height:50}}>
          <Text style={[styles.package, isPackageSelected('basic') && styles.selectedPackage]}>Basic</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={() => handlePackageSelect('standard')} style={{width:'25%',height:50}}>
          <Text style={[styles.package, isPackageSelected('standard') && styles.selectedPackage]}>Standard</Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => handlePackageSelect('premium')} style={{width:'25%',height:50}}>
          <Text style={[styles.package, isPackageSelected('premium') && styles.selectedPackage]}>Premium</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.headerCell}></Text>
          <Text style={styles.headerCell}>Basic</Text>
          <Text style={styles.headerCell}>Standard</Text>
          <Text style={styles.headerCell}>Premium</Text>
        </View>
        <Text style={styles.cellSeparator}></Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Monthly Price</Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('basic')}>$5.99</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('standard')}>$9.99</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('premium')}>$19.99</Text>
          </Text>
        </View>
        <Text style={styles.cellSeparator}></Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Video Quality</Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('basic')}>720p</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('standard')}>1080p</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('premium')}>4K</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
        </View>
        <Text style={styles.cellSeparator}></Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Resolution</Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('basic')}>1280x720</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('standard')}>1920x1080</Text>
          </Text>
          <Text style={styles.cellSeparator}></Text>
          <Text style={styles.cell}>
            <Text style={getCellTextStyle('premium')}>3840x2160</Text>
          </Text>
        </View>
      </View><TouchableOpacity style={{marginTop:20,backgroundColor:'orange',borderRadius:20,alignSelf:'flex-start', width: "80%", height: 50,marginLeft:30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', margin: 6 }} onPress={handleGoBack}>
     <Text style={{color:'black',fontWeight:'700'}}>Continue Without Update</Text>
       </TouchableOpacity>
    </View>
    <View style={{width:'100',height:50}}>
        <Text style={{fontWeight:'900',textTransform:'uppercase',margin:10,height:50,fontSize:20,color:'black'}}>chose your method payment</Text>
    </View>
    <View style={{width:'100%',height:'auto',padding:10}}>
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

                        source={{ uri: `http://10.135.51.159:9000/pay` }}
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
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('PayPal')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/paypal.png')}
                            style={styles.methodImage}
                        />
                      
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Apple Pay')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/applepay.png')}
                            style={styles.methodImage}
                        />
                      
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod} onPress={() => this.handlePaymentMethodPress('Google Pay')}>
                    <View style={styles.methodContent}>
                        <Image
                            source={require('../assets/googlepay.png')}
                            style={styles.methodImage}
                        />
                      
                    </View>
                </TouchableOpacity>
    
</View>
            </ScrollView>


    );
    
}

const styles = StyleSheet.create({
    cellSeparator: {
        borderRightWidth: 1,
        borderColor: 'black',
      },
    container: {
        padding: 10,
        
      },
      packageSelection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },
      package: {
        padding: 10,
      },
      selectedPackage: {
        backgroundColor: 'red',
    color:'white'  
    },
      table: {
        marginTop:0,
        borderWidth: 1,
        padding:10,
        borderColor: 'black',
      },
      row: {
        flexDirection: 'row',
      },
      headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
      },
      cell: {
        flex: 1,
        textAlign: 'center',
        padding: 10,
      },
      cellText: {
        color: 'black',
      },
      selectedCellText: {
        color: 'red',
      },
    containerr: {
        flex: 1,
     
    flexDirection:'column',
        
    },
    paymentMethod: {
        width: '100%',
        height: 330,
marginTop:10,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
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
        width: '100%',
        height: '100%',
        borderRadius:20,
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
