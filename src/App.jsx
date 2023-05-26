import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga4'

import Home from './Home'
import Question from './Question'
import Project from './Project'
import Result from './Result'
import './App.css'

const App = () => {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID)

  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState(null)
  const [project, setProject] = useState(null)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  })

  return (
    <div className="ml-auto mr-auto h-full max-w-[500px]">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setImage={setImage} />} />

            <Route path="/question" element={
              <Question
                image={image}
                question={question}
                setQuestion={setQuestion}
              />}
            />

            <Route path="/project" element={
              <Project question={question} setProject={setProject} />}
            />

            <Route path="/result" element={
              <Result project={project} />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
