import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import { Separator } from "@acme/ui/separator";

export default function Page() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using Vouch's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
    },
    {
      title: "Description of Service",
      content:
        "Vouch provides a platform for collecting, managing, and displaying customer testimonials. Our services include customizable forms, automated follow-ups, testimonial moderation, and multi-channel display options.",
    },
    {
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      title: "Content",
      content:
        "You retain all rights to any content you submit, post or display on or through Vouch. By submitting, posting or displaying content, you grant Vouch a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute such content.",
    },
    {
      title: "Termination",
      content:
        "We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
    },
    {
      title: "Limitation of Liability",
      content:
        "In no event shall Vouch, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold lg:text-left">
        Terms of Service
      </h1>

      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {index + 1}. {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{section.content}</p>
          </CardContent>
        </Card>
      ))}

      <Separator className="my-8" />

      <p className="text-center text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
