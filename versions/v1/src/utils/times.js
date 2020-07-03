class Times {

  static timeInDays(start, end) {
    if (!start || !end) {
      return 0;
    }

    const difference = Math.abs(Date.parse(end) - Date.parse(start));
    return Math.ceil(difference / (1000 * 3600 * 24));
  }
}

export default Times;