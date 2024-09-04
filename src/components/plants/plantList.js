import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
  Pagination,
  Box,
} from '@mui/material';
import PlantCard from './plantCard';
import environment from '../../environment';

const PlantList = () => {
  const [plants, setPlants] = useState([]); // All plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 6; // Number of plants per page

  useEffect(() => {
    setLoading(true);
    axios
    .get(`${environment.apiBaseUrl}${environment.endpoints.plants}`)
    .then((response) => {
        setPlants(response.data); // Assume all plant data is fetched
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Failed to load data</Typography>
      </Box>
    );
  }

  // Calculate total pages based on the length of the plant data
  const totalPages = Math.ceil(plants.length / itemsPerPage);

  // Get the current page of plants
  const currentPlants = plants.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        {currentPlants.length > 0 ? (
          currentPlants.map((plant) => (
            <Grid item xs={12} sm={6} md={4} key={plant.plantId}>
              <PlantCard plant={plant} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" textAlign="center">
            No plants available
          </Typography>
        )}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default PlantList;
