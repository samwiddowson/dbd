export interface FileStrategyConstructor {
    new (directory: string): FileStrategy
}

export interface FileStrategy {
    saveFile(file: any, resourceSlug: string): Promise<string>
    directory: string
}
