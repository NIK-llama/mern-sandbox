import prisma from "@/lib/db";

async function getUserDetails() {
  try {
    const user = await prisma.user.findFirst({});
    return {
      name: user?.username,
    };
  } catch (e) {
    console.log(e);
  }
}

export default async function Home() {
  const userData = await getUserDetails();
  return (
    <div>
      User Details:
      <br />
      <div>Name: {userData?.name}</div>
    </div>
  );
}
