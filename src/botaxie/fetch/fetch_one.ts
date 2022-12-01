// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
import fetch from "node-fetch"

export const fetchOne = async (id:number) => {
    const res = await fetch("https://graphql-gateway.axieinfinity.com/graphql?p=20", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlYzllYjZmLTk1YWUtNjdiNi1hNjBjLWQ1NWQ3NmQwN2QxOCIsInNpZCI6ODU2NDg1OTAsInJvbGVzIjpbInVzZXIiXSwic2NwIjpbImFsbCJdLCJhY3RpdmF0ZWQiOnRydWUsImFjdCI6dHJ1ZSwib2lkIjozOTAzMzk2LCJyb25pbkFkZHJlc3MiOiIweGQ3M2ExYjljZWE1NGNjNzUzOWY0OWZjNDdhNjQ4ZjI4NmE5MjY2YTciLCJleHAiOjE2NjY4ODg3MTYsImlhdCI6MTY2NTY3OTExNiwiaXNzIjoiQXhpZUluZmluaXR5Iiwic3ViIjoiMWVjOWViNmYtOTVhZS02N2I2LWE2MGMtZDU1ZDc2ZDA3ZDE4In0.jKMJwtAE8rj68i9W3I_v8Ya_BgAH0yNn_XjnfMX-PpU",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            //...genIPHeaders()


        },
        "referrer": "https://app.axieinfinity.com/",
        "body": "{\"operationName\":\"GetAxieDetail\",\"variables\":{\"axieId\":\"" + id + "\"},\"query\":\"query GetAxieDetail($axieId: ID!) {\\n  axie(axieId: $axieId) {\\n    ...AxieDetail\\n    __typename\\n  }\\n}\\n\\nfragment AxieDetail on Axie {\\n  id\\n  image\\n  class\\n  chain\\n  name\\n  genes\\n  newGenes\\n  owner\\n  birthDate\\n  bodyShape\\n  class\\n  sireId\\n  sireClass\\n  matronId\\n  matronClass\\n  stage\\n  title\\n  breedCount\\n  level\\n  figure {\\n    atlas\\n    model\\n    image\\n    __typename\\n  }\\n  parts {\\n    ...AxiePart\\n    __typename\\n  }\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  order {\\n    ...OrderInfo\\n    __typename\\n  }\\n  ownerProfile {\\n    name\\n    __typename\\n  }\\n  battleInfo {\\n    ...AxieBattleInfo\\n    __typename\\n  }\\n   potentialPoints {\\n    beast\\n    aquatic\\n    plant\\n    bug\\n    bird\\n    reptile\\n    mech\\n    dawn\\n    dusk\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieBattleInfo on AxieBattleInfo {\\n  banned\\n  banUntil\\n  level\\n  __typename\\n}\\n\\nfragment AxiePart on AxiePart {\\n  id\\n  name\\n  class\\n  type\\n  specialGenes\\n  stage\\n  abilities {\\n    ...AxieCardAbility\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieCardAbility on AxieCardAbility {\\n  id\\n  name\\n  attack\\n  defense\\n  energy\\n  description\\n  backgroundUrl\\n  effectIconUrl\\n  __typename\\n}\\n\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\\nfragment OrderInfo on Order {\\n  id\\n  maker\\n  kind\\n  assets {\\n    ...AssetInfo\\n    __typename\\n  }\\n  expiredAt\\n  paymentToken\\n  startedAt\\n  basePrice\\n  endedAt\\n  endedPrice\\n  expectedState\\n  nonce\\n  marketFeePercentage\\n  signature\\n  hash\\n  duration\\n  timeLeft\\n  currentPrice\\n  suggestedPrice\\n  currentPriceUsd\\n  __typename\\n}\\n\\nfragment AssetInfo on Asset {\\n  erc\\n  address\\n  id\\n  quantity\\n  orderId\\n  __typename\\n}\\n\"}",
        "method": "POST",
        "mode": "cors"
    } as any);
    try {

        const data = (await res.json() as any).data.axie;
        //console.log(data)
        return (data);
    }
    catch (e) {
        console.log(e, res)
    }
}

