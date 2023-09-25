import {createClient} from '@sanity/client'

//Testing with Jest doesn't work if use global variables. So wi need to specify value directly
// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId: 'x5bzk0o7',
  dataset: 'production',
  apiVersion: '2022-11-15',
  token: '',
  useCdn: true 
})