import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

function AuthPage() {
  //METHOD1-client protecting Auth page
  //   const [isLoading, setIsLoading] = useState(true);
  //   const router = useRouter();

  //   useEffect(() => {
  //     async function handler() {
  //       const session = await getSession();

  //       if (session) {
  //         router.replace("/profile");
  //       } else {
  //         setIsLogin(false);
  //       }
  //     }
  //     handler();
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  return <AuthForm />;
}

export async function getServerSideProps(context) {
  // METHOD2 serverside
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AuthPage;
