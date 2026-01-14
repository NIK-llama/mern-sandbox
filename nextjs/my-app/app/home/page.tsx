import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <h1>Hello!!</h1>
      {JSON.stringify(session)}
    </div>
  );
}
