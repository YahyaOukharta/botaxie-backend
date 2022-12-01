const {fetchOne} = require("../fetch/fetch_one")
const Web3 = require("web3")
const utils = Web3.utils
const BN = utils.BN;

const padding = "000000000000000000000000"
const paddingEnd = "00000000000000000000000000000000000000000000000000000000"
const uintZero = "0000000000000000000000000000000000000000"
const preSig = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000041"
const postSig = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
const orderSig = "c54c66d3"

const paduint = (n:number|string) => BN(n).toString(16).padStart(40,'0');

export async function buildOrder (axieId: string){
    const axie = await fetchOne(axieId);
    const order = axie.order;
    //console.log(order);
    const data : any= {}
    data.basePrice = paduint(order.basePrice)
    data.signature = order.signature.substr(2);
    data.maker = order.maker.substr(2);
    data.kind = paduint(1);
    data.expiredAt = paduint(order.expiredAt);
    data.startedAt = paduint(order.startedAt);
    data.paymentToken = order.paymentToken.substr(2);
    data.endedAt = paduint(order.endedAt);
    data.endedPrice = paduint(order.endedAt);
    data.exprectedState = paduint(0);
    data.nonce = paduint(order.nonce);
    data.marketFeePercentage = paduint(order.marketFeePercentage);

    data.arrlen = paduint(1);
    data.erc = paduint(1);
    data.axieAddress = "32950db2a7164ae833121501c797d79e7b79d74c";
    data.assetId = paduint(axieId);
    data.quantity = paduint(0);

    //console.log(data);

    let result = "0x95a4ec0000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000e4f524445525f45584348414e47450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000344";

    result += orderSig;
    result += uintZero;
    result += uintZero;
    result += "00000000";
    result += data.basePrice;

    result += preSig;
    result += data.signature;
    result += postSig;

    result += data.maker;
    result += padding;

    result += data.kind;
    result += padding;

    result += "0000000000000000000000000000000000000180";
    result += padding;

    result += data.expiredAt;
    result += padding

    result += data.paymentToken;
    result += padding

    result += data.startedAt;
    result += padding

    result += data.basePrice;
    result += padding

    result += data.endedAt;
    result += padding

    result += data.endedPrice;
    result += padding

    result += data.exprectedState;
    result += padding

    result += data.nonce;
    result += padding

    result += data.marketFeePercentage;
    result += padding

    result += data.arrlen;
    result += padding

    result += data.erc;
    result += padding

    result += data.axieAddress;
    result += padding

    result += data.assetId;
    result += padding

    result += data.quantity;

    result += paddingEnd;

    //console.log(result);
    return result;
}

// buildOrder(5595651);

// exports.buildOrder = buildOrder;