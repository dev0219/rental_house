import { getdata } from "./api_module.js";

async function submitPraizlDot(propertyKey, eMail, price, timestamp) {

    var endpoint = 'dots/submit?property_key=' + propertyKey + '&user_id=' + eMail + '&value=' + price + '&timestamp=' + timestamp;

    return getdata(endpoint)
}

async function getPraizlDots(propertyKey, lookback) {
    var endpoint = 'dots/get?property_key=' + propertyKey + '&lookback=' + lookback

    return getdata(endpoint)
}
export { submitPraizlDot, getPraizlDots }