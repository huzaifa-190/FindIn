import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// import BottomSheet from 'reanimated-bottom-sheet';
import colors from "../../Constants/Colors"; // Ensure you have your colors imported

const PrivacyPolicy = () => {
 

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightbg }}>
      <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: colors.darkestBlue }}>Privacy Policy</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: colors.grey }}>Effective Date: [Insert Date]</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>Lost and Found App</Text> ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
      </Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>1. Information Collection</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        - <Text style={{ fontWeight: 'bold' }}>Account Information:</Text> When you create an account, we collect your name, email address, and profile picture.
      </Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        - <Text style={{ fontWeight: 'bold' }}>Post Information:</Text> When you post a lost or found item, we collect details about the item and its location.
      </Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        - <Text style={{ fontWeight: 'bold' }}>Usage Data:</Text> We collect data on how you interact with the app to improve our services.
      </Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>2. Use of Information</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        - <Text style={{ fontWeight: 'bold' }}>Account Management:</Text> To create and manage your account.
      </Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        - <Text style={{ fontWeight: 'bold' }}>Service Improvement:</Text> To enhance user experience and improve our services.
      </Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>
        - <Text style={{ fontWeight: 'bold' }}>Communication:</Text> To send updates, notifications, and respond to inquiries.
      </Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>3. Information Sharing</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>We do not sell, trade, or rent your personal information to third parties. We may share information to comply with legal obligations or protect our rights.</Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>4. Data Security</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>We implement appropriate measures to protect your personal information from unauthorized access, alteration, or destruction.</Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>5. Your Rights</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>You have the right to access, update, and delete your personal information. You can change your password and profile picture through your account settings.</Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>6. Changes to this Policy</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5, color: colors.darkestBlue }}>7. Contact Us</Text>
      <Text style={{ fontSize: 14, color: colors.grey, marginBottom: 5 }}>If you have any questions or concerns about this Privacy Policy, please contact us at [Insert Contact Email].</Text>

      <Text style={{ fontSize: 14, color: colors.darkestBlue, marginTop: 20, fontStyle: 'italic' }}>By using our app, you consent to our Privacy Policy.</Text>
    </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
