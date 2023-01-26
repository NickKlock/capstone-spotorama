import type {HeatmapLayer} from 'react-map-gl';

const MAX_ZOOM_LEVEL = 3.5;

export const heatmapLayer: HeatmapLayer = {
    id: 'heatmap',
    maxzoom: MAX_ZOOM_LEVEL,
    type: 'heatmap',
    paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': 1,
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': 1,
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(0,0,255,0)',
            0.2,
            'royalblue',
            0.4,
            'cyan',
            0.6,
            'rgb(0,170,255)',
            0.8,
            'rgb(55,134,230)',
            0.9,
            'rgb(0,4,255)'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, 20],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': 0.73
    }
};
