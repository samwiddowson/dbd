import { describe, it, expect, vi } from "vitest"
import ResourceWrangler from "../ResourceWrangler"
import ParsedMap from "../model/ParsedMap"

const mocks = vi.hoisted(() => {
    const run = vi.fn()

    const prepare = vi.fn(() => {
        return { run }
    })

    return {
        db: {
            default: vi.fn(() => {
                return { prepare }
            }),
        },
        prepare: prepare,
        run: run,
    }
})

vi.mock("better-sqlite3", () => {
    return mocks.db
})

describe("constructor", () => {
    it("makes expected sqllite3 call", () => {
        new ResourceWrangler()
        expect(mocks.db.default).toHaveBeenCalledOnce()
        expect(mocks.db.default.mock.calls[0]).toEqual([":memory:"])
    })
})

describe("addMap", () => {
    it("creates expected tables", () => {
        const TEST_MAP_NAME = "TESTMAP_01"
        const r = new ResourceWrangler()
        const testMap = new ParsedMap(TEST_MAP_NAME)

        r.addMap(testMap)

        expect(mocks.prepare).toHaveBeenCalledTimes(2)

        expect(mocks.prepare.mock.calls[0].pop()).toBe(
            "CREATE TABLE @name (texture_name)"
        )
        expect(mocks.prepare.mock.calls[1].pop()).toBe(
            "CREATE TABLE @name (doomednum)"
        )

        expect(mocks.run).toHaveBeenCalledTimes(2)
        expect(mocks.run.mock.calls[0].pop()).toEqual({
            name: `${TEST_MAP_NAME}_textures`,
        })
        expect(mocks.run.mock.calls[1].pop()).toEqual({
            name: `${TEST_MAP_NAME}_things`,
        })
    })
})
