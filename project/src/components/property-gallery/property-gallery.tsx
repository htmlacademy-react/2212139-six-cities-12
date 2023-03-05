import {Offer} from '../../types/offer';

type PropertyGalleryProps = {
  offer: Offer;
};

export default function PropertyGallery({offer}: PropertyGalleryProps): JSX.Element {
  const {title, images} = offer;
  let sixImages = images;
  if(images.length > 6) {
    sixImages = images.slice(0, 6);
  }

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {sixImages.length && sixImages.map((source) => (
          <div className="property__image-wrapper" key={source}>
            <img
              className="property__image"
              src={source}
              alt={title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
