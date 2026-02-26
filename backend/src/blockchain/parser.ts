import { SignedBlock } from "@hiveio/dhive";

export async function parseBlock(block: SignedBlock, currentBlock: number) {
    for (let i = 0; i < block.transactions.length; i++) {
        const tx = block.transactions[i]
        const txId = block.transaction_ids[i]
        tx.operations.forEach((op) => {
            if (op[0] === "custom_json" && op[1].id === "hivepet"){
                const payload = JSON.parse(op[1].json)
                const username = op[1].required_posting_auths[0]
                console.log(`transaction de ${username} trouvé`)
            }
        })
    }
}
