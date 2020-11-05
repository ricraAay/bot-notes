
module.exports = function setDateAndTimeNote(datetime) {
   const regexp = new RegExp(/(\d){2}:(\d){2}/) 

   if(!datetime.match(regexp)) {
      return null 
   } 

   let date = new Date() 

   date.setHours(datetime.split(":")[0])
   date.setMinutes(datetime.split(":")[1])

   
   const dateNow = Date.now()
   console.log(date, dateNow);

   return  dateNow < Date.parse(date) 
   ? "Прости, но это не машина времени 😕"
   : Date.parse(date) - dateNow
   
}
