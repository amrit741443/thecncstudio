import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion"
import { Title } from "../global/title"

const items = [
  {
    title: "What services does Shadcn Space offer?",
    content:
      "We offer a wide range of services including web development, app development, and digital marketing tailored to help your business grow and scale effectively.",
  },
  {
    title: "How long does a typical project take?",
    content:
      "The time it takes to complete a project depends on the complexity and scope of the work. Most projects range from 4–8 weeks, and we'll give you a clear timeline upfront.",
  },
  {
    title: "Do you offer ongoing support after project completion?",
    content:
      "Absolutely! We offer comprehensive post-launch support to ensure a seamless implementation and provide ongoing maintenance packages tailored to clients who need regular updates or technical assistance. Our commitment doesn't end at launch — we're here to help you every step of the way.",
  },
]

export const Fqa = () => (
  <div className="flex w-full flex-col items-center justify-center gap-16 py-24">
    <Title
      title="Frequently Asked Questions"
      subTitle="Everything you need to know about our Skill Development programs."
    />

    <Accordion defaultValue={["item-0"]} className="w-full space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="rounded-lg border transition-colors"
        >
          <AccordionTrigger className="cursor-pointer items-center bg-accent px-4 py-5 hover:font-semibold hover:no-underline aria-expanded:rounded-b-none [&[data-state=open]>svg]:text-primary">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="px-5 pt-4 text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)
