import { v4 as uuid } from 'uuid';

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = Date.now();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString()
  };

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;


