import getWikiResult from '@/lib/getWikiResult'
import { Result } from 'postcss'
import React from 'react'

type Props = {
    params: {
        searchTrem: string
    }
}

export async function generateMetadata({params: {searchTrem}}: Props) {
    const wikiData: Promise<SearchResult>  = getWikiResult(searchTrem)
    const data = await wikiData

    const displayTerm = searchTrem?.replaceAll('20%', ' ')

    if(!data?.query?.pages) {
        return {
            title: `${displayTerm} Not Found`
        }
    }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`
    }
    
}

export default async function page({params: {searchTrem}}: Props) {
    const wikiData: Promise<SearchResult>  = getWikiResult(searchTrem)
    const data = await wikiData

    const results: Result[] | undefined = data?.query?.pages
    const content = (
    <main className='bg-slate-200 mx-auto max-w-lg py-1 main-h-screen'>
        {
            results 
                ? Object.values(results).map (result => {
                    return (<p> {JSON.stringify(result)}</p>) 
                })
                : <h2 className='p-2 text-xl'> {`${searchTrem} Not fount!`}</h2>
        }
    </main>
  )
  return content
}