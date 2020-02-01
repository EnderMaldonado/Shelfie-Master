const moment = require('moment')
const dateFormat = require('dateformat')

const toTime = date => {
  if(typeof date === "number")
    return new Date(date).getTime()
  if(Date.parse(date))
    return new Date(date).getTime()
  return new Date(parseInt(date)).getTime()
}

const _dateToLocal = date => new Date(date).toLocaleString("en-US", {timeZone: "America/New_York"})


module.exports = {

  dateToLocal: date => _dateToLocal(date),
  getDate: () => Date.parse(new Date()).toString(),
  getDateInt: () => Date.parse(new Date()),

  getDatePretyWHours: date => (_dateToLocal(toTime(date)) + 3600000) <  _dateToLocal(toTime(new Date()))?
      moment(_dateToLocal(toTime(date))).from(_dateToLocal(toTime(new Date())))
    :
      moment(_dateToLocal(toTime(date))).calendar(),
  
  getDatePrety: date => dateFormat(_dateToLocal(toTime(date)), "dd/mm/yyyy HH:MM:ss"),

  toHourZero: date => new Date(new Date(new Date(_dateToLocal(date)).setHours(0)).setMinutes(0)).setSeconds(0).toString()

}