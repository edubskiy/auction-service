const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          required: true,
        },
      },
    },
  },
  required: ['queryStringParameters'],
};

export default schema;
