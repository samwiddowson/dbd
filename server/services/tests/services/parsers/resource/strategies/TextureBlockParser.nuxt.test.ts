import { describe, expect, it } from "vitest"
import path from "node:path"
import { readFile } from "node:fs/promises"
import { TextureBlockParser } from "~/server/services/parsers/resource/strategies/TextureBlockParser"

describe("TexureBlockParser happy path", async () => {
    const testResourceFilePath = path.join(
        __dirname,
        "testdata",
        "TEXTURE1.lmp"
    )
    const fileData = await readFile(testResourceFilePath)

    it("reads expected texture list", () => {
        const textureBlockParser = new TextureBlockParser(fileData)
        const parsedTextures = textureBlockParser.parse()
        expect(parsedTextures[0]).toBe("DFPLN05")
        expect(parsedTextures[1]).toBe("OTECHB01")
    })
})
