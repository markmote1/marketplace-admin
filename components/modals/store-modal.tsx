"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1, { message: "Store name is required" }),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response= await axios.post('/api/stores', values);
            console.log(response);
            await axios.post('/api/stores', values);
            toast.success("Store created successfully");
            storeModal.onClose();
        } catch (error) {
            const errorMessage = (axios.isAxiosError(error) && error.response?.data?.message) || "An error occurred";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create Store"
            description="Future create store Form"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading} 
                                            placeholder="Market-place" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button 
                                disabled={loading}
                                variant="outline" 
                                onClick={storeModal.onClose}
                            >
                                Cancel
                            </Button>
                            <Button disabled={loading} type="submit">
                                {loading ? "Processing..." : "Continue"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};
