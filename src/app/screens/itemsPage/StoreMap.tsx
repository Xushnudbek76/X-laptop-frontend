import { Container, Typography } from "@mui/material";

const STORES = [
  { name: "X-Laptop Warsaw", address: "Marszalkowska 99, Warsaw", coords: "52.2297,21.0122" },
  { name: "X-Laptop Krakow", address: "Rynek Glowny 12, Krakow", coords: "50.0614,19.9366" },
  { name: "X-Laptop Gdansk", address: "Dluga 45, Gdansk", coords: "54.3520,18.6466" },
];

export default function StoreMap() {
  return (
    <section className="laptops-page__stores">
      <Container maxWidth="lg">
        <div className="laptops-page__stores-header">
          <Typography className="laptops-page__store-kicker">Find Us</Typography>
          <Typography className="laptops-page__store-heading">Our Stores</Typography>
        </div>

        <div className="laptops-page__stores-grid">
          <div className="laptops-page__map">
            <iframe
              title="X-Laptop Store Map"
              src="https://www.google.com/maps?q=Poland&output=embed"
              allowFullScreen
              loading="lazy"
              className="laptops-page__map-frame"
            />
          </div>

          <div className="laptops-page__store-cards">
            {STORES.map((store) => (
              <div key={store.name} className="laptops-page__store-card">
                <div className="laptops-page__store-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="laptops-page__store-copy">
                  <Typography className="laptops-page__store-name">{store.name}</Typography>
                  <Typography className="laptops-page__store-address">{store.address}</Typography>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${store.coords}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="laptops-page__store-link"
                  >
                    Get directions
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
