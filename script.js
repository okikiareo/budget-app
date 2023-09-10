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
    }
}) ();

// Budget logic Controller
var budgetController = (function(){

}) ();

// App Controller 
var controller = (function(){

}) ();