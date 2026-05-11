import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

// Protect only the /app routes — landing, auth, and API are public
export const config = {
  matcher: ["/app/:path*"],
};
