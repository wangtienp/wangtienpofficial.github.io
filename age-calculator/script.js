let day= document.querySelector('#day');
let month = document.querySelector('#month');
let year =document.querySelector('#year');
let answerDay = document.querySelector('#answer-day');
let answerMonth=document.querySelector('#answer-month');
let answerYear = document.querySelector('#answer-year');
let invalidDay = document.querySelector('#invalid-day');
let invalidMonth = document.querySelector('#invalid-month');
let invalidYear = document.querySelector('#invalid-year');
let circleButton = document.querySelector('.circle');
let labels = document.querySelector('.labels');
let validations = document.querySelector('.validations');
let inputs = document.querySelectorAll("input[type='number']");
let validationField = document.querySelectorAll('.required');
let todayDate = new Date();
let d=new Date();
let currentDate = todayDate.getDate();
let currentMonth = todayDate.getMonth()+1;
let currentYear = todayDate.getFullYear();
let currentDateStr= currentDate.toString();
let currentMonthStr = currentMonth.toString();
let currentYearStr = currentYear.toString();

if(currentDate<10){
    currentDateStr = '0'+currentDateStr;
}
if(currentMonth<10){
    currentMonthStr='0'+currentMonthStr;
}
// to get date but not include the time such as hours mins secs mills
todayDate = new Date(`${currentYearStr}-${currentMonthStr}-${currentDateStr}`);
//validation rules
let valid=true;

// main

circleButton.addEventListener('click',()=>{
    // console.log(inputs[0].value);
    addActiveClass();
    invalidDayMonthYear();
    requiredField();
    invalidDate();
    mustEarlier();
    if(!valid){
        addInvalidClass();
        answerDay.innerText='--';
        answerMonth.innerText='--';
        answerYear.innerText='--';
    }else{
        removeInvalidClass();
        calculateAge();
        invalidDay.innerText='';
        invalidMonth.innerText='';
        invalidYear.innerText='';
    }
})

inputs.forEach((input)=>{
    input.addEventListener('focus',()=>{
        valid=true;
        removeActiveClass();
    })
})

// validation for invalid
function requiredField(){
    let count =0;
    inputs.forEach((input,index)=>{
        if(input.value ===''){
            validationField[index].innerText='This field is required';
            count++;
        }
    })
    if(count>0){
        valid = false;
    }
}
function invalidDate(){
    const getDays = (tyear, tmonth) => {
        return new Date(tyear, tmonth, 0).getDate();
    };
    if(Number(day.value)>getDays(Number(year.value),Number(month.value)))
    {
        invalidDay.innerText = 'Must be a valid date';
        valid=false;
    }

}

function invalidDayMonthYear(){
    if(Number(day.value)<=0||Number(day.value)>31){
        invalidDay.innerText='Must be a valid day';
        valid=false;
    }
    if(Number(month.value)<=0||Number(month.value)>12){
        invalidMonth.innerText='Must be a valid month';
        valid=false;
    }
    if(Number(year.value)>currentYear){
        invalidYear.innerText='Must be in the past'
        valid=false;
    }
}
function mustEarlier(){
    let dateInput=new Date(`${year.value}-${month.value}-${day.value}`);
    if(todayDate-dateInput<0){
        invalidDay.innerText='Must earlier than today';
        valid=false;
    }
}
// add invalid class
function addInvalidClass(){
    if(!labels.classList.contains('invalid')){
    labels.classList.add('invalid');}
    if(!validations.classList.contains('invalid')){
    validations.classList.add('invalid');}
    inputs.forEach(input=>{
        if(!input.classList.contains('invalid'))
        input.classList.add('invalid')
    });
}
// add active class for button pushed
function addActiveClass(){
    circleButton.classList.add('active');
}
// remove invalid class
function removeInvalidClass(){
    if(labels.classList.contains('invalid')){
        labels.classList.remove('invalid');
    }
    if(validations.classList.contains('invalid')){
        validations.classList.remove('invalid');
    }
    inputs.forEach(input=>{
        if(input.classList.contains('invalid'))
        input.classList.remove('invalid');
    });
}
// remove active class when input is focus
function removeActiveClass(){
    circleButton.classList.remove('active');
}

// calculate for age
function calculateAge(){
    let tdate=currentDate,tmonth=currentMonth,tyear=currentYear;
    console.log(`date:${tdate}
    month:${tmonth}
    year:${tyear}`);
    if(tdate<Number(day.value)){
        tdate=tdate+30-Number(day.value);
        tmonth--;
    }else{
        tdate=tdate-Number(day.value);
    }
    if(tmonth<Number(month.value)){
        tmonth=tmonth+12-Number(month.value);
        tyear--;
    }else{
        tmonth=tmonth-Number(month.value);
    }
    tyear = tyear - Number(year.value);
    answerDay.innerText=`${tdate}`;
    answerMonth.innerText=`${tmonth}`;
    answerYear.innerText=`${tyear}`;
}