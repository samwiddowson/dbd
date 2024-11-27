# DBD | Double-Barrel Delivery

(currently the basic shell of) A modding resource management tool for Classic Doom.

Built with Vue/Nuxt3, SQLLite database

## Road map

-   CURRENT FOCUS: index resource wads for texture data
    -   working on new ResourceParser
        -   TextureBlockParser currently failing
    -   ResourceComparator.addResources()
    -   ReleasePackager.#indexWadResources() to tie it all together
-   NEXT PLANNED FOCUS:

### Resource catalogue site

-   Accept submitted files, save them and serve them
    -   Build an Upload form
        -   title
        -   description
        -   file picker
        -   image picker
    -   index filename and metadata in database
    -   save files locally
    -   display file catalog
    -   allow download of files
    -   accept images for files
    -   categorise resource types: texture packs; actors;
-   pagination of resources
-   track creators and resources
-   versioning of resources
-   generate slugs from creator, name and version
-   visual flourish
    -   dynamic random texture cycling for texture packs
-   bundling multiple resources in one pk3
    -   allow selection of multiple files for bundling
    -   create catalogue reference file to describe bundle
    -   create pk3 (zip) file with correct folder structure
        -   non-clashing files
        -   pk3-indexed files
            -   zscript includes
            -   DECORATE includes
            -   Option to Build mapinfo file with doomednums for actors
        -   figure out how to avoid file clashes
    -   allow download of created zip file
-   using remote db and file serving to allow deploy on vercel

### Map-specific resource management

-   Parse WADs for map information
    -   UDMF ✅
    -   Lump ✅
-   Parse maps for resource information ✅
    -   UDMF ✅
        -   textures ✅
        -   things ✅
    -   Lump ✅
        -   textures ✅
        -   things ✅
-   Parse map wads for resource data
    -   textures ✅
    -   pnames ✅
    -   MAPINFO
        -   doomednums => actor names
    -   actors
        -   zscript
        -   decorate
        -   sprites
-   Parse uploaded resource files
    -   wad
        -   textures
            -   from TEXTURES lump
            -   patch info
                -   inc. buffer offsets/addresses of patches
            -   ANIMDEFS
                -   to find and group related textures in an anim-group
                -   in a WAD this relates to physical order
        -   things
            -   TODO: specifics
        -   TODO: list/consider other resources
    -   pk3
        -   textures
            -   TODO: specifics
        -   things
            -   TODO: specifics
        -   TODO: list/consider other resources
    -   store indexed information in database
-   resource and map validation
    -   textures referenced in maps which aren't in TEXTUREx
    -   patches referenced in definitition which aren't in pnames (??or patches subdirectory??)
    -   WAD specfic format:
        -   pname patches which don't have a corresponding lump
        -   patch lumps which aren't in pnames
    -   doomednums referenced in maps which aren't in MAPINFO
    -   actor names referenced in MAPINFO which aren't declared in code
    -   sprites referenced in code which don't exist in resources
-   Compare map textures to catalogued textures to build a list of requirements
    -   store parsed map resource usage in memory-db ✅
    -   store indexed resource info in memory-db
    -   compare map resource usage with resource index info

### Building releasable packages

-   wrt "bundling multiple resources" item above
-   pk3
    -   TODO: specifics
-   wad
    -   TODO: specifics

### Maintenance

-   diagnostic cleanup - check for discrepancies between db and file system
    -   Look for database entries which don't have corresponding files
    -   Look for files which don't have corresponding database entries

## Building

**Requires Node.js to be installed**

### Getting a development version running

In the project directory:

```bash
#install package dependencies
npm install

#run db setup script (TODO)
npm run initdb

#run development server and point your browser at the stated URL
npm run dev
```
