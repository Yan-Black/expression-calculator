function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  
          let regexp = /[0-9]/,
        intermediate = 0,
             counter = 0
  
    for(let i = 0; i < expr.length; i++){
      if(expr[i] == '(') counter++;
      if(expr[i] == ')') counter--;
    }
  
    if(counter != 0) throw new Error("ExpressionError: Brackets must be paired")
  
    let arr = expr.split('').filter(el => el !== ' ')
  
    for(let i = 0; i < arr.length; i++) {
      if(regexp.test(arr[i]) && regexp.test(arr[i+1])) {arr.splice(i, 2, arr[i] + arr[i+1]); i--}
    }

    for(let i = 0; i < arr.length; i++) {
      if(arr[i] == '-' && !parseInt(arr[i-1]) && arr[i-1] != ')' && arr[i-1] != 0) arr.splice(i,2,arr[i] + arr[i+1])
      if(arr[i] == '.') arr.splice(i-1,3,arr[i-1] + arr[i] + arr[i+1])
    }
  
           arr = arr.map(el => regexp.test(el) ? parseFloat(el) : el)

           for(let i = 0; i < arr.length; i++) {
            if(arr[i] == '/' && arr[i+1] === 0) throw new Error("TypeError: Division by zero.")
          }

          for(let i = 0; i < arr.length; i++) {
            if(arr[i] == '(') {

                  intermediate = arr.slice(arr.indexOf(arr[i+1]),arr.indexOf(')'))

                while(intermediate.includes('(')) {

                  intermediate = intermediate.slice(intermediate.indexOf('(') + 1, intermediate.length)
              }
              
              if(arr[arr.indexOf(intermediate[0])] + arr[arr.indexOf(intermediate[0])+1] == intermediate[0] + intermediate[1]) {

                arr.splice(arr.indexOf(intermediate[0])-1, intermediate.length + 2, expressionCalculator(intermediate.join(' ')))

              }
              else arr.splice(arr.lastIndexOf(intermediate[1])-2, intermediate.length + 2, expressionCalculator(intermediate.join(' ')))
              i--
            }
          }
  
        for(let i = 0; i < arr.length; i++) {
           if (arr[i] === '*') {arr.splice(i-1,3, arr[i-1] * arr[i+1]); i--}
      else if (arr[i] === '/') {
      
              if(arr[i-1] === 0 || arr[i+1] === 0) throw new Error("TypeError: Division by zero.")
                arr.splice(i-1,3, arr[i-1] / arr[i+1]);
                
              i--
              }
        }

      for(let i = 0; i < arr.length; i++) {
              if (arr[i] === '+') {arr.splice(i-1,3, arr[i-1] + arr[i+1]); i--}
         else if (arr[i] === '-') {arr.splice(i-1,3, arr[i-1] - arr[i+1]); i--}
        }

    return arr[0]
}

module.exports = {
    expressionCalculator
}