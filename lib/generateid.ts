export function generateId(){
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z","1", "2", "3", "4", "5", "6", "7", "8", "9"]
      
      
    let str = '';

    for(let i = 0; i <= 8; i++){
        let number = Math.floor(Math.random() * 53);
        str += words[number]
    }

    return str
}