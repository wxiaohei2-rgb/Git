import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PasscodeHome } from "@/components/passcode-home";

export default async function Home() {
  const expectedToken = process.env.DEMO_SESSION_TOKEN ?? "matrix-demo-session";
  const cookieStore = await cookies();

  if (cookieStore.get("matrix_session")?.value === expectedToken) {
    redirect("/workspace");
  }

  return <PasscodeHome />;
}
