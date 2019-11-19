class Timer {
  constructor(owner){
    this.owner = owner;
    this.remainingTime = 0;
    this.timeUp = true;
    this.timeOut;

    this.Start = this.Start.bind(this);
    this.Stop = this.Stop.bind(this);
    this.ClearDisplay = this.ClearDisplay.bind(this);
    this.ExecuteTimer = this.ExecuteTimer.bind(this);
  }

  Start(seconds){
    this.timeUp = false;
    this.ClearDisplay();

    window.afdTimeLeft = seconds;
    
    this.ExecuteTimer(seconds, this.ExecuteTimer, this.Stop, ()=>{
      if (this.timeUp) return true;
    });
  }

  Stop(){
    this.timeUp = true;
    this.ClearDisplay();
    clearTimeout(this.timeOut);
  }

  ClearDisplay(){
    // document.getElementById("timer").innerHTML = "Time Remaining:";
    document.getElementById("timer-seconds").innerHTML = "  ";
  }

  ExecuteTimer(seconds, cbRepeatTimer, cbOnTimerEnd, cbShouldStop) {
    if (cbShouldStop()) return;
    const remainingTime = seconds;
    // this.remainingTime = remainingTime;
    // console.log(`Remaining Time: ${this.remainingTime}`);

    this.timeOut = setTimeout(function () {
      const formatRemainingTime = (seconds) => {
        return (seconds < 10 ? `0${seconds}` : `${seconds}`);
      }
      // debugger
      if (remainingTime >= 0) {
        // document.getElementById("timer").innerHTML = "Time Remaining:";
        document.getElementById("timer-seconds").innerHTML = formatRemainingTime(remainingTime);
        window.afdTimeLeft = remainingTime - 1;
        cbRepeatTimer(remainingTime - 1, cbRepeatTimer, cbOnTimerEnd, cbShouldStop);
      }else {
        // document.getElementById("timer").innerHTML = "Time Remaining:";
        document.getElementById("timer-seconds").innerHTML = "Time Up!";
        window.afdTimeLeft = 0;
        cbOnTimerEnd();
      }
    }, 1000);
  }

}

// export const executeTimer = (seconds, callback) => {
//   const remaningTime = seconds;
//   // window.setTimeout(function() {
//   window.setTimeout(function() {
//     const formatRemainingTime = (seconds) => {
//       // let ms = `Time Remaining: `;
//       // return ms + (seconds < 10 ? `0${seconds}` : `${seconds}`);
//       return (seconds < 10 ? `0${seconds}` : `${seconds}`);
//     }
//     if (remaningTime > 0) {
//       document.getElementById("timer").innerHTML = "Time Remaining:";
//       document.getElementById("timer-seconds").innerHTML = formatRemainingTime(remaningTime);
//       executeTimer(remaningTime - 1, callback);
//     }else {
//       document.getElementById("timer").innerHTML = "Time Remaining:";
//       document.getElementById("timer-seconds").innerHTML = "Time Up!";
//       callback();
//     }
//   }, 1000);
// }

export default Timer;