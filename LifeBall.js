import React,{Component} from 'react';
import {StyleSheet,View} from 'react-native';

class Ball extends Component{
    render(){
        const style={
            left:`${this.props.ballx}%`,
            top:`${this.props.bally}%`,
            width:this.props.ballWidth,
            height:this.props.ballHeight
        }
        return <View style={[styles.lifeball,style]}></View>
    }
}
const styles=StyleSheet.create({
    lifeball:{
        position: "absolute",
        borderRadius: 100,
        backgroundColor:"#58a120"
    }
})
export default Ball;