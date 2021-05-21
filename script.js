const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const sortBtn = document.getElementById('sort')
const showMillionairesBtn = document.getElementById('show-millionaires')

const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money

async function getRandomUser() {
     const res = await fetch('https://randomuser.me/api');
     const data = await res.json();
     const user = data.results[0];
     const newUser = {
         name: `${user.name.first} ${user.name.last}`,
         country: user.location.country,
         money: Math.floor(Math.random() * 1000000)
        
     }
     addData (newUser)
}

//double money

const doubleMoney = () => {
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    })
updateDom()
}

//sort 
const sortByRichest = ()=> {
    data.sort((a,b) => b.money - a.money);
    updateDom();  
}

// show milliionaires
const showMillionaires = ()=> {
   data = data.filter(user =>  user.money > 1000000);
    updateDom();  
}
// calculate totalwealth
const calculateWealth = ()=> {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);

   const wealthEl = document.createElement('div');
   wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong><h3>`;
   main.appendChild(wealthEl);
  
     


}
//Add new obj to data arr
function addData(obj) {
    data.push(obj);
    updateDom();
}


//update DOM
function updateDom(providedData = data) {
    //clear main div 
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(item.money)}`;
        main.appendChild(element)

    })
}


// Format number as money 
const formatMoney = (number)  => {
   return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
}



calculateWealthBtn

//eventlisteners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click',sortByRichest)
showMillionairesBtn.addEventListener('click',showMillionaires)
calculateWealthBtn.addEventListener('click',calculateWealth)