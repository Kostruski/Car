/*var x = document.querySelectorAll('.addCostInput');
var z = document.getElementById('submit')
var b = []
var d = new Date()
var dd = document.getElementById('add__year')

var mk = Math.round((Date.now())/86400000)

z.addEventListener('click', test )

var zz = dd.value
var yy = Date.parse(zz)

function test() {
  

dd = document.getElementById('add__year')
var zz = dd.value+"-01"
var yy = Math.round((Date.parse(zz)/86400000));
alert(zz)
alert(yy)
alert(mk-yy)

} */

//kalkulacja kosztów, całkowitych wartości
var costController = (function() {
 
  
    // funkcja tworząca obiekt przechowujący elemnt kosztowy
    
    var Costs = function(id, date, mileage, short, long, value, type) {
        this.id = id;
        this.date = date;
        this.mileage = mileage;
        this.short = short;
        this.long = long;
        this.value = value;
        this.type = type;
    };
 
    //obiekt przechowujący wszystki elemnty kosztowe oraz sumy kosztów
         
    var allCosts = {
        carName: "",
        allCostItems : [],
        totalIns : 0,
        totalFuel : 0,
        totalMaint : 0,
        totalValueLoss: 0,
        totalMilesDriven: 0,
        totalCost: 0,
        currentMiles: 0,
        currentValue: 0,
        orginalValue: 0,
        orginalMiles: 0,
        purchaseDate: 0,
        };

    //tablica z nazwami samochodów, które są kluczami do zapisanych róznych allCosts    

    var carNames = []

    //funkcja dodająca nowy obiekt do tablicy z kosztami i zwracająca go 
    return {

                
        addItem : function(dat, mil, sho, lon, val, typ) {
            var newItem, id;
            // generuje id
            if(allCosts.allCostItems.length>0) {
                id=allCosts.allCostItems.length // + 1
            }
            else {
                id=0;
            }
            newItem = new Costs(id, dat, mil, sho, lon, val, typ);
            //dodaje nowy elemnt to tablicy z kosztami
            allCosts.allCostItems.push(newItem);
            //zwraca nowy elemnt
            return newItem;
        },

    testing : function(){
        console.log(carNames),
        console.log(allCosts)},
    
    // funkcja robocza, oprózniająca tablicę carNames

    clearCarNames : function() {
        carNames.splice(0,carNames.length);
        window.localStorage.clear();
        allCosts = {}
    },

  
    save : function() {
        if(allCosts.carName != "") {
           
            //zapisuje w local storage tablicę kluczów
            localStorage.setItem("cars", JSON.stringify(carNames));
            //zapisuje allCosts dla aktualnego car name
            localStorage.setItem(allCosts.carName, JSON.stringify(allCosts));
        }
       
    },

    loadCars: function() {
       // jeśli są jakieś zpisane samochody to są dodawane do tablicy carNames w momencie uruchomienia porogramu
        if (localStorage.length>0) {
            var x = JSON.parse(localStorage.getItem("cars"));
            for (i=0; i<x.length; i++){
                carNames.push(x[i]);
            }
           return carNames 
        }
        
    },
    // tu parametrem jest klucz do lokalnje pamięci
    load: function() {
        
        var selectCar = document.getElementById('selectCar');

        var val = selectCar[selectCar.selectedIndex].value

        if(window.localStorage.length>0) {
            var x = JSON.parse(localStorage.getItem(val));
            allCosts = x 
           }
    },

    // usuwa wybrany samochów z listy oraz z pamięci lokalnej
    removeCar: function() {
        var selectCar = document.getElementById('selectCar');
        var val = selectCar[selectCar.selectedIndex];
        var scr = carNames.indexOf(val.value) // usuwa wybrany sachoód z tablicy kluczy carNames
        selectCar.remove(selectCar.selectedIndex);
        localStorage.removeItem(val.value);
        localStorage.setItem("cars", JSON.stringify(carNames));
        carNames.splice(scr,1)
        if(carNames.length<1) {
          document.getElementById('submitSaveCar').disabled="true";
          document.getElementById('removeSaveCar').disabled="true";
        }

    },
    
    
    calcTots: function() {
        var tIns = 0;
        var tFue = 0;
        var tMain = 0;
       
        
        allCosts.allCostItems.forEach(function(ele) {
           
             
            if (ele.type==="Ins") {
                tIns += ele.value;
                
            }
           
            else if (ele.type==="Fuel") {
                tFue += ele.value;
            }
            
            else {
                tMain += ele.value; 
            }
            
        });
            allCosts.totalIns=tIns;
            allCosts.totalFuel=tFue;
            allCosts.totalMaint=tMain;
            allCosts.totalCost = allCosts.totalValueLoss+allCosts.totalIns+allCosts.totalMaint+allCosts.totalFuel 
    },

    getTotals: function() {
        return {
            allCosts
        }
    },

    carName: function(el) {
        allCosts.carName=el;
        carNames.push(el)
    },

    // podstawia orginalny przebieg do zmiennej current mileage i do orginal mileage
    orgMil: function(obj) {
        allCosts.currentMiles=obj
        allCosts.orginalMiles=obj
    }, 

    puDate: function(obj) {
        allCosts.purchaseDate=obj
    },
     // podstawia cenę zakupu do orginalValue
    orgPrice: function(obj) {
        allCosts.orginalValue=obj
        allCosts.currentValue=obj
    },
    
    // aktulizuje przebieg na podstawie wpisu z kosztów
    currMill: function(obj) {
        if(obj>allCosts.currentMiles) 
        allCosts.currentMiles=parseFloat(obj);
        allCosts.totalMilesDriven=allCosts.currentMiles-allCosts.orginalMiles
        },

    currValue: function(obj) {
        allCosts.currentValue=parseFloat(obj)
        allCosts.totalValueLoss=allCosts.orginalValue-allCosts.currentValue
        allCosts.totalCost = allCosts.totalValueLoss+allCosts.totalIns+allCosts.totalMaint+allCosts.totalFuel
    },

    //usuwa odpowieni elemnt z allCosts
    removeCost: function(obj) {

  // tworzy tablice tylko z id
    ids = allCosts.allCostItems.map(function(cur){
    return cur.id;
     })         

    index=ids.indexOf(obj)
    allCosts.allCostItems.splice(index,1)

    console.log(allCosts.allCostItems)


    }

     
    
      
      

    
    

    } // nawis return

      
     
    








     








    
    

})();

