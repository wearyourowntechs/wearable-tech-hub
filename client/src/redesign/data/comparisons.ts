import { featuredProducts } from "./catalog";

export type ComparisonStory = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  productIds: string[];
  verdict: string;
  sections: { title: string; text: string }[];
};

export const comparisonStories: ComparisonStory[] = [
  {
    id: "apple-watch-vs-garmin",
    title: "Apple Watch Series 10 vs. Garmin Venu 3",
    kicker: "DISPLAY-LED DAILY WEAR OR LONGER-RUNNING GPS",
    description:
      "Two GPS watches with sleep and heart-rate tracking, separated most clearly by phone fit and the charging routine you are willing to keep.",
    productIds: ["apple-watch-series-10", "garmin-venu-3"],
    verdict:
      "Choose Apple Watch Series 10 when you use an iPhone and want an always-on wrist display as part of the day. Choose Garmin Venu 3 when iOS or Android flexibility and fewer planned charges matter more; its longest estimate has specific no-activity, no-music conditions.",
    sections: [
      {
        title: "Start with the phone and the screen",
        text: "Apple Watch Series 10 is for iPhone, while Venu 3 works with iOS and Android. Both bring GPS, sleep tracking, and heart-rate tracking to the wrist, but the Apple choice is built around an always-on OLED display and glanceable information. The Garmin is the broader-platform option when that display-first experience is not the deciding factor.",
      },
      {
        title: "Read the battery modes literally",
        text: "Apple states up to 18 hours in normal use or up to 36 hours in Low Power Mode, so a regular charging habit belongs in the plan. Garmin states up to 14 days in smartwatch mode without timed activity or music, up to 5 days with always-on display, and up to 26 hours of GPS without music. Those are scenarios, not directly comparable all-day tests.",
      },
      {
        title: "Choose the routine, not a universal winner",
        text: "For an iPhone owner who checks a watch throughout the day and accepts daily charging, Apple is the more natural fit. For someone who wants GPS and sleep coverage across either phone platform while minimizing charge stops, Garmin has the stronger stated battery options. Check your exact phone and the manufacturer’s current requirements before purchase.",
      },
    ],
  },
  {
    id: "smart-ring-vs-smartwatch",
    title: "Smart Ring vs. Smartwatch: Oura Ring 4 or Apple Watch Series 10",
    kicker: "SCREEN-FREE REST OR ON-WRIST INFORMATION",
    description:
      "The choice is less about which form factor wins and more about whether you want information on your wrist or a quieter device that moves interpretation to the app.",
    productIds: ["oura-ring-4", "apple-watch-series-10"],
    verdict:
      "Oura Ring 4 fits a screen-free sleep and recovery routine if the membership and sizing process suit you. Apple Watch Series 10 fits an iPhone user who wants GPS, an always-on display, and wearable information available without reaching for a phone.",
    sections: [
      {
        title: "A display changes the job",
        text: "Oura Ring 4 has no screen and no GPS; it focuses on sleep, heart rate, and temperature data in a ring form that is meant to stay out of the way. Apple Watch Series 10 puts a display, GPS, sleep-stage tracking, and heart-rate tracking on the wrist. Neither approach is automatically better—the useful choice depends on whether you want interaction or less of it.",
      },
      {
        title: "Overnight wear has different commitments",
        text: "A ring can feel less like another screen at night, but correct sizing is part of the product decision. Oura states a typical 5–8 days of battery life depending on use, and full-feature access requires an active membership. Apple’s up-to-18-hour normal-use estimate makes charging more frequent, though it is a different kind of all-purpose device.",
      },
      {
        title: "Separate wellness context from medical care",
        text: "Both products can contribute sleep and heart-rate information, but their data is not a diagnosis or a substitute for a clinician. Pick Oura when discreet, screen-free overnight wear is the point; pick Apple when iPhone integration, GPS, and on-device information are more useful. Confirm fit, membership terms, and compatibility before deciding.",
      },
    ],
  },
  {
    id: "sleep-tracking-watch-vs-ring",
    title: "Sleep Tracking: Garmin Venu 3 vs. Oura Ring 4",
    kicker: "A LONGER-RUNNING WATCH OR A SCREEN-FREE RING",
    description:
      "Both include sleep and heart-rate tracking, but one keeps GPS and a watch display in the mix while the other keeps the overnight device intentionally quiet.",
    productIds: ["oura-ring-4", "garmin-venu-3"],
    verdict:
      "Prioritize Oura Ring 4 when screen-free sleep and recovery context are the main goal and you accept membership for full features. Prioritize Garmin Venu 3 when you also want a GPS watch and its stated lower-charging routine fits—especially after accounting for always-on display, activities, and music.",
    sections: [
      {
        title: "Choose the form factor you will actually wear",
        text: "Oura Ring 4 has no screen, no GPS, and a ring sizing step; it is designed around an unobtrusive format for sleep, heart rate, and temperature tracking. Venu 3 is a watch with a display, GPS, sleep tracking, and heart-rate tracking. The better sleep tracker is often the one that remains comfortable and practical enough to wear consistently.",
      },
      {
        title: "Battery has a useful—but conditional—edge",
        text: "Oura gives a typical 5–8 day figure that varies with use. Garmin’s up-to-14-day smartwatch-mode estimate can mean fewer charge sessions, but it assumes no timed activity or music; the stated estimate is up to 5 days with always-on display. GPS has its own up-to-26-hour estimate without music. Compare the conditions with your actual routine, not just the largest number.",
      },
      {
        title: "Factor in the ownership model",
        text: "Oura’s full feature set requires an active membership, a continuing cost to consider alongside the device and correct ring fit. Garmin avoids the ring’s screen-free trade-off while keeping iOS and Android compatibility. Both provide wellness information rather than medical advice; use concerning symptoms as a reason to speak with a qualified professional.",
      },
    ],
  },
];

export type Recommendation = {
  productId: string;
  reason: string;
};

const originalFeaturedIds = new Set([
  "apple-watch-series-10",
  "garmin-venu-3",
  "oura-ring-4",
  "sony-linkbuds-fit",
]);

const originalFeaturedProducts = featuredProducts.filter(product =>
  originalFeaturedIds.has(product.id)
);

function hasFeaturedProduct(productId: string) {
  return originalFeaturedProducts.some(product => product.id === productId);
}

function pick(productId: string, reason: string): Recommendation {
  if (!hasFeaturedProduct(productId)) {
    throw new Error(
      `Recommendation product is not in the original featured shortlist: ${productId}`
    );
  }
  return { productId, reason };
}

/**
 * A small, explicit decision aid based only on the four manufacturer-sourced featured products.
 * It does not rank the full inherited catalog or infer a personal-health outcome.
 */
export function getRecommendations({
  goal,
  phone,
  charging,
}: {
  goal: string;
  phone: string;
  charging: string;
}): { productId: string; reason: string }[] {
  const prefersLessCharging = charging === "less-often";
  const hasIPhone = phone === "iphone";

  if (goal === "audio") {
    return [
      pick(
        "sony-linkbuds-fit",
        "Audio is the stated priority, so this is the only recommendation. LinkBuds Fit adds noise cancellation and ambient sound for iOS or Android. Its up-to-21-hour estimate includes the charging case, not earbuds-only listening."
      ),
    ];
  }

  if (goal === "sleep") {
    return [
      pick(
        "oura-ring-4",
        "For a screen-free sleep and recovery path, Oura Ring 4 comes first. It works with iOS and Android and states a typical 5–8 days depending on use. Full feature access requires an active membership; its sleep and heart-rate information is not medical advice."
      ),
      pick(
        "garmin-venu-3",
        "Choose the Garmin alternative if you also want a display and GPS, or are aiming for fewer charge sessions. Its up-to-14-day smartwatch estimate applies only without timed activity or music; always-on display use is stated at up to 5 days."
      ),
    ];
  }

  if (goal === "fitness") {
    if (hasIPhone && !prefersLessCharging) {
      return [
        pick(
          "apple-watch-series-10",
          "For an iPhone user comfortable with a daily charging routine, Apple Watch Series 10 combines GPS, an always-on display, sleep-stage tracking, and heart-rate tracking. Its stated normal-use battery estimate is up to 18 hours."
        ),
        pick(
          "garmin-venu-3",
          "The Garmin alternative keeps GPS, sleep, and heart-rate tracking while working with iOS or Android. It is the battery-first watch choice, but its up-to-14-day estimate excludes timed activity and music."
        ),
      ];
    }

    return [
      pick(
        "garmin-venu-3",
        `${hasIPhone ? "Because charging less often matters" : "Because Apple Watch is not compatible with Android"}, Garmin Venu 3 is the GPS watch recommendation. It supports iOS and Android, with separate battery expectations for default smartwatch, always-on-display, and GPS use.`
      ),
    ];
  }

  if (hasIPhone && !prefersLessCharging) {
    return [
      pick(
        "apple-watch-series-10",
        "For an everyday iPhone wearable when daily charging is acceptable, Apple Watch Series 10 is the display-led choice: GPS, sleep-stage tracking, and heart-rate tracking with an up-to-18-hour normal-use estimate."
      ),
      pick(
        "garmin-venu-3",
        "If longer gaps between charges become more important, consider Garmin Venu 3 instead. It supports iOS and has distinct battery conditions, including up to 14 days only in smartwatch mode without timed activity or music."
      ),
    ];
  }

  if (hasIPhone) {
    return [
      pick(
        "garmin-venu-3",
        "For an iPhone routine that favors less frequent charging, Garmin Venu 3 comes first. Its up-to-14-day smartwatch estimate is conditional on no timed activity or music, and always-on display use is stated at up to 5 days."
      ),
      pick(
        "apple-watch-series-10",
        "Apple Watch Series 10 remains the iPhone alternative if an always-on display and on-wrist information matter more than charging frequency. Apple states up to 18 hours in normal use."
      ),
    ];
  }

  return [
    pick(
      "garmin-venu-3",
      "Apple Watch is excluded because this route is for Android. Garmin Venu 3 works with Android and brings GPS, sleep tracking, and heart-rate tracking, with battery estimates that vary by activity, music, and display setting."
    ),
    pick(
      "oura-ring-4",
      "For a quieter Android-compatible alternative, Oura Ring 4 removes the screen and GPS in favor of sleep and heart-rate tracking. It states a typical 5–8 days depending on use, and full feature access requires an active membership."
    ),
  ];
}
