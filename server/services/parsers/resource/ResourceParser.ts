import type { ParsedResourceData } from "../../model/ParsedResourceData"
import type { RawResourceData } from "../wad/interfaces/ResourceData"
import { TextureBlockParser } from "./strategies/TextureBlockParser"

export default class ResourceParser {
    textureBlockParser: TextureBlockParser | undefined
    constructor(private resourceData: RawResourceData) {
        if (this.resourceData.textures) {
            this.textureBlockParser = new TextureBlockParser(
                this.resourceData.textures
            )
        }
    }

    parse(): ParsedResourceData {
        return {
            textures: this.textureBlockParser?.parse(),
        }
    }
}
