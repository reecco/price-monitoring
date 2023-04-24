import { SaleCard } from "../@types";

export function filterCards(cards: SaleCard[]): SaleCard[] {
  const sellers: string[] = ["KaBuM!", "Amazon.com.br", "Pichau", "Terabyteshop", "Americanas.com", "Casas Bahia", "Magazine Luiza"];
  const filteredCards: SaleCard[] = cards.filter((card) => {
    if (card.seller)
      return sellers.filter((seller) => card.seller == seller && card);
  });

  return filteredCards;
}