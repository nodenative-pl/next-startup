"use client";

import React, {useActionState, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {startupFormSchema} from "@/lib/validation";
import {z} from "zod";
import {toast} from "sonner"


import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/actions";


const CreateStartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch: formData.get("pitch") as string,
            };

            await startupFormSchema.parseAsync(formValues)

            const result = await createPitch(prevState, formData);

            if (result.status == "SUCCESS") {
                toast('Success', {
                    description: "Your startup pitch has been created successfully",
                });

                router.push(`/startup/${result._id}`);
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);

                toast('Error', {
                    description: "Please check your inputs and try again",
                });

                return {...prevState, error: "Validation failed", status: "ERROR"};
            }

            toast('Error', {
                description: "An unexpected error has occurred",
            });
            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };


    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });


    return (
        <form action={formAction} className="create-startup-form">
            <div>
                <label htmlFor="title" className="create-startup-form_label">
                    Title
                </label>
                <Input
                    id="title"
                    name="title"
                    className="create-startup-form_input"
                    required
                    placeholder="Startup Title"
                />

                {errors.title && <p className="create-startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="create-startup-form_label">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="create-startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />

                {errors.description && (
                    <p className="create-startup-form_error">{errors.description}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="create-startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    className="create-startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education...)"
                />

                {errors.category && (
                    <p className="create-startup-form_error">{errors.category}</p>
                )}
            </div>

            <div>
                <label htmlFor="link" className="create-startup-form_label">
                    Image URL
                </label>
                <Input
                    id="link"
                    name="link"
                    className="create-startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />

                {errors.link && <p className="create-startup-form_error">{errors.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="create-startup-form_label">
                    Pitch
                </label>
                <Textarea
                    id="pitch"
                    name="pitch"
                    className="create-startup-form_textarea"
                    required
                    placeholder="Briefly describe your idea and what problem it solves"
                />

                {errors.pitch && <p className="create-startup-form_error">{errors.pitch}</p>}
            </div>
            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2"/>
            </Button>
        </form>
    );
};

export default CreateStartupForm;