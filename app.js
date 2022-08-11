const labels = [];
const ratesEUR = [];
const ratesUSD = [];

const getRatesForData = (date) => {
  const URL = `https://www.bnm.md/ro/official_exchange_rates?get_xml=1&date=${date}`;

  const xhr = new XMLHttpRequest();
  xhr.open('Get', URL);
  xhr.send();

  xhr.onload = () => {
    let res = xhr.responseText;

    //parsing XML
    let xmlParser = new DOMParser();

    let xmlDoc = xmlParser.parseFromString(res, 'text/xml');

    // EUR -> MDL
    let valuteEUR = xmlDoc.querySelector(`[ID="47"]`);
    let valueEUR = parseFloat(valuteEUR.lastElementChild.innerHTML);
    ratesEUR.push(valueEUR);

     // USD -> MDL
     let valuteUSD = xmlDoc.querySelector(`[ID="44"]`);
     let valueUSD = parseFloat(valuteUSD.lastElementChild.innerHTML);
     ratesUSD.push(valueUSD);

  }
}


const getRates = (fromDate, toDate) => {
  for (let date = fromDate; date <= toDate; date++) {
    if (date < 10) {
      date = '0' + date;
    }
    labels.push(`${date}.07.2022`);
    getRatesForData(`${date}.07.2022`);
  }
}

getRates(1, 31);

const plotData = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'BNM Exchange Rates for EUR/MDL',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: ratesEUR,
      },
      {
        label: 'BNM Exchange Rates for USD/MDL',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: ratesUSD,
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };


  const ratesChart = new Chart(
    document.getElementById('ratesChart'),
    config
  );
}

setTimeout(plotData, 2000);

//HW1: try to display a second currency in parallel (USD)