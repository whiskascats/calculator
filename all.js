let result = document.querySelector(".count-result");
let process = document.querySelector(".count-text");
let ans = ''; //大畫面數字
let ans2 = ''; //小畫面數字
let answer = 0;
let operator ;
let number = document.querySelectorAll('.num');
let count = document.querySelectorAll('.count');

let dot = document.querySelector(".dot");
let ac = document.querySelector(".ac");
let back = document.querySelector(".back");
let equal = document.querySelector(".equal");

for(let i=0; i<number.length; i++){
    number[i].addEventListener("click", function(){
        ans += this.innerHTML;
        display();
    })
}

for(let i=0; i<count.length; i++){
    count[i].addEventListener("click",change)
}

ac.addEventListener("click", clear);

function change(e){
    if(ans2==``){

        ans2 = ans;
        ans = ``;
        operator = e.target.innerHTML;
        display();
        process.innerHTML = ans2 + operator;
    }else{
        operatorAns();
        ans2 = ``;
        change(e);
    }
}
function display(){

    ans = ans.replace(/\b(0+)/gi,""); //消除開頭0

    if(ans.substring(0,1)=="."){ //避免0.幾的0被消除，希望有更漂亮的解決方法
        ans = "0"+ans;
    }

    
    if(ans==``|| ans==`undefined`){
        ans = `0`;
    }//如果ans空值或找不到，補0
    result.innerHTML = thousand(ans);

    //數字過多，變小
    if(result.textContent.length>9){
        result.style.fontSize = '21px';
    }else{
        result.style.fontSize = '56px';
    }
}

function clear(){
    process.innerHTML = ``;
    result.innerHTML = `0`;
    ans = ``;
    ans2 = ``;
    operator = ``;
}

back.onclick = () => {
    if(!ans==0){
        ans = ans.substring(0, ans.length-1);
        display();
    }
}
equal.addEventListener("click",operatorAns);
function operatorAns(){
    if(!ans2==``){
        ans = parseFloat(ans);
        ans2 = parseFloat(ans2);
        switch(operator){
            case '+':
                ans = ans2 + ans;
                break;
            
            case '−':
                ans = ans2 - ans;
                break;
    
            case '×':
                ans = ans2 * ans;
                break;
    
            case '÷':
                ans = ans2 / ans;
                break;
        }
    
        ans2 = ``;
        process.innerHTML = ``;
        ans = ans.toString()
        display();
    }
}


dot.onclick = () => {
    if(!ans.includes('.')){//小數點不重複
        ans += '.';
    }
    display();
}

//看不懂 抄來的
function thousand(ans){

    if (ans.indexOf(".") != -1) {
        return ans.replace(/\d(?=(?:\d{3})+\b\.)/g, '$&,');
    }else{
        return ans.replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
    }

}
