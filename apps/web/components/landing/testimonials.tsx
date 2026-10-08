import { cn } from "@repo/ui/lib/utils"
import { Marquee } from "@repo/ui/components/marquee"
import { Title } from "../global/title"
import { Star } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"

const reviews = [
  {
    id: "1",
    body: "Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.",
    name: "Isabella Rodriguez",
    username: "CEO and Co-founder of ABC Company",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "2",
    body: "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    name: "Gabrielle Williams",
    username: "CEO and Co-founder of ABC Company",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "3",
    body: "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.",
    name: "Samantha Johnson",
    username: "CEO and Co-founder of ABC Company",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 4,
  },
  {
    id: "4",
    body: "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    name: "Natalie Martinez",
    username: "CEO and Co-founder of ABC Company",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "5",
    body: "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.",
    name: "Victoria Thompson",
    username: "CEO and Co-founder of ABC Company",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    rating: 4,
  },
  {
    id: "6",
    body: "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    name: "John Peter",
    username: "CEO and Co-founder of ABC Company",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 3,
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating = 5,
  className,
}: {
  img?: string
  name: string
  username: string
  body: string
  rating: number
  className?: string
}) => {
  return (
    <figure
      key={name}
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div>
        {/* Top bar with Quote Icon and Star Rating */}
        <div className="mb-3 flex items-center justify-between">
          {/* Blue Quote Icon from reference design */}
          <svg
            className="h-8 w-8 fill-current text-blue-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {/* Star Rating display instead of love button */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial body text */}
        <blockquote className="mt-1 text-sm leading-relaxed font-normal text-zinc-800 dark:text-gray-200">
          {body}
        </blockquote>
      </div>

      {/* Author Details section */}
      <div className="mt-6 flex flex-row items-center gap-3 border-t border-black/[0.04] pt-3 dark:border-white/[0.08]">
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src={img} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <figcaption className="font-heading text-sm font-semibold text-zinc-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-zinc-500 dark:text-white/40">
            {username}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function Testimonial() {
  return (
    <div className="flex flex-col gap-16 py-24">
      <Title
        title="What Parents Say About Us"
        subTitle="Hear directly from the families who have seen their children's confidence and communication skills soar through our program.

"
      />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  )
}
