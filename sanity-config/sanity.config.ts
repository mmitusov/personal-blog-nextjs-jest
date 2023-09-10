import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

export default defineConfig({
  basePath: '/stidio', //Создаем путь по которуму бетер работать Sanity
  name: `My_Blog_Studio`,
  title: `My Blog Studio`,
  projectId,
  dataset,
  apiVersion,

  plugins: [deskTool(), visionTool()], //Встроенные плагины для обновления данных и квери запросов на них

  schema: {
    types: schemaTypes,
  },
})
