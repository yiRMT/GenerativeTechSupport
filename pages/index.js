import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Alert, Autocomplete, Button, CircularProgress, TextField } from '@mui/material'
import requestGPT from '@/libs/requestGPT'
import { LoadingButton } from '@mui/lab'

const listOfLanguages = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "js" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Go", value: "go" },
  { label: "Swift", value: "swift" },
]

export default function Home() {
  const [form, setForm] = useState({
    apiKey: '',
    language: '',
    errorMessage: '',
  })

  const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState('')

  const [error, setError] = useState('')

  useEffect(() => {
    console.log(form)
  }, [form])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)

    try {
      setLoading(true)
      setResponse('')
      const gptResponse = await requestGPT(form.apiKey, form.language, form.errorMessage)
      console.log(gptResponse)
      setResponse(gptResponse)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("handleSubmit", error)
      setError(error)
    }
  }

  return (
    <div className='mx-10'>
      <form className='flex flex-col gap-4'>
        <TextField 
          required
          label="OpenAI API Key"
          onChange={(e) => {
            setForm({ ...form, apiKey: e.target.value })
          }}
        />
        <Autocomplete
          disablePortal
          options={ listOfLanguages }
          renderInput={(params) => <TextField {...params} label="Language" />}
          onChange={(e, value) => {
            setForm({ ...form, language: value.value })
          }}
        />
        <TextField
          multiline
          rows={ 10 }
          label="Error Message"
          onChange={(e) => {
            setForm({ ...form, errorMessage: e.target.value })
          }}
        />
        <LoadingButton
          loading={loading}
          variant="outlined"
          onClick={handleSubmit}
        >
          Ask
        </LoadingButton>
      </form>
      { response !== '' ? (
        <Alert 
          severity="info" 
          className='mt-4'
        >
          { response }
        </Alert>
      ) : (
        error !== '' ? (
          <Alert
            severity="error"
            className='mt-4'
          >
            { error }
          </Alert>
        ) : (
          <></>
        )
      )
      }
    </div>
  )
}
