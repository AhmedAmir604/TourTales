export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
];

let url;
if (import.meta.env.VITE_ENV === "production") {
  url = "http://localhost:8000/api/v1";
} else {
  url = "https://tourtales-p02r.onrender.com/api/v1";
}
export { url };