//interfejs - to co się wyświetla
var uiController = (function() {
    var newCarDataSelect = []; 
    var newCostDataSelect = []; 
    newCarDataSelect = document.querySelectorAll('.carSumEl');
    newCostDataSelect = document.querySelectorAll('.addCostInput');
    dispTotalSelect = document.querySelectorAll('.dispTot');
    currMilSelect = document.querySelectorAll('.currentEl')[1]; 
    currValSelect = document.querySelector('.currentEl input'); 
    carBackground = document.getElementById('carBackground');
    valueInput = document.getElementById('addCurrentValue');
    topRow = document.querySelectorAll('.dispTotTopRow');
   
    
    


       
    
// pobranie wartości new car

    return {

        inputFields : function() {     
                return {                 
                newCarDataSel :  newCarDataSelect,
                newCostDataSel : newCostDataSelect,
                newValue: parseFloat(valueInput.value),
                carValue: currValSelect, 
                carMiles: currMilSelect,
                carBack: carBackground
            }
        },


        newCarData: function() {
          return {
            model: newCarDataSelect[0].value,
            price: parseFloat(newCarDataSelect[1].value),
            puDate: newCarDataSelect[2].value, 
            orgMileage: parseFloat(newCarDataSelect[3].value),  
           }
        },    
// pobranie wartości new cost item
        
        newCostData: function() {
                return {
                    cDate: newCostDataSelect[0].value,
                    cMileage:parseFloat(newCostDataSelect[1].value),
                    cShort: newCostDataSelect[2].value,
                    cLong: newCostDataSelect[3].value,
                    cValue: parseFloat(newCostDataSelect[4].value),
                    cType: newCostDataSelect[5].value,
                }
            },
        
        addCostRow : function(obj) {
            var html,
            // utworzyc wiersz z kodem html i jakims tekstem
            html =  '<div id="rightColumnRow" class="rightColumnBlock"><div id="itemDate" class="rightColumnBlockElement">data</div><div id="itemMilage" class="rightColumnBlockElement">km</div><div class="description"><div id="itemDescription" class="rightColumnBlockElement">short</div><div id="itemLongDescription" class="rightColumnBlockElement">long</div></div><div id="itemValue" class="rightColumnBlockElement">koszt</div><div id="removeIcon" class="icon-minus-circle" :before></div></div>'

            // podmienic tekst na wartosci z obj
            newHtml = html.replace("rightColumnRow","row"+obj.id);
            newHtml = newHtml.replace("data",obj.date);
            newHtml = newHtml.replace("km", obj.mileage);
            newHtml = newHtml.replace("short", obj.short);
            newHtml = newHtml.replace("long", obj.long);
            newHtml = newHtml.replace('koszt',obj.value);
            if (obj.type==="Ins") newHtml = newHtml.replace("rightColumnBlock","rightColumnBlockRed");
            if (obj.type==="Fuel") newHtml = newHtml.replace("rightColumnBlock","rightColumnBlockYellow");
            
            // dodac na strone, zmienić  kolor tła wg typu kosztu
            document.getElementById('rightColumn').insertAdjacentHTML('afterbegin', newHtml)         

        },
        // nie czyści wszystkich pól, tylko opis, krótki opis i wartość
        clearFields : function(fi) {
            for (i=2; i<fi.length-1; i++) {
                fi[i].value="";
            }
        },

        displayTotals: function(obj) {
           dispTotalSelect[0].innerText = obj.allCosts.totalIns;
           dispTotalSelect[1].innerText = obj.allCosts.totalMaint;
           dispTotalSelect[2].innerText = obj.allCosts.totalFuel;
        },
        // wstawia dzisjeszą datę do formularza kosztów.
       getDate: function() {
        var month, year, currDate ;    
        var date = new Date();
        if(date.getMonth()+1<10) {
            month = "0"+(date.getMonth()+1) }
        else {
            month = date.getMonth()+1;
        } 
        year = date.getFullYear();
        currDate = year+"-"+month;
        newCostDataSelect[0].setAttribute("value", currDate);
        return { currDate
        }
        },

             



        // ustawia orginalny przebieg jako domyślny w polu aktualny przebieg oraz polu kosztów. Uruchamia go dodanie nowego samochodu, ustawia warość allCosts.currentMiles

        miles: function(obj) {
            var mil
            mil=parseFloat(obj);
            currMilSelect.innerText=mil;
            newCostDataSelect[1].setAttribute('value',mil);
            newCostDataSelect[1].setAttribute("min", mil);
            return {mil}
            },
        // po dodaniu nowego kosztu altualizuje pole z aktuyalnym przebiegiem
        currMilsUpdate: function(obj) {
           currMilSelect.innerText=obj
        },
        
        // w momencie uruchomienia dodawania nowego kosztu podstawia jako domyślną aktualna wartość przebiegu
        newCostMilUpdate: function(obj) {
            var sel;
            sel=newCostDataSelect[1];
            sel.setAttribute('value',obj);
           

        },

        
        validate: function(obj) {
            var test;
             test = true;
            for (i=0; i<obj.length-1; i++)   {
                if(obj[i].matches(':invalid')) {
                    test = false;
                    break;         
                }
                
                else {
                    test = true;
                    }
              
            }
            return {test}        
        },

        // zmieny stylów elementów :

        toggleVisibility: function(obj) {
            if(obj.style.display!=="none") {
                obj.style.display="none"
            }
            else{
                obj.style.display="block"
            }

        },

        toggleZindex: function(obj) {
            if(obj.style.zIndex!="2") {
                obj.style.zIndex="2"
            }
            else{
                obj.style.zIndex="0"
            }
        },

        // cena zakupu jako maks current value
        currentValue: function() {
            var v = newCarDataSelect[1].value
            currValSelect.setAttribute('max', v);
            currValSelect.setAttribute('value', v);
            },

        //sterowanie wypełnieniem samochodu

        carrFill: function(obj) {
            if(obj>90){
                carBackground.style.height="90%" 
            }
            else{
                carBackground.style.height=obj+"%" 
            }
           
        },

     //funkcja wstawiająca wartości w dwie pierwsze pozycje w górnym wierszu   
     dispTopTots: function(totExp, totMiles) {
            var num = totExp/totMiles            
            var avg = num.toFixed(1)
            topRow[0].innerText=totExp;
            if(totMiles>0) {
                topRow[1].innerText=avg;  
            } 
            else {
                topRow[1].innerText='0'
            }  
                      
            }, 
          
            // oblicza koszt dziennie
     dispCostperDay: function(totExp, pDate) {
         var today, carDate, old; 
         today = Math.floor(Date.now()/86400000)
         carDate = Math.floor(Date.parse((pDate+"-01"))/86400000)
         old = today - carDate
         topRow[2].innerText=Math.floor(totExp/old)

     },

        clearCost: function(obj) {
            var el, 
            el=document.getElementById(obj)
            el.parentNode.removeChild(el)
            
        },

    // funkcja generująca tablicę wyboru zapisanego samochodu

    picCar: function(obj) {
        var car = [];
        var carsToselect;
        for (i=0; i<obj.length; i++) {
            
             car.push('<option value="'+obj[i]+'">'+obj[i]+'</option>')
        };
        carsToselect = car.join("")
        document.getElementById('selectCar').innerHTML=carsToselect         
        },
        // wczytuje wszystko na z pamięci podręcznej
    loadSave: function() {
        var data = (costController.getTotals()).allCosts
        var loss = Math.floor((data.currentValue/data.orginalValue)*100)
        // z tabeli allCosts, pobranej z pamięci, uzupełnia wszystkie pola samochodu i je wyłącza
            
        newCarDataSelect[0].setAttribute("value", data.carName); 
        newCarDataSelect[1].setAttribute("value", data.orginalValue); 
        newCarDataSelect[2].setAttribute("value", data.purchaseDate); 
        newCarDataSelect[3].setAttribute("value", data.orginalMiles); 
        newCarDataSelect[4].setAttribute("disabled", "true"); 
        newCarDataSelect.forEach(el => el.setAttribute("readOnly", "true"))

        currMilSelect.innerText= data.currentMiles;
        
        
        currValSelect.setAttribute("value", data.currentValue)
        currValSelect.setAttribute("max", data.currentValue)

        this.carrFill(loss)
        // sumy róznych kosztów
        dispTotalSelect[0].innerText=data.totalIns;
        dispTotalSelect[1].innerText=data.totalMaint;
        dispTotalSelect[2].innerText=data.totalFuel;

        //aktualizacja górnych pól
        this.dispTopTots(data.totalCost,data.totalMilesDriven);
        //dzienny koszt
        this.dispCostperDay(data.totalCost, data.purchaseDate);

        //dodaje wiersze zapisanych kosztów

        data.allCostItems.forEach(el => this.addCostRow(el) );





        
      
        





    }

    
    


   
        


       






        }  // nawiast return funckji    


        
            
        
         



        

       
        


        
 


 



    

})();

