import React,{Component} from 'react';
import { View,StyleSheet} from 'react-native'

class Ball extends Component{
    render(){
        const style={
            left:`${this.props.ball[0]}%`,
            top:`${this.props.ball[1]}%`,
        }
        return <View style={[styles.ball,style]}></View>
    }
}
const styles=StyleSheet.create({
    ball:{
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor:"#fc5e2d",
    }
})
export default Ball;