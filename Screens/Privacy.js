import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Privacy = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 15, marginTop: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: "700" }}>
          Privacy and Policy
        </Text>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={{ textAlign: "justify" }}>
          Effective Date: [Date] Thank you for choosing Tree Mittra, a platform
          founded by Tata Power, dedicated to environmental sustainability and
          tree conservation. At Tree Mittra, we are committed to protecting your
          privacy and ensuring the security of your personal information. This
          Privacy Policy outlines how we collect, use, and safeguard your data
          when you interact with our platform. Information We Collect: Personal
          Information: Name Email address Contact number Usage Information: Log
          data Device information Usage patterns How We Use Your Information:
          Communication: To send updates, newsletters, and relevant information
          about Tree Mittra initiatives. To respond to your inquiries and
          provide customer support. Personalization: To tailor your experience
          on the Tree Mittra platform. To recommend personalized content based
          on your preferences. Analytics: To analyze user behavior and improve
          our services. To track the effectiveness of our environmental
          initiatives. Legal Compliance: To comply with legal obligations and
          regulatory requirements. Information Sharing: We do not sell, trade,
          or otherwise transfer your personal information to external parties
          without your consent, except as outlined in this Privacy Policy or
          required by law. Third-Party Partners: We may share non-personal
          information with trusted third-party partners for analytics and
          improvement purposes. Legal Requirements: We may disclose personal
          information when required by law or to protect our rights. Security
          Measures: We implement industry-standard security measures to protect
          your personal information from unauthorized access, disclosure,
          alteration, and destruction. Your Choices: Opt-Out: You may opt-out of
          receiving promotional communications from us by following the
          instructions in our emails. Access and Update: You have the right to
          access and update your personal information. Contact us to make
          changes. Changes to the Privacy Policy: We reserve the right to update
          this Privacy Policy periodically. We will notify you of any changes by
          posting the new policy on the Tree Mittra platform. Contact Us: If you
          have any questions or concerns regarding our Privacy Policy, please
          contact us at [contact@treemittra.com]. By using Tree Mittra, you
          consent to the terms outlined in this Privacy Policy. Thank you for
          being a part of Tree Mittra and contributing to a greener future!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Privacy;

const styles = StyleSheet.create({});
