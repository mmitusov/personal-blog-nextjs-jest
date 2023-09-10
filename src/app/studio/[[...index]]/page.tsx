'use client'

import Head from 'next/head'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity-config/sanity.config'
// import {metadata} from 'next-sanity/studio/metadata'

export default function StudioPage() {
  return (
    <>
      {/* <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
      </Head> */}
      <NextStudio config={config} />
    </>
  )
}