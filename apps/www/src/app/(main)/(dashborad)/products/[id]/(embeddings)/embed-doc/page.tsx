import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/table";

export default function TestimonialEmbedDocs() {
  const queryParams = [
    {
      name: "no-marquee",
      type: "boolean",
      description:
        "When set, displays testimonials in a static grid layout instead of a marquee.",
      example: "?no-marquee=true",
    },
    {
      name: "container-classname",
      type: "string",
      description: "Applies additional CSS classes to the container div.",
      example: "?container-classname=my-custom-class",
    },
    {
      name: "darktheme",
      type: "boolean",
      description: "Forces the dark theme when set.",
      example: "?darktheme=true",
    },
    {
      name: "theme",
      type: "string",
      description: "Sets the theme explicitly. Can be 'light' or 'dark'.",
      example: "?theme=dark",
    },
    {
      name: "marquee",
      type: "string",
      description: "Controls marquee behavior. Set to 'true' to enable.",
      example: '?marquee="true"',
    },
  ];

  return (
    <div className="w-full p-4">
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Embed Documentation</CardTitle>
          <CardDescription>
            Customize your testimonial embed using these query parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queryParams.map((param) => (
                <TableRow key={param.name}>
                  <TableCell className="font-medium">{param.name}</TableCell>
                  <TableCell>{param.type}</TableCell>
                  <TableCell>{param.description}</TableCell>
                  <TableCell>
                    <code>{param.example}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Usage Examples</h3>
            <ul className="list-inside list-disc space-y-2">
              <li className="rounded-md bg-zinc-900 p-2">
                <code>http://localhost:3001/m/zenstream?no-marquee=true</code>
                <p className="ml-6 text-sm text-gray-400">
                  Displays testimonials in a static grid layout
                </p>
              </li>
              <li className="rounded-md bg-zinc-900 p-2">
                <code>http://localhost:3001/m/zenstream?darktheme=true</code>
                <p className="ml-6 text-sm text-gray-400">
                  Forces the dark theme
                </p>
              </li>
              <li className="rounded-md bg-zinc-900 p-2">
                <code>
                  http://localhost:3001/m/zenstream?container-classname=custom-container&theme=dark&marquee="true"
                </code>
                <p className="ml-6 text-sm text-gray-400">
                  Applies a custom class, sets dark theme, and enables marquee
                </p>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Notes</h3>
            <ul className="list-inside list-disc space-y-2">
              <li>Parameters can be combined using the & symbol.</li>
              <li>
                Boolean parameters are considered true when present, regardless
                of their value.
              </li>
              <li>
                The 'theme' parameter takes precedence over 'darktheme' if both
                are provided.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
