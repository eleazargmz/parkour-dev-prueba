// import * as React from 'react';
// import { Html, Button } from "@react-email/components";

// interface EmailTemplateProps {
//   firstName: string;
//   token: string;
// }

// export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
//   firstName,
//   token
// }) => (
//   <div>
//     <h1>¡Bienvenido, {firstName}!</h1>
//     <p>Haz clic en el enlace de abajo para verificar tu correo electrónico</p>
//     <a href={`${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`}>Verificar correo electrónico</a>
//   </div>
// );

import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Link } from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  token,
}) => (
  <Html>
    <Head />
    <Body>
      <Container>
        <Heading>¡Bienvenido, {firstName}!</Heading>
        <Text>Haz clic en el enlace de abajo para verificar tu correo electrónico</Text>
        <Link href={`${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`}>
          Verificar correo electrónico
        </Link>
      </Container>
    </Body>
  </Html>
);