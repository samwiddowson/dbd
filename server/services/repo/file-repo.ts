import { saveFile as saveFileStrategy } from "./local-file"

export async function saveFile(file: File, resourceSlug: string) {
    return saveFileStrategy(file, resourceSlug)
}
