import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Home from './Home'
import Question from './Question'
import Project from './Project'
import './App.css'

const App = () => {
  const [image, setImage] = useState(null)
  const [question, setQuestion] = useState(null)
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
            <Project question={question} />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App