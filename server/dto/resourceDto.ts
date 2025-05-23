export interface ResourceDto {
    title: string
    slug: string
    description: string
    imageFile: Buffer
    dataFile?: Buffer //TODO: remove optional modifier once implemented
    creatorId: string
}
