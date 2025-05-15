// app\checkEmail\page.tsx
import CheckEmail from "@/components/CheckEmail";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CheckEmailPage({ searchParams }: Props) {
  const email = typeof searchParams.email === 'string' ? searchParams.email : '';
  return <>

  <CheckEmail email={email} />
  </>;

}
