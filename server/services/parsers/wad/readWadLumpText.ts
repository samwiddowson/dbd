export default function readWadLumpText(buffer: Buffer, offset: number) {
    return buffer.toString("ascii", offset, offset + 8).replace(/(\x00)+/i, "")
}
