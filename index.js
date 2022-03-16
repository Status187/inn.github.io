const form = document.querySelector('#sendForm');
const inputMain = document.querySelector('#party');
const nameShort = document.querySelector('#name_short');
const nameFull = document.querySelector('#name_full');
const innKpp = document.querySelector('#inn_kpp');
const address = document.querySelector('#address');
const type = document.querySelector('#type');

let lop = {
    org: 'Организация',
    legalEntity: "(LEGAL)",
    businessman: "(INDIVIDUAL)",
};

inputMain.addEventListener('change', function() {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
    var token = "a81941f48a5e52ad1cac1cfce39044611b24f5b2";
    var query = inputMain.value;
    
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    fetch(url, options)
    .then(response => response.json())
    .then(result => {
        const resultWay = result.suggestions[0];
        if (resultWay.data.type = "LEGAL") {
            type.textContent = lop.org + ' ' + lop.legalEntity;
        }
        nameShort.value = resultWay.value;
        nameFull.value = resultWay.data.name.full_with_opf;
        innKpp.value = resultWay.data.inn + ' / ' + resultWay.data.kpp;
        address.value = resultWay.data.address.value;
    })

    .catch(error => console.log("error", error));
});
// Организация