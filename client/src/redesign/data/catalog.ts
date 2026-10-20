import { products as legacyProducts } from './legacy-products';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  label: string;
  tagline: string;
  summary: string;
  image: string;
  battery: string;
  compatibility: string;
  features: string[];
  budget: string;
  useCase: string;
  strengths: string[];
  weaknesses: string[];
  sourceUrl: string;
  review: string[];
  catalogOrigin?: 'manufacturer-sourced' | 'existing-catalog';
  specs?: Record<string, string>;
  amazonUrl?: string;
};

export type Guide = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  readTime: string;
  sections: { title: string; text: string }[];
  productIds: string[];
};

// Budget is an editorial positioning tier, not a live or actual price.
export const featuredProducts: Product[] = [
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    category: 'smartwatches',
    label: 'FOR IPHONE',
    tagline: 'Your iPhone routine, right on your wrist.',
    summary:
      'A GPS smartwatch with an always-on OLED display, sleep-stage tracking, and heart-rate tracking for people who want wearable information on the wrist.',
    image: '/images/apple-watch.webp',
    battery: 'Up to 18 hours in normal use; up to 36 hours in Low Power Mode.',
    compatibility: 'iOS',
    features: ['GPS', 'Sleep tracking', 'Heart rate'],
    budget: 'Premium',
    useCase: 'iPhone users who want a display-led daily wearable for GPS, sleep, and heart-rate information.',
    strengths: [
      'Always-on OLED display keeps glanceable information visible.',
      'GPS, sleep-stage tracking, and heart-rate tracking cover a broad daily-wear baseline.',
      'Fast charging can reach about 80% in roughly 30 minutes.',
    ],
    weaknesses: [
      'Battery expectations are measured in hours rather than multiple days in normal use.',
      'Requires an iPhone Xs or later with iOS 18 or later.',
      'Low Power Mode extends runtime but changes the normal-use trade-off.',
    ],
    sourceUrl: 'https://support.apple.com/en-us/121202',
    review: [
      'Series 10 suits an iPhone owner who wants a wearable to feel like an extension of the phone rather than a background sensor. Its always-on OLED display makes on-wrist information a central part of the experience.',
      'GPS, sleep stages, and heart-rate tracking make the watch a practical all-rounder for everyday routines. The stated normal battery figure means charging should be part of that routine, not an afterthought.',
      'The fast-charge claim helps with short top-ups, while Low Power Mode offers a longer-runtime option. Confirm that your iPhone meets the stated iPhone Xs and iOS 18 minimum before choosing it.',
    ],
  },
  {
    id: 'oura-ring-4',
    name: 'Oura Ring 4',
    brand: 'Oura',
    category: 'smart-rings',
    label: 'SLEEP & RECOVERY',
    tagline: 'Less on your wrist. More insight into your rest.',
    summary:
      'A titanium smart ring with recessed sensors that tracks sleep, heart rate, and temperature while keeping the wearable format discreet.',
    image: '/images/oura-ring.webp',
    battery: 'Typically 5–8 days, depending on use.',
    compatibility: 'iOS & Android',
    features: ['Sleep tracking', 'Heart rate'],
    budget: 'Premium',
    useCase: 'People who prioritize sleep and recovery signals in a screen-free, ring-style wearable.',
    strengths: [
      'Titanium construction and recessed sensors support a smooth, understated profile.',
      'Typical battery life is measured in days rather than daily charging cycles.',
      'Tracks sleep, heart rate, and temperature.',
    ],
    weaknesses: [
      'Full-feature access requires an active membership.',
      'Battery life varies with use rather than being a fixed promise.',
      'A generation-specific sizing kit matters when selecting fit.',
    ],
    sourceUrl: 'https://support.ouraring.com/hc/en-us/articles/33045011508115-Oura-Ring-4',
    review: [
      'Oura Ring 4 is the quietest choice here for someone who wants wearable data without a wrist display. The titanium body and recessed sensors make the hardware proposition especially focused on unobtrusive wear.',
      'Its stated 5–8 day battery range can reduce charging friction, but it is explicitly use-dependent. Sleep, heart-rate, and temperature tracking make the ring most compelling when overnight and longitudinal context matter more than on-device interaction.',
      'The ownership model deserves attention before checkout. Full features need an active membership, and the generation-specific sizing kit should be treated as part of selecting the product rather than an optional detail.',
    ],
  },
  {
    id: 'garmin-venu-3',
    name: 'Garmin Venu 3',
    brand: 'Garmin',
    category: 'smartwatches',
    label: 'LONGER BETWEEN CHARGES',
    tagline: 'For moving more and charging less.',
    summary:
      'A GPS smartwatch with sleep tracking and several stated battery modes, including a long smartwatch-mode estimate and a dedicated GPS estimate.',
    image: '/images/garmin-venu.webp',
    battery:
      'Up to 14 days in smartwatch mode without timed activity or music; up to 5 days with always-on display; up to 26 hours GPS without music.',
    compatibility: 'iOS & Android',
    features: ['GPS', 'Sleep tracking', 'Heart rate'],
    budget: 'Premium',
    useCase: 'People who want sleep and GPS coverage with battery options that can fit a multi-day routine.',
    strengths: [
      'The stated smartwatch-mode estimate reaches up to 14 days under its specified conditions.',
      'Always-on display and GPS scenarios have separate battery expectations, making trade-offs clearer.',
      'Sleep tracking is part of the watch’s documented use.',
    ],
    weaknesses: [
      'The 14-day estimate excludes timed activity and music.',
      'Using the always-on display materially reduces the stated smartwatch-mode estimate.',
      'GPS endurance is separately stated without music, so activity habits matter.',
    ],
    sourceUrl: 'https://support.garmin.com/en-US/?faq=wRMnVRKL5i3YvvL05lqMi6',
    review: [
      'Venu 3 is a sensible starting point when charging frequency is a deciding factor. Garmin publishes distinct estimates for baseline smartwatch use, always-on display use, and GPS use instead of presenting one catch-all number.',
      'The key is to read those modes literally: the headline smartwatch estimate assumes no timed activity or music, while always-on display use has a shorter estimate. That makes it easier to align the watch with the way you actually plan to wear it.',
      'Sleep tracking and GPS give this model a broad everyday purpose without requiring a single narrow use case. For an iPhone or Android household, its compatibility category keeps it in consideration across both phone platforms.',
    ],
  },
  {
    id: 'sony-linkbuds-fit',
    name: 'Sony LinkBuds Fit',
    brand: 'Sony',
    category: 'hearables',
    label: 'SECURE SOUND',
    tagline: 'Stay in your rhythm. Tune out the noise.',
    summary:
      'True wireless earbuds with noise cancellation, ambient sound, secure fitting supporters, and multipoint support for listeners who move between environments and devices.',
    image: '/images/sony-linkbuds.webp',
    battery: 'Up to 21 hours including the charging case; this is not an earbuds-alone figure.',
    compatibility: 'iOS & Android',
    features: ['Noise cancellation'],
    budget: 'Midrange',
    useCase: 'Listeners who want secure-fitting, noise-cancelling earbuds for commutes, work, and active daily movement.',
    strengths: [
      'Noise cancellation and ambient sound provide two listening approaches for different surroundings.',
      'Fitting supporters are intended to help keep the earbuds secure.',
      'Multipoint support can simplify switching between paired devices.',
    ],
    weaknesses: [
      'The 21-hour claim includes the charging case, not earbuds-only listening.',
      'Sound Connect compatibility can vary by device and setup.',
      'Only the earbuds are splash resistant; the charging case is not.',
    ],
    sourceUrl: 'https://electronics.sony.com/audio/headphones/all-headphones/p/wfls910n-b',
    review: [
      'LinkBuds Fit is a hearables option for people who care about how earbuds behave while moving, not only how they sound at a desk. The fitting supporters, noise cancellation, and ambient sound make that positioning clear.',
      'The quoted total runtime should be read carefully because it includes the charging case. Multipoint support can be useful for a two-device routine, while Sound Connect compatibility should be checked against the phone and setup you use.',
      'These earbuds can suit a commute or active day, but care matters. The earbuds are splash resistant, whereas the case is not, so the charging case should stay protected from water exposure.',
    ],
  },
];

