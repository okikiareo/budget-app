// UI Controller
var uiControl = (function(){
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
    experc: ".budget__expenses--percentage",
    container: ".container",
    expercent: ".item__percentage"
    }
     var formatString = function(num, type){
    var numSplit, int, dec;
    
    num = Math.abs(num);
    num = num.toFixed(2);
    12345
    numSplit = num.split(".");
    int = numSplit[0];
    dec = numSplit[1];
    if(int.length > 3){
        int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3)
    }
    
    return (type === "exp" ? "-" : "+") + ' ' + int + "." + dec;
    // return int + "." + dec;
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
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    } else if(type === "exp"){
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        element = classString.expenseList;
    }
    newHtml =  html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", formatString(obj.value, type));
    
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
    
        var type;
        // Ternary operator
        obj.budget > 0 ? type = "inc": type = "exp" ;
    
        
        document.querySelector(classString.TotalBudget).textContent = formatString(obj.budget, type);
        document.querySelector(classString.incTotal).textContent = formatString(obj.totalInc, "inc") ;
        document.querySelector(classString.expTotal).textContent = formatString(obj.totalExp, "exp");
        if(obj.percent > 0){
             document.querySelector(classString.experc).textContent = obj.percent;
        } else{document.querySelector(classString.experc).textContent = "--";}
       
    },
    printpercent: function(percentages){
        var expFields = document.querySelectorAll(classString.expercent);
    
        var eachNode = function(list, callback){
        for(var i = 0; i < list.length; i++){
        callback(list[i], i)
        };
    }
        eachNode(expFields, function(current, index){
            if(percentages[index] > 0){
                current.textContent = percentages[index] + "%";
            }
            else{
                current.textContent = "--";
            }
        }
        )
        
    },
    remove: function(delID){
    var elem = document.getElementById(delID); 
    elem.parentNode.removeChild(elem)
    }
    }
    })();
    
                                      
    // Budget Controller
    var budgetController = (function (){
    // Performs the logic and store data
    var Expenses = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percent = -1
    }
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    Expenses.prototype.calcPercent = function(totalInc){
    if(totalInc > 0){
        this.percent = Math.round((this.value / totalInc) * 100)
    }
    else{
        this.percent = -1
    }
    }
    Expenses.prototype.getPercent = function(){
        return this.percent
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
        percentage: -1
    };
    var calcTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(curr){
    sum += curr.value;
    data.total[type] = sum;
    })
    }
    // takes it out to fetch data from inputs and form either inc or exp
    
    // Check if it's inc or exp so to konw which to pass
    return{
        inputItem: function(type, description, value){
            var newItem, ID;
             
            if(data.allItems[type].length  > 0){
                 ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else{
                ID = 0
            }
           if(type ==="inc"){
               newItem  = new Income(ID, description, value);
            } else if(type === "exp"){
                newItem = new Expenses(ID, description, value);
            }
            // push into data 
             data.allItems[type].push(newItem)
            //  give back new item
         return newItem
        },
    
        // function of deleting an item
        delete: function(type, id){
         var index, ids;
         ids = data.allItems[type].map(function (current){
             return current.id;
         })
         index = ids.indexOf(id);
    
         if(index !== -1){
             data.allItems[type].splice(index, 1);
         }
        },
    
        calcBudget: function(){
    // Add income and expense
    calcTotal("inc");
    calcTotal("exp");
    data.budget = data.total.inc - data.total.exp;
    if(data.total.inc > 0){
        data.percentage = Math.floor( (data.total.exp / data.total.inc) * 100)
    } else{data.percentage = -1}
     },
        
    giveBudget: function(){
        return{
            totalInc: data.total.inc,
            totalExp: data.total.exp,
            budget: data.budget,
            percent: data.percentage
        }
    },
    calcPercentage: function(){
        data.allItems.exp.forEach(function(cur){
            cur.calcPercent(data.total.inc);
        })
    },
    getPercentage: function(){
    var allPercent = data.allItems.exp.map(function(cur){
      return cur.getPercent();
    })
    return allPercent;
    }
    }
    
    
    })();
    
    
    // App controller
    var controller = (function (uiCtrl, budgetCtrl){
    // clicks 
     
        var clicks =  function(){
            var btnCtrl = uiCtrl.inputString();
            document.querySelector(btnCtrl.btn).addEventListener("click", addItem)
            document.addEventListener("keypress", function(event){
                if(event.keyCode === 13 || event.which === 13 ){
                    addItem()
                }});
                document.querySelector(btnCtrl.container).addEventListener("click", deleteItem)
        
            } 
        
        var updateBudget = function(){
            // calculate budget
               budgetCtrl.calcBudget();
            // return budget
            var budget = budgetCtrl.giveBudget();
            // update budget to the UI
            uiCtrl.printBudget(budget)
            }
            
    
        var addItem = function(){
                    // collects data from UI input
            var inputs = uiCtrl.inputvalues();
            console.log(inputs);
            if(inputs.description !== "" && !isNaN(inputs.value) && inputs.value > 0){
      // Add item to budget controller
      var newItem = budgetCtrl.inputItem(inputs.addType, inputs.description, inputs.value)
      // Push new item to UI
      uiCtrl.addItem(newItem, inputs.addType);
      uiCtrl.clearField();
               updateBudget(); 
               updatePrcent();
            } 
            console.log("added")
        };
    
    var deleteItem = function(event){
        var itemID, splitid, type, ID;
    itemID =   event.target.parentNode.parentNode.parentNode.parentNode.id;
    
       if(itemID){
     splitid = itemID.split("-");
      type = splitid[0];
      ID = parseInt(splitid[1]);
     
    //  delete from database
     budgetCtrl.delete(type, ID);
    //  delete from UI
    uiCtrl.remove(itemID);
    
    updateBudget();
    updatePrcent()
    }
    }
     var updatePrcent = function () {
        //  calculate percentage 
        budgetCtrl.calcPercentage()
        // read from budget controller
    var percentage = budgetCtrl.getPercentage();
        // update percentage to ui 
        uiCtrl.printpercent(percentage)
        console.log(percentage)
      }
    return{
         init: function(){
    clicks();
    
    uiCtrl.printBudget({
        totalInc: 0,
        totalExp: 0,
        budget: 0,
        percent: 0
    });
    
    }
        };
    
    })(uiControl, budgetController);
    
    controller.init(); 
    
    