import logo from './logo 1.png';
import logoWhite from './logo_bg_white.png';
import logoWhite2 from './logo_bg_white_2.png';
import sloganImage from './slogan.png';
import sloganImage2 from './slogan 2.png';
import artboard from './Artboard 4.png';
import premiumBg from './bg_premium_navy.png';
import premiumBg2 from './bg_premium_gold.png';

// ========================================
// BANNERS & PROMOTIONAL
// ========================================
import bannerExe from './banner exe.png';

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

// ========================================
// HERO & LIFESTYLE IMAGES
// ========================================
import interiorBedroom from './interior-bedroom.jpg';
import riverSunsetCity from './river-sunset-city.jpg';

// ========================================
// ORGANIZED EXPORTS
// ========================================

// Logos and Branding
export const logos = {
  main: logo,
  slogan: sloganImage,
  slogan2: sloganImage2,
  artboard: artboard,
  white: logoWhite,
  white2: logoWhite2,
};

// Banners
export const banners = {
  exe: bannerExe,
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
};

// Lifestyle & Hero Images
export const lifestyle = {
  interiorBedroom,
  riverSunsetCity,
};

// ========================================
// DIRECT EXPORTS (for backward compatibility)
// ========================================
export {
  logo,
  sloganImage,
  sloganImage2,
  artboard,
  logoWhite,
  logoWhite2,
  bannerExe,
  element1,
  element2,
  element3,
  welcomeImage,
  registerImage,
  interiorBedroom,
  riverSunsetCity,
  premiumBg,
  premiumBg2
};

// ========================================
// DEFAULT EXPORT (commonly used images)
// ========================================
export default {
  // Most commonly used
  logo,
  banner: bannerExe,
  // Categorized access
  logos,
  banners,
  elements,
  auth,
  lifestyle
};