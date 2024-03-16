import { saveFile as saveFileStrategy } from "./local-file"

export async function saveFile(file: File) {
    return saveFileStrategy(file)
}
