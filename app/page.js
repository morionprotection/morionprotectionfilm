import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en"); // redirect to English as main language
  return null;
}