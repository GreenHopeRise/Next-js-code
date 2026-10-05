import ProductCategory from "./ProductCategory";
import ProductSearch from "./ProductSearch";

interface ProductPageProps {
    searchParams: Promise<{
        search?: string;
    category?: string;
    sort?: string;
    page?: string;
    }>
}



export default async function ProductPage({searchParams}:ProductPageProps) {
    const props =  await searchParams
    const search = props.search || ''
    const category = props.category || ''
    const sort = props.sort || ''
    const page = props.page || 1

return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">
        Products
      </h1>
      <ProductSearch/>
      <ProductCategory/>

      <div>
        <p>Search: {search || "No search"}</p>
        <p>Category: {category || "All"}</p>
        <p>Sort: {sort || "Default"}</p>
        <p>Page: {page}</p>
      </div>
    </div>
  );
}
