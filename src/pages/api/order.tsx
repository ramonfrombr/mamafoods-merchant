import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from "airtable";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const table = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
    .base(process.env.AIRTABLE_BASE)
    .table("Orders");
  table.update([request.body]);
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}