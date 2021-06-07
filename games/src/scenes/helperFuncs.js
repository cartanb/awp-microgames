function timerStart(timerNum = 5) {
  let num = timerNum;
  let value = `TIME: ${num}`;
  this.timer.text = value;
  setTimeout(() => {
    this.timerId = setInterval(() => {
      if (num > 0) {
        value = `TIME: ${--num}`;
        this.timer.text = value;
      } else {
        this.gameEnd();
      }
    }, 1000);
    this.verb.text = '';
  }, 1000);
}

export default timerStart;
