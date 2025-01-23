export const getDayname = () =>{
    const today = new Date();
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDay = daysOfWeek[today.getDay()];

    return currentDay;
} 


