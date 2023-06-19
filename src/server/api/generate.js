import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const prompt = req.body.prompt || '';
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  try {
    console.log(`Going to run prompt with ${prompt}`);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(prompt,req.body.currentDate),
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\"\"\""],
    });
    console.log(completion.data.choices[0].text);
    const jsonObj = JSON.parse(completion.data.choices[0].text);
    console.log(jsonObj);
    res.status(200).json({ result: jsonObj });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(prompt,currentDate) {
  console.log('Current date: ',currentDate)
  const finishedPrompt = `Today is 2023-03-04. Home airport is BOS,Fly to Sin City, departs Thursday for 3 nights, then fly to San Fran for 4 nights, then fly home\n{\"legs\":[{\"origin\":\"BOS\",\"destination\":\"LAS\",\"departs\":\"2023-03-09\"},{\"origin\":\"LAS\",\"destination\":\"SFO\",\"departs\":\"2023-03-12\"},{\"origin\":\"SFO\",\"destination\":\"BOS\",\"departs\":\"2023-03-16\"}]}\"\"\"\nToday is 2023-03-04. Home airport is BOS,Miami to Heathrow departs WED for 4 nights, then fly to Amsterdam for 3 nights, then fly home\n{\"legs\":[{\"origin\":\"SEA\",\"destination\":\"PRG\",\"departs\":\"2023-03-09\"},{\"origin\":\"PRG\",\"destination\":\"ATH\",\"departs\":\"2023-03-13\"},{\"origin\":\"ATH\",\"destination\":\"SEA\",\"departs\":\"2023-03-16\"}]}\"\"\"\nToday is 2023-03-04. Home airport is BOS,fly to prague on Thursday for 4 nights, then fly to athens for 3 nights, then fly home\n{\"legs\":[{\"origin\":\"BOS\",\"destination\":\"PRG\",\"departs\":\"2023-03-09\"},{\"origin\":\"PRG\",\"destination\":\"ATH\",\"departs\":\"2023-03-13\"},{\"origin\":\"ATH\",\"destination\":\"SEA\",\"departs\":\"2023-03-16\"}]}\"\"\"\nToday is 2023-03-04. Home airport is BOS,fly Seattle to prague on Thursday for 4 nights, then fly to athens for 3 nights, then fly home\n{\"legs\":[{\"origin\":\"SEA\",\"destination\":\"PRG\",\"departs\":\"2023-03-09\"},{\"origin\":\"PRG\",\"destination\":\"ATH\",\"departs\":\"2023-03-13\"},{\"origin\":\"ATH\",\"destination\":\"SEA\",\"departs\":\"2023-03-16\"}]}\"\"\"\nToday is 2023-03-04. Home airport is BOS,fly miami to LA on monday for 3 nights, then fly to home for 3 nights, then fly to savannah, GA for 3 nights, then fly home\n{\"legs\":[{\"origin\":\"MIA\",\"destination\":\"LAX\",\"departs\":\"2023-03-06\"},{\"origin\":\"LAX\",\"destination\":\"BOS\",\"departs\":\"2023-03-09\"},{\"origin\":\"BOS\",\"destination\":\"SAV\",\"departs\":\"2023-03-12\"},{\"origin\":\"SAV\",\"destination\":\"BOS\",\"departs\":\"2023-03-15\"}]}\"\"\"\nToday is 2023-03-05. Home airport is DEN,Fly to Miami on monday, stay for 3 nights, and then fly home\n{\"legs\":[{\"origin\":\"DEN\",\"destination\":\"MIA\",\"departs\":\"2023-03-06\"},{\"origin\":\"MIA\",\"destination\":\"DEN\",\"departs\":\"2023-03-09\"}]}\"\"\"\nCurrent date/time is ${currentDate}. Home airport is BOS,${prompt}}`;
  console.log(`Prompt for '${prompt}: ${finishedPrompt}`);
  return finishedPrompt.trim();
}
