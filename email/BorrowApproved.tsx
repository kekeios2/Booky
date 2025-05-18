import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Link,
} from "@react-email/components";

interface BorrowApprovedEmailProps {
  userName: string;
  bookTitle: string;
  profileUrl: string;
}

export default function BorrowApprovedEmail({
  userName,
  bookTitle,
  profileUrl,
}: BorrowApprovedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your legendary book request? Approved! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <table
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            role="presentation"
            style={{ marginBottom: "32px" }}
          >
            <tr>
              <td align="center">
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{ display: "inline-block" }}
                >
                  <tr>
                    <td>
                      <Img
                        src="https://ik.imagekit.io/xt6hfeibgz/Ui-Images/logo.png"
                        alt="Booky Logo"
                        width="32"
                        height="32"
                        style={{ display: "block", verticalAlign: "middle" }}
                      />
                    </td>
                    <td style={{ paddingLeft: "8px", verticalAlign: "middle" }}>
                      <Text style={brandName}>Booky</Text>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <Heading style={h1}>You did it! ✅</Heading>

          <Text style={text}>
            Hey <strong>{userName}</strong>! Great news — your request to borrow
            <strong>{bookTitle}</strong> has been
            <span style={{ color: "#10B981" }}>approved</span>! 🎉
          </Text>

          <Text style={text}>
            The book is ready and waiting for you. Just follow the instructions
            and claim your reading adventure!
          </Text>

          <Link href={profileUrl} style={button}>
            Let's Go Grab That Book!
          </Link>

          <Text style={text}>
            If you run into any dragons 🐉 (or issues), our team is here to
            help. Otherwise... happy reading, legend! 📖✨
          </Text>

          <Text style={footer}>
            Stay awesome,
            <br />– The Booky Crew 🚀
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (matching the themed verification email)

const main = {
  backgroundImage:
    "url('https://ik.imagekit.io/xt6hfeibgz/Ui-Images/EXPORT-BG.png?updatedAt=1747251088255')",
  backgroundSize: "cover",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "8px",
};
// const logoContainer = {
//   display: "flex",
//   justifyContent: "center", // مركز أفقياً
//   alignItems: "center", // مركز عمودياً
//   gap: "8px",
//   marginBottom: "32px",
// };

// const logo = {
//   width: "32px",
//   height: "32px",
//   display: "block", // إزالة أي تأثير inline من Img
//   margin: 0, // إزالة الهوامش الجانبية
// };

const brandName = {
  color: "#E5E7EB",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
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
const h1 = {
  color: "#E5E7EB",
  fontSize: "22px",
  fontWeight: "700",
  textAlign: "center" as const,
  marginBottom: "24px",
};

const text = {
  color: "#d1d5db",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
};

const footer = {
  color: "#9ca3af",
  fontSize: "13px",
  textAlign: "center" as const,
  marginTop: "32px",
  lineHeight: 1.6,
};
