"use client"

import { useRouter } from "next/navigation"
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

export default function AddProductPage() {


    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const categoryOptions = ["Electronics", "Furniture", "Apparel"]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`, data)
            enqueueSnackbar("Product added successfully", { variant: "success" })
            router.push("/")
        } catch (err) {
            enqueueSnackbar("Failed to add product", { variant: "error" })
            console.error(err)
        }
    }

    return (
        <div className="p-5 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">Add Product</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full max-w-2xl"
            >
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
                            className="border-1 border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="category" className="mb-1 font-medium">Category</label>
                        <select
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            className=" bg-bg border-1 border-border appearance-none p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
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
                            className="border-1 border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    <div className="flex flex-col flex-1 min-w-[200px]">
                        <label htmlFor="brand" className="mb-1 font-medium">Brand</label>
                        <input
                            id="brand"
                            {...register("brand", { required: "Brand is required" })}
                            placeholder="Brand"
                            className="border-1 border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-sub"
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
                        className="border-1 border-border p-2 rounded w-full min-h-[100px]"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button className="px-3 py-1 bg-sub rounded-sm hover:opacity-80" type="button" onClick={()=>router.push("/")}>Cancel</button>
                    <button className="px-4 py-2 bg-main rounded-sm hover:opacity-80" type="submit">Add product</button>
                </div>
            </form>
        </div>

    )
}
