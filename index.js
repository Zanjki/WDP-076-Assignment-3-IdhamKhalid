
const url = 'https://covid-193.p.rapidapi.com/countries';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '7ee37b75b3msh447162c231c322ap122d21jsn1eadc95d4423',
    'x-rapidapi-host': 'covid-193.p.rapidapi.com'
  }
};

var region = document.getElementById('negara');
var activeCase = document.getElementById('active-case');
var newCase = document.getElementById('new-case');
var recoveredCase = document.getElementById('recovered-case');
var totalCase = document.getElementById('total-case');
var totalDeath = document.getElementById('total-death');
var totalTest = document.getElementById('total-test');

fetch(url, options)
  .then(response => {
    console.log(response, 'ini response');
    return response.json();
  })
  .then(result => {
    console.log(result, 'ini result');
    region.textContent = result.response[0].country;
    activeCase.textContent = result.response[0].cases.active
    newCase.textContent = result.response[0].cases.new;
    recoveredCase.textContent = result.response[0].cases.recovered;
    totalCase.textContent = result.response[0].cases.total;
    totalDeath.textContent = result.response[0].deaths.total;
    totalTest.textContent = result.response[0].tests.total;
  })
  .catch(err => console.log(err));

let btnChange = document.getElementById('btn-change');

function handleClick(event) {
  event.preventDefault();
  let inputNegaraValue = document.getElementById('input-negara').value;
  fetch(`https://covid-193.p.rapidapi.com/history?country=${inputNegaraValue}&day=2024-08-28`, options)
    .then(response => response.json())
    .then(result => {
      if (result.response.length > 0) {
        region.textContent = result.response[0].country;
        activeCase.textContent = result.response[0].cases.active;
        newCase.textContent = result.response[0].cases.new;
        recoveredCase.textContent = result.response[0].cases.recovered;
        totalCase.textContent = result.response[0].cases.total;
        totalDeath.textContent = result.response[0].deaths.total;
        totalTest.textContent = result.response[0].tests.total;
        Swal.fire("Success", "Negara ditemukan!", "success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Maaf data Tidak ditemukan</a>'
        });
      }
    })
    .catch(err => console.log(err));
}

btnChange.addEventListener('click', handleClick);
