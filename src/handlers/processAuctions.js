import { getEndedAuctions } from '../library/getEndedAuctions';

async function processAuctions(event, context) {
  const auctionsToClose = await getEndedAuctions();
  
  console.log(auctionsToClose);
}

export const handler = processAuctions;