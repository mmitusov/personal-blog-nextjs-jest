import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/stidio', //Создаем путь по которуму бетер работать Sanity
  name: `Max's_Blog_Studio`,
  title: `Max's Blog Studio`,
  projectId,
  dataset,

  plugins: [deskTool(), visionTool()], //Встроенные плагины для обновления данных и квери запросов на них

  schema: {
    types: schemaTypes,
  },
})
