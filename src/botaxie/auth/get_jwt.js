

await fetch("https://athena.skymavis.com/v1/rpc/auth/login-with", {
    "credentials": "omit",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:94.0) Gecko/20100101 Firefox/94.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "x-random-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6bnVsbCwiYWN0aXZhdGVkIjpmYWxzZSwiYWN0IjpmYWxzZSwiZXhwIjoxNjY1Njc4NzU5LCJpYXQiOjE2NjU2Nzg2OTksImlzcyI6IkF4aWVJbmZpbml0eSJ9.n3mk8xgnHlOLKs0xoqQHJCOtd4MyAP5XwWpKpajA8Co",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
    },
    "referrer": "https://app.axieinfinity.com/",
    "body": "{\"service\":\"ronin\",\"challenge\":\"\",\"message\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6bnVsbCwiYWN0aXZhdGVkIjpmYWxzZSwiYWN0IjpmYWxzZSwiZXhwIjoxNjY1Njc4NzU5LCJpYXQiOjE2NjU2Nzg2OTksImlzcyI6IkF4aWVJbmZpbml0eSJ9.n3mk8xgnHlOLKs0xoqQHJCOtd4MyAP5XwWpKpajA8Co\",\"signature\":\"0x02f2b11c30bdae59cce229e26c48db9376d70e0c2f91938f026886bba47d67823271bfabcf02c0d95be2cdeceac238b2d6b95c13fc024e65a44010850c84dc601b\"}",
    "method": "POST",
    "mode": "cors"
});
