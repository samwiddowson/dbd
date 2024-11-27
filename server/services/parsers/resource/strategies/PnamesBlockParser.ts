import readWadLumpText from "../../wad/readWadLumpText"
import log from "@/server/utils/log"

export class PnamesBlockParser {
    constructor(private rawData: Buffer) {}

    private readPnames(pnameCount: number) {
        const pnames: string[] = []
        for (let i = 0; i < pnameCount; i++) {
            pnames.push(readWadLumpText(this.rawData, 4 + i * 8))
        }
        return pnames
    }

    parse() {
        const pnameCount = this.rawData.readIntLE(0, 4)
        log.debug("pnameCount:", pnameCount)

        return this.readPnames(pnameCount)
    }
}
