import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { Suspense } from "react";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await
        resolve={userPromise}
        errorElement={<p>Something went wrong!</p>}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
