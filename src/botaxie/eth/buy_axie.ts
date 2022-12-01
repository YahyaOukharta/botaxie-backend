const { buildOrder } = require("./build_tx_data")
const Web3 = require("web3");
const { fetchOne } = require("../fetch/fetch_one");

const w3 = new Web3("https://api.roninchain.com/rpc");

const marketplaceAddress = "0xfff9ce5f71ca6178d3beecedb61e7eff1602950e"

// const pk = ""

// const wallet = w3.eth.accounts.privateKeyToAccount(pk);


// export async function buyAxie(axieId) {
//     const axie = await fetchOne(axieId);

//     const block = await w3.eth.getBlock("latest");
//     console.log("latest block :", block.number)
//     console.log("attempting on :", axie.id)
//     const nonce = await w3.eth.getTransactionCount(wallet.address);
//     const tx = {
//         from: wallet.address,
//         gasPrice: "1000000000",
//         gas: "300105",
//         to: marketplaceAddress,
//         data: await buildOrder(axie.id),
//         nonce
//     }
//     // console.log(tx);

//     const signedTx = (await wallet.signTransaction(tx)).rawTransaction;
//     //console.log(signedTx);
//     try {
//         const res = await w3.eth.sendSignedTransaction(signedTx);
//         console.log(res)
//         return true;
//     }
//     catch (e) {
//         console.log("failure")
//         return false;
//     }

// }
export interface PurchaseAttemptResult {
    status:boolean;
    data:any;
}

export async function buyAxie(pk:string, axieId:string) : Promise<PurchaseAttemptResult> {
    const wallet = w3.eth.accounts.privateKeyToAccount(pk);
    
    const axie = await fetchOne(axieId);

    const block = await w3.eth.getBlock("latest");
    console.log("latest block :", block.number)
    console.log("attempting on :", axie.id)
    const nonce = await w3.eth.getTransactionCount(wallet.address);
    const tx = {
        from: wallet.address,
        gasPrice: "1000000000",
        gas: "300105",
        to: marketplaceAddress,
        data: await buildOrder(axie.id),
        nonce
    }
    // console.log(tx);

    const signedTx = (await wallet.signTransaction(tx)).rawTransaction;
    //console.log(signedTx);
    try {
        const res = await w3.eth.sendSignedTransaction(signedTx);
        return {status:true, data:res}
    }
    catch (e) {
        // console.log(e)
        // console.log("failure")
        return {status:false, data:e}
    }

}

// exports.buyAxie = buyAxie;