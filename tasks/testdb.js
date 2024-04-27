import { saveCreatorInfo, saveResourceInfo } from "../server/db/database-api.js"

const crea = {
    name: "testCreatorName",
    description: "is a test creator",
    image: "testCreatorImage",
}

const creatorId = saveCreatorInfo(crea)

const res = {
    name: "testName",
    description: "testDescription",
    image: "testImage",
    dataFile: "testDataFile",
    creatorId: creatorId,
}

saveResourceInfo(res)
