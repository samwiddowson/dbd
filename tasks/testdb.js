import { saveResourceInfo } from "../server/db/database-api.js"

const res = {
    name: "testName",
    description: "testDescription",
    image: "testImage",
    dataFile: "testDataFile",
}

saveResourceInfo(res)
