# Diagrams by marker.js

This is both a standalone diagramming web application and a demo app for the
[MJS Diagram](https://markerjs.com/products/diagram) library. It supports creation and editing
of all the diagram types included with MJS Diagram - flowcharts, mind maps, org charts, network diagrams, and general purpose diagrams.

Diagrams created with the app are stored in the browser's IndexedDB and are never transferred to any servers.
If you want to save your work and sync with other devices, export the diagram, save it to your cloud storage 
and import on another machine.

## Credits

Diagrams was created and is maintainted by [Alan Mendelevich](https://x.com/ailon).

This app uses: 

- [MJS Diagram]((https://markerjs.com/products/diagram/)) for diagram editing and viewing.
- [Next.js](https://nextjs.org/) is the main framework the app is built on.
- [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), and [Tailwind CSS](https://tailwindcss.com/) for the UI.
- [idb](https://github.com/jakearchibald/idb) for storing data in the browser&apos;s IndexedDB.

## Cloning and running locally

As this app is based on Next.js you can run the development version on your machine using the dev script in `package.json`.

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:3000 with your browser to see the result.


## License

This app is released under the [MIT License](./LICENSE)
