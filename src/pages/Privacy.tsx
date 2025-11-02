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
                At <strong>Mathematico</strong>, we value your privacy. This Privacy Policy explains how our platform collects, uses, and protects your personal information when you use our web application.
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
                When you register or use our platform, we collect the following information:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-900 mb-2">Account Information</h4>
                  <ul className="text-blue-800 space-y-1 ml-4 list-disc">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Password (encrypted and securely stored)</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-900 mb-2">Account Details</h4>
                  <ul className="text-blue-800 space-y-1 ml-4 list-disc">
                    <li>User role (student, instructor, or admin)</li>
                    <li>Account status</li>
                    <li>Last login information</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-900 mb-2">Usage Data</h4>
                  <ul className="text-blue-800 space-y-1 ml-4 list-disc">
                    <li>Course enrollments</li>
                    <li>Course progress and completion</li>
                    <li>Payment and transaction history</li>
                    <li>Learning activity and preferences</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Information</h4>
                  <ul className="text-gray-800 space-y-1 ml-4 list-disc">
                    <li>Authentication tokens for maintaining your login session</li>
                    <li>Browser information and device identifiers (anonymized)</li>
                  </ul>
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
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Provide and maintain our educational services</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Process your enrollments and manage your account</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Send important updates about courses and services</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Improve our platform and user experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Ensure platform security and prevent fraud</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Track your learning progress and achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Data Storage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Database className="h-6 w-6 text-orange-600" />
                3. Data Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your data is stored securely:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Server Storage:</strong> Your account information, course data, and learning progress are stored on secure servers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Local Storage:</strong> Authentication tokens and session data are stored locally in your browser to maintain your login</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Security:</strong> All passwords are encrypted and we use industry-standard security measures to protect your data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Eye className="h-6 w-6 text-purple-600" />
                4. Data Sharing and Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We only share data when necessary:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Service Providers:</strong> We may share data with trusted third-party service providers who help us operate our platform (payment processors, hosting services, etc.)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700"><strong>Business Transfers:</strong> In the event of a merger or acquisition, your data may be transferred to the new entity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Users className="h-6 w-6 text-teal-600" />
                5. Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Access and view your personal information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Update or correct your account information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Request deletion of your account and data</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Opt out of marketing communications</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Download your data in a portable format</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-900">
                  <strong>To exercise these rights, please contact us at dipanjanchatterjee23@gmail.com</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Database className="h-6 w-6 text-orange-600" />
                6. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Encryption of sensitive data in transit and at rest</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Secure authentication and password hashing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Regular security audits and updates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Access controls and monitoring</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-900">
                  <strong>Note:</strong> While we take security seriously, no system is 100% secure. Please protect your account password and notify us immediately of any unauthorized access.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 7. Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                7. Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Mathematico is designed for students of all ages. If you are under 13 (or the minimum legal age in your country), please have a parent or guardian review this Privacy Policy and help you create an account. We do not knowingly collect personal information from children without parental consent, and we will delete any such information if we become aware of it.
              </p>
            </CardContent>
          </Card>

          {/* 8. Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Users className="h-6 w-6 text-indigo-600" />
                8. Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Maintain your login session and preferences</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Track your course progress and activity</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700">Improve platform functionality and user experience</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-900">
                  You can control cookies through your browser settings, though this may affect some features of the platform.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 9. Changes to This Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Calendar className="h-6 w-6 text-teal-600" />
                9. Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on this page and updating the Effective Date. We encourage you to review this policy periodically.
              </p>
            </CardContent>
          </Card>

          {/* 10. Contact Us */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Mail className="h-6 w-6 text-primary" />
                10. Contact Us
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
