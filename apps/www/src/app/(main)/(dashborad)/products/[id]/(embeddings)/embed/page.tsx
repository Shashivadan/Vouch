import Embedding from "~/components/embeddings/embedding";

export default function page({ params }: { params: { id: string } }) {
  return <Embedding website={params.id} />;
}
