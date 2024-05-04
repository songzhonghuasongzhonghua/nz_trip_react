import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { Image } from 'antd';
import {DEVELOPENV} from '@/constant/index'
const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const host = DEVELOPENV

const NORTH_ISLAND = [ 
    { lat: -36.8485, lng: 174.7633, city: 'Auckland' ,pic:`${host}/image/auckland.jpg`, info: 'Auckland, based around 2 large harbours, is a major city in the north of New Zealand’s North Island. In the centre, the iconic Sky Tower has views of Viaduct Harbour, which is full of superyachts and lined with bars and cafes. Auckland Domain, the city’s oldest park, is based around an extinct volcano and home to the formal Wintergardens. Near Downtown, Mission Bay Beach has a seaside promenade.' },
    { lat: -37.7870, lng: 175.2793, city: 'Hamilton',pic:`${host}/image/hamilton.jpg`, info: 'Hamilton is a city in the Waikato region of New Zealand’s North Island. Hamilton Gardens, a sprawling public park, features elaborate themed gardens ranging from Italian Renaissance to Japanese and traditional Maori styles. The Waikato Museum displays Maori art and artefacts. Next door, ArtsPost gallery focuses on local art. In the busy city centre, Victoria Street is lined with restaurants, cafes and bars.' },
    { lat: -38.1368, lng: 176.2497, city: 'Rotorua', pic:`${host}/image/rotorua.jpg`,info: 'Rotorua, a town set on its namesake lake on New Zealand’s North Island, is renowned for its geothermal activity and Maori culture. In Te Puia’s Whakarewarewa Valley, there are bubbling mud pools and the 30m-tall Pohutu Geyser, which erupts many times daily. Its also home to a living Maori village and the New Zealand Maori Arts and Crafts Institute, with traditional wood carving and weaving schools.' },
    { lat: -38.6857, lng: 176.0702, city: 'Lake Taupo', pic:`${host}/image/taupo.jpg`,info: 'Taupo, a town near the centre of New Zealand’s North Island, is distinguished by its lakefront setting and outdoor sports ranging from fishing to jet-boating. The vast waters of Lake Taupo, a volcanic caldera, drain into the Huka Falls, dramatic, crystal-blue cascades reachable by hiking and biking trails. Surrounding Taupo are hot springs like those filling the Craters of the Moon reserve.' },
    { lat: -41.2865, lng: 174.7762, city: 'Wellington', pic:`${host}/image/wellington.jpg`,info: 'Wellington, the capital of New Zealand, sits near the North Island’s southernmost point on the Cook Strait. A compact city, it encompasses a waterfront promenade, sandy beaches, a working harbour and colourful timber houses on surrounding hills. From Lambton Quay, the iconic red Wellington Cable Car heads to the Wellington Botanic Gardens. Strong winds through the Cook Strait give it the nickname "Windy Wellington."' },
    { lat: -39.0556, lng: 174.0752, city: 'New Plymouth', pic:`${host}/image/plymouth.jpg`,info: 'New Plymouth is a city on the west coast of New Zealand’s North Island. It’s known for its coastal walkway stretching from Bell Block to Port Taranaki. Te Rewa Rewa Bridge has views of towering Mount Taranaki. The Govett-Brewster Art Gallery shows contemporary exhibitions. Close by, Pukekura Park has botanical gardens and birdlife. Subalpine forests and waterfalls characterise Egmont National Park to the south.' },
    // Add more cities with info in the same format
  ];
  
  const SOUTH_ISLAND = [
    { lat: -43.5321, lng: 172.6362, city: 'Christchurch',pic:`${host}/image/christchurch.jpg`, info: 'Christchurch, known for its English heritage, is located on the east coast of New Zealand’s South Island. Flat-bottomed punts glide on the Avon River, which meanders through the city centre. On its banks are cycling paths, the green expanse of Hagley Park and Christchurch Botanic Gardens. In 2010 and 2011, earthquakes destroyed many of the historic centre’s stone-built buildings.' },
    { lat: -45.0312, lng: 168.6626, city: 'Queenstown', pic:`${host}/image/queenstown.jpg`,info: 'Queenstown, New Zealand, sits on the shores of the South Island’s Lake Wakatipu, set against the dramatic Southern Alps. Renowned for adventure sports, it’s also a base for exploring the region’s vineyards and historic mining towns. There’s bungee jumping off Kawarau Gorge Suspension Bridge and jet-boating on the Shotover and Dart rivers. In winter, there’s skiing on the slopes of The Remarkables and Coronet Peak.' },
    { lat: -44.6716, lng: 167.9251, city: 'Milford Sound',pic:`${host}/image/sound.jpg`, info: 'Milford Sound is a small village located deep within Fiordland National Park in the Southland Region of New Zealand. It is located at the head of the fiord also called Milford Sound. The village and fiord are one of the most visited places in New Zealand, receiving about one million day visitors per year' },
    { lat: -44.0047, lng: 170.4771, city: 'Lake Tekapo', pic:`${host}/image/tekapo.jpg`,info: 'Lake Tekapo is a small township located at the southern end of the lake of the same name in the inland South Island of New Zealand. It had 558 residents according to the 2018 census, being one of five settlements in the sparsely populated Mackenzie Basin' },
    // Add more cities with info in the same format
  ];

