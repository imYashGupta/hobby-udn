const axios = require('axios');

const zenrows = (res) => {
    const url = 'https://udaan.com/api/foodFmcgSearch/v1/listing/TLFRC4BJF4F42RCQ6CGBMFB347WBRY8';
    const apikey = '7111640db56772d02ceebfb0428d76efd44fa405';
    axios({
        url: 'https://api.zenrows.com/v1/',
        method: 'GET',
        params: {
            'url': url,
            'apikey': apikey,
            'premium_proxy': 'true',
            'proxy_country': 'in',
        },
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
}

module.exports = { zenrows };