export const guides: Guide[] = [
  {
    id: 'find-your-fit',
    title: 'Find Your Fit: Watch, Ring, or Fitness Tracker?',
    eyebrow: 'START WITH THE ROUTINE',
    description:
      'Choose a wearable format by the information you want to see, when you will wear it, and the commitments that continue after purchase.',
    readTime: '4 min read',
    sections: [
      {
        title: 'Begin with the job to be done',
        text: 'Choose a smartwatch when a wrist display and GPS are central to your day. Choose a smart ring when unobtrusive sleep and recovery context matter more than on-device interaction. A simpler fitness tracker can be the better fit when basic activity feedback is enough.',
      },
      {
        title: 'Match the form factor to your habits',
        text: 'A watch asks you to wear a screen on the wrist, while a ring removes the display and depends on correct sizing. Earbuds solve a different need: they add audio, calls, and listening controls rather than replacing a health wearable.',
      },
      {
        title: 'Read battery claims as scenarios',
        text: 'Battery figures are useful only with their conditions. Always-on displays, GPS activity, music, and charging-case totals can change what a number means in practical use.',
      },
      {
        title: 'Count ongoing costs and maintenance',
        text: 'A purchase may involve a membership for full features, a sizing step, replacement bands, or charging accessories. Budget for the ownership model, not just the device category; editorial budget tiers are not live prices.',
      },
      {
        title: 'Set your privacy baseline first',
        text: 'Before connecting an app, review the account, health-data, location, sharing, and export settings that apply to your device. Keep only the permissions you need, and revisit them after app updates.',
      },
    ],
    productIds: ['apple-watch-series-10', 'oura-ring-4', 'garmin-venu-3', 'sony-linkbuds-fit'],
  },
  {
    id: 'smart-ring-vs-smartwatch',
    title: 'Smart Ring vs. Smartwatch: Choose the Trade-Off',
    eyebrow: 'FORM FACTOR GUIDE',
    description:
      'A screen-free ring and a display-led watch can both contribute wearable information, but they serve different moments of the day.',
    readTime: '3 min read',
    sections: [
      {
        title: 'The screen changes the relationship',
        text: 'A smartwatch is designed for quick, on-wrist reference. A smart ring leaves interpretation to the companion app, which can be appealing when you want less interruption from a wearable.',
      },
      {
        title: 'Choose for sleep and comfort',
        text: 'If you expect to wear the device overnight, think about what feels natural in bed. Ring sizing is especially important, while watch comfort depends on the case, band, and how snugly you prefer to wear it.',
      },
      {
        title: 'Consider activity needs separately',
        text: 'GPS can make a watch a stronger fit for people who need location-aware activity sessions. A ring can be better when day-to-day and overnight signals are the priority and a wrist screen is not needed.',
      },
      {
        title: 'Accept the limits before buying',
        text: 'Rings do not provide the same display-first experience as watches, and watches may require more frequent charging. Neither format eliminates the need to check phone compatibility, app terms, and the conditions behind battery estimates.',
      },
    ],
    productIds: ['apple-watch-series-10', 'oura-ring-4', 'garmin-venu-3'],
  },
  {
    id: 'wearable-accessories',
    title: 'Wearable Accessories: Compatibility, Charging, and Care',
    eyebrow: 'BUYING CHECKLIST',
    description:
      'Use this practical checklist to avoid mismatched accessories and protect the wearable components you already own.',
    readTime: '4 min read',
    sections: [
      {
        title: 'Verify phone and app compatibility',
        text: 'Start with the supported phone platform and minimum software requirements, then check the companion-app requirements for your specific setup. “Works with iOS and Android” does not mean every app feature behaves identically on every phone.',
      },
      {
        title: 'Buy the correct charger',
        text: 'Use the charger specified for the exact model and keep a spare only when it matches that model. Do not assume a charger or case from an older generation will fit a newer watch, ring, or set of earbuds.',
      },
      {
        title: 'Treat sizing and bands as fit equipment',
        text: 'For rings, follow the correct generation’s sizing process before ordering. For watches, check the band attachment and intended wrist size; a comfortable, secure fit supports consistent wear.',
      },
      {
        title: 'Separate water care from charging care',
        text: 'Read the water or splash-resistance statement for each component, not just the headline product. Earbuds and their charging case, for example, can have different exposure limits.',
      },
      {
        title: 'Keep a simple replacement plan',
        text: 'Record the exact model name, charger type, and band or tip size after purchase. That small record makes a later replacement less likely to become an incompatible impulse buy.',
      },
    ],
    productIds: ['apple-watch-series-10', 'oura-ring-4', 'garmin-venu-3', 'sony-linkbuds-fit'],
  },
];

