# DBD | Double-Barrel Delivery

(currently the basic shell of) A modding resource management tool for Classic Doom.

Built with Vue/Nuxt3, SQLLite database

## Road map

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
-   diagnostic cleanup - check for discrepancies between db and file system
    -   Look for database entries which don't have corresponding files
    -   Look for files which don't have corresponding database entries
-   configure a "flyway" type tool for maintaining database changes
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

## Building

**Requires Node.js to be installed**

### Getting a development version running

```bash
#install package dependencies
npm install

#run db setup script (TODO)
#npm run db-setup

npm run dev
```
