
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const containerStyle = {
  width: '100%',
  height: '450px'
};

const center = {
  lat: 28.636945993129935,
  lng: -106.09273415706352
};

export const Map = () => {

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  
  
  return (

    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!} render={render} language='es'>
      <GoogleMap
        id='map'
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}    
      >
        <Marker position={center}/>
     </GoogleMap>

    </Wrapper>           

  )
}
