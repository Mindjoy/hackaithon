import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, Navigate } from 'react-router-dom'

import { client } from './api'

const Result = ({ project }) => {
  const { mutate: generateResult, isLoading, isError, data } = useMutation({
    mutationFn: async variables => await client.post('/follow-up', variables),
  })

  const result = data?.data?.response

  useEffect(() => {
    if (project) { generateResult({ topic: project }) }
  }, [project, generateResult])

  if (!project) return <Navigate to="/" />

  return (
    <>
      <div className="transition-opacity duration-300 opacity-100 ease-in-out motion-reduce:transition-none text-left mb-5 w-full rounded-xl p-4 font-medium ring-1 ring-inset text-blue-700 ring-blue-700 bg-blue-50">
        <p>{project}</p>
      </div>

      {isLoading && (
        <>
          <div className="h-[400px] animate-background-bright ring-gray-700/10 bg-gray-300 text-left mb-5 w-full rounded-xl" />
        </>
      )}

      {result && (
        <div className="whitespace-pre-wrap transition-opacity duration-300 opacity-100 ease-in-out motion-reduce:transition-none text-left mb-5 w-full rounded-xl p-4 font-medium ring-1 ring-inset text-purple-700 ring-purple-700 bg-purple-50">
          <p>{result}</p>
        </div>
      )}

      {isError && <p className="text-center mb-5">Oops, something went wrong. Please try again.</p>}

      <Link className="flex items-center justify-center  pb-5" to="/">
        <img className="w-5 h-5 mr-1" src="/restart.svg" />
        Start again
      </Link>
    </>
  )
}

export default Result
