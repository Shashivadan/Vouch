import { CheckCircle } from "lucide-react";

import { Badge } from "@vouch/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@vouch/ui/card";

export default function AboutPage() {
  const sentences = [
    "Launch in 5 minutes, no coding required",
    "Increase conversion rates",
    "Save hours of manual work",
    "Full control over presentation",
  ];
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <h1 className="mb-4 text-center text-4xl font-bold lg:text-left">
        About Vouch
      </h1>

      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
        <CardContent className="pt-6">
          <p className="text-xl">
            Vouch streamlines the entire testimonial collection process, solving
            a critical challenge for modern businesses. Our platform empowers
            companies to leverage the power of social proof effectively and
            efficiently.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Key Functions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {sentences.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span>Core Benefits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Launch in 5 minutes, no coding required",
                "Increase conversion rates",
                "Save hours of manual work",
                "Full control over presentation",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>Perfect For</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">SaaS companies</Badge>
              <Badge variant="secondary">Service businesses</Badge>
              <Badge variant="secondary">E-commerce stores</Badge>
              <Badge variant="secondary">Agencies</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
        <CardContent className="pt-6">
          <p className="text-center text-xl font-semibold">
            Our mission: Transform happy customers into powerful brand advocates
            through effortless testimonial collection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
