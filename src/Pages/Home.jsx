import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  TextField,
} from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// List of all ports, airports, and rail terminals (national and international)
const facilities = [
  // Indian Ports
  { name: "Mundra Port", city: "Mundra", country: "India" },
  { name: "Nhava Sheva (Jawaharlal Nehru Port)", city: "Navi Mumbai", country: "India" },
  { name: "Port of Chennai", city: "Chennai", country: "India" },
  { name: "Port of Visakhapatnam", city: "Visakhapatnam", country: "India" },
  { name: "Deendayal Port Trust (Kandla)", city: "Kandla", country: "India" },
  { name: "Paradip Port", city: "Paradip", country: "India" },
  { name: "Haldia Dock Complex", city: "Haldia", country: "India" },
  { name: "Kolkata Dock System", city: "Kolkata", country: "India" },
  { name: "V.O. Chidambaranar Port Trust (Tuticorin)", city: "Tuticorin", country: "India" },
  { name: "New Mangalore Port", city: "Mangalore", country: "India" },
  { name: "Cochin Port", city: "Kochi", country: "India" },
  { name: "Kamarajar Port (Ennore)", city: "Ennore", country: "India" },

  // Indian Airports
  { name: "Indira Gandhi International Airport (DEL)", city: "Delhi", country: "India" },
  { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", city: "Mumbai", country: "India" },
  { name: "Chennai International Airport (MAA)", city: "Chennai", country: "India" },
  { name: "Kempegowda International Airport (BLR)", city: "Bangalore", country: "India" },
  { name: "Rajiv Gandhi International Airport (HYD)", city: "Hyderabad", country: "India" },

  // Indian Rail Terminals
  { name: "Delhi Inland Container Depot", city: "Delhi", country: "India" },
  { name: "Mumbai Goods Terminus", city: "Mumbai", country: "India" },
  { name: "Chennai Central Freight Hub", city: "Chennai", country: "India" },

  // International Ports (China)
  { name: "Port of Shanghai", city: "Shanghai", country: "China" },
  { name: "Port of Shenzhen", city: "Shenzhen", country: "China" },
  { name: "Port of Ningbo-Zhoushan", city: "Ningbo-Zhoushan", country: "China" },

  // International Airports (China)
  { name: "Shanghai Pudong International Airport (PVG)", city: "Shanghai", country: "China" },
  { name: "Beijing Capital International Airport (PEK)", city: "Beijing", country: "China" },

  // International Rail Terminals (China)
  { name: "Chengdu Railway Container Center Station", city: "Chengdu", country: "China" },
  { name: "Manzhouli Railway Station", city: "Manzhouli", country: "China" },

  // International Ports (Russia)
  { name: "Port of Novorossiysk", city: "Novorossiysk", country: "Russia" },
  { name: "Port of Saint Petersburg", city: "Saint Petersburg", country: "Russia" },

  // International Airports (Russia)
  { name: "Sheremetyevo International Airport (SVO)", city: "Moscow", country: "Russia" },
  { name: "Domodedovo International Airport (DME)", city: "Moscow", country: "Russia" },

  // International Rail Terminals (Russia)
  { name: "Moscow-Tovarnaya-Kurskaya Railway Station", city: "Moscow", country: "Russia" },
  { name: "Vladivostok-Tovarny Railway Station", city: "Vladivostok", country: "Russia" },

  // International Ports (Finland)
  { name: "Port of Helsinki", city: "Helsinki", country: "Finland" },

  // International Airports (Finland)
  { name: "Helsinki-Vantaa Airport (HEL)", city: "Helsinki", country: "Finland" },

  // International Rail Terminals (Finland)
  { name: "Helsinki Vuosaari Harbour Railway Yard", city: "Helsinki", country: "Finland" },

  // International Ports (Greece)
  { name: "Port of Piraeus", city: "Piraeus", country: "Greece" },

  // International Airports (Greece)
  { name: "Athens International Airport (ATH)", city: "Athens", country: "Greece" },
];

// Transport modes
const transportModes = ["Seaport", "Rail Terminal", "Airport"];

// Shipment categories and weight limits
const shipmentCategories = [
  { name: "Airport (Air Cargo)", minWeight: 30, maxWeight: 100000 },
  { name: "Seaport (Sea Freight)", minWeight: 1000, maxWeight: 30000 },
  { name: "Railway (Rail Cargo)", minWeight: 10000, maxWeight: 120000 },
];

const Home = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [mode, setMode] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [routeData, setRouteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Function to fetch coordinates dynamically
  const fetchCoordinates = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
        source: source,
        target: destination,
        preferred_mode: mode,
      });

      if (response.data && response.data.length > 0) {
        setRouteData(response.data);
      }
    } catch (error) {
      setError("Error fetching coordinates");
    }
  };

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon1 - lon2) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  // Effect to handle map updates
  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(mapInstanceRef.current);
    }

    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    routeData.forEach((route, routeIndex) => {
      const latLngs = route.coordinates.map(([lat, lng]) => [lat, lng]);

      latLngs.forEach(([lat, lng], index) => {
        L.marker([lat, lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(`Route ${routeIndex + 1} - Point ${index + 1}: ${lat}, ${lng}`);
      });

      for (let i = 0; i < latLngs.length - 1; i++) {
        const [lat1, lng1] = latLngs[i];
        const [lat2, lng2] = latLngs[i + 1];
        const distance = calculateDistance(lat1, lng1, lat2, lng2);
        const midPoint = [(lat1 + lat2) / 2, (lng1 + lng2) / 2];
        L.polyline([latLngs[i], latLngs[i + 1]], { color: routeIndex === 0 ? "red" : "green", dashArray: "4 4" }).addTo(mapInstanceRef.current);
        L.marker(midPoint, {
          icon: L.divIcon({
            className: "distance-marker",
            html: `<span style="background-color: rgba(255, 255, 255, 0.8); padding: 2px 5px; border-radius: 5px;">${(distance / 1000).toFixed(2)} km</span>`,
          }),
        }).addTo(mapInstanceRef.current);
      }
    });

    if (routeData.length > 0) {
      const allLatLngs = routeData.flatMap((route) => route.coordinates.map(([lat, lng]) => [lat, lng]));
      const bounds = L.latLngBounds(allLatLngs);
      if (bounds.isValid()) {
        mapInstanceRef.current.fitBounds(bounds);
      }
    }
  }, [routeData]);

  const findRoute = async () => {
    if (!isFormValid()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await fetchCoordinates();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error fetching route data.");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const isWeightValid = () => {
    const selectedCategory = shipmentCategories.find((cat) => cat.name === category);
    if (!selectedCategory) return false;
    const weightValue = parseFloat(weight);
    return weightValue >= selectedCategory.minWeight && weightValue <= selectedCategory.maxWeight;
  };

  const isFormValid = () => {
    return source && destination && mode && category && isWeightValid();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Section (Form) */}
      <Box sx={{ flex: 4, padding: 3, borderRight: "1px solid #ccc" }}>
        <Typography variant="h5" gutterBottom>
          Shipment Details
        </Typography>

        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
            {shipmentCategories.map((cat) => (
              <MenuItem key={cat.name} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          fullWidth
          label="Total Weight (kg)"
          value={weight}
          onChange={handleWeightChange}
          type="number"
          sx={{ mb: 8 }}
          error={!isWeightValid()}
          helperText={
            !isWeightValid()
              ? `Weight must be between ${shipmentCategories.find((cat) => cat.name === category)?.minWeight} kg and ${shipmentCategories.find((cat) => cat.name === category)?.maxWeight} kg`
              : ""
          }
        />

        <Typography variant="h5" gutterBottom>
          Transport Route Finder
        </Typography>

        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Source</InputLabel>
          <Select value={source} onChange={(e) => setSource(e.target.value)}>
            {facilities.map((facility) => (
              <MenuItem key={facility.name} value={facility.name}>
                {facility.name} - {facility.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Destination</InputLabel>
          <Select value={destination} onChange={(e) => setDestination(e.target.value)}>
            {facilities.map((facility) => (
              <MenuItem key={facility.name} value={facility.name}>
                {facility.name} - {facility.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" fullWidth sx={{ mb: 8 }}>
          <InputLabel>Mode</InputLabel>
          <Select value={mode} onChange={(e) => setMode(e.target.value)}>
            {transportModes.map((modeOption) => (
              <MenuItem key={modeOption} value={modeOption}>
                {modeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={findRoute} sx={{ mt: 2, width: "100%" }}>
          Find Route
        </Button>

        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {error && <Box sx={{ mt: 2, color: "red" }}>{error}</Box>}
        {routeData.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {/* <Typography variant="h6">Route Data:</Typography> */}
            {/* <pre>{JSON.stringify(routeData, null, 2)}</pre> */}
          </Box>
        )}
      </Box>

      {/* Right Section (Map) */}
      <Box sx={{ flex: 6 }}>
        <Box ref={mapRef} style={{ height: "100%", width: "100%" }} />
      </Box>
    </Box>
  );
};

export default Home;