const NORTH_ISLAND_PATH = [...NORTH_ISLAND, NORTH_ISLAND[0]]; // 连成一圈
const SOUTH_ISLAND_PATH = [...SOUTH_ISLAND, SOUTH_ISLAND[0]]; // 连成一圈

const Map = () => {
  const mapRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDMfhz1KP2VwN6ITCQyCo-oVhIobsoYgM4',
    libraries,
  });



  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=76fafe75560f43a88a5122148240205&q=New Zealand`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div style={{width:200,height:200}}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={NORTH_ISLAND[0]}
        options={{
          restriction: {
            latLngBounds: {
              north: -34.36,
              south: -47.35,
              west: 166.28,
              east: -175.81,
            },
            strictBounds: false,
          },
        }}
        onLoad={(map) => {

  
          mapRef.current = map;

          NORTH_ISLAND.forEach((city) => {
            const marker = new window.google.maps.Marker({
              position: { lat: city.lat, lng: city.lng },
              map: mapRef.current,
            });

            marker.addListener('click', () => {
              setSelectedCity(city);
            });
          });

          SOUTH_ISLAND.forEach((city) => {
            const marker = new window.google.maps.Marker({
              position: { lat: city.lat, lng: city.lng },
              map: mapRef.current,
            });

            marker.addListener('click', () => {
              setSelectedCity(city);
            });
          });

          new window.google.maps.Polyline({
            path: NORTH_ISLAND_PATH,
            strokeColor: '#FF0000',
            map: mapRef.current,
          });

          new window.google.maps.Polyline({
            path: SOUTH_ISLAND_PATH,
            strokeColor: '#00FF00',
            map: mapRef.current,
          });
        }}
      >
        {selectedCity && (
          <InfoWindow
            position={{ lat: selectedCity.lat, lng: selectedCity.lng }} 
            onCloseClick={() => setSelectedCity(null)}
            options={{
                pixelOffset: new window.google.maps.Size(0, -30), // 去掉箭头
              }}
          >
            <div>
                <div style={{display:'flex',justifyContent:'center'}}><h3 style={{color:'black'}}>{selectedCity.city}</h3></div>
              
              <div style={{display:'flex',justifyContent:'center'}}><Image src={selectedCity.pic} style={{width:300,height:150}}/></div>
              
              <p style={{color:'black'}}>{selectedCity.info}</p>
            </div>
          </InfoWindow>
        )}

         <InfoWindow
            position={{ lat: -34.4485, lng: 197 }} 
            options={{
                pixelOffset: new window.google.maps.Size(0, -30), // 去掉箭头
              }}
            strokeColor
          >
            <div>
              {weatherData && (
                <div>
                  <p>Current temperature: {weatherData.current.temp_c} °C</p>
                  <p>Weather conditions : {weatherData.current.condition.text}</p>
                </div>
              )}
            </div>
          </InfoWindow>
      </GoogleMap>
    </div>
  );
};

export default Map;