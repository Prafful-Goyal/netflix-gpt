import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

//It is kind of like 'authorization' happening over here
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});
export default openai;

//apiKey: process.env[{ OPENAI_KEY }],