const useCases: Record<string, string> = {
  'smartwatches': 'People considering a connected wrist display and everyday activity features.',
  'fitness-trackers': 'People comparing activity-focused wearables and charging routines.',
  'smart-rings': 'People exploring discreet, screen-free wearable formats.',
  'smart-glasses': 'People considering wearable audio, camera, or display features in eyewear.',
  'vr-headsets': 'People exploring immersive or mixed-reality headsets.',
  'kids-wearables': 'Families comparing wearable features, compatibility, and privacy controls.',
  'pet-tech': 'Pet owners comparing tracker compatibility and ongoing service requirements.',
  'bluetooth-headsets': 'People comparing wearable audio for calls, commuting, or daily listening.',
  'wearable-jewelry': 'People exploring wearable accessories and connected jewelry.',
  'bluetooth-hats': 'People comparing headwear and wearable accessory options.',
};
const preservedProducts: Product[] = legacyProducts
  .filter((item) => !featuredProducts.some((product) => product.id === item.id))
  .map((item) => {
    const text = `${item.description} ${Object.entries(item.specs).flat().join(' ')}`;
    const features: string[] = [];
    if (/\bGPS\b/i.test(text)) features.push('GPS');
    if (/\bsleep\b/i.test(text)) features.push('Sleep tracking');
    if (/heart.rate/i.test(text)) features.push('Heart rate');
    if (/\bANC\b|noise.cancell/i.test(text)) features.push('Noise cancellation');
    return {
      id: item.id, name: item.name, brand: item.brand, category: item.category,
      label: 'CATALOG OVERVIEW', tagline: 'Explore the fit, features, and trade-offs.',
      summary: item.description, image: item.image,
      battery: item.specs.Battery || 'Not specified in the existing catalog',
      compatibility: 'Check exact model', features, budget: 'Check current price',
      useCase: useCases[item.category] || 'People comparing wearable technology and accessories.',
      strengths: item.pros, weaknesses: item.cons,
      sourceUrl: '', catalogOrigin: 'existing-catalog', specs: item.specs, amazonUrl: item.amazonUrl,
      review: [
        item.description,
        'This listing is retained from the existing Wear Your Own Techs catalog. Its specification notes and trade-offs have not been independently re-tested for this redesign. Confirm the exact product variant and current manufacturer specifications before buying.',
        'Check phone or device compatibility, the charger and fit requirements, and any ongoing service costs. We do not present inherited price figures, star scores, or review counts as current verified offers or test results.',
      ],
    };
  });
export const products: Product[] = [...featuredProducts, ...preservedProducts];
