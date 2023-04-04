import React from "react";

class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            milisec: 0,
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
        let { milisec, sec, min } = this.state
        if (this.active) {
            if (milisec === 100) {
                if (sec === 59) {
                   return this.setState({
                        sec: 0,
                        min: this.state.min + 1
                    })
                } else if (min === 59) {
                   return this.setState({
                        min: 0,
                        hour: this.state.hour + 1
                    })
                }
                this.setState({
                    milisec: 0,
                    sec: this.state.sec + 1
                })
            } else {
                if(this.invertal){clearInterval(this.invertal)}
                //    console.log(milisec)
                this.invertal = setInterval(() => {
                    console.log(milisec)
                     this.setState({ milisec: this.state.milisec + 1 }) 
                    }, 10)
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
            milisec: 0,
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

    componentWillUnmount(){
        clearInterval(this.invertal)
    }

    render() {
        let { milisec, sec, min, hour, start, stop, resume, reset } = this.state
        console.log(String(sec))
        return (
            <div className="time-div flex column">
                <span className="white font-w" onClick={this.props.handleCloseStopwatch}>X</span>
                <h2 className="font-w white">Stopwatch</h2>
                <h2 className="white margin-t-2">
                    {String(hour).length === 1 ? `0${hour}` : hour} <small className="white font-w"> : </small>
                    {String(min).length === 1 ? `0${min}` : min} <small className="white font-w"> : </small>
                    {String(sec).length === 1 ? `0${sec}` : sec} <small className="white font-w"> : </small>
                    {String(milisec).length === 1 ? `0${milisec}` : milisec}
                </h2>
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

export default Stopwatch