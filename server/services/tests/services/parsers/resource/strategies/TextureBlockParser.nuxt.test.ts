import { describe, expect, it } from "vitest"
import path from "node:path"
import { readFile } from "node:fs/promises"
import { TextureBlockParser } from "~/server/services/parsers/resource/strategies/TextureBlockParser"
import WadReader from "~/server/services/parsers/wad/WadReader"

describe("TexureBlockParser happy path", async () => {
    const testResourceFilePath = path.join(
        __dirname,
        "testdata",
        "textures.wad"
    )
    const fileData = await readFile(testResourceFilePath)
    const wadReader = new WadReader(fileData)
    const rawTextureData = wadReader.getResourceData().textures!
    it("reads expected texure list", () => {
        const textureBlockParser = new TextureBlockParser(rawTextureData)
        const parsedTextures = textureBlockParser.parse()
        expect(parsedTextures[0]).toBe("DFPLN05")
        expect(parsedTextures[1]).toBe("OTECHB01")
    })
})
