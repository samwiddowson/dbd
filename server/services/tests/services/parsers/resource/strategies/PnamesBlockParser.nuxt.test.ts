import { describe, expect, it } from "vitest"
import path from "node:path"
import { readFile } from "node:fs/promises"
import { PnamesBlockParser } from "~/server/services/parsers/resource/strategies/PnamesBlockParser"

describe("PnamesBlockParser happy path", async () => {
    const testResourceFilePath = path.join(__dirname, "testdata", "PNAMES.lmp")
    const fileData = await readFile(testResourceFilePath)

    it("reads expected texture list", () => {
        const textureBlockParser = new PnamesBlockParser(fileData)
        const parsedPnames = textureBlockParser.parse()
        expect(parsedPnames[0]).toBe("DFPLN05")
        expect(parsedPnames[1]).toBe("OTECHB01")
    })
})
