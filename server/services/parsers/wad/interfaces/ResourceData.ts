export interface RawResourceData {
    textures?: Buffer
    patches?: Buffer
    patchNames?: string[]
}

export interface ParsedResourceData {
    textures?: string[]
    patches?: Buffer[]
    patchNames?: string[]
}
