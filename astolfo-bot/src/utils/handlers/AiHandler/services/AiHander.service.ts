import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});

export class AiHandler {
  constructor() {}

  async test(message: string) {
    const openai = new OpenAIApi(config);
    console.log(message);
    try {
      const completion = await openai.createCompletion('text-curie-001', {
        prompt: message,
        max_tokens: 60,
        temperature: 0.5,
        top_p: 0.3,
        presence_penalty: 0,
        frequency_penalty: 0.5,
        stream: false,
      });
      if (completion) {
        console.log(completion.data.choices?.[0].text);
        return message + completion.data.choices?.[0].text;
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
}
