
//rate limited : 300 per hour
async function getRandomMessage(){
    await fetch("https://graphql-gateway.axieinfinity.com/graphql", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:94.0) Gecko/20100101 Firefox/94.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "application/json",
        "Authorization": "",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site"
    },
    "referrer": "https://app.axieinfinity.com/",
    "body": "{\"operationName\":\"CreateRandomMessage\",\"variables\":{},\"query\":\"mutation CreateRandomMessage {\\n  createRandomMessage\\n}\\n\"}",
    "method": "POST",
    "mode": "cors"
});}