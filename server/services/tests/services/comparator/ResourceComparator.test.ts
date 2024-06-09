import { describe, it, expect, vi } from "vitest"
import ParsedMap from "~/server/services/model/ParsedMap"
import ResourceComparator from "~/server/services/comparator/ResourceComparator"

//MOCKING SQLITE3 SEEMS OVERLY COMPLEX AND ALSO LESS USEFUL THAN ALLOWING
//  ResourceComparator to create the in-memory database and then querying it in tests
// const mocks = vi.hoisted(() => {
//     const run = vi.fn()
//
//     const prepare = vi.fn(() => {
//         return { run }
//     })
//
//     return {
//         db: {
//             default: vi.fn(() => {
//                 return { prepare }
//             }),
//         },
//         prepare: prepare,
//         run: run,
//     }
// })
//
// vi.mock("better-sqlite3", () => {
//     return mocks.db
// })

describe("constructor", () => {
    it("creates in-memory sqllite3 databse when called", () => {
        const r = new ResourceComparator()
        expect(r.db.memory).toBe(true)
        // expect(mocks.db.default).toHaveBeenCalledOnce()
        // expect(mocks.db.default.mock.calls[0]).toEqual([":memory:"])
    })
})

describe("addMap", () => {
    it("creates expected tables", () => {
        const TEST_MAP_NAME = "TESTMAP_01"
        const r = new ResourceComparator()
        const testMap = new ParsedMap(TEST_MAP_NAME, "Lump")
        testMap.textureCounts = { TEX1: 10, TEX2: 20, TEX3: 30 }

        r.addMap(testMap)

        for (const textureName of Object.keys(testMap.textureCounts)) {
            const dbRow = r.db
                .prepare(
                    `
                     SELECT *
                       FROM TESTMAP_01_textures
                      WHERE texture_name = @textureName`
                )
                .get({
                    textureName: textureName,
                }) as { texture_name: string; count: number }
            expect(dbRow.texture_name).toBe(textureName)
            expect(dbRow.count).toBe(testMap.textureCounts[textureName])
        }

        // expect(mocks.prepare).toHaveBeenCalledTimes(2)
        //
        // expect(mocks.prepare.mock.calls[0].pop()).toBe(
        //     "CREATE TABLE @name (texture_name)"
        // )
        // expect(mocks.prepare.mock.calls[1].pop()).toBe(
        //     "CREATE TABLE @name (doomednum)"
        // )
        //
        // expect(mocks.run).toHaveBeenCalledTimes(2)
        // expect(mocks.run.mock.calls[0].pop()).toEqual({
        //     name: `${TEST_MAP_NAME}_textures`,
        // })
        // expect(mocks.run.mock.calls[1].pop()).toEqual({
        //     name: `${TEST_MAP_NAME}_things`,
        // })
    })
})
