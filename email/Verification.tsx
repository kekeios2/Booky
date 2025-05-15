import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  verificationUrl: string;
}

export const Verification = ({ verificationUrl }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Almost there! Just one click to get started 🚀</Preview>
    <Body style={main}>
      <Container style={container}>
        <div style={logoContainer}>
          <Img
            src="https://ik.imagekit.io/xt6hfeibgz/Ui-Images/logo.png"
            alt="Booky Logo"
            width={32}
            height={32}
            style={logo}
          />
          <Heading style={brandName}>Booky</Heading>
        </div>
        <Heading style={h1}>Let’s make it official!</Heading>
        <Text style={text}>
          Hey there! We’re super excited you joined Booky. Just one more tiny
          step to unlock the magic — click that shiny button below to verify
          your email.
        </Text>
        <Link href={verificationUrl} style={button}>
          Yes, I’m awesome — Verify Email
        </Link>
        <Text style={text}>
          Didn’t sign up? No worries! You can safely ignore this email and
          pretend this never happened
        </Text>
        <Text style={footer}>
          &copy; {new Date().getFullYear()} Booky. All rights reserved.
          <br />
          21955 Market Street #5039
          <br />
          Makkah, KSA
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "url('https://ik.imagekit.io/xt6hfeibgz/Ui-Images/EXPORT-BG.png?updatedAt=1747251088255')",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "32px",
  placeSelf: "center",
};

const logo = {
  width: "32px",
  height: "32px",
};

const brandName = {
  color: "#E5E7EB",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const h1 = {
  color: "#E5E7EB",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#E5E7EB",
  fontSize: "16px",
  margin: "24px 0",
};

const button = {
  backgroundColor: "#c9af90",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "medium",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "24px 0",
};

const footer = {
  color: "#a0a0a0",
  fontSize: "12px",
  marginTop: "40px",
  textAlign: "center" as const,
  lineHeight: 1.5,
};

export default Verification;
