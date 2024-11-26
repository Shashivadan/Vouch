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

export default function page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Testimonials API Documentation
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>GET /api/testimonials</CardTitle>
          <CardDescription>
            Retrieve wall of fame testimonials for a specific organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-lg font-semibold">Query Parameters</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>key</TableCell>
                <TableCell>string</TableCell>
                <TableCell>
                  The organization ID to fetch testimonials for
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="mb-2 mt-4 text-lg font-semibold">Responses</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>200 OK</TableCell>
                <TableCell>
                  Successful response with testimonials data
                  <pre className="mt-2 rounded-md bg-zinc-900 p-2">
                    {JSON.stringify(
                      { data: [{ id: 1, content: "Great product!" }] },
                      null,
                      2,
                    )}
                  </pre>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>400 Bad Request</TableCell>
                <TableCell>
                  Missing key parameter
                  <pre className="mt-2 rounded-md bg-zinc-900 p-2">
                    {JSON.stringify({ error: "Missing key" }, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>500 Internal Server Error</TableCell>
                <TableCell>
                  Server error occurred
                  <pre className="mt-2 rounded-md bg-zinc-900 p-2">
                    {JSON.stringify(
                      { error: "Internal server error" },
                      null,
                      2,
                    )}
                  </pre>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="mb-2 mt-4 rounded-md">Example Usage</h3>
          <pre className="rounded-md bg-zinc-900 p-2">
            {`fetch('/api/testimonials?key=org123')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>
              This API endpoint retrieves testimonials marked as "wall of fame"
              for a specific organization.
            </li>
            <li>
              The <code>key</code> parameter is required and should contain the
              organization ID.
            </li>
            <li>
              The response includes an array of testimonial objects in the{" "}
              <code>data</code> field.
            </li>
            <li>
              Error responses will include an <code>error</code> field with a
              description of the error.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
