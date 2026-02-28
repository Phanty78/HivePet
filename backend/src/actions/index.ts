// TODO - revoir le type de payload avec une interface

export async function handleAction(payload: any, username: string, txId: string, blockNum: number) {
  const trimedUsername = username.trim()
  if (trimedUsername === '') {
    throw new Error('username ne peux pas être une chaine vide')
  }

  switch (payload.action) {
    case 'mint':
      console.log('action mint')
      break
    case 'feed':
      console.log('action feed')
      break
    default:
      console.log("WARN: pas d'action identifié par handleAction")
      break
  }
}
