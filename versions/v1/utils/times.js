class Times {

  static timeInDays(start, end) {
    const difference = Math.abs(Date.parse(end) - Date.parse(start));
    return Math.ceil(difference / (1000 * 3600 * 24));
  }
}

export default Times;