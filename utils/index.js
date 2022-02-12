
   
// LONGITUDE 110 to 115
export function generateRandomLong() {
  let num = Math.random() * 5 + 110;
  return num.toFixed(6);
}

// LATITUDE -9 to +9
export function generateRandomLat() {
  let num = Math.random() * 2 + 7;
  let posorneg = Math.floor(Math.random());
  if (posorneg === 0) {
    num = num * -1;
  }
  return num.toFixed(6);
}