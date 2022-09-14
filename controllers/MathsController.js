const path = require("path");
const fs = require("fs");
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
function isPrime(value) {
  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return value > 1;
}
function findPrime(n) {
  let primeNumer = 0;
  for (let i = 0; i < n; i++) {
    primeNumer++;
    while (!isPrime(primeNumer)) {
      primeNumer++;
    }
  }
  return primeNumer;
}
module.exports = class MathsController extends require("./Controller") {
  constructor(HttpContext) {
    super(HttpContext);
    this.params = HttpContext.path.params;
  }
  error(message){
    this.params.error = message;
    return false
  }
  checkParamsCount(nbParamns){
    if(Object.keys(this.params).length > nbParamns){
      return this.error("too many")
    }
    return true;
  }
  checkParamsNombreBon(op)
  {
    if(op==0)
    {
      if(isNaN(parseInt(this.HttpContext.path.params.x)))
      {
        return this.error("paramètre 'x' est pas un nombre");
      }
      else if (isNaN(parseInt(this.HttpContext.path.params.y)))
      {
        return this.error("paramètre 'y' est pas un nombre");
      }
    }
    else if(op==1){
      if(isNaN(this.HttpContext.path.params.n))
      {
        return this.error("paramètre 'n' est pas un nombre");
      }
    }
    return true;
  }
  get() {
    if (this.HttpContext.path.queryString == "?") {
      let helpPagePath = path.join(
        process.cwd(),
        "wwwroot/helpPages/mathsServiceHelp.html"
      );
      let content = fs.readFileSync(helpPagePath);
      this.HttpContext.response.content("text/html", content);
      // send help page html
    } else {
      if (this.HttpContext.path.params.op) {
        if (this.HttpContext.path.params.n ||(this.HttpContext.path.params.x && this.HttpContext.path.params.y)) 
        {
            switch (this.HttpContext.path.params.op) {
              case ' ':
                if(!(this.checkParamsCount(3)) || !(this.checkParamsNombreBon(0))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                  this.HttpContext.path.params.op = "+";
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "-":
                if(!(this.checkParamsCount(3)) || !(this.checkParamsNombreBon(0))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "*":
                if(!(this.checkParamsCount(3)) || !(this.checkParamsNombreBon(0))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "/":
                if(!(this.checkParamsCount(3)) || !(this.checkParamsNombreBon(0))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);
                  if (this.HttpContext.path.params.value == null || this.HttpContext.path.params.value == Infinity || isNaN(this.HttpContext.path.params.value) )
                  {
                    this.HttpContext.path.params.error ='null' ;
                  }
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "%":
                if(!(this.checkParamsCount(3)) || !(this.checkParamsNombreBon(0))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);
                  if (this.HttpContext.path.params.value == null || this.HttpContext.path.params.value == Infinity || isNaN(this.HttpContext.path.params.value) )
                  {
                    this.HttpContext.path.params.error ='null' ;
                  }
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "!":
                if(!(this.checkParamsCount(2)) || !(this.checkParamsNombreBon(1))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = factorial(this.HttpContext.path.params.n);
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "p":
                if(!(this.checkParamsCount(2)) || !(this.checkParamsNombreBon(1))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = isPrime(this.HttpContext.path.params.n);
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              case "np":
                if(!(this.checkParamsCount(2)) || !(this.checkParamsNombreBon(1))){
                  this.HttpContext.response.JSON(this.HttpContext.path.params);
                }else{
                  this.HttpContext.path.params.value = findPrime(this.HttpContext.path.params.n);
                  this.HttpContext.response.JSON(this.HttpContext.path.params);    
                }
                break;
              default:
                this.HttpContext.path.params.error = "opération inexsitante";
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
        } 
        else {
          this.HttpContext.path.params.error = "paramètre(s) manquant(s)";
          this.HttpContext.response.JSON(this.HttpContext.path.params);
        }
      } 
      else {
        this.HttpContext.path.params.error = "paramètre 'op' est manquant";
        this.HttpContext.response.JSON(this.HttpContext.path.params);
      }
    }
  }
};