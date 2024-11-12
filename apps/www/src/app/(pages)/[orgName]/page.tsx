export default function page({ params }: { params: { orgName: string } }) {
  const { orgName } = params;
  return <div>{orgName}</div>;
}
