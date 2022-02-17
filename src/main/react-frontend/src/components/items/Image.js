export default function Image(props) {
    const DEFAULT_IMAGE="../../images/default-image-620x600.jpg"
    const IMAGE_URL="../../images/" + props.itemId + "_1.png"
    console.log(IMAGE_URL);

    const tryRequire = () => {
        try {
            return require("../../images/" + props.itemId + "_1.png");
        } catch (err) {
            return require("../../images/default-image-620x600.jpg");
        }
    }

    return (
        <img
            src={tryRequire()}
            width="50px"
        />
    )
}