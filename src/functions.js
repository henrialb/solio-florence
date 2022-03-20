const age = (dob) => {
  var dobdate = new Date(dob)
  var diff_ms = Date.now() - dobdate.getTime()
  var age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}

function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key]
      acc[property] = acc[property] || []
      acc[property].push(obj)
      return acc
    }, {})
  }
}

export { age, groupBy }
