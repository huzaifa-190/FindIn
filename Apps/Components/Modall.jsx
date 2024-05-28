import { View, Text,TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';


import colors from '../Constants/Colors';
import InputField from './InputField';

export default function Modall({isVisible,inpLabel,isInpSecure,onBackdropPress,isinput,title,content,proceedLabel,proceedColor,onCancel,onProceed,inpValue,onInpChange}) {
  return (

    <Modal isVisible={isVisible} animationIn={'fadeInUpBig'} animationOut={'bounceOut'}  animationInTiming={200}
    onBackdropPress={()=>(onBackdropPress())}>
      <View style={styles.modalContentContainer}>
        {title ? 
          <Text style={styles.modalTitle}>{title}</Text>
        : null}
        {isinput ? 
          <InputField label={inpLabel} isSecureTextEntry={isInpSecure} value={inpValue} onChangeText={onInpChange}/>
        : null}

        {content ? 
          <Text style={styles.modalContent}>{content}</Text>
        : null}

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:20}}>


        <TouchableOpacity style={styles.btn} onPress={()=>(onCancel())}>
          <Text style={{color:colors.darkestBlue,fontSize:16}}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>(onProceed())} >
          <Text style={{color: proceedColor ? proceedColor :colors.green,fontSize:16}}>{proceedLabel}</Text>
        </TouchableOpacity>
        </View>
     
      </View>
    </Modal>
    
  )
}

const styles = StyleSheet.create({

    modalContentContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        justifyContent:'center'
        // alignItems: 'center',
      },
      modalTitle: {
        fontSize: 16,
        fontWeight:'bold',
        marginBottom: 15,
        color:colors.darkestBlue
      },
      modalContent:{
        fontSize: 16,
        color:colors.grey
      },
      input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
     btn:{
      justifyContent:'center',height:30,
    }
})