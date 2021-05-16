import React, { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,PanResponder,Dimensions,ToastAndroid} from 'react-native';
import RnBgTask from 'react-native-bg-thread';
import Blocks from './Blocks';
import Ball from './Ball';
import LifeBall from './LifeBall';

const initialState={
  positionOfBlocks:[
    [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
  ],
  ballPosition:[0,0],
  y:94,
  x:0,
  width:0,
  bool:true,
  direction:"none",
  bool2:true,
  bool3:false,
  currentX:0,
  currentY:0,
  speedOfY:20,
  ballWidth:20,
  ballHeight:20,
  ballx:0,
  bally:94,
  tempx:0,
  tempy:94,
  score:0,
  life:3,
  locationX:0,
  locationY:0,
  screenWidth:Dimensions.get('screen').width,
  screenHeight:Dimensions.get('screen').height
}
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
    this.panResponder;
    this.blockMoveHandler=this.blockMoveHandler.bind(this);
    this.ballMoveHandler=this.ballMoveHandler.bind(this);
    this.LifeBallGenerator=this.LifeBallGenerator.bind(this);
    this.scoreHandler=this.scoreHandler.bind(this);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderGrant: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) =>{
          this.setState({
              locationX: event.nativeEvent.locationX.toFixed(2),
              locationY: event.nativeEvent.locationY.toFixed(2)
         });
      }
    });
    ToastAndroid.show("powered by M@K",200);
    
  }
  scoreHandler(){
    if(this.state.life>0){
      let cx=Math.floor(this.state.ballPosition[0]);
      let cy=Math.floor(this.state.ballPosition[1]);
      let tempx=Math.floor(this.state.tempx);
      let tempy=Math.floor(this.state.tempy);
      if(((cx>=tempx-2 && cx<=tempx+2)||(cx-2>=tempx && cx+2<=tempx)) && (cy-2<=tempy && cy+2>=tempy)){
        this.setState({
          ballWidth:0,
          ballHeight:0,
          tempx:0,
          tempy:0,
          score:this.state.score+this.state.ballHeight
        })
      }
    } 
  }
  LifeBallGenerator(){
    if(this.state.bool3){
      this.setState({
        ballWidth:this.state.ballWidth-2,
        ballHeight:this.state.ballHeight-2,
        bally:this.state.bally+0.4
      })
    }
  } 
  componentDidMount(){
    setInterval(this.blockMoveHandler,1000);
    setInterval(this.ballMoveHandler,100);
    setInterval(this.LifeBallGenerator,1000);
    setInterval(this.scoreHandler,50);
  }
  ballMoveHandler(){
    if(this.state.bool3 && this.state.life>0){
      let length=this.state.positionOfBlocks.length;
      let blocks=[...this.state.positionOfBlocks];
      let x=this.state.x;
      let y=this.state.y;
      if((y<10 || y>95)&& (this.state.currentY!=0)){
        this.setState({
          y:94,
          x:0,
          width:0,
          bool:true,
          direction:"none",
          bool2:true,
          bool3:false,
          currentX:0,
          currentY:0,
          speedOfY:10,
          life:this.state.life-1
        })
        return;
      }
      if(x<1){
        this.setState({
          x:1
        })
      }
      if(x>98){
        this.setState({
          x:95
        })
      }
      for(let i=0;i<length;i++){
        if(((x>=blocks[i][0] && (x<=blocks[i][0]+blocks[i][2])) && (y===blocks[i][1]))){
          this.setState({
            currentX:blocks[i][0],
            currentY:blocks[i][1],
            width:blocks[i][2]
          })
          break;
        }
      }
      if((x>=this.state.currentX && (x<=this.state.currentX+this.state.width) && (y===this.state.currentY))){
        this.setState({
          bool2:true,
          speedOfY:10
        })
      }else{
        this.setState({
          bool2:false,
          y:this.state.y+2,
          speedOfY:0,
        })
      }
    }
    let sw=this.state.screenWidth/2;
      if(this.state.locationX>sw && this.state.locationX>0){
        this.setState({
          ballPosition:[this.state.x+3,this.state.y-4.1],
          x:this.state.x+5,
          locationY:'',
          locationX:''
        })
      }
      else if(this.state.locationX<sw && this.state.locationX>0){
        this.setState({
          ballPosition:[this.state.x-3,this.state.y-4.1],
          x:this.state.x-5,
          locationY:'',
          locationX:''
        });
      }else{
        this.setState({
          ballPosition:[this.state.x,this.state.y-4.1],
        })
      }
    
  }
  blockMoveHandler(){
    if(this.state.life>0){
      if(this.state.bool2){
        this.setState({
          bool3:true
        })
        let x=Math.floor(Math.random()*100)-10;
        let width=Math.floor(Math.random()*100);
        if(x<=0){
          x=(x*-1)+1;
        }
        if(width>80){
          width=width-80;
        }
        if(width<5){
          width=width+15;
        }
        let z=x+width;
        if(z>100){
          width=98-x;
        }
        let block=[...this.state.positionOfBlocks];
        block.map(block=>{
          block[1]=block[1]-this.state.speedOfY;
        });
        block.shift([]);
        block.push([x,94,width]);
        this.setState({
          positionOfBlocks:block,
          bally:this.state.bally-this.state.speedOfY,
          tempy:this.state.bally-this.state.speedOfY
        });
        if(this.state.ballHeight<=0 || this.state.ballWidth===20){
          let length=this.state.positionOfBlocks.length-1
          let x=this.state.positionOfBlocks[length][0];
          let width=this.state.positionOfBlocks[length][2]+x;
          let temp= Math.random() * (width-1 - x) + x;
          this.setState({
            ballx:temp,
            bally:this.state.positionOfBlocks[length][1]-4.1,
            ballHeight:20,
            ballWidth:20,
            tempx:temp,
            tempy:this.state.positionOfBlocks[length][1]-4.1
          })
        }
        if(this.state.bool2){
          this.setState({
            y:this.state.y-this.state.speedOfY
          })
        }
        if(this.state.bool){
          this.setState({
            bool:false,
            x:x,
          });
        }
      }
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.gameArea}>
          <View style={styles.header}>
            <View style={styles.scoreArea}>
                <Text style={styles.text1}>Score : {this.state.score}</Text>
                <Text style={styles.text2}>Life  : {this.state.life} </Text>
            </View>
          </View>
          {
            this.state.life>0?
            <View>
              <View style={styles.mainArea} {...this.panResponder.panHandlers}>
                <Blocks position={this.state.positionOfBlocks}/>
                <Ball ball={this.state.ballPosition}/>
                <LifeBall ballx={this.state.ballx}
                    bally={this.state.bally} ballWidth={this.state.ballWidth}
                    ballHeight={this.state.ballHeight}
                />
              </View>
            </View>:
            <View style={styles.gameover}>
              <Text style={styles.gameoverText}>Game Over</Text>
              <TouchableOpacity style={styles.button} onPress={()=>{this.setState(initialState)}}>
                <Text>Play</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text1:{color:"white",alignItems:'flex-start'},
  text2:{color:'white',alignItems:'flex-end'},
  scoreArea:{color:"white",padding:"6%",flexDirection:"row",justifyContent:'space-between'},
  gameArea:{
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth:2,
    borderStyle:"solid",
    borderColor:"blue"
  },
  header:{
      width: "98%",
      height: "10%",
      backgroundColor: "black",
      margin: "1%",
  },
  mainArea:{
      width: "98%",
      height: "93%",
      margin: "1%",
      backgroundColor: "#315b9e",
  },
  gameover:{
    width: "98%",
    height: "80%",
    alignContent:"center",
    alignSelf:'center',
    justifyContent:"center",
    alignItems:"center"
  },
  button:{
    borderRadius: 100,
    color: "rgb(73, 40, 218)",
    borderColor:"black",
    borderRadius:100,
    margin:"1%",
    borderWidth:2,
    width:200,
    height:60,
    justifyContent:'center',
    alignItems:'center',
  },
  directionButton:{
    borderRadius:100,
    margin:"1%",
    borderWidth:2,
    borderColor:'blue',
    width:"47%",
    height:60,
    justifyContent:'center',
    alignItems:'center',
  },
  gameoverText:{
    alignItems:'center',
    fontWeight:"900",
    alignItems:"center",
    fontSize:50
  }
});
