export default function useZoomToKM() {
    function calculateZoomToKM(zoom: number): number {
        const result = (2164 - (2162 * (Math.pow(2, (15.5 - zoom) / 12))));
        return Math.abs(result)
    }

    return {calculateZoomToKM}
}