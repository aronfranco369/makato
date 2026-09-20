import ChargeExplorer from "@/components/ChargeExplorer";
import { loadCatalog } from "@/lib/catalog";

export default async function Home() {
  const catalog = await loadCatalog();

  return <ChargeExplorer catalog={catalog} />;
}
