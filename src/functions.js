/* eslint-disable prettier/prettier */
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
  const patientReceivableIds = expenses.map((expense) => expense.patientReceivableId)
  const uniquePatientReceivableIds = Array.from(new Set(patientReceivableIds))
  const sortedReceivableIds = uniquePatientReceivableIds.sort().reverse().filter(Boolean)

  const withReceivable = sortedReceivableIds.map((receivableId) => {
    const receivableExpenses = expenses.filter(
      (expense) => expense.patientReceivableId === receivableId,
    )

    return {
      receivableId,
      receivableStatus: receivableExpenses[0].receivableStatus,
      expenses: receivableExpenses,
    }
  })

  const withoutReceivable = expenses.filter((expense) => !expense.patientReceivableId)

  return [withReceivable, withoutReceivable]
}

const organiseReceivables = (receivables, patientScml) => {
  const receivables1 = !patientScml ? (
    receivables.filter(function (receivable) {
      return receivable.source === 'expenses'
    })
  ) : (
    receivables.filter(function (receivable) {
      return receivable.accountable === 'personal'
    })
  )

  const receivables2 = !patientScml ? (
    receivables.filter(function (receivable) {
      return receivable.source === 'monthly_fee'
    })
  ) : (
    receivables.filter(function (receivable) {
      return receivable.accountable === 'scml'
    })
  )

  return [receivables1, receivables2]
}

export {
  age,
  dateFormat,
  currencyFormat,
  organiseExpenses,
  organiseReceivables,
}
