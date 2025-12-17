import { expect, test } from 'vitest';
import { allocateRooms } from "../lib/allocateRooms";

const guests = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

test("Test 1", () => {
    const r = allocateRooms(3, 3, guests);
    expect(r).toEqual({
        premiumRoomsUsed: 3,
        economyRoomsUsed: 3,
        premiumRevenue: 738,
        economyRevenue: 167
    });
});

test("Test 2", () => {
    const r = allocateRooms(7, 5, guests);
    expect(r).toEqual({
        premiumRoomsUsed: 6,
        economyRoomsUsed: 4,
        premiumRevenue: 1054,
        economyRevenue: 189
    });
});

test("Test 3", () => {
    const r = allocateRooms(2, 7, guests);
    expect(r).toEqual({
        premiumRoomsUsed: 2,
        economyRoomsUsed: 4,
        premiumRevenue: 583,
        economyRevenue: 189
    });
});

test("Test 4", () => {
    const r = allocateRooms(7, 1, guests);
    expect(r).toEqual({
        premiumRoomsUsed: 7,
        economyRoomsUsed: 1,
        premiumRevenue: 1153,
        economyRevenue: 45
    });
});
