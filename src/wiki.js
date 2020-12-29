import React from 'react'
import { NavBar, Blurb } from './home'

export default function Wiki() {
  const [start, setStart] = React.useState({
    id: 0,
    ns: 0,
    title: ""
  })
  const [dest, setDest] = React.useState({
    id: 0,
    ns: 0,
    title: ""
  })

  const [startURL, setStartURL] = React.useState('')
  const [destURL, setDestURL] = React.useState('')

  // Get Random articles on Page Load
  React.useEffect(() => {
    fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnlimit=2&rnnamespace=0')
      .then((response) => response.json())
      .then((response) => {
        setStart(response.query.random[0])
        setDest(response.query.random[1])
      })
      .catch((error) => { console.log(error) })
  }, [])

  React.useEffect(() => {
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=info&pageids=${start.id}|${dest.id}&inprop=url`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setStartURL(jsonResponse.query.pages[start.id].fullurl)
        setDestURL(jsonResponse.query.pages[dest.id].fullurl)
      })
      .catch((error) => console.log('error getting URLs. ', error))
  }, [start.id, dest.id])

  // JSX Elements containing rules and links to the random articles
  return (
    <div className='bg-gray-100 min-w-full min-h-screen'>
      <NavBar />
      <WikiHeader />

      <div className='flex flex-row justify-around'>
        <Blurb title='Start' body={<a target='_blank' rel='noopener noreferrer' href={startURL}>{start.title}</a>} />
        <Blurb title='Destination' body={<a target='_blank' rel='noopener noreferrer' href={destURL}>{dest.title}</a>} />
      </div>
    </div>
  )
}

const WikiHeader = () => {
  return (
    <div className="min-w-full h-32 bg-gray-300 flex items-center flex-row justify-center">
      <p className='text-xl text-center px-20'>
        This is the WikiGame! Below, you are given two *random* links
        to Wikipedia articles: one to start at, and one to try and reach!
        The rules are simple! You can only change pages by clicking on wikis
        linked within the wiki you are currently looking at, and you can't
        go back once you've clicked. Keep track of how many clicks it takes, 
        or keep track of how much time it takes you to reach your destination.
      </p>
    </div>
  )
}