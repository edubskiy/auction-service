import createError from 'http-errors';
import { closeAuction } from '../library/closingAuctions';
import { getEndedAuctions } from '../library/getEndedAuctions';

async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closeAuctionsPromises = auctionsToClose.map((auction) =>
      closeAuction(auction.id),
    );
    await Promise.all(closeAuctionsPromises);

    return { closed: closeAuctionsPromises.length };
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
}

export const handler = processAuctions;
