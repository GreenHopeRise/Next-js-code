'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function ProductCategory() {
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const handleCategoryChange = (e:string)=>{
        const params = new URLSearchParams(searchParams.toString())
        if(e){
            params.set('category','category')
        }else{
            params.delete('category')
        }
        params.set('page','1')
        router.replace(`${path}?${params.toString()}`)

    }

return (
    <select
      defaultValue={searchParams.get("category") || ""}
      onChange={(e) => handleCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="clothing">Clothing</option>
      <option value="electronics">Electronics</option>
      <option value="furniture">Furniture</option>
    </select>
  );
}
