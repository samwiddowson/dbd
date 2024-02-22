# UAC Supplies

Built with Nuxt, SQLLite database

## Road map

* Accept submitted files, save them and serve them
    * Build an Upload form
        * title
        * description
        * file picker
        * image picker
    * index filename and metadata in database
    * save files locally
    * display file catalog
    * allow download of files
    * accept images for files
    * categorise resource types: texture packs; actors;
* diagnostic cleanup - check for discrepancies between db and file system
    * Look for database entries which don't have corresponding files
    * Look for files which don't have corresponding database entries
* configure a "flyway" type tool for maintaining database changes
* bundling multiple resources in one pk3
    * allow selection of multiple files for bundling
    * create catalogue reference file to describe bundle
    * create pk3 (zip) file with correct folder structure
        * non-clashing files
        * pk3-indexed files
            * zscript includes
            * DECORATE includes
            * Option to Build mapinfo file with doomednums for actors
        * figure out how to avoid file clashes
    * allow download of created zip file
* catalogue files in uploaded pk3 files
    * new database tables to log file info
    * dynamic random texture cycling for texture packs


## Building

TODO: advice on building the project

## Getting a development version running

```bash
#install package dependencies
npm install

#run db setup script

#npm run db-setup

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
