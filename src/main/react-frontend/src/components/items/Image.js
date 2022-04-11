export default function Image(props) {
    const DEFAULT_IMAGE="../../assets/images/default-image-620x600.jpg"
    const IMAGE_URL="../../assets/images/" + props.itemId + "_1.png"

    function tryRequire() {
        try {
            return require("../../assets/images/" + props.itemId + "_1.png");
        } catch (err) {
            try {
                return require("../../assets/images/" + props.itemId + "_1.jpg");
            } catch (err) {
                return require("../../assets/images/default-image-620x600.jpg");
            }
        }
    }

    return (
        <img
            src={tryRequire()}
            width={props.size}
        />
    )
}