//sterowanie - tu wywoływane są funckje z pozostałych modułów
var APPController = (function(costCont, uiCont) {
  
    var costTotals
    
//event listeners
 var newCarBtn = document.getElementById('submitNewCar');
 var newCostBtn = document.getElementById('newCostBtn');
 var submitNewCarBtn = document.getElementById('submitNewCar'); 
 var submitNewCostBtn = document.getElementById('submitNewCost') ;
 var remove = document.getElementById('rightColumn'); 
 var close = document.querySelector('.icon-cancel-circle');
 var overlay = document.getElementById('overlay');
 var costField = document.getElementById('addCost');
 var submitSaveCar = document.getElementById('submitSaveCar');
 var removeSaveCar = document.getElementById('removeSaveCar');
 var selectCar = document.getElementById('selectCar');
 var carSum = document.getElementById('carSummary')
 var newCar = document.getElementById('newCar')
 var startBox = document.getElementById('start');



//wstawia aktualną datę jako maks dla nowego samochodu
var input = uiCont.inputFields()
var today = uiCont.getDate()
input.newCarDataSel[2].setAttribute('max', today.currDate)
input.newCarDataSel[2].setAttribute('value', today.currDate)
 
// chowa pole kosztów 

var closing = function() {
    uiCont.toggleVisibility(costField)
    uiCont.toggleVisibility(overlay);

} 

close.addEventListener('click', closing)




var newCost = function() {
    var overlay, costField;
    overlay = document.getElementById('overlay')
    costField=document.getElementById('addCost')
   
    // wyświetlenie pola do wprowadzenia kosztów
    
    uiCont.toggleVisibility(costField);
    uiCont.toggleVisibility(overlay);
    


    // wstawia aktualna datę
   
    uiCont.getDate();

    
    // ustawia jako domyślmy aktualny przebieg
    millUpd = costCont.getTotals()
    var upmills = millUpd.allCosts.currentMiles;
    uiCont.newCostMilUpdate(upmills)

    

  
    
   
 
    }

    newCostBtn.addEventListener('click', newCost)


var submitNewCar = function() {

  
   var overlay, carField; 
   overlay = document.getElementById('overlay')
   carField=document.getElementById('carSummary')  

     // dodanie nowych wartości samochodu
    
    var input, carTot, 
    carTot = uiCont.newCarData();
    input=uiCont.inputFields()
    

    // walidacja formularza wg HTML
    valid=uiCont.validate(input.newCarDataSel)
    
 
        costCont.carName(carTot.model)
        // dodaje datę zakupu do purchaseDate
        costCont.puDate(input.newCarDataSel[2].value)

        // ustawienie przebiegu jak początkowy dla current mileage 
       uiCont.miles(carTot.orgMileage);
      
       // ustawienie orginalnego przebiegu jako wartości cuurent valu
      costCont.orgMil(carTot.orgMileage) 

      // ustawienie ceny zakupu jako maksymalny current value
       uiCont.currentValue(); 
       
      // zmiana pól na disabled
      
       input.newCarDataSel.forEach(function(cur){
           cur.disabled = true;
       })

       // doaje cenę zkupu do orginalValue

       costCont.orgPrice(carTot.price)

       
       

           
       uiCont.toggleVisibility(overlay)
       uiCont.toggleZindex(carField)
      // carField.style.zIndex="0"

       // pobranie
       costTotals = costCont.getTotals()

         
         

 
   
   //  }

    //else {
      //  alert("błąd formularza")
    //} 

    // odkrycie pozostałych pól

   

       
        
        
      

                 
        }

    submitNewCarBtn.addEventListener('click',submitNewCar)    



var submitNewCost = function() {
       


        
        var newCosData, newItem, sel, costTotals
        // pobiera wartości z pola do wprwadzania kosztó
        newCosData= uiCont.newCostData();
        newCarData = uiCont.newCarData();

    // walidacja pól fomularza

       valid=uiCont.validate(newCosData)

        if(valid.test) {
             // dodaje pobrane koszty do tablicy z kosztami
        newItem = costCont.addItem(newCosData.cDate, newCosData.cMileage, newCosData.cShort, newCosData.cLong, newCosData.cValue, newCosData.cType)
       
        // wyświetlenie nowyego elemntu kosztów
        uiCont.addCostRow(newItem)

        //wyczyszczenie pól po dodaniu kosztu, z wykorzytsaniem selektorów z UIControlerra
        sel = uiCont.inputFields();
        uiCont.clearFields(sel.newCostDataSel)
        
        //aktualizaja obliczeń
        costCont.calcTots()

        //pobranie nowych obliczeń
        costTotals = costCont.getTotals();
       

        // wyświetlenie nowych obliczeń
        uiCont.displayTotals(costTotals);

        //aktualizuje przebieg na podstawie pola z kosztami
        costCont.currMill(newCosData.cMileage)             
        

        //wyświetla zaktualizowany przebieg i wstawia go jako domyslny do pola kosztów
        
        millUpd = costCont.getTotals()
        var upmills = millUpd.allCosts.currentMiles
        uiCont.currMilsUpdate(upmills);   
        // wyświetla całkowity koszt oraz koszt na km    
        uiCont.dispTopTots(costTotals.allCosts.totalCost, costTotals.allCosts.totalMilesDriven)
        // wyświetla koszty dzienne
        uiCont.dispCostperDay(costTotals.allCosts.totalCost, newCarData.puDate )

        }

        else {
            alert("błąd formularza")
        } 





      

        
                
    }
    submitNewCostBtn.addEventListener('click',submitNewCost)

    // zmiana wartości samochodu
    var calcValue = function() {
        var carTot, loss, cos, totExp, totMil; 
        carTot = uiCont.newCarData();
        
        if (carTot.price<valueInput.value) {
           valueInput.value=carTot.price}
        else{
        //podstawia aktualną cenę do tabeli allCosts
        costCont.currValue(valueInput.value)
        // oblicza utratę wartości i na tej podstawie ustawia pozimom wypełnienia samochodu.
         loss=Math.floor((valueInput.value/carTot.price)*100)

         uiCont.carrFill(loss);
         // aktualzuje górne pola
         cos = costCont.getTotals()
        totExp=cos.allCosts.totalCost
        totMil=cos.allCosts.totalMilesDriven
        uiCont.dispTopTots(totExp,totMil) 
            
        }
    
       

        
        

    }

    valueInput.addEventListener('click',calcValue);
    valueInput.addEventListener('blur',calcValue);



var removeItem = function(event) {
    var targetId = (event.target.parentNode.id)
    var elementId = parseFloat(targetId.replace(/row/,''))
    var newCarData = uiCont.newCarData();

       //usuń z tablicy allCosts odpowieni elemnt

       costCont.removeCost(elementId)

       //usuń z ekranu wybrany koszt
       uiCont.clearCost(targetId)

        // zaktualizuj wszystkie powiązane wartości
        costCont.calcTots()

        // pobiera aktualne wartości
        costTotals = costCont.getTotals()
        
        // wyświetl nowe wartości
        uiCont.displayTotals(costTotals)

        // aktualizuje górne pola
        uiCont.dispTopTots(costTotals.allCosts.totalCost, costTotals.allCosts.totalMilesDriven)
        // wyświetla zaktualizowane koszty dzienne
        uiCont.dispCostperDay(costTotals.allCosts.totalCost, newCarData.puDate )


                    
    }
    remove.addEventListener('click', removeItem)

   
   window.addEventListener('beforeunload', costCont.save);

  
 

    
   

   // caył blok funckji gdy jest już coś w pamięci 

   if (localStorage.length>0) {

         


        var carVar = costCont.loadCars();
        uiCont.picCar(carVar); // wyświetla samochody do wyboru na podstawie tego co jest zapisane
        
        startBox.style.display="block";
        carSum.style.zIndex="0"
       

       // działanie gdy są zapisane samochody ale chcemy dodać nowy
        newCar.addEventListener('click', function(){
        uiCont.toggleVisibility(startBox),
        uiCont.toggleZindex(carSum)})

      

        submitSaveCar.addEventListener('click', function(){
                    
            uiCont.toggleVisibility(startBox),
            uiCont.toggleVisibility(overlay),
            costCont.load(), // wpisuje zapisane wartości do allCosts, musi być pierwsze
            uiCont.loadSave()
            

        }),

        // usuwa wybrany samochów z początkowej list
        removeSaveCar.addEventListener('click', costCont.removeCar)
   }

  


})(costController,uiController);

