import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,Alert } from 'react-native';
import { useState } from 'react';
import emailjs from "emailjs-com";


export default function App() {
  
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [phonono,setphoneno]=useState('');
  const [message,setmessage]=useState('');
  const [statement,setstatement]=useState('');
  const serviceid="service_g2aicn7";
  const templateid="template_1ow6p8b";
  const userid="tqYOWsDQJen56AtgM";
  // This validate function is to check the correctness of both email and password
  function validate()
  {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(reg.test(email)===false)
    {
      setstatement("Invalid email, Please enter correct email");
      return false;
    }
    else
    {
      if(phonono.length<10) // for checking whether the mobile number is correct or not
      {
        setstatement("Invalid Mobile Number");
        return false;
      }
      return true;
    }
    
  }
  // This sendEmail function is to send the email 
  const sendEmail =async ()=>{
    let object1={
      name:name,
      user_email:email,
      mobile_number:phonono,
      message:message
    }
    if(name=="" || email==""||phonono==""||message=="")
      {
        setstatement("All Fields Are Required");
      }
    else{
      setstatement("");
    let k=validate();  //to check whether both email and phone number are valid or not 
    if(k===true)
    {
    try{
      const res=await emailjs.send(
        serviceid,
        templateid,
        object1,
        userid
      );
      if(res.status===200)
      {
        console.log("sucessfully message was sent");
        //setstatement("message sent successfully");
        Alert.alert("Alert","Message Sent Successfully");
        setemail("");
        setname("");
        setmessage("");
        setphoneno("");
        setstatement("");
      }
    }catch(error)
    {
      console.log("failed to send the message ",error);
    }
  }
  }
  }
  return (
    <View style={styles.appcontainer}>
      <StatusBar barStyle = "dark-content" hidden={true} />
    <Text style={styles.heading} >Contact Us</Text>
      <TextInput style={styles.inputboxstyle} value={name} placeholder='name' onChangeText={(x)=>{
        setname(x)
      }}></TextInput>
      <TextInput style={styles.inputboxstyle} value={email} placeholder='email' textContentType='emailAddress' onChangeText={(x)=>{
        setemail(x)
      }}></TextInput>
      <TextInput style={styles.inputboxstyle} value={phonono} placeholder='phone number' maxLength={10} keyboardType='numeric' onChangeText={(x)=>{
        setphoneno(x)
      }}></TextInput>
      <TextInput
        value={message}
        multiline={true}
        numberOfLines={9}
        style={styles.textareastyle}
        placeholder='message'
        onChangeText={(x)=>{
          setmessage(x)
        }}
        />
        <Text style={{color:"red",fontSize:20}}>{statement}</Text>
      <Button title='submit' onPress={()=>{sendEmail()}} ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  heading:
    {
      fontSize:50,
      color:"blue",
      marginBottom:50,
      position:"relative",
      backgroundColor:"#C0C0C0",
      width:"100%",
      paddingLeft:65
    },
  appcontainer:{
    
    margin:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputboxstyle:
  {
    paddingLeft:10,
    fontSize:20,
    height:50,
    width:310,
    borderColor:"black",
    borderWidth:4,
    borderRadius:6,
    margin:2
  },
  textareastyle:{
    borderColor:"black",
    borderWidth:4,
    borderRadius:6,
    width:310,
    fontSize:20,
    padding:5,
    textAlignVertical: 'top'
  }
});
