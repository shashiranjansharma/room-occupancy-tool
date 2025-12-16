export type AllocationResult = {
    premiumRoomUsed: number;
    economyRoomUsed: number;
    premiumRevenue: number;
    economyRevenue: number;
};

const PREMIUM_THRESHOLD = 100;

export function allocateRooms(
    freePremium: number,
    freeEconomy: number,
    guests: number[]
): AllocationResult {
    const premiumGuests = guests
        .filter(g => g >= PREMIUM_THRESHOLD)
        .sort((a, b) => b - a);

    const economyGuests = guests
        .filter(g => g < PREMIUM_THRESHOLD)
        .sort((a, b) => b - a);

    // Fill premium rooms with premium guests
    const usedPremiumGuests = premiumGuests.slice(0, freePremium);
    let premiumRoomUsed = usedPremiumGuests.length;
    let premiumRevenue = usedPremiumGuests.reduce((s, v) => s + v, 0);

    // Fill economy rooms with available guests
    const usedEconomyGuests = economyGuests.slice(0, freeEconomy);
    let economyRoomUsed = usedEconomyGuests.length;
    let economyRevenue = usedEconomyGuests.reduce((s, v) => s + v, 0);

    // Upgrade economy guests if premium rooms are available
    const remainingPremiumRooms = freePremium - premiumRoomUsed;
    if (remainingPremiumRooms > 0) {
        const upgradeGuests = economyGuests
            .slice(freeEconomy, freeEconomy + remainingPremiumRooms);

        premiumRoomUsed += upgradeGuests.length;
        premiumRevenue += upgradeGuests.reduce((s, v) => s + v, 0);
    }

    return {
        premiumRoomUsed,
        economyRoomUsed,
        premiumRevenue,
        economyRevenue
    };
}
