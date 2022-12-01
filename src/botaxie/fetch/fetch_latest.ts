import fetch from 'node-fetch'
import {fetchOne} from "./fetch_one";

const fetchAllLatest = async (count:number) => {
    const res = await fetch("https://graphql-gateway.axieinfinity.com/graphql", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:94.0) Gecko/20100101 Firefox/94.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlYzllYjZmLTk1YWUtNjdiNi1hNjBjLWQ1NWQ3NmQwN2QxOCIsInNpZCI6ODU2NDg1OTAsInJvbGVzIjpbInVzZXIiXSwic2NwIjpbImFsbCJdLCJhY3RpdmF0ZWQiOnRydWUsImFjdCI6dHJ1ZSwib2lkIjozOTAzMzk2LCJyb25pbkFkZHJlc3MiOiIweGQ3M2ExYjljZWE1NGNjNzUzOWY0OWZjNDdhNjQ4ZjI4NmE5MjY2YTciLCJleHAiOjE2NjY4ODg3MTYsImlhdCI6MTY2NTY3OTExNiwiaXNzIjoiQXhpZUluZmluaXR5Iiwic3ViIjoiMWVjOWViNmYtOTVhZS02N2I2LWE2MGMtZDU1ZDc2ZDA3ZDE4In0.jKMJwtAE8rj68i9W3I_v8Ya_BgAH0yNn_XjnfMX-PpU",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site"
        },
        "referrer": "https://app.axieinfinity.com/",
        "body": "{\"operationName\":\"GetAxieBriefList\",\"variables\":{\"from\":0,\"size\":"+count+",\"sort\":\"Latest\",\"auctionType\":\"Sale\",\"owner\":null,\"criteria\":{\"region\":null,\"parts\":null,\"bodyShapes\":null,\"classes\":null,\"stages\":null,\"numMystic\":null,\"pureness\":null,\"title\":null,\"breedable\":null,\"breedCount\":null,\"hp\":[],\"skill\":[],\"speed\":[],\"morale\":[],\"purity\":[],\"numJapan\":null,\"numXmas\":null,\"numShiny\":null,\"numSummer\":null,\"ppBeast\":null,\"ppAquatic\":null,\"ppPlant\":null,\"ppBug\":null,\"ppBird\":null,\"ppReptile\":null,\"ppMech\":null,\"ppDawn\":null,\"ppDusk\":null}},\"query\":\"query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\\n  axies(\\n    auctionType: $auctionType\\n    criteria: $criteria\\n    from: $from\\n    sort: $sort\\n    size: $size\\n    owner: $owner\\n  ) {\\n    total\\n    results {\\n      ...AxieBrief\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment AxieBrief on Axie {\\n  id\\n  name\\n  stage\\n  class\\n  breedCount\\n  image\\n  title\\n  genes\\n  newGenes\\n  battleInfo {\\n    banned\\n    __typename\\n  }\\n  order {\\n    id\\n    currentPrice\\n    currentPriceUsd\\n    __typename\\n  }\\n  parts {\\n    id\\n    name\\n    class\\n    type\\n    specialGenes\\n    __typename\\n  }\\n  __typename\\n}\\n\"}",
        "method": "POST",
        "mode": "cors"
    }as any);
    try {
        const data = (await res.json() as any).data.axies.results;
        //console.log(data.length)//,data);
        return (data);
    }
    catch (e) {
        console.log(e,res)
    }
}
export const fetchLatest = async (count : number)=>{
    return await Promise.all((await fetchAllLatest(count)).map((a: { id: number }) => fetchOne(a.id)));

}
// exports.fetchLatest = fetchLatest;
