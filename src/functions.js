const age = (dob) => {
  var dobdate = new Date(dob)
  var diff_ms = Date.now() - dobdate.getTime()
  var age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}

const organiseExpenses = (expenses) => {
  const patientReceivableIds = expenses.map((receivable) => receivable.patientReceivableId)
  const uniquePatientReceivableIds = Array.from(new Set(patientReceivableIds))
  const sortedIds = uniquePatientReceivableIds.sort().reverse().filter(Boolean)

  const withReceivable = sortedIds.map((id) => {
    return {
      id,
      expenses: expenses.filter((expense) => expense.patientReceivableId === id),
    }
  })

  const withoutReceivable = expenses.filter((expense) => !expense.patientReceivableId)

  return [withReceivable, withoutReceivable]
}

const dateFormatted = (date) => {
  return new Date(date).toLocaleDateString()
}

export { age, organiseExpenses, dateFormatted }
