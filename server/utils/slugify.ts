import slugify from "slugify"

export function generateSlug(text: string) {
    return slugify(text, {
        replacement: "-",
        lower: true,
        strict: true, // strip special characters except replacement
        locale: "vi",
        trim: true,
    })
}
