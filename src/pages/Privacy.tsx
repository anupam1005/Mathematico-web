import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Database, Users, Mail, Calendar, AlertTriangle } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge variant="secondary" className="text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                Effective Date: 07.09.2025
              </Badge>
            </div>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              How Mathematico collects, uses, and protects your personal information
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At <strong>Mathematico</strong>, we value your privacy. This Privacy Policy explains how our Mathematico mobile application handles user information.
              </p>
            </CardContent>
          </Card>

          {/* 1. Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Shield className="h-6 w-6 text-blue-600" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                We want to make it clear: <strong>Mathematico does not collect, store, or share any personal information from users.</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not request or access data such as:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-900 mb-2">Names, email addresses, or phone numbers</h4>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-900 mb-2">Device identifiers, IP addresses, or precise location data</h4>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-900 mb-2">Usage analytics or cookies</h4>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Lock className="h-6 w-6 text-green-600" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Since we do not collect any personal information, we do not use or process user data for any purpose.
              </p>
            </CardContent>
          </Card>

          {/* 3. Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Eye className="h-6 w-6 text-purple-600" />
                3. Data Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                As no data is collected, no information is shared with third parties.
              </p>
            </CardContent>
          </Card>

          {/* 4. Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                4. Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                The Mathematico app is safe for all age groups. Since we do not collect any personal data, children under 13 (or the minimum legal age in your country) can use the app without risk of personal information being collected.
              </p>
            </CardContent>
          </Card>

          {/* 5. Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Database className="h-6 w-6 text-orange-600" />
                5. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Because we do not collect or store any personal information, there is no risk of your data being exposed or misused.
              </p>
            </CardContent>
          </Card>

          {/* 6. Changes to This Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Calendar className="h-6 w-6 text-teal-600" />
                6. Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy in the future. Any updates will be published on this page with a revised Effective Date.
              </p>
            </CardContent>
          </Card>

          {/* 7. Contact Us */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Mail className="h-6 w-6 text-primary" />
                7. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                If you have any questions about this Privacy Policy or about the Mathematico app, you can contact us at:
              </p>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                <Mail className="h-6 w-6 text-primary" />
                <a 
                  href="mailto:dipanjanchatterjee23@gmail.com"
                  className="text-lg font-medium text-primary hover:underline"
                >
                  📧 Email: dipanjanchatterjee23@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
