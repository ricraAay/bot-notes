
module.exports = function setTimeNote( userTime, options = { timezone: 'UTC' } ) {
   const dateNow = Date.now()
   let currentTime = new Date()

   userTime = userTime.split(":")
   currentTime.setHours(...userTime)
   userTime = Date.parse(currentTime.toLocaleString("ru", options))

   return userTime - dateNow
}



