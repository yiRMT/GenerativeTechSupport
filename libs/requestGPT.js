import axios from 'axios';

const requestGPT = async (apiKey, language, errorMessage) => {
  const prompt = `
    以下の${language}のエラーメッセージの解決法を教えてください．\n
    ${errorMessage}
    `;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [{"role": "user", "content": prompt}],
        temperature: 0.7,
      },
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("requestGPT", error);
  }
}

export default requestGPT;