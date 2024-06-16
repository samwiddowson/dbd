# DBD | Double-Barrel Delivery

(currently the basic shell of) A modding resource management tool for Classic Doom.

Built with Vue/Nuxt3, SQLLite database

## Road map

-   Accept submitted files, save them and serve them
    -   Build an Upload form
        -   title
        *   description
        -   file picker
        *   image picker
    *   index filename and metadata in database
    *   save files locally
    *   display file catalog
    -   allow download of files
    *   accept images for files
    -   categorise resource types: texture packs; actors;

*   Parse maps for textures
    -   UDMF
    *   Lump
    -   Compare map textures to catalogued textures to build a list of requirements

-   diagnostic cleanup - check for discrepancies between db and file system
    -   Look for database entries which don't have corresponding files
    -   Look for files which don't have corresponding database entries
-   pagination of resources
-   track creators and resources
-   versioning of resources
-   generate slugs from creator, name and version
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
-   catalogue files in uploaded pk3 files
    -   new database tables to log file info
    -   dynamic random texture cycling for texture packs
-   using remote db and file serving to allow deploy on vercel

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
