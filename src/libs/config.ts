export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: "Go Absensi",
  description: "Aplikasi absensi online",
  creator: "Anonym",
  copyright: "Anonym",
  siteName: "Go Absensi",
  keywords: "Absensi, Online Register, Absen Online",
  menu: [
    {
      id: 1,
      name: "Profile",
      url: "/profile",
    },
    {
      id: 2,
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      id: 3,
      name: "Absensi",
      url: "/absensi",
    },
    {
      id: 4,
      name: "Settings",
      url: "/setting",
    },
  ],
};
