import Login from "@/components/auth/Login";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}
