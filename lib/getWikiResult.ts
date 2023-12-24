import React from 'react'

export default async function getWikiResult(searchTerm: string) {
    const searchParams = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm,
        gsrlimit: '20',
        prop: 'pageimages|extract',
        exchars: '100',
        exintro: 'true',
        explaintext: 'true',
        exlimit: 'max',
        format: 'json',
        origin: '*'
    })
    const res = await fetch('https://en.wikipedia.org/w/api.php?' + searchParams)

    return res.json()
}
