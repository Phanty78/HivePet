import { describe, it, expect, spyOn, beforeEach } from 'bun:test'
import { parseBlock } from '../../src/blockchain/parser'
import { SignedBlock } from '@hiveio/dhive'

describe('ParseBlock', () => {
  const emptyBlock = { transactions: [], transaction_ids: [] } as unknown as SignedBlock
  const invalidJSONBlock = {
    transactions: [{ operations: [['custom_json', { id: 'hivepet', json: '{invalid}' }]] }],
    transaction_ids: ['tx123'],
  } as unknown as SignedBlock
  const undefinedJSONBlock = {
    transactions: [
      {
        operations: [
          ['custom_json', { id: 'hivepet', json: '{"action":"mint"}', required_posting_auths: [] }],
        ],
      },
    ],
    transaction_ids: ['tx123'],
  } as unknown as SignedBlock

  const warnSpy = spyOn(console, 'warn')

  // Avant chaque test, réinitialisez  warmSpy
  beforeEach(() => {
    warnSpy.mockClear()
  })

  it('Devrait throw si currentBlock est égal ou inférieur à zéro', () => {
    expect(parseBlock(emptyBlock, 0)).rejects.toThrow()
  })

  it('Devrait envoyer un console Warm si le JSON est invalide.', () => {
    parseBlock(invalidJSONBlock, 123)
    expect(warnSpy).toHaveBeenCalled()
  })

  it('Je devrais envoyer un console Warm si le Json est undefined.', () => {
    parseBlock(undefinedJSONBlock, 123)
    expect(warnSpy).toHaveBeenCalled()
  })
})
