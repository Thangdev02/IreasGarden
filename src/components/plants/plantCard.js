import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const PlantCard = ({ plant }) => {
  // Format price to include commas
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(plant.price);

  return (
    <Link to={`/plant/${plant.plantId}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: 345,
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '15px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          // margin: '20px auto',
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={plant.imageUrl}
          alt={plant.name}
          sx={{
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            objectFit: 'cover',
          }}
        />
        <CardContent
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "Quicksand",
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {plant.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#476136",
              fontFamily: "Quicksand",
              fontWeight: '500',
            }}
          >
            {formattedPrice} VNĐ
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontFamily: "Quicksand",
              fontWeight: '500',
            }}
          >
            {/* Available: {plant.stock} */}
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
};

export default PlantCard;
