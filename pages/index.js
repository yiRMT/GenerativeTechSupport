import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Alert, Autocomplete, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import requestGPT from '@/libs/requestGPT'
import { LoadingButton } from '@mui/lab'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const listOfLanguages = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Go", value: "go" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Rust", value: "rust" },
  { label: "SQL", value: "sql" },
  { label: "Shell", value: "shell" },
  { label: "Docker", value: "docker" },
  { label: "LaTeX", value: "latex" },
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

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const defaultForm = JSON.parse(localStorage.getItem('form'))
    if (defaultForm) {
      setForm({ ...form, apiKey: defaultForm.apiKey })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)

    localStorage.setItem('form', JSON.stringify(form))

    try {
      setLoading(true)
      setResponse('')
      setError('')
      const gptResponse = await requestGPT(form.apiKey, form.language, form.errorMessage)
      console.log("handleSubmit", gptResponse)
      if (gptResponse.props.error) {
        throw gptResponse.props.error
      }
      if (gptResponse.props.response) {
        setResponse(gptResponse.props.response)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("handleSubmit", error)
      setError(error)
    }
  }

  return (
    <>
    <Head>
      <title>Generative Tech Support</title>
    </Head>
    <div className='mx-4'>
      <form className='flex flex-col gap-4'>
        <FormControl>
          <InputLabel htmlFor="component-helper">OpenAI API Key</InputLabel>
          <OutlinedInput
            id="component-helper"
            value={form.apiKey}
            type={ showPassword ? 'text' : 'password' }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  { showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => {
              setForm({ ...form, apiKey: e.target.value })
            }}
            label="OpenAI API Key"
          />
        </FormControl>
        <Autocomplete
          disablePortal
          freeSolo
          options={ listOfLanguages }
          renderInput={(params) => <TextField {...params} label="Select Language / Framework / Library" />}
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
      { (response !== '' && response !== undefined) ? (
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
    </>
  )
}
