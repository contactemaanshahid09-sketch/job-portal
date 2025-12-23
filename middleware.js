
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };



// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       // Only allow access if user role is "admin"
//       return token?.role === "admin";
//     },
//   },
// });

// export const config = {
//   matcher: ["/dashboard/:path*"], // Protect dashboard
// };


import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Allow access if user is authenticated
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
