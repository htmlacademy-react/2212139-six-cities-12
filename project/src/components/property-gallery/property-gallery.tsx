import { MAX_IMAGES_PROPERTIES } from '../../const';
import {Offer} from '../../types/offer';

type PropertyGalleryProps = {
  offer: Offer;
};

export default function PropertyGallery({offer}: PropertyGalleryProps): JSX.Element {
  const {title, images} = offer;
  let sixImages = images;
  sixImages = images.slice(0, MAX_IMAGES_PROPERTIES);

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        { sixImages.map((source) => (
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
