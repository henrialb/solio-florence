const age = (dob) => {
  var dobdate = new Date(dob)
  var diff_ms = Date.now() - dobdate.getTime()
  var age_dt = new Date(diff_ms)

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}

const dateFormat = (date) => {
  return new Date(date).toLocaleDateString()
}

const currencyFormat = (num, decimals = 2) =>
  Number(num).toLocaleString('pt-PT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

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

const organiseReceivables = (receivables) => {
  const expensesReceivables = receivables.filter(function (receivable) {
    return receivable.source === 'expenses'
  })

  const monthlyFeeReceivables = receivables.filter(function (receivable) {
    return receivable.source === 'monthly_fee'
  })

  return [expensesReceivables, monthlyFeeReceivables]
}

const organiseReceivablesScml = (receivables) => {
  const personalReceivables = receivables.filter(function (receivable) {
    return receivable.accountable === 'personal'
  })

  const scmlReceivables = receivables.filter(function (receivable) {
    return receivable.accountable === 'scml'
  })

  return [personalReceivables, scmlReceivables]
}

export {
  age,
  dateFormat,
  currencyFormat,
  organiseExpenses,
  organiseReceivables,
  organiseReceivablesScml,
}
