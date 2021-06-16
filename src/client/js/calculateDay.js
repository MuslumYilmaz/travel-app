function calculateDay(date) {
    let start = new Date().getTime();
    let end = new Date(date).getTime();
    let diff = 0;
    let days = 1000 * 60 * 60 * 24;

    diff = end - start;
    console.log(Math.floor(diff / days))
    return Math.floor(diff / days);
  }

  export { calculateDay }