import React from 'react';
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Author, Startup} from "@/sanity/types";


export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({post}: { post: StartupCardType }) => {
    const {
        _id,
        _createdAt,
        views,
        author,
        title,
        description,
        image,
        category
    } = post

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className="startup-card_date">{new Date(_createdAt).toDateString()}</p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-5 text-primary"/>
                    <span className="text-md">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-md line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-2xl font-medium line-clamp-1">{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image
                        src={author?.image ?? 'https://placehold.co/600x400/png'}
                        alt={author?.name ?? 'https://placehold.co/600x400/png'}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">{description}</p>
                <Image src={image || 'https://placehold.co/600x400/png'}
                       alt="placeholder"
                       className="startup-card_img"
                       width={600}
                       height={400}
                />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>

        </li>
    );
};

export default StartupCard;