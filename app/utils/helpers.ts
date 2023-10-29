import { imageURLs } from "./data";

export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomImageURL() {
  const index = getRandomInteger(0, imageURLs.length - 1);
  return imageURLs[index];
}

export function partitionArrayByChunk(arr: any[], chunk: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunk) {
    result.push(arr.slice(i, i + chunk));
  }
  return result;
}

export function militaryTo12Hour(militaryHour: number){
  let hourStr: string = ""
  let hour = militaryHour
  console.log(hour)
  //13 => 13 - 12 = 1 :PM
  if(militaryHour > 12){
    hour = militaryHour - 12
    if(hour < 10){
      //13 => 13 - 12 = 01:PM
      hourStr = `0${militaryHour - 12}:PM`
    }
    else{
      //23 => 23 - 12 11:PM
      hourStr = `${militaryHour - 12}:PM`
    }
  }
  //12 => 12:PM
  else if (militaryHour == 12){
    hourStr = `12:PM`
  }
  //9 => 9:AM
  else {
    if(hour < 10){
      hourStr = `0${hour}:AM`
    }
    else{
      hourStr = `${hour}:AM`
    }
  }
  return hourStr
}