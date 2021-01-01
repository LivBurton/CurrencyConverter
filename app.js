// https://exchangeratesapi.io/
// https://restcountries.eu/

const btnCountry = document.getElementById('btn-country');
const btnSelectCurrency = document.getElementById('btn-select-currency');

const countryName = 'united';
const dropdownCountry1 = document.getElementById('country-name1');
const dropdownCountry2 = document.getElementById('country-name2');
const allInfo = document.querySelector('.all-info');
const switchHeading = document.querySelector('.switch-heading');
const countriesContainer = document.querySelector('.countries-container');
const inputCurrencies = document.querySelector('.input-currencies');
const converterHeader = document.getElementById('converter-header');

const firstSelected = document.getElementById('input-country1');
const secondSelected = document.getElementById('input-country2');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const currencyOnlyOne = document.getElementById('currency-only-one');
const currencyOnlyTwo = document.getElementById('currency-only-two');
const converter = document.getElementById('converter');
const labelCurrOnlyOne = document.getElementById('label-curr-only-one');
const labelCurrOnlyTwo = document.getElementById('label-curr-only-two');
const btnSwitch = document.getElementById('btn-switch');

const pCurrency1 = document.getElementById('p-currency1');
const pCurrency2 = document.getElementById('p-currency2');
const pCapital1 = document.getElementById('p-capital1');
const pCapital2 = document.getElementById('p-capital2');
const pCode1 = document.getElementById('p-code1');
const pCode2 = document.getElementById('p-code2');
const pRegion1 = document.getElementById('p-region1');
const pRegion2 = document.getElementById('p-region2');
const Flag1 = document.getElementById('flag1');
const Flag2 = document.getElementById('flag2');

let currencyOneSymbol = '';
let currencyTwoSymbol = '';

let countrySelected;

// ------SET DROPDOWN LIST OF COUNTRIES----------
function getCountryDropdown() {
  firstSelected.placeholder = 'Select country';
  secondSelected.placeholder = 'Select country';
  dropdownCountry1.innerHTML = '';
  dropdownCountry2.innerHTML = '';

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const option1 = document.createElement('option');
        option1.innerText = data[i].name;
        dropdownCountry1.appendChild(option1);
        const option2 = document.createElement('option');
        option2.innerText = data[i].name;
        dropdownCountry2.appendChild(option2);
      }
    });
}

// --------SET CURRENCY DROPDOWN LIST---------
function getCurrancyDropdown() {
  countrySelected = false;

  firstSelected.placeholder = 'Select currency';
  secondSelected.placeholder = 'Select currency';
  dropdownCountry1.innerHTML = '';
  dropdownCountry2.innerHTML = '';
  fetch('countries.json')
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const option1 = document.createElement('option');
        option1.innerText = data[i];
        dropdownCountry1.appendChild(option1);
        const option2 = document.createElement('option');
        option2.innerText = data[i];
        dropdownCountry2.appendChild(option2);
      }
    });
}

// -------DISPLAY COUNTRY INFO-------------
function getCountryList() {
  countrySelected = true;
  if (
    !btnCountry.classList.contains('btnClicked') ||
    btnSelectCurrency.classList.contains('btnClicked')
  ) {
    btnCountry.classList.add('btnClicked');
    btnSelectCurrency.classList.remove('btnClicked');
  }

  firstSelected.value = '';
  secondSelected.value = '';
  if (!countriesContainer.classList.contains('selected')) {
    countriesContainer.classList.add('selected');
  } else if (switchHeading.classList.contains('selected')) {
    switchHeading.classList = 'switch-heading';
    inputCurrencies.classList = 'input-currencies';
    allInfo.classList = 'all-info';
    converterHeader.classList = 'converter-header';
  }
  getCountryDropdown();
}

// --------DISPLAY CURRENCY INFO----------------
function getTestList() {
  countrySelected = false;

  if (
    btnCountry.classList.contains('btnClicked') ||
    !btnSelectCurrency.classList.contains('btnClicked')
  ) {
    btnCountry.classList.remove('btnClicked');
    btnSelectCurrency.classList.add('btnClicked');
  }

  if (!countriesContainer.classList.contains('selected')) {
    countriesContainer.classList.add('selected');
  } else {
    switchHeading.classList = 'switch-heading';
    allInfo.classList = 'all-info';
    converterHeader.classList = 'converter-header';
    inputCurrencies.classList = 'input-currencies';
  }
  firstSelected.value = '';
  secondSelected.value = '';
  getCurrancyDropdown();
}

