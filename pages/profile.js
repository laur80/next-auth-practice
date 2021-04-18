import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";
// import { getSession } from "next-auth/client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

function ProfilePage() {
  //METHOD1-client protecting Profile page
  //   const [isLoading, setIsLoading] = useState(true);
  //   const router = useRouter();

  //   useEffect(() => {
  //     getSession().then((session) => {
  //       if (!session) {
  //         //   window.location.href = "/auth";
  //         router.replace("/auth");
  //       } else {
  //         setIsLoading(false);
  //       }
  //     });
  //   }, []);

  //   if (isLoading) {
  //     return <p className={classes.profile}>Loading...</p>;
  //   }
  return <UserProfile />;
}
// METHOD2 serverside
export async function getServerSideProps(context) {
  //   console.log(context.req);
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
