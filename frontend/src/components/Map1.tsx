import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Map1Props = {
    mapboxToken: string
}
export default function Map1(props: Map1Props) {
    return (
        <Map
            id={"spotmap"}
            initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5
            }}
            style={{width: 800, height: 600}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={"pk.eyJ1Ijoibmlja2tsb2NrIiwiYSI6ImNsYm5kZTBqcDBxcnIzb3BxdGg5cDlxcmYifQ.ZQHKwQswuvyOW4_1ZBZONg"}
        />
    )
}