// ------------GET COUNTRY DATA----------------
function getCountryOneData() {
  let currency1 = '';
  let capital1 = '';
  let code1 = '';
  let region1 = '';
  let flag1 = '';
  console.log(countrySelected);
  currencyOneSymbol = '';

  if (countrySelected === true && firstSelected.value !== '') {
    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === firstSelected.value) {
            currency1 = data[i].currencies[0].code;
            capital1 = data[i].capital;
            code1 = data[i].callingCodes[0];
            region1 = data[i].region;
            flag1 = data[i].flag;
          }
        }
        pCurrency1.innerText = `Currency: ${currency1}`;
        pCapital1.innerText = `Capital City: ${capital1}`;
        pCode1.innerText = `Calling Code: +${code1}`;
        pRegion1.innerText = `Region: ${region1}`;
        Flag1.src = flag1;

        currencyOneSymbol = currency1;
        console.log(currencyOneSymbol);
        console.log('what');
        if (currencyOneSymbol !== '' && currencyTwoSymbol !== '') {
          getExchangeData(currencyOneSymbol, currencyTwoSymbol);
          updateUI(true);
        }
      });
    // else if currency only selected
  } else if (
    countrySelected === false &&
    firstSelected.value !== '' &&
    secondSelected.value !== ''
  ) {
    getExchangeData(firstSelected.value, secondSelected.value);
    updateUI(false);
  }
}

function getCountryTwoData() {
  let currency2 = '';
  let capital2 = '';
  let code2 = '';
  let region2 = '';
  let flag2 = '';
  currencyTwoSymbol = '';

  if (countrySelected === true && secondSelected.value !== '') {
    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === secondSelected.value) {
            currency2 = data[i].currencies[0].code;
            capital2 = data[i].capital;
            code2 = data[i].callingCodes[0];
            region2 = data[i].region;
            flag2 = data[i].flag;
          }
        }
        pCurrency2.innerText = `Currency: ${currency2}`;
        pCapital2.innerText = `Capital City: ${capital2}`;
        pCode2.innerText = `Calling Code: +${code2}`;
        pRegion2.innerText = `Region: ${region2}`;
        Flag2.src = flag2;

        currencyTwoSymbol = currency2;

        if (currencyOneSymbol !== '' && currencyTwoSymbol !== '') {
          getExchangeData(currencyOneSymbol, currencyTwoSymbol);
          updateUI(true);
        }
      });
    // else if currency only selected
  } else if (
    countrySelected === false &&
    firstSelected.value !== '' &&
    secondSelected.value !== ''
  ) {
    getExchangeData(firstSelected.value, secondSelected.value);
    updateUI(false);
  }
}

// -----------UPDATE UI-----------------------------------
function updateUI(type) {
  switchHeading.classList = 'switch-heading selected';
  if (type === true) {
    allInfo.classList = 'all-info selected';
    converterHeader.classList = 'converter-header selected';
  } else {
    inputCurrencies.classList = 'input-currencies selected';
    converterHeader.classList = 'converter-header selected';
  }
}

// ----------------GET EXCHANGE DATA----------------------
function getExchangeData(Symbol1, Symbol2) {
  console.log(Symbol1, Symbol2);

  if (Symbol1 !== '' && Symbol2 !== '') {
    fetch(`https://api.exchangeratesapi.io/latest?base=${Symbol1}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[Symbol2];

        converter.innerText = `1 ${Symbol1} = ${rate.toFixed(2)} ${Symbol2}`;

        if (countrySelected === true) {
          amountTwo.value = (amountOne.value * rate).toFixed(2);
        } else {
          currencyOnlyTwo.value = (currencyOnlyOne.value * rate).toFixed(2);
          labelCurrOnlyOne.innerText = Symbol1;
          labelCurrOnlyTwo.innerText = Symbol2;
        }
      });
  }
}
// ----------SWITCH ALL DATA--------------
function switchData() {
  if (firstSelected.value != '' && secondSelected.value !== '') {
    const oldCountry = firstSelected.value;
    firstSelected.value = secondSelected.value;
    secondSelected.value = oldCountry;
    getCountryOneData();
    getCountryTwoData();
  }
}

// -------EVENT LISTENERS-----------------
btnSelectCurrency.addEventListener('click', getTestList);
btnCountry.addEventListener('click', getCountryList);

firstSelected.addEventListener('input', getCountryOneData);
secondSelected.addEventListener('input', getCountryTwoData);
amountOne.addEventListener('input', () =>
  getExchangeData(currencyOneSymbol, currencyTwoSymbol)
);
amountTwo.addEventListener('input', () =>
  getExchangeData(currencyOneSymbol, currencyTwoSymbol)
);

currencyOnlyOne.addEventListener('input', () => {
  getExchangeData(firstSelected.value, secondSelected.value);
});
currencyOnlyTwo.addEventListener('input', () => {
  getExchangeData(firstSelected.value, secondSelected.value);
});

btnSwitch.addEventListener('click', switchData);
