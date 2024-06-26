import FileRepo from "~/server/services/repo/file-repo"
import LocalFileStrategy from "~/server/services/repo/LocalFileStrategy"

export function buildFileRepo(directory: string) {
    //TODO: when adding support for a cloud-based solution, select and build
    //      an alternate strategy here based on environment variables
    const fileStrategy = new LocalFileStrategy(directory)
    return new FileRepo(fileStrategy)
}
