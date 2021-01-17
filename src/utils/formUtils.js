export const setPropsInNull = (initialState, newVal) => {
  for(var i in initialState){
    if((typeof initialState[i] === "object") && !(initialState[i] instanceof Array)){
      setPropsInNull(initialState[i], newVal);
      return;
    } else {
      initialState[i] = newVal;
    }
    return initialState;
 }
}
