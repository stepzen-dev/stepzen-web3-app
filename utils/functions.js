
  export function Reverse(s){
    return s.split("").reverse().join("");
  }
  export function AddStr(str, index, stringToAdd){
    return Reverse(str).substring(0, index) + stringToAdd + Reverse(str).substring(index, str.length);
  }  
