import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { client } from './api'

const themes = [
  'text-indigo-700 ring-indigo-700 bg-indigo-50',
  'text-blue-700 ring-blue-700 bg-blue-50',
  'text-green-700 ring-green-700 bg-green-50',
  'text-yellow-700 ring-yellow-700 bg-yellow-50',
  'text-pink-700 ring-pink-700 bg-pink-50',
  'text-violet-700 ring-violet-700 bg-violet-50',
]

const Project = ({ question, setProject }) => {
  const navigate = useNavigate()
  const { mutate: generateProject, isLoading, isError, data } = useMutation({
    mutationFn: async variables => await client.post('/generate-project-template', variables),
    retry: 2
  })

  const sections = data?.data?.response

  useEffect(() => {
    generateProject({ userContext: JSON.stringify([question]) })
  }, [question, generateProject])

  if (!question) return <Navigate to="/" />

  return (
    <>
      {isLoading && (
        <>
          <h4 className="font-semibold mb-10 text-xl">Let's turn that question into a creation!</h4>

          <div className="h-[200px] animate-background-relaxed ring-gray-700/10 bg-gray-300 text-left mb-5 w-full rounded-xl" />
          <div className="h-[200px] animate-background-bright ring-gray-700/10 bg-gray-300 text-left mb-5 w-full rounded-xl" />
          <div className="h-[200px] animate-background-fun ring-gray-700/10 bg-gray-300 text-left mb-5 w-full rounded-xl" />
        </>
      )}

      {!isLoading && <h4 className="font-semibold mb-10 text-xl">What should we create?</h4>}

      {sections && sections.map((section, i) => (
        <button
          onClick={() => {
            setProject(section.projectIdea)
            navigate('/result')
          }}
          key={i}
          className={'transition-opacity duration-300 opacity-100 ease-in-out motion-reduce:transition-none text-left mb-5 w-full rounded-xl p-4 font-medium ring-1 ring-inset' + themes[i % 6]}>
          <h2 className="font-bold text-2xl mb-3">{section.projectTag}</h2>

          <p>{section.projectIdea}</p>
        </button>
      ))
      }

      {isError && <p className="text-center mb-3">Oops, something went wrong. Please try again.</p>}

      <Link className="flex items-center justify-center pt-2  pb-5" to="/">
        <img className="w-5 h-5 mr-1" src="/restart.svg" />
        Start again
      </Link>
    </>
  )
}

export default Project
