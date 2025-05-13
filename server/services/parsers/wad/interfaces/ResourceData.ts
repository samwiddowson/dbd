export interface RawResourceData {
    textures?: Buffer
    patches?: Buffer
    animdefs?: Buffer
    animated?: Buffer
    patchLumpsList: string[]
    flatLumpsList: string[]
}
