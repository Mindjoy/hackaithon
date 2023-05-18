import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, Navigate } from 'react-router-dom'

import { client } from './api'

const Result = ({ project }) => {
  const { mutate: generateResult, isLoading, data } = useMutation({
    mutationFn: async variables => await client.post('/final-result', variables),
  })

  const result = data?.data?.response

  if (!project) return <Navigate to="/" />

  // useEffect(() => {
  //   generateResult({ projectIdea: JSON.stringify([project]) })
  // }, [project, generateResult])

  return (
    <>
      {isLoading && (
        <>
          <div className="h-[200px] animate-background-fun ring-gray-700/10 bg-gray-300 text-left mb-5 w-full rounded-xl" />
          <div className="h-[400px] animate-background-fun ring-gray-700/10 bg-gray-300 text-left mb-5 w-full rounded-xl" />
        </>
      )}

      {result && (
        <div className="transition-opacity duration-300 opacity-100 ease-in-out motion-reduce:transition-none text-left mb-5 w-full rounded-xl p-4 font-medium ring-1 ring-inset text-blue-700 ring-blue-700/10 bg-blue-50">
          <h2 className="font-bold text-2xl mb-3">{result.section}</h2>

          <p>content</p>
        </div>
      )}


      <Link className="flex items-center justify-center  pb-5" to="/">
        <img className="w-5 h-5 mr-1" src="/restart.svg" />
        Start again
      </Link>
    </>
  )
}

export default Result
