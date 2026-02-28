import { SignedBlock } from "@hiveio/dhive";
import { handleAction } from "../actions";

// Cette fonction filtre et extrait les données de la blockchain
export async function parseBlock(block: SignedBlock, currentBlock: number) {

    if (currentBlock <= 0){
        throw new Error("currentBlock ne peut pas être égale à 0 ou négatif");    
    }

    for (let i = 0; i < block.transactions.length; i++) {
        const tx = block.transactions[i]
        const txId = block.transaction_ids[i]
        tx.operations.forEach((op) => {
            if (op[0] === "custom_json" && op[1].id === "hivepet"){

                let payload = null

                try {
                     payload = JSON.parse(op[1].json)
                } catch (error) {
                    console.warn(`json invalide : ${error}`);
                    return  
                }

                if (!op[1].required_posting_auths?.[0]) {
                    console.warn("op[1].required_posting_auths[0] est undefined");
                    return
                }
                const username = op[1].required_posting_auths[0]
                handleAction(payload,username,txId,currentBlock)
            }
        })
    }
}
