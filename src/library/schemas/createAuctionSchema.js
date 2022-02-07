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
  required: ['body'],
};

export default schema;
