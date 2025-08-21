"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSnackbar } from "notistack"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"

interface IFormInput {
    name: string
    description: string
    price: number
    brand: string
    category: string
}

export default function EditProductPage() {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const pathname = usePathname()
    const productId = pathname.split("/").pop()

    const categoryOptions = ["Electronics", "Furniture", "Apparel"]

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (!productId) return

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}/`)
                const product = response.data

                setValue("name", product.name)
                setValue("description", product.description)
                setValue("price", product.price)
                setValue("brand", product.brand)
                setValue("category", product.category)

                setLoading(false)
            } catch (err) {
                enqueueSnackbar("Failed to fetch product", { variant: "error" })
                console.error(err)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productId, setValue, enqueueSnackbar])

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!productId) return

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}/`, data)
            enqueueSnackbar("Product updated successfully", { variant: "success" })
            router.push("/")
        } catch (err) {
            enqueueSnackbar("Failed to update product", { variant: "error" })
            console.error(err)
        }
    }

    if (loading) return <p className="p-5">Loading...</p>

    return (
        <div className="p-5 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">Edit Product</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-2xl">

                <div className="flex flex-wrap gap-5">
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="name" className="mb-1 font-medium">Name</label>
                        <input
                            id="name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: { value: 3, message: "Name must be at least 3 characters" }
                            })}
                            placeholder="Product Name"
                            className="border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="category" className="mb-1 font-medium">Category</label>
                        <select
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            className="bg-bg border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                    </div>
                </div>
                <div className="flex flex-wrap gap-5">
                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="price" className="mb-1 font-medium">Price</label>
                        <input
                            id="price"
                            type="number"
                            {...register("price", {
                                required: "Price is required",
                                min: { value: 0.01, message: "Price must be greater than 0" }
                            })}
                            placeholder="Price"
                            className="border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="brand" className="mb-1 font-medium">Brand</label>
                        <input
                            id="brand"
                            {...register("brand", { required: "Brand is required" })}
                            placeholder="Brand"
                            className="border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
                        />
                        {errors.brand && <span className="text-red-500 text-sm">{errors.brand.message}</span>}
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="description" className="mb-1 font-medium">Description</label>
                    <textarea
                        id="description"
                        {...register("description")}
                        placeholder="Product Description"
                        className="border border-border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-sub min-h-[100px]"
                    />
                </div>


                <div className="flex justify-end gap-6">
                    <button className="px-3 py-1 bg-sub rounded-sm hover:opacity-80" type="button" onClick={()=> router.push("/")}>Cancel</button>
                    <button className="px-3 py-1 text-maintext bg-main rounded-sm hover:opacity-80" type="submit">Add product</button>
                </div>
            </form>
        </div>
    )
}
