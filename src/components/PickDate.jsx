import React, { useState } from 'react'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt'

import 'react-datepicker/dist/react-datepicker.css'
registerLocale('pt', pt)
setDefaultLocale('pt')

const PickDate = () => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      className="form-control"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  )
}

export default PickDate
