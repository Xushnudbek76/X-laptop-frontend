import { useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import "../../../css/help.css";

export default function HelpPage() {
  const [value, setValue] = useState("1");

  const contacts = [
    { icon: <EmailIcon className="help-page__contact-icon" />, label: "Email", value: "support@xlaptop.com" },
    { icon: <PhoneIcon className="help-page__contact-icon" />, label: "Phone", value: "+82 10-1234-5678" },
    { icon: <LocationOnIcon className="help-page__contact-icon" />, label: "Location", value: "Suwon, South Korea" },
  ];

  return (
    <section className="help-page app-page app-page--dark">
      <div className="help-page__hero">
        <Typography className="help-page__title">Help Center</Typography>
        <Typography className="help-page__subtitle">
          Find answers to common questions, read our terms, or get in touch with our team.
        </Typography>
      </div>

      <Container maxWidth="md" className="help-page__container">
        <TabContext value={value}>
          <div className="help-page__tabs-wrap">
            <div className="help-page__tabs-shell">
              <Tabs value={value} onChange={(_, nextValue) => setValue(nextValue)}>
                <Tab label="Terms" value="1" />
                <Tab label="FAQ" value="2" />
                <Tab label="Contact" value="3" />
              </Tabs>
            </div>
          </div>

          <TabPanel value="1" className="help-page__panel">
            <div className="app-shell-card help-page__terms">
              {terms.map((term, index) => (
                <div key={index} className="help-page__terms-item">
                  {term}
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel value="2" className="help-page__panel">
            <div className="help-page__faq-list">
              {faq.map((item, index) => (
                <Accordion key={index} disableGutters elevation={0} className="help-page__faq-item">
                  <AccordionSummary expandIcon={<ExpandMoreIcon className="help-page__faq-expand" />} className="help-page__faq-summary">
                    <Typography className="help-page__faq-question">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="help-page__faq-details">
                    <Typography className="help-page__faq-answer">{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </TabPanel>

          <TabPanel value="3" className="help-page__panel">
            <div className="help-page__contact">
              <div className="app-shell-card help-page__contact-info">
                <div>
                  <Typography className="help-page__contact-title">Get in touch</Typography>
                  <Typography className="help-page__contact-copy">
                    We&apos;re happy to help. Reach out and we&apos;ll get back to you within 24 hours.
                  </Typography>
                </div>

                <div className="help-page__contact-list">
                  {contacts.map((contact) => (
                    <div key={contact.label} className="help-page__contact-row">
                      <div className="help-page__contact-icon-shell">{contact.icon}</div>
                      <div>
                        <div className="help-page__contact-label">{contact.label}</div>
                        <div className="help-page__contact-value">{contact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Box component="form" onSubmit={(e) => e.preventDefault()} className="app-shell-card help-page__form">
                <Typography className="help-page__form-title">Send a message</Typography>

                {[
                  { label: "Your name", name: "name", placeholder: "Type your name here" },
                  { label: "Your email", name: "email", placeholder: "Type your email here" },
                ].map((field) => (
                  <div key={field.name}>
                    <div className="help-page__field-label">{field.label}</div>
                    <TextField
                      fullWidth
                      name={field.name}
                      placeholder={field.placeholder}
                      variant="outlined"
                      size="small"
                      className="help-page__field"
                    />
                  </div>
                ))}

                <div>
                  <div className="help-page__field-label">Message</div>
                  <TextField
                    fullWidth
                    name="message"
                    placeholder="How can we help you?"
                    variant="outlined"
                    multiline
                    rows={4}
                    className="help-page__field"
                  />
                </div>

                <div className="help-page__actions">
                  <Button type="submit" variant="contained" className="help-page__submit">
                    Send Message
                  </Button>
                </div>
              </Box>
            </div>
          </TabPanel>
        </TabContext>
      </Container>
    </section>
  );
}
