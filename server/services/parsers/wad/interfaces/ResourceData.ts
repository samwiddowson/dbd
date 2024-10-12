export interface RawResourceData {
    textures?: Buffer
    patches?: Buffer
    patchLumpsList: string[]
    flatLumpsList: string[]
}

export interface ParsedResourceData {
    textures?: string[]
    patches?: Buffer[]
    patchNames?: string[]
}
