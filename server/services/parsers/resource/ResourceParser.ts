import type { ParsedResourceData } from "../../model/ParsedResourceData"
import type { RawResourceData } from "../wad/interfaces/ResourceData"
import { PnamesBlockParser } from "./strategies/PnamesBlockParser"
import { TextureBlockParser } from "./strategies/TextureBlockParser"

export default class ResourceParser {
    textureBlockParser: TextureBlockParser | undefined
    pnamesBlockParser: PnamesBlockParser | undefined
    constructor(private resourceData: RawResourceData) {
        if (this.resourceData.textures) {
            this.textureBlockParser = new TextureBlockParser(
                this.resourceData.textures
            )
        }
        if (this.resourceData.patches) {
            this.pnamesBlockParser = new PnamesBlockParser(
                this.resourceData.patches
            )
        }
    }

    parse(): ParsedResourceData {
        return {
            textures: this.textureBlockParser?.parse(),
            patchNames: this.pnamesBlockParser?.parse(),
        }
    }
}
