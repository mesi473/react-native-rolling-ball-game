import React ,{Component} from 'react';
import {StyleSheet,View} from 'react-native'


class Blocks extends Component {
    render() { 
        return(
            <View style={{flex:1}}>
                {
                this.props.position.map((block,index)=>{
                    const style={
                        left:`${block[0]}%`,
                        top:`${block[1]}%`,
                        width:`${block[2]}%`
                    }
                    return <View style={[styles.block,style]} key={index}></View>
                })
                }
            </View>
         );
    }
}
const styles=StyleSheet.create({
    block:{
        position: "absolute",
        height: 10,
        backgroundColor: "black",
        borderWidth:2,
        borderColor:"black"
    }
})
export default Blocks;