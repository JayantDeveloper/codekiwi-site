import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  redirectTo?: string;
  className?: string;
};
export default function GoogleAuthButton({
  label = "Continue with Google",
  redirectTo = "/dashboard",
  className = "",
}: Props) {
  return (
    <Button
      asChild
      className={`bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white shadow-md ${className}`}
    >
      <a href={`/api/auth/signin/google?redirectTo=${encodeURIComponent(redirectTo)}`}>
        <svg /* your svg */ className="mr-2 h-5 w-5" />
        {label}
      </a>
    </Button>
  );
}
