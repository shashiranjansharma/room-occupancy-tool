function getSumOfNums(arr: number[]) {
    return arr.reduce((sum, curr) => sum + curr, 0);
}

export function allocateRooms(
    freePremium: number,
    freeEconomy: number,
    guests: number[]
) {
    const premiumGuests = guests
        .filter(g => g >= 100)
        .sort((a, b) => b - a);

    const economyGuests = guests
        .filter(g => g < 100)
        .sort((a, b) => b - a);

    // Fill premium with premium guests
    const premiumFromPremium = premiumGuests.slice(0, freePremium);
    let premiumRoomsUsed = premiumFromPremium.length;
    let premiumRevenue = getSumOfNums(premiumFromPremium);

    // Remaining premium capacity
    let remainingPremium = freePremium - premiumRoomsUsed;

    // Decide how many economy guests to upgrade
    const maxUpgradeable = Math.min(
        remainingPremium,
        Math.max(0, economyGuests.length - freeEconomy)
    );

    const upgradedGuests = economyGuests.slice(0, maxUpgradeable);
    premiumRoomsUsed = premiumRoomsUsed + upgradedGuests.length;
    premiumRevenue = premiumRevenue + getSumOfNums(upgradedGuests);

    // Remaining economy guests go to economy rooms
    const remainingEconomyGuests = economyGuests.slice(maxUpgradeable);
    const economyAssigned = remainingEconomyGuests.slice(0, freeEconomy);

    const economyRoomsUsed = economyAssigned.length;
    const economyRevenue = getSumOfNums(economyAssigned);

    return {
        premiumRoomsUsed,
        economyRoomsUsed,
        premiumRevenue,
        economyRevenue
    };
}
