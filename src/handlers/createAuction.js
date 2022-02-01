async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = Date.now();

  const auction = {
    title,
    status: 'OPEN',
    createdAt: now.toISOString()
  };

  return {
    statusCode: 201,
    body: JSON.stringify({ event, context }),
  };
}

export const handler = createAuction;


