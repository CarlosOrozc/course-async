const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://api.escuelajs.co/api/v1';


function fetchData(urlAPI, callback) {
    let xhttp = new XMLHttpRequest();

    // GET => Petition type 
    // urlAPI => API URL
    // true => available
    xhttp.open('GET', urlAPI, true);
    xhttp.onreadystatechange = function(event) {
        // Validate status
        // 0 => Not initialized, 1 => loading, 2 => send, 3 => working, 4 => completed
        if(xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                 callback(null, JSON.parse(xhttp.responseText))
            } else {
                const error = new Error('Error' + urlAPI);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}


fetchData(`${API}/products`, function(error, data) {
    if (error) return console.log(error);

    fetchData(`${API}/products/${data[0].id}`, function(error1, data1) {
        if (error1) return console.log(error1);

        fetchData(`${API}/categories/${data1?.category?.id}`, function(error2, data2) {
            if (error2) return console.log(error2);
            console.log(data[0])
            console.log(data1.title)
            console.log(data2.name)
        })
    })
})
