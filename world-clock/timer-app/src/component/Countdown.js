import React from "react";

class Countdown extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            sec: 0,
            min: 0,
            hour: 0,
            start: true,
            stop: false,
            resume: false,
            reset: false
        }
        this.active = false
        this.invertal = ''
    }

    componentDidUpdate() {
        let {  sec, min,hour } = this.state
        if (this.active) {
            if(min===0 && sec===0 && hour===0){
                this.setState({stop:false,start:true})
                this.active=false
                clearInterval(this.invertal)
                 alert('count ended !!!')
                 return;
            }
          if(sec >0) {
                if(this.invertal){clearInterval(this.invertal)}
                this.invertal = setInterval(() => { this.setState({ sec: sec-1 }) }, 1000)
            }else{
                if (min > 0) {
                    this.setState({
                        min:min-1,
                        sec:59
                    })
                } else if(hour > 0){
                  this.setState({
                    hour:hour-1,
                    min:59
                  })
                }
            }
        }

    }

    handleStart = () => {
        this.setState({
            stop: true,
            start: false
        })
        this.active=true
    }

    handleStop = () => {
        this.setState({
            stop: false,
            resume: true,
            reset: true
        })
        this.active=false
        clearInterval(this.invertal)
    }

    handleResume = () => {
        this.setState({
            stop: true,
            resume: false,
            reset: false
        })
        this.active=true
    }

    handleReset = () => {
        this.setState({
            sec: 0,
            min: 0,
            hour: 0,
            start:true,
            stop: false,
            resume: false,
            reset: false
        })
        this.active=false
    }

    handleInc=(event)=>{
       let {sec,min,hour}=this.state
       if(event.target.id==='hour'){
        this.setState({hour:hour+1})
       } else if(event.target.id==='min'){
         if(min===59){
           return this.setState({
                min:0,
                hour:hour+1
            })
         }
        this.setState({min:min+1})
       } else if(event.target.id==='sec'){
         if(sec===59){
           return this.setState({
                sec:0,
                min:min+1
            })
         }
        this.setState({sec:sec+1})
       }
    }

    handleDec=(event)=>{
        let {sec,min,hour}=this.state
        if(event.target.id==='sec'){
            if(sec>0){
                return this.setState({
                    sec:sec-1,
                })
            }else if(min>0){
                return this.setState({
                    sec:59,
                    min:min-1
                })
            }
        }else if(event.target.id==='min'){
            if(min>0){
                return this.setState({
                    min:min-1,
                })
            }else if(hour>0){
                return this.setState({
                    min:59,
                    hour:hour-1
                })
            }
        }else if(event.target.id==='hour'){
            return this.setState({hour:hour-1})
        }
    }

    componentWillUnmount(){
        clearInterval(this.invertal)
    }

    render() {
        let { sec, min, hour, start, stop, resume, reset } = this.state
        console.log(String(sec))
        return (
            <div className="time-div flex column">
                <span className="white font-w" onClick={this.props.handleCloseCountdown}>X</span>
                <h2 className="font-w white">Countdown</h2>
                <p className=" white margin-t-1">Hours : minutes : seconds</p>
                <ul className="flex">
                    <li className="">
                    <i className="fa-solid fa-square-caret-up " id='hour' onClick={this.handleInc}></i>
                    <h2 className="white margin-t-">{String(hour).length === 1 ? `0${hour}` : hour}<small className="white font-w"> :</small> </h2>
                    <i className="fa-solid fa-square-caret-down " id='hour' onClick={this.handleDec}></i>
                    </li>
                    <li>
                    <i className="fa-solid fa-square-caret-up " id='min' onClick={this.handleInc}></i>
                    <h2 className="white margin-t-"> {String(min).length === 1 ? `0${min}` : min}<small className="white font-w"> :</small> </h2>
                    <i className="fa-solid fa-square-caret-down " id='min' onClick={this.handleDec}></i>
                    </li>
                    <li>
                    <i className="fa-solid fa-square-caret-up " id='sec' onClick={this.handleInc}></i>
                    <h2 className="white margin-t-">  {String(sec).length === 1 ? `0${sec}` : sec} </h2>
                    <i className="fa-solid fa-square-caret-down " id='sec' onClick={this.handleDec}></i>
                    </li>
                </ul>
                <div className="margin-t-2">
                    {start && <button className="btn" onClick={this.handleStart}>Start</button>}
                    {stop && <button className="btn" onClick={this.handleStop}>Stop</button>}
                    {resume && <button className="btn" onClick={this.handleResume}>Resume</button>}
                    {reset && <button className="btn" onClick={this.handleReset}>Reset</button>}
                </div>
            </div>
        )
    }
}

export default Countdown