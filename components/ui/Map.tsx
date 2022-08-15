
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

    // <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!} render={render} language='es'>
    //   <GoogleMap
    //     id='map'
    //     mapContainerStyle={containerStyle}
    //     center={center}
    //     zoom={19}    
    //   >
    //     <Marker position={center}/>
    //  </GoogleMap>

    // </Wrapper>       
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7613015861943!2d-106.09492288562313!3d28.63691529063493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea4336b7dfb7ed%3A0x7fbb6377d265c650!2sNext%20Store%20Uniforms!5e0!3m2!1ses-419!2smx!4v1660593449615!5m2!1ses-419!2smx" width="100%" height="450" style={{ border: 0}} loading="lazy" ></iframe>    

  )
}
