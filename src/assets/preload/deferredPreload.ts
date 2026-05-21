import ourFoto1Url from "../Our foto/first foto.webp?url"
import ourFoto2Url from "../Our foto/second foto.jpg?url"
import ourFoto3Url from "../Our foto/third foto.jpg?url"
import ourFoto4Url from "../Our foto/four foto.jpg?url"
import frameUrl from "../location/frame.svg?url"
import locationPhotoUrl from "../location/lokation_yakimowich.jpg?url"
import num1Url from "../numbers/1.svg?url"
import num2Url from "../numbers/2.svg?url"
import num3Url from "../numbers/3.svg?url"
import ringsPhotoUrl from "../photo.svg?url"
import heartWithNumberUrl from "../calendar/heart_with_number.svg?url"
import miniHeartUrl from "../calendar/mini_heart.svg?url"
import calendarIcon1Url from "../calendar/events/1_Церкоквь.png?url"
import calendarIcon2Url from "../calendar/events/2_Бокалы.png?url"
import calendarIcon3Url from "../calendar/events/3_Кольца.png?url"
import calendarIcon4Url from "../calendar/events/4_Начало-банкета.png?url"
import calendarIcon5Url from "../calendar/events/5_Салют.png?url"
import { preloadImages } from "../../lib/preload"

const DEFERRED_URLS = [
  ourFoto1Url,
  ourFoto2Url,
  ourFoto3Url,
  ourFoto4Url,
  frameUrl,
  locationPhotoUrl,
  num1Url,
  num2Url,
  num3Url,
  ringsPhotoUrl,
  heartWithNumberUrl,
  miniHeartUrl,
  calendarIcon1Url,
  calendarIcon2Url,
  calendarIcon3Url,
  calendarIcon4Url,
  calendarIcon5Url,
]

export function preloadDeferredAssets(): void {
  void preloadImages(DEFERRED_URLS)
}
