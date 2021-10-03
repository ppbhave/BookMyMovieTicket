import { MapContainer as LeafletMap, TileLayer, Popup, Marker } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
function MapContainerElement({ theater, containerVisibility }) {
    const latlongInfo = theater.sGpsLocation.split(", ");
    return (

        <div className="modal fade" id="theaterGps" tabindex="-1" role="dialog" aria-labelledby="writeReviewLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{theater.sName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="theater-map">
                            <LeafletMap center={latlongInfo} zoom={4}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                                <Marker position={latlongInfo}>
                                    <Popup>
                                        <div className="info-container">
                                            <div style={{ justifySelf: "center" }}>
                                                <strong>{theater.sName}</strong> <br />
                                            </div>
                                            <br />
                                            <div className="info-active">
                                                {theater.sGpsLocation}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            </LeafletMap>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MapContainerElement;