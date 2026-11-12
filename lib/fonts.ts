import { IBM_Plex_Sans_Arabic } from "next/font/google";

// يُحمَّل الخط ويُستضاف مع الموقع وقت البناء (بدون طلبات خارجية للزائر)
export const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
});
