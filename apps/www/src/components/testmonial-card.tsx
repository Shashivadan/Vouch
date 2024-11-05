import { Badge } from "@acme/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@acme/ui/card";

export default function TestimonialCard() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <span className="text-2xl font-bold text-primary-foreground">Y4</span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Yasmine42</h3>
          <p className="text-sm text-muted-foreground">Marisa68@gmail.com</p>
          <Badge variant="secondary" className="mt-1 w-fit">
            Wall of Fame
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic">
          "Voluptas aranea ultra. Comes tres adicio crebro. Virga tibi
          perspiciatis testimonium."
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Posted on {new Date("2024-11-05T17:23:08.911Z").toLocaleDateString()}
        </p>
        <Badge variant="outline">Testimonial</Badge>
      </CardFooter>
    </Card>
  );
}
