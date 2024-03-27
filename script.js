const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copyButton]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".GenerateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols='!@#$%^&*()_+{}[]:|~`'

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
// set password length
function handleSlider (){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
}
function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,122));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90));
}
function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
//   CALCULATE STRENGTH 
function calcStrength(){
    hasUpper = false;
    hasLower = false;
    hasNumber = fasle;
    hasSymbol = false;
    if (uppercaseCheck.checked) hasUpper=true;
    if (lowercaseCheck.checked) hasLower=true;
    if (numbersCheck.checked) hasNumber=true;
    if (symbolsCheck.checked) hasSymbol=true;
    if(hasUpper && hasLower && (hasNumber||hasSymbol) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((hasLower|| hasUpper) && (hasNumber||hasSymbol) && passwordLength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
};
//copy content
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        console.log("copied")
        copyMsg.innerText="copied";
    }
    catch(e){
       
        copyMsg.innerText="failed";
        console.log("failed")
    }
    console.log("for timeout")
    copyMsg.classList.add("active");
    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },2000);

    }
     inputSlider.addEventListener('input',(e) =>{
        passwordLength = e.target.value;
        handleSlider();
     })

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay){
        copyContent();
    }
})

//function for shuffle password
function shufflePass(array){
    //fisher yates method
    for(let i=array.length-1;i>0;i--){
        const j= Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
console.log("shuffle");
function handleCheckBoxChange(){
    checkCount=0;
    allcheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    //egde caase
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
};

allcheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

generateBtn.addEventListener('click',()=>{
    if(checkCount<=0){
        return ;
    }
    if(passwordLength<=0){
        passwordLength=checkCount;
        handleSlider();
    }
    console.log("checked")
    password="";
    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase)
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber)
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol)
    }
    console.log("let's go")
    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    console.log("com additiom")
    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let RandInt = getRndInteger(0,funcArr.length)
        password += funcArr[RandInt]();
    }
    console.log("reem addition")
    //shuffle password
    password = shufflePass(Array.from(password));
    //display
    passwordDisplay.value = password;
    console.log("display")
    
    
})
