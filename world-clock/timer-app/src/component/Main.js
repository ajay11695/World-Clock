import React from "react";
import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            stopwatch:false,
            countdown:false
        }
    }

    handleStopwatch=()=>{
        this.setState({stopwatch:! this.state.stopwatch})
    }

    handleCountdown=()=>{
        this.setState({countdown:! this.state.countdown})
    }

    render(){
        let {stopwatch,countdown}=this.state
        return(
            <main className="margin-t-2 flex">
              {stopwatch?<Stopwatch handleCloseStopwatch={this.handleStopwatch}/>:<button onClick={this.handleStopwatch} className="btn">Show Stopwatch</button>}
              {countdown?<Countdown handleCloseCountdown={this.handleCountdown} />:<button onClick={this.handleCountdown} className="btn">Show Countdown</button>}
            </main>
        )
    }
}



export default Main