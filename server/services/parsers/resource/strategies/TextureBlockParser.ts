import readWadLumpText from "../../wad/readWadLumpText"

export class TextureBlockParser {
    constructor(private rawData: Buffer) {}

    private readTextureDirectory(textureCount: number) {
        const textureDirectory: number[] = []
        for (let i = 0; i < textureCount; i++) {
            textureDirectory.push(this.rawData.readIntLE(4 * i, 4))
        }
        return textureDirectory
    }

    private readTextureNames(textureDirectory: number[]) {
        const textureNames: string[] = []
        for (let i = 0; i < textureDirectory.length; i++) {
            textureNames.push(
                readWadLumpText(this.rawData, textureDirectory[i])
            )
        }
        return textureNames
    }

    parse() {
        const textureCount = this.rawData.readIntLE(0, 4)
        const textureDirectory = this.readTextureDirectory(textureCount)
        return this.readTextureNames(textureDirectory)
    }
}
