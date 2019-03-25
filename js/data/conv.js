module.exports = {
    currency: () => {
        const data = [
            '<option value="PLN">PLN - Polska</option>',
            '<option value="EUR">EUR - Unia Europejska</option>',
            '<option value="USD">USD - Stany Zjednoczone</option>',
            '<option value="GBP">GPB - Wielka Brytania</option>',
            '<option value="CHF">CHF - Szwajcaria</option>',
            '<option value="AUD">AUD - Australia</option>',
            '<option value="BRL">BRL - Brazylia</option>',
            '<option value="BGN">BGN - Bułgaria</option>',
            '<option value="CZK">CZK - Czechy</option>',
            '<option value="CNY">CNY - ChRL</option>',
            '<option value="CAD">CAD - Kanada</option>',
            '<option value="DKK">DKK - Dania</option>',
            '<option value="HRK">HRL - Chorwacja</option>',
            '<option value="HUF">HUF - Węgry</option>',
            '<option value="HKD">HKD - Hongkong</option>',
            '<option value="ISK">ISK - Islandia</option>',
            '<option value="INR">INR - Indie</option>',
            '<option value="IDR">IDR - Indonezja</option>',
            '<option value="ILS">ILS - Izrael</option>',
            '<option value="JPY">JPY - Japonia</option>',
            '<option value="KRW">KRW - Korea Południowa</option>',
            '<option value="MYR">MYR - Malezja</option>',
            '<option value="MXN">MXN - Meksyk</option>',
            '<option value="NZD">NZD - Nowa Zelandia</option>',
            '<option value="NOK">NOK - Norwegia</option>',
            '<option value="PHP">PHP - Filipiny</option>',
            '<option value="RUB">RUB - Rosja</option>',
            '<option value="RON">RON - Rumunia</option>',
            '<option value="SGD">SGD - Singapur</option>',
            '<option value="SEK">SEK - Szwecja</option>',
            '<option value="TRY">TRY - Turcja</option>',
            '<option value="THB">THB - Tajlandia</option>',
            '<option value="ZAR">ZAR - RPA</option>'  
        ]; return data;
    },
    time: () => {
        const data = [
            '<option value="SEK">Sekunda</option>',
            '<option value="MIN">Minuta</option>',
            '<option value="HRS">Godzina</option>',
            '<option value="DAY">Dzień</option>',
            '<option value="WEK">Tydzień</option>',
            '<option value="MNT">Miesiąc</option>',
            '<option value="YRS">Rok</option>',
            '<option value="AGE">Wiek</option>'
        ]; return data;
    },
    volume: () => {
        const data = [
            '<option value="L">Litr</option>',
            '<option value="ML">Mililitr</option>',
            '<option value="CM3">Centymetr szcześcienny</option>',
            '<option value="M3">Metr sześcienny</option>',
            '<option value="OZ">Uncja</option>',
            '<option value="GAL">Galon</option>',
            '<option value="QT">Kwarta</option>'
        ]; return data;
    }
}