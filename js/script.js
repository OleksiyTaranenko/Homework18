async function sendRequest(url, method) {    

    let response = await fetch(url, {
         method: method,
    });

    let users = await response.json();
    let user = document.getElementById('user');
    let userValue = Object.values(users[0]);
    user.textContent = userValue; 
    return users;     
}

async function sendRequest2(url, method) {

    let response2 = await fetch(url, {
        method: method,
    });
        
    let users = await response2.json();

    let usersCompanies = users.sort(function(a, b){
        let nameA = a.company.name.toLowerCase(), 
        nameB = b.company.name.toLowerCase();
          if (nameA < nameB) 
            return -1;
          if (nameA > nameB)
            return 1;
          return 0; 
    });

    let companies = users.map(function(obj) { //Немного поигрался с этим
        return obj.company.name; 
    });

    companies = companies.filter(function(v,i) { 
        return companies.indexOf(v) === i; 
    }); 

    let textField = document.getElementById('companies');
    textField.innerHTML = companies.sort(); //
       
    console.log('a) Filter by company name (A to Z):', usersCompanies);


    let usersNames = users.filter((userLetter) => {
        return userLetter.name[0] === 'C';
    });
    console.log('b) Users whose name begins with the letter C:', usersNames);


    let usersCities = users.filter((userCityName) => {
        return userCityName.address.city[0] === 'R';
    });
    console.log('c) Users who live in cities with name begins with the letter R:', usersCities);

    return users; 
}

async function sendRequest3(url, method) {
    
    try {

        let response = await fetch(url, {
            method: method,
            
        });
    
        let users = await response.json();

        return users;

    } catch(err) {
        console.log(err); // Failed to fetch
    }       
}

async function abc() {
    let url = 'http://jsonplaceholder.typicode.com/users';
    let users = await sendRequest(url, 'GET');
    console.log('ALL USERS:', users);
    let users2 = await sendRequest2(url, 'GET');
    console.log('ALL USERS AGAIN:', users);
    let url2 = 'https://jsonplaceholder.typicode.com/users/5/posts';
    let users3 = await sendRequest3(url2, 'GET');
    console.log('d) Show user posts in the console:', users3);
}

abc();