import { describe, it, expect } from "bun:test"
import { handleAction } from "../../src/actions/index"

describe("HandleAction", () => {

    it("Devrait renvoyer une erreur si username est une chaine vide", () => {
        const payload = { action: "mint" }
        expect(handleAction(payload,"","tx123",123)).rejects.toThrow()
    })
})
