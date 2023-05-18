import { useEffect, useRef } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { client } from './api'

const themes = [
  'text-indigo-700 ring-indigo-700 bg-indigo-50',
  'text-blue-700 ring-blue-700 bg-blue-50',
  'text-green-700 ring-green-700 bg-green-50',
]

const Question = ({ image, setQuestion }) => {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const { mutate: getCuriousity, isLoading: isLoadingCuriosity, data } = useMutation({
    mutationFn: async variables => await client.post('/curiosity-nudge', variables),
    retry: 2
  })

  const nudges = data?.data?.response

  const { mutate: getLabels, isLoading: isLoadingLabels, isError } = useMutation({
    mutationFn: async variables => {
      return await client.post('/upload-image', variables, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    onSuccess: response => {
      const labels = JSON.stringify(response.data.labels.map(label => label.description))

      getCuriousity({ labels })
    }
  })

  useEffect(() => {
    if (image?.file) {
      getLabels({ image: image.file })
    }
  }, [image.file, getLabels])

  if (!image) return <Navigate to="/" />

  const isLoading = isLoadingCuriosity || isLoadingLabels

  return (
    <div className="flex flex-col items-center">
      <img className="rounded-lg mb-10 max-h-[400px] object-contain" src={image.url} alt="your photo" />

      <h4 className="font-semibold mb-10 text-xl">
        {isLoading ? 'Take a moment to think of a question 🤔' : 'What are you curious about?'}
      </h4>

      {isLoading && (
        <>
          <div className="flex flex-row flex-wrap gap-3 mb-10">
            <div className="w-[100px] h-[44px] animate-background-bright inline-flex items-center rounded-full px-4 py-2 text-lg font-mediu ring-1 ring-inset ring-gray-600/20" />
            <div className="w-[100px] h-[44px] animate-background-bright inline-flex items-center rounded-full px-4 py-2 text-lg font-mediu ring-1 ring-inset ring-gray-600/20" />
            <div className="w-[100px] h-[44px] animate-background-bright items-center rounded-full px-4 py-2 text-lg font-mediu ring-1 ring-inset ring-gray-600/20" />
          </div>

          <div className="w-full h-[50px] rounded-lg mb-10 px-4 py-2 bg-blue-300 animate-background-relaxed" />
        </>
      )}

      {
        nudges && (
          <div className="flex flex-row flex-wrap gap-3 mb-10">
            {nudges.map(({ thematicTag, question }, i) => (
              <button
                key={thematicTag}
                onClick={() => {
                  setQuestion(question)
                  navigate('/project')
                }}
                className={"inline-flex items-center rounded-full px-4 py-2 text-lg font-medium ring-1 ring-inset" + themes[i % 3]}>
                {thematicTag}
              </button>
            ))}
          </div>
        )
      }

      {!isLoading && (
        <div className="relative w-full mb-10">
          <input
            ref={inputRef}
            className="w-full h-[50px] rounded-lg px-4 py-2 text-lg font-medium ring-1 ring-inset ring-gray-600"
            type="text"
            placeholder="Or ask your question here"
          />

          <button
            onClick={() => {
              setQuestion(inputRef.current.value)
              navigate('/project')
            }}
            className="absolute right-0 top-0 bottom-0 rounded-md">
            <img className="w-8 h-8 mr-2" src="/arrow-forward.svg" />
          </button>
        </div>
      )}

      {isError && <p className="text-center mb-5">Oops, something went wrong. Please try again.</p>}

      <Link className="flex items-center justify-center pb-5" to="/">
        <img className="w-5 h-5 mr-1" src="/restart.svg" />
        Start again
      </Link>
    </div >
  )
}

export default Question
