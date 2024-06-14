interface Header {
    identification: string
    numlumps: number
    infotableofs: number
}

interface DirectoryEntry {
    filepos: number
    size: number
    name: string
}

function readDirectory(rawData: Buffer, dirOffset: number, numlumps: number) {
    const d: DirectoryEntry[] = []
    for (let i = 0; i < numlumps; i++) {
        const filePosOffset = dirOffset + i * 16
        const sizeOffset = filePosOffset + 4
        const nameOffset = sizeOffset + 4
        const entry: DirectoryEntry = {
            filepos: rawData.readIntLE(filePosOffset, 4),
            size: rawData.readIntLE(sizeOffset, 4),
            name: rawData
                .toString("ascii", nameOffset, nameOffset + 8)
                .replace(/(\x00)+/i, ""),
        }
        d.push(entry)
    }
    return d
}
export default class WadParser {
    rawData: Buffer
    header: Header | undefined
    directory: DirectoryEntry[]

    constructor(rawData: Buffer) {
        this.rawData = rawData
        this.directory = []
    }

    parse() {
        console.log()
        this.header = {
            identification: this.rawData.toString("ascii", 0, 4),
            numlumps: this.rawData.readIntLE(4, 4),
            infotableofs: this.rawData.readIntLE(8, 4),
        }
        this.directory = readDirectory(
            this.rawData,
            this.header.infotableofs,
            this.header.numlumps
        )
    }
}
