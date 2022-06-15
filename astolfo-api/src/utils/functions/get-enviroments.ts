import * as dotenv from 'dotenv';
import { join } from 'path';
import { IEnvironments } from '../types';

const environments = dotenv.config({
  path: join(process.cwd(), `.env.stage.${process.env.STAGE}`),
}).parsed;

const getEnvironmentVar = (key: keyof IEnvironments) => environments[key];

export default getEnvironmentVar;
