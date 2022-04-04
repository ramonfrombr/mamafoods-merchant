import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from "airtable";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // await new Promise(r => setTimeout(r, 2000));
  const table = new Airtable({ apiKey: process.env.AIRTABLE_KEY })
    .base(process.env.AIRTABLE_BASE)
    .table("Order Line Items");

  try {
    const tableResponse = await table.update(request.body);
    response.status(200).json({
      body: tableResponse,
      query: request.query,
      cookies: request.cookies,
    });
  } catch(err) {
    console.error(err);
    response.status(500).json({
      body: err,
      query: request.query,
      cookies: request.cookies,
    });
  }

}