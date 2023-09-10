// UI Controller
var uiController = (function(){
// Collect data from UI and return
var classString = {
    type: ".add__type",
    descript: ".add__description",
    addValue: ".add__value",
    btn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    TotalBudget: ".budget__value",
    incTotal: ".budget__income--value",
    expTotal: ".budget__expenses--value",
    experc: ".budget__expenses--percentage"
    }
    
return {
    inputvalues: function(){
        return{
            addType: document.querySelector(classString.type).value,
            description: document.querySelector(classString.descript).value,
            value: parseFloat(document.querySelector(classString.addValue).value)
        }
    },
    inputString: function(){
        return classString;
    },
    
// return items to the ui
addItem: function(obj, type){
    var html, newHtml, element;
    if(type === "inc"){
        element = classString.incomeList;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    } else if(type === "exp"){
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        element = classString.expenseList;
    }
    newHtml =  html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", obj.value);
    
    document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    // clearing the field
    clearField: function(){
    var fields, fieldArr;
    fields = document.querySelectorAll(classString.descript + "," + classString.addValue);
    fieldArr = Array.prototype.slice.call(fields);
    fieldArr.forEach(function(current, index, array){
        current.value = "";
    }) 
    // Going back to the first field after input
    fieldArr[0].focus();
    },
// give out the values to app controller to print 
printBudget: function(obj){
    document.querySelector(classString.TotalBudget).textContent = obj.budget;
    document.querySelector(classString.incTotal).textContent = obj.totalInc;
    document.querySelector(classString.expTotal).textContent = obj.totalExp;
    if(obj.percent > 0){
         document.querySelector(classString.experc).textContent = obj.percent;
    } else{document.querySelector(classString.experc).textContent = "--";}
   
}
}
}) ();

// Budget logic Controller
var budgetController = (function(){
// Performs the logic and store data
var Expenses = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
}
var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
}
var data = {
    allItems: {
        inc: [],
        exp: []
    },
    total:{
        inc:0,
        exp:0
    },
    budget: 0,

}) ();

// App Controller 
var controller = (function(){

}) ();