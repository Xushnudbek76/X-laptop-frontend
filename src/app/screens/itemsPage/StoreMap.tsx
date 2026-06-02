import { Container, Typography } from "@mui/material";

const STORES = [
  { name: "X-Laptop Seoul", address: "123 Gangnam-daero, Seoul", coords: "37.498,127.027" },
  { name: "X-Laptop Suwon", address: "45 Ingye-ro, Suwon", coords: "37.263,127.028" },
  { name: "X-Laptop Busan", address: "78 Haeundae-ro, Busan", coords: "35.158,129.160" },
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253041.97290388512!2d126.72834086059566!3d37.56653565004597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1712000000000"
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
