const searchService = require("../services/search.service");

const searchHotels = async (req, res) => {
  try {
    const { location, numberOfGuests, checkInDate, checkOutDate, page, limit } = req.query;
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const searchCriteria = {
      location,
      numberOfGuests,
      checkInDate,
      checkOutDate,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 5,
    };

    const availableHotels = await searchService.searchAvailableRooms(
      searchCriteria
    );
    res.json(availableHotels);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await searchService.getUniqueCities();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  searchHotels,
  getCities,
};