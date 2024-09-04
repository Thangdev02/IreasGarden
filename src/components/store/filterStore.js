import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import axios from "axios";
import PlantCard from "../plants/plantCard";
import ScrollReveal from "scrollreveal";
import environment from "../../environment";

const FilterStore = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 6; // Number of plants per page
  const location = useLocation(); // Get the current URL

  // Create a reference to the plant list container
  const plantListRef = useRef(null);

  useEffect(() => {
    console.log(`${environment.apiBaseUrl}${environment.endpoints.plants}`)
    axios
      .get(`${environment.apiBaseUrl}${environment.endpoints.plants}`)
      .then((response) => {
        setPlants(response.data);
        setFilteredPlants(response.data); // Initialize with full plant list
      })
      .catch((error) => {
        console.error(error);
      });

    // Initialize ScrollReveal animations
    ScrollReveal().reveal(".filter-sidebar", {
      delay: 600,
      distance: "50px",
      origin: "left",
      duration: 1200,
      opacity: 0,
    });

    ScrollReveal().reveal(".plant-card", {
      delay: 1000,
      distance: "50px",
      origin: "bottom",
      duration: 800,
      opacity: 0,
      interval: 200, // Adds staggered reveal for each card
    });
  }, []);

  // Retrieve search term from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery.toLowerCase());
  }, [location.search]);

  // Filter Logic
  useEffect(() => {
    let filtered = plants;

    // Filter by name using search term from query parameters
    if (searchTerm) {
      filtered = filtered.filter((plant) =>
        plant.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (plant) => plant.price >= priceRange[0] && plant.price <= priceRange[1]
    );

    // Filter by type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((plant) => selectedTypes.includes(plant.type));
    }

    setFilteredPlants(filtered);
    setPage(1); // Reset to page 1 whenever filters are applied

    // Scroll to the top of the plant list
    if (plantListRef.current) {
      plantListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [plants, searchTerm, selectedTypes, priceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const currentPlants = filteredPlants.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);

    // Scroll to the top of the plant list when page changes
    if (plantListRef.current) {
      plantListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get unique plant types for checkboxes
  const plantTypes = [...new Set(plants.map((plant) => plant.type))];

  return (
    <Container>
      <Grid container spacing={4}>
        {/* Filter Sidebar */}
        <Grid item xs={12} md={3}>
          <Box mb={4} className="filter-sidebar">
            <Typography sx={{ fontFamily: "Quicksand" }} variant="h5">
              Filter by:
            </Typography>

            {/* Search by Name */}
            <TextField
              label="Search by name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter by Price */}
            <Typography gutterBottom sx={{ fontFamily: "Quicksand" }}>
              Filter by Price:
            </Typography>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
              step={50000}
            />
            <Typography sx={{ fontFamily: "Quicksand" }}>
              {priceRange[0]} VND - {priceRange[1]} VND
            </Typography>

            {/* Filter by Type */}
            <Typography sx={{ fontFamily: "Quicksand" }} gutterBottom>
              Filter by Type:
            </Typography>
            <FormGroup>
              {plantTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={(e) =>
                        setSelectedTypes((prev) =>
                          e.target.checked
                            ? [...prev, type]
                            : prev.filter((t) => t !== type)
                        )
                      }
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
          </Box>
        </Grid>

        {/* Plant List */}
        <Grid item xs={12} md={9}>
          {/* Reference the plant list container */}
          <Box ref={plantListRef}>
            <Grid container spacing={4}>
              {currentPlants.length > 0 ? (
                currentPlants.map((plant) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={plant.plantId}
                    className="plant-card"
                  >
                    <PlantCard plant={plant} />
                  </Grid>
                ))
              ) : (
                <Typography>No plants found</Typography>
              )}
            </Grid>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterStore;
