import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { client } from './api'

const questions = [
  {
    question: "What is the most popular car in the world?",
    theme: "Automobiles",
  },
  {
    question: "What is the fastest road car in the world?",
    theme: "Sports cars",
  },
  {
    question: "How to tyes work?",
    theme: "Wheels",
  }
]

const Question = ({ image, setQuestion }) => {
  const navigate = useNavigate()

  const { mutate: getCuriousity, isLoading: isLoadingCuriosity, data } = useMutation({
    mutationFn: async variables => await client.post('/curiosity-nudge', variables)
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
    if (image.file) {
      getLabels({ image: image.file })
    }
  }, [image.file, getLabels])

  return (
    <div className="flex flex-col items-center">
      <img className="rounded-lg mb-10 max-h-[400px] object-contain" src={image.url} alt="your photo" />

      <h4 className="font-semibold mb-5 text-xl">What would you like to know about?</h4>

      {(isLoadingLabels || isLoadingCuriosity) && (
        <div className="flex flex-row flex-wrap gap-3 mb-10">
          <div className="w-[100px] h-[44px] animate-pulse inline-flex items-center rounded-full bg-gray-300 px-4 py-2 text-lg font-mediu ring-1 ring-inset ring-gray-600/20" />
          <div className="w-[100px] h-[44px] animate-pulse inline-flex items-center rounded-full bg-gray-300 px-4 py-2 text-lg font-mediu ring-1 ring-inset ring-gray-600/20" />
          <div className="w-[100px] h-[44px] animate-pulse inline-flex items-center rounded-full bg-gray-300 px-4 py-2 text-lg font-mediu ring-1 ring-inset ring-gray-600/20" />
        </div>
      )}

      {isError && <p className="text-center">Something went wrong. Please try again.</p>}



      {nudges && (
        <div className="flex flex-row flex-wrap gap-3 mb-10">
          {nudges.map(({ thematicTag, question }) => (
            <button
              key={thematicTag}
              onClick={() => {
                setQuestion(question)
                navigate('/project')
              }}
              className="inline-flex items-center rounded-full bg-violet-50 px-4 py-2 text-lg font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
              {thematicTag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Question
