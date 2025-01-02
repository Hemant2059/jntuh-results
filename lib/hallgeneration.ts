function parseInput(input: string): number | string {
    // Check if the input is a valid number
    const parsedNumber = Number(input);
  
    // If the input is a valid number, return the number
    if (!isNaN(parsedNumber)) {
      return parsedNumber;
    }
  
    // If it's not a valid number, return the input as a string
    return input;
  }
export const generateHallTicket = (hallticket: any, regular: any, lateral: any) => {
    const halltickets = [];

    const regularhall = parseInput(regular);
    const lateralhall = parseInput(lateral);


    console.log(regularhall);
    console.log(lateralhall);

  // If the input is a valid number, return the number
  
  let year = Number(hallticket.slice(0, 2));

  if (hallticket[4]=="1"){
    if (typeof regularhall === "number") {
      if (regularhall !== 0){
      for (let i = 0; i <= 99; i++) {
        let last = i.toString().padStart(2, "0");
        halltickets.push(`${hallticket}${i.toString().padStart(2, "0")}`);
        if (Number(last) === regularhall){
          break
        }
      }
    }
    }
    else if (typeof regularhall === "string") {
      let flag = false
      for (let i = 1; i <= 99; i++) {
        halltickets.push(`${hallticket}${i.toString().padStart(2, "0")}`);
      }
      for (let letter of "ABCDEFGHIJ") {
        for (let i = 0; i <= 9; i++) {
          let last = letter+i;
          halltickets.push(`${hallticket}${letter}${i}`);
          if (last === regularhall){
            flag = true
            break
          }
        }
        if (flag){
          break
        }
      }
    }
    year = year+1
    const firstpart = hallticket.slice(2, 4); 
    const secondpart = hallticket.slice(5, 8);   
    const lebase = `${year}${firstpart}5${secondpart}`;  

  if (typeof lateralhall === "number") {
    if (lateralhall !== 0){
    for (let i = 1; i <= 99; i++) {
      let last = i.toString().padStart(2, "0");
      halltickets.push(`${lebase}${i.toString().padStart(2, "0")}`);
      if (Number(last) === lateralhall){
        break
      }
    }
  }
  }
  else if (typeof lateralhall === "string") {
    let flag = false
    for (let i = 1; i <= 99; i++) {
      halltickets.push(`${lebase}${i.toString().padStart(2, "0")}`);
    }
    for (let letter of "ABCDEFGHIJ") {
      for (let i = 0; i <= 9; i++) {
        let last = `${letter}${i}`;
        halltickets.push(`${lebase}${letter}${i}`);
        if (last === lateralhall){
          flag = true
          break
        }
      }
      if (flag){
        break
      }

    }
  }
    
}   
else if (hallticket[4]=="5"){
  if (typeof lateralhall === "number") {
    if (lateralhall !== 0){
    for (let i = 1; i <= 99; i++) {
      const last = i.toString().padStart(2, "0");
      halltickets.push(`${hallticket}${i.toString().padStart(2, "0")}`);
      if (Number(last) === lateralhall){
        break
      }
    }
  } 
  }
  else if (typeof lateralhall === "string") {
    let flag = false
    for (let i = 1; i <= 99; i++) {
      halltickets.push(`${hallticket}${i.toString().padStart(2, "0")}`);
    }
    for (let letter of "ABCDEFGHIJ") {
      for (let i = 0; i <= 9; i++) {
        const last = `${letter}${i}`;
        halltickets.push(`${hallticket}${letter}${i}`);
        if (last === lateralhall){
          flag = true
          break
        }
      }
      if (flag){
        break
      }
    }
  }
  year = year-1
  const firstpart = hallticket.slice(2, 4);
  const secondpart = hallticket.slice(5, 8);
  const rebase = `${year}${firstpart}1${secondpart}`;
  if (typeof regularhall === "number") {
    if (regularhall !== 0){     
        for (let i = 1; i <= 99; i++) {
      const last = i.toString().padStart(2, "0");
      halltickets.push(`${rebase}${i.toString().padStart(2, "0")}`);
      if (Number(last) === regularhall ){
        break
      }
    }}
  }
  else if (typeof regularhall === "string") {
    let flag = false
    for (let i = 1; i <= 99; i++) {
      halltickets.push(`${rebase}${i.toString().padStart(2, "0")}`);
    }
    for (let letter of "ABCDEFGHIJ") {
      for (let i = 0; i <= 9; i++) {
        const last = `${letter}${i}`;
        halltickets.push(`${rebase}${letter}${i}`);
        if (last === regularhall){
          flag = true
          break
        }
      }
      if (flag){
        break
      }
    }
  }
}
    return halltickets;
 
    
  }