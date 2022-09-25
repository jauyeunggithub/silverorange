import axios from 'axios';
import { Router, Request, Response } from 'express';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  const { data } = await axios.get(
    'https://api.github.com/users/silverorange/repos'
  );
  res.header('Cache-Control', 'no-store');
  res.status(200);
  res.json(data);
});
