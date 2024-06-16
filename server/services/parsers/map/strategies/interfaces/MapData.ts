export class MapLumps {
    things: Buffer
    sidedefs: Buffer
    sectors: Buffer
    constructor(things: Buffer, sidedefs: Buffer, sectors: Buffer) {
        this.things = things
        this.sidedefs = sidedefs
        this.sectors = sectors
    }
}

export default interface MapData {
    name: string
    data: MapLumps | string
}

export type MapFormat = "UDMF" | "Lump"
