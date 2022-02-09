const schema = {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['OPEN', 'CLOSED'],
          default: 'OPEN',
          message: {
            pattern: '',
          },
        },
      },
    },
  },
  required: ['queryStringParameters'],
};

export default schema;
