import { SaleCard } from "../@types";

export function filterCards(cards: SaleCard[]): SaleCard[] {
  const filteredCards: SaleCard[] = cards.filter(card => 
    card.seller === 'KaBuM!' || 
    card.seller === 'Amazon.com.br' || 
    card.seller === 'Pichau' || 
    card.seller === 'Terabyteshop' || 
    card.seller === 'Americanas.com' || 
    card.seller === 'Casas Bahia' || 
    card.seller === 'Magazine Luiza' 
    && card
  );

  return filteredCards;
}