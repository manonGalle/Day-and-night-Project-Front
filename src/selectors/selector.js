/**
 *  find the spots to display depending on toggles switch
 * @param {Array} validatedSpots - all validated spots from DB
 * @param {boolean} checkDay - toggle switch "Day"
 * @param {boolean} checkNight - toggle switch "Night"
 * @return {Array} - spotsList to display
 */
export function spotsToDisplay(validatedSpots, checkDay, checkNight) {
    let spots = [];

    if (checkDay && checkNight) {
        spots = validatedSpots;
    } else if (!checkDay && checkNight) {
        spots = validatedSpots.filter((spot) => spot.category.name === 'Night');
    } else if (checkDay && !checkNight) {
        spots = validatedSpots.filter((spot) => spot.category.name === 'Day');
    }
    return spots;
}

export function setAnimation(currentSpot, clickedSpotId, isOpen) {
    if (isOpen && currentSpot.id === clickedSpotId) {
        return 1
    } else {
        return null
    }
}
