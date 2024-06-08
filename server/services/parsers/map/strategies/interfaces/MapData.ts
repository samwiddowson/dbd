export default interface MapData {
    name: string
    data: Buffer | string
}

export type MapFormat = "UDMF" | "Lump"
