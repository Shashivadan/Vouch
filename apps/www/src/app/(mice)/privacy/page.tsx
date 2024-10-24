import { Separator } from "@acme/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";





export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "At Vouch, we collect information to provide better services to all our users. The types of information we collect include:",
      list: [
        "Information you provide to us (such as name, email address)",
        "Information we get from your use of our services",
        "Information from third-party sources",
      ],
    },
    {
      title: "How We Use Information",
      content:
        "We use the information we collect to provide, maintain, protect and improve our services, to develop new ones, and to protect Vouch and our users.",
    },
    {
      title: "Information Sharing",
      content:
        "We do not share personal information with companies, organizations, or individuals outside of Vouch unless one of the following circumstances applies:",
      list: [
        "With your consent",
        "For external processing",
        "For legal reasons",
      ],
    },
    {
      title: "Information Security",
      content:
        "We work hard to protect Vouch and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.",
    },
    {
      title: "Changes",
      content:
        "Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold lg:text-left">
        Privacy Policy
      </h1>

      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {index + 1}. {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{section.content}</p>
            {section.list && (
              <ul className="list-inside list-disc space-y-2">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}

      <Separator className="my-8" />

      <p className="text-center text-sm text-gray-600">
        Last updated: {new Date().toDateString()}
      </p>
    </div>
  );
}