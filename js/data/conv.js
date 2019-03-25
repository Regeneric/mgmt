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
    },
    timeConvert: (from, to, howMuch) => {
        let milis = 0;
        switch(from) {
            case "SEK": {
                milis = howMuch*1000;
                break;
            }
            case "MIN": {
                milis = howMuch*60*1000;
                break;
            }
            case "HRS": {
                milis = howMuch*60*60*1000;
                break;
            }
            case "DAY": {
                milis = howMuch*60*60*24*1000;
                break;
            }
            case "WEK": {
                milis = howMuch*60*60*24*7*1000;
                break;
            }
            case "MNT": {
                milis = howMuch*60*60*24*7*4*1000;
                break;
            }
            case "YRS": {
                milis = howMuch*60*60*24*7*4*12*1000;
                break;
            }
            case "AGE": {
                milis = howMuch*60*60*24*7*4*12*100*1000;
                break;
            }
        }
    
        let result = 0;
        switch(to) {
            case "SEK": {
                result = milis/1000;
                break;
            }
            case "MIN": {
                result = milis/60/1000;
                break;
            }
            case "HRS": {
                result = milis/60/60/1000;
                break;
            }
            case "DAY": {
                result = milis/60/60/24/1000;
                break;
            }
            case "WEK": {
                result = milis/60/60/24/7/1000;
                break;
            }
            case "MNT": {
                result = milis/60/60/24/7/4/1000;
                break;
            }
            case "YRS": {
                result = milis/60/60/24/7/4/12/1000;
                break;
            }
            case "AGE": {
                result = milis/60/60/24/7/4/12/100/1000;
                break;
            }
        } 
        return result;
    },
    volumeConvert: (from, to, howMuch) => {
        let milis = 0;
        switch(from) {
            case "L": {
                milis = howMuch*1000;
                break;
            }
            case "ML": {
                milis = howMuch;
                break;
            }
            case "CM3": {
                milis = howMuch;
                break;
            }
            case "M3": {
                milis = howMuch*1000000;
                break;
            }
            case "OZ": {
                milis = howMuch*29.57;
                break;
            }
            case "GAL": {
                milis = howMuch*3785.411784;
                break;
            }
            case "QT": {
                milis = howMuch*946.352946;
                break;
            }
        }
    
        let result = 0;
        switch(to) {
            case "L": {
                result = milis/1000;
                break;
            }
            case "ML": {
                result = milis;
                break;
            }
            case "CM3": {
                result = milis;
                break;
            }
            case "M3": {
                result = milis/1000000;
                break;
            }
            case "OZ": {
                result = milis/29.57;
                break;
            }
            case "GAL": {
                result = milis/3785.411784;;
                break;
            }
            case "QT": {
                result = milis/946.352946;
                break;
            }
        } 
        return result;
    }
}
