import logo from './logo 1.png';
import sloganImage from './slogan.png';
import sloganImage2 from './slogan 2.png';
import artboard from './Artboard 4.png';

// ========================================
// BANNERS & PROMOTIONAL
// ========================================
import bannerExe from './banner exe.png';
import bannerExeLarge from './banner exe 1600x400.png';

// ========================================
// UI ELEMENTS & DECORATIVE
// ========================================
import element1 from './element 1.png';
import element2 from './element 2.png';
import element3 from './element 3.png';

// ========================================
// AUTHENTICATION PAGES
// ========================================
import welcomeImage from './Welcome.png';
import registerImage from './Register.png';
import registerImage1 from './Register1.png';

// ========================================
// HERO & LIFESTYLE IMAGES
// ========================================
import happyManHome from './happy-man-with-miniature-his-future-home.jpg';
import interiorBedroom from './interior-bedroom.jpg';
import riverSunsetCity from './river-sunset-city.jpg';
import menShakingHands from './side-view-men-shaking-hands.jpg';

// ========================================
// ORGANIZED EXPORTS
// ========================================

// Logos and Branding
export const logos = {
  main: logo,
  slogan: sloganImage,
  slogan2: sloganImage2,
  artboard: artboard
};

// Banners
export const banners = {
  exe: bannerExe,
  exeLarge: bannerExeLarge
};

// UI Elements
export const elements = {
  element1,
  element2,
  element3
};

// Authentication
export const auth = {
  welcome: welcomeImage,
  register: registerImage,
  register1: registerImage1
};

// Lifestyle & Hero Images
export const lifestyle = {
  happyManHome,
  interiorBedroom,
  riverSunsetCity,
  menShakingHands
};

// ========================================
// DIRECT EXPORTS (for backward compatibility)
// ========================================
export {
  logo,
  sloganImage,
  sloganImage2,
  artboard,
  bannerExe,
  bannerExeLarge,
  element1,
  element2,
  element3,
  welcomeImage,
  registerImage,
  registerImage1,
  happyManHome,
  interiorBedroom,
  riverSunsetCity,
  menShakingHands
};

// ========================================
// DEFAULT EXPORT (commonly used images)
// ========================================
export default {
  // Most commonly used
  logo,
  banner: bannerExe,
  heroImage: happyManHome,

  // Categorized access
  logos,
  banners,
  elements,
  auth,
  lifestyle
};