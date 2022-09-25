import axios from 'axios';
import { Router, Request, Response } from 'express';

export const repos = Router();

interface Repo {
  fork: boolean;
  [key: string]: any;
}

repos.get('/', async (_: Request, res: Response) => {
  const { data } = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );
  const filteredData = data.filter((d: Repo) => d.fork);
  res.header('Cache-Control', 'no-store');
  res.status(200);
  res.json(filteredData);
});
