import AWS from 'aws-sdk';
import createError from 'http-errors';
import { commonMiddleware } from '../library/commonMiddleware';
import { getAuctionById } from './getAuction';
import validator from '@middy/validator';
import placeBidSchema from '../library/schemas/placeBidSchema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const { id } = event.pathParameters;
  const { amount } = event.body;
  const { email } = event.requestContext.authorizer;

  const auction = await getAuctionById(id);

  if (auction.highestBid.bidder === email) {
    throw new createError.Forbidden('You can not bid on your own auction');
  }

  if (amount < auction.highestBid.amount) {
    throw new createError.Forbidden(
      'You can not bid with less amount than you bid before',
    );
  }

  if (auction.status !== 'OPEN') {
    throw new createError.Forbidden(`You can not bid on closed auctions`);
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `You bid must be higher than ${auction.highestBid.amount}`,
    );
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression:
      'set highestBid.amount = :amount, highestBid.bidder = :bidder',
    ExpressionAttributeValues: {
      ':amount': amount,
      ':bidder': email,
    },
    ReturnValues: 'ALL_NEW',
  };

  let updatedAuction;

  try {
    const result = await dynamodb.update(params).promise();

    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid).use(
  validator({
    inputSchema: placeBidSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false,
    },
  }),
);
