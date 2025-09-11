export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*"], // gate dashboard & its subpages